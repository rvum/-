/**
 * Created by rvum on 2016/12/12.
 */
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('./mime').types;
var querystring = require('querystring');
var mysql = require('mysql');
var alasql =require('alasql');

console.log("http-server start!");
var server = http.createServer(function (req, res) {
    var mystyle = {
        headers:true
    };
    var pathname = req.url;
    console.log(pathname);
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: '210.45.*.*',
        user: 'root',
        password: '*********',
        database: 'world'
    });
    connection.connect();
    connection.query('select * from user',function(err,rows,fields){
        if(err) throw err;
        console.log("lkjdlkfjl");
        console.log(rows);
        // alasql('SELECT * INTO XLSXML("restest281b.xls",?) FROM ?',[mystyle,rows]);
    });
    // var rows = [{a:1, b:10, c:'One'}, {a:2, b:20, c:'Two'} ];
    // alasql('SELECT * INTO XLSXML("restest280b.xls",?) FROM ?',[mystyle,rows]);
    connection.end();
});
server.listen(8899);
process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack);
    var date = new Date();
    var time = date.getFullYear() + "/" + parseInt(date.getMonth() + 1) + "/" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    console.log(time);
});

