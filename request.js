/*jshint esversion: 6 */
var rp          = require('request-promise'),
    cheerio     = require('cheerio'),
    windows1252 = require('windows-1252'),
    fs 			= require("fs");


var url_ws = "https://2018hlin601ter16.proj.info-ufr.univ-montp2.fr/WebServiceBddTer16/requeteur.php";

function insertUser(pseudo,adresse,callback){
    var url = windows1252.encode(url_ws+"?cmd=insert_user&pseudo="+pseudo+"&adresse="+adresse);

    const options = {
        uri: url,
        encoding: 'binary',
        transform: function (body) {
            return cheerio.load(body, {decodeEntities: false});
        }
    };

    rp(options)
    .then(($) => {

        var result = $('result').text();
        callback(null,result);


    })
    .catch((err) => {
        console.log(err);
        callback(err);
    });
}

function getUserAdresse(pseudo,callback){
    var url = windows1252.encode(url_ws+"?cmd=get_user_adresse&pseudo="+pseudo);

    const options = {
        uri: url,
        encoding: 'binary',
        transform: function (body) {
            return cheerio.load(body, {decodeEntities: false});
        }
    };

    rp(options)
    .then(($) => {

        var result = $('result').text();
        //console.log(result);
        callback(null,result);


    })
    .catch((err) => {
        console.log(err);
        callback(err);
    });
}

function getUserLastFaFw(pseudo, is_question,callback){
    var question;
    if (is_question) question = 1;
    else question =0;
    var url = windows1252.encode(url_ws+"?cmd=get_user_last_fa_fw&pseudo="+pseudo+"&question="+question);

    const options = {
        uri: url,
        encoding: 'binary',
        transform: function (body) {
            return cheerio.load(body, {decodeEntities: false});
        }
    };

    rp(options)
    .then(($) => {

        var fa = $('fa').text();
        var fw = $('fw').text();
        callback(null,fa,fw);


    })
    .catch((err) => {
        console.log(err);
        callback(err);
    });
}

function insertUserPost(pseudo,adresse,callback){
    //var url = windows1252.encode(url_ws+"cmd=insert_user&pseudo="+pseudo+"&idBot="+idBot+"&adresse="+adresse);

    const options = {
        method:'POST',
        uri: url_ws,
        encoding: 'binary',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },

        form: {
            'cmd': "insert_user",
            'pseudo': pseudo,
            'adresse':adresse
        },

        transform: function (body) {
            return cheerio.load(body, {decodeEntities: false});
        }
    };

    rp(options)
    .then(($) => {

        var result = $('result').text();
        //console.log(result);
        callback(null,result);


    })
    .catch((err) => {
        console.log(err);
        callback(err);
    });

}

function insertRelation(fa,fw,sw,rel_id,pseudo,w,rel_neg,callback){
    var url = windows1252.encode(url_ws+"?cmd=insert_rel&fa="+fa+"&n1="+fw+"&n2="+sw+"&t="+rel_id+"&w="+w+"&pseudo="+pseudo+"&rel_neg="+rel_neg);
    const options = {
        uri: url,
        encoding: 'binary',
        transform: function (body) {
            return cheerio.load(body, {decodeEntities: false});
        }
    };

    rp(options)
    .then(($) => {

        var result = $('result').text();
        callback(null,result);


    })
    .catch((err) => {
        console.log(err);
        callback(err);
    });
}

function isRelationInBDD(fw,sw,rel_id,fa,pseudo,callback){
    var url = windows1252.encode(url_ws+"?cmd=relation_exist&n1="+fw+"&n2="+sw+"&t="+rel_id+"&fa="+fa+"&pseudo="+pseudo);
    const options = {
        uri: url,
        encoding: 'binary',
        transform: function (body) {
            return cheerio.load(body, {decodeEntities: false});
        }
    };

    rp(options)
    .then(($) => {

        var result = $('result').text();
        var rel_neg =  $('rel_neg').text();
        console.log(result);
        console.log(rel_neg);
        callback(null,result,rel_neg);


    })
    .catch((err) => {
        console.log(err);
        callback(err);
    });
}

function activeDebugMode (pseudo,callback){
    var url = windows1252.encode(url_ws+"?cmd=active_debug&pseudo="+pseudo);
    const options = {
        uri: url,
        encoding: 'binary',
        transform: function (body) {
            return cheerio.load(body, {decodeEntities: false});
        }
    };

    rp(options)
    .then(($) => {

        var result = $('result').text();
        console.log(result);
        callback(null,result);


    })
    .catch((err) => {
        console.log(err);
        callback(err);
    });
}
function desactiveDebugMode(pseudo,callback){
    var url = windows1252.encode(url_ws+"?cmd=desactive_debug&pseudo="+pseudo);
    const options = {
        uri: url,
        encoding: 'binary',
        transform: function (body) {
            return cheerio.load(body, {decodeEntities: false});
        }
    };

    rp(options)
    .then(($) => {

        var result = $('result').text();
        callback(null,result);


    })
    .catch((err) => {
        console.log(err);
        callback(err);
    });
}

function isInDebugMode (pseudo,callback){
    var url = windows1252.encode(url_ws+"?cmd=is_in_debug&pseudo="+pseudo);
    const options = {
        uri: url,
        encoding: 'binary',
        transform: function (body) {
            return cheerio.load(body, {decodeEntities: false});
        }
    };

    rp(options)
    .then(($) => {

        var result = $('result').text();
        if (result=="false"){
            callback(null,false);
        }
        else {
            callback(null,true);
        }
    })
    .catch((err) => {
        console.log(err);
        callback(err);
    });
}

module.exports.insertUser = insertUser;
module.exports.insertUserPost = insertUserPost;
module.exports.insertRelation = insertRelation;
module.exports.isRelationInBDD = isRelationInBDD;
module.exports.desactiveDebugMode = desactiveDebugMode;
module.exports.activeDebugMode = activeDebugMode;
module.exports.isInDebugMode = isInDebugMode;
module.exports.getUserAdresse = getUserAdresse;
module.exports.getUserLastFaFw = getUserLastFaFw;
