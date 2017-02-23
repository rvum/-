/**
 * Created by rvum on 2016/12/5.
 */

var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('./mime').types;
var querystring = require('querystring');
// var cookie = require('cookie');
var mysql = require('mysql');
var alasql = require('alasql');//用于将mysql数据转为excel表格导出
var formidable = require('formidable');//用于解析前端form表单文件数据
var postData = "";
var serverIP ="210.45.*.*";
var serverPasswd = "********"
/*var mysql = require('mysql');
 var connection = mysql.createConnection({
 host: serverIP,
 user: 'root',
 password: serverPasswd,
 database: 'zzb'
 });*/

console.log("http-server start!");
/**
 * 建立http服务器
 */
var server = http.createServer(function (req, res) {
    /**
     * 获取页面访问的路径（路由）及访问url的扩展名
     */
    var pathname = req.url;
    var extname = path.extname(pathname);
    extname = extname ? extname.slice(1) : 'unknown';
    console.log(pathname);

    /**
     * 格式化时间
     * @returns {string}
     */
    function getNowFormateDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        return (date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds());
    }

    /**
     * 路由是根目录跳转到登录
     */
    if (pathname == '/') {
        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
        res.writeHeader(200, {'Content-Type': 'text/html'});
        fs.createReadStream('./client/login.html').pipe(res);
        console.log("visit /  at: " + getNowFormateDate());
    }
    /**
     * 路由为favicon.ico
     */
    else if (pathname == "/favicon.ico") {
        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
        fs.createReadStream('./favicon.ico').pipe(res);
        console.log("visit favicon.ico  at: " + getNowFormateDate());
    }
    /**
     * 路由为robots.txt
     */
    else if (pathname == "/robots.txt") {
        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
        res.end("");
        console.log("visit robots.txt  at: " + getNowFormateDate());
    }
    /**
     * 管理员登录路由
     */
    else if (pathname == "/managerlogin/") {
        console.log("管理员登陆!");
        postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
        // 数据块接收中
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });

        req.addListener("end", function () {
            var oriData = querystring.parse(postData);
            // console.log("表单data:"+data);
            var managername = oriData.managername;
            var managerpassword = oriData.managerpassword;
            var data = {managername: managername, managerpassword: managerpassword};
            console.log(data);
            var mysql = require("mysql");
            var connection = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            // console.log("lkjlj");
            connection.connect();

            connection.query('select * from manage where ID=\"' + managername + '\" && Pwd=\"' + managerpassword + '\"',
                function (err, rows) {
                    console.log(rows);
                    if (err) throw err;
                    // var result1 = {code: 0};
                    var result2 = {code: 1};

                    console.log('The solution is: ', rows);
                    if (rows.length) {
                        console.log("登录成功");
                        var result = JSON.parse(JSON.stringify(rows));
                        result[0].code = 0;
                        // console.log(result);
                        /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                         httpOnly: false,
                         maxAge: 60 * 60 * 24 * 7 // 1 week
                         }));*/
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result));
                    } else {
                        console.log("登录失败！");
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result2));
                    }
                });
            connection.end();
            /*res.writeHead(500, {
             "Content-Type": "text/plain;charset=utf-8"
             });
             res.end("数据提交完毕");*/
        });
    }
    /**
     * 单位登录路由
     */
    else if (pathname == "/userlogin/") {
        console.log("单位登陆!");
        postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
        // 数据块接收中
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });

        req.addListener("end", function () {
            var oriData = querystring.parse(postData);
            // console.log("表单data:"+data);
            var managername = oriData.managername;
            var managerpassword = oriData.managerpassword;
            var data = {managername: managername, managerpassword: managerpassword};
            console.log(data);
            var mysql = require("mysql");
            var connection0 = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            connection0.connect();

            /*conn.query(SQL, function(err, rows, fields) {
             ALASQL('SELECT * INTO XLSXML("restest280b.xls",?) FROM ?',[mystyle,rows]);
             })*/
            // var mystyle = {
            //     headers:true,
            //     column: {style:{Font:{Bold:"1"}}},
            //     rows: {1:{style:{Font:{Color:"#FF0077"}}}},
            //     cells: {1:{1:{
            //         style: {Font:{Color:"#00FFFF"}}
            //     }}}
            // };

            connection0.query('select * from mscom where ID=\"' + managername + '\" && Pwd=\"' + managerpassword + '\"',
                function (err, rows) {
                    // alasql('SELECT * INTO XLSXML("restest280b.xls",?) FROM ?',[mystyle,rows]);
                    if (err) throw err;
                    // var result1 = {code: 0};
                    var result2 = {code: 1};

                    console.log('The solution is: ', rows);
                    if (rows.length) {
                        console.log("登录成功");
                        var result = JSON.parse(JSON.stringify(rows));
                        result[0].code = 0;
                        // console.log(result);
                        /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                         httpOnly: false,
                         maxAge: 60 * 60 * 24 * 7 // 1 week
                         }));*/
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result));
                    } else {
                        console.log("登录失败！");
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result2));
                    }
                });
            connection0.end();
            /*res.writeHead(500, {
             "Content-Type": "text/plain;charset=utf-8"
             });
             res.end("数据提交完毕");*/
        });
    }
    /**
     * 个人用户登录路由
     */
    else if (pathname == "/personlogin/") {
        console.log("个人登陆!");
        postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
        // 数据块接收中
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });

        req.addListener("end", function () {
            var oriData = querystring.parse(postData);
            // console.log("表单data:"+data);
            var managername = oriData.managername;
            var managerpassword = oriData.managerpassword;
            var data = {managername: managername, managerpassword: managerpassword};
            console.log(data);
            var mysql = require("mysql");
            var connection0 = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            connection0.connect();

            /*conn.query(SQL, function(err, rows, fields) {
             ALASQL('SELECT * INTO XLSXML("restest280b.xls",?) FROM ?',[mystyle,rows]);
             })*/
            // var mystyle = {
            //     headers:true,
            //     column: {style:{Font:{Bold:"1"}}},
            //     rows: {1:{style:{Font:{Color:"#FF0077"}}}},
            //     cells: {1:{1:{
            //         style: {Font:{Color:"#00FFFF"}}
            //     }}}
            // };

            connection0.query('select * from msuser where ID=\"' + managername + '\" && Pwd=\"' + managerpassword + '\"',
                function (err, rows) {
                    // alasql('SELECT * INTO XLSXML("restest280b.xls",?) FROM ?',[mystyle,rows]);
                    if (err) throw err;
                    // var result1 = {code: 0};
                    var result2 = {code: 1};

                    console.log('The solution is: ', rows);
                    if (rows.length) {
                        console.log("登录成功");
                        var result = JSON.parse(JSON.stringify(rows));
                        result[0].code = 0;
                        // console.log(result);
                        /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                         httpOnly: false,
                         maxAge: 60 * 60 * 24 * 7 // 1 week
                         }));*/
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result));
                    } else {
                        console.log("登录失败！");
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result2));
                    }
                });
            connection0.end();
            /*res.writeHead(500, {
             "Content-Type": "text/plain;charset=utf-8"
             });
             res.end("数据提交完毕");*/
        });
    }
    /**
     * 修改个人密码路由
     */
    else if (pathname == "/alterPwd0/") {
        console.log("修改个人密码");
        postData = "";
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });
        req.addListener("end", function () {
            var oriData = querystring.parse(postData);
            var id = oriData.ID, pwd = oriData["Pwd"];
            var connection = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            connection.query('update msuser SET Pwd=\"' + pwd + '\"' + 'where ID =\"' + id + '\"', function (err, rows) {
                console.log(rows);
                var result = JSON.parse(JSON.stringify(rows));
                var result1 = {code: 0};
                var result2 = {code: 1};
                if (result.affectedRows !== 0) {
                    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                    res.end(JSON.stringify(result1));
                } else {
                    console.log("修改失败！");
                    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                    res.end(JSON.stringify(result2));
                }
            });
            connection.end();
        })
    }
    /**
     * 修改单位密码路由
     */
    else if (pathname == "/alterPwd1/") {
        console.log("修改单位密码");
        postData = "";
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });
        req.addListener("end", function () {
            var oriData = querystring.parse(postData);
            var id = oriData.ID, pwd = oriData["Pwd"];
            var connection = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            connection.query('update mscom SET Pwd=\"' + pwd + '\"' + 'where ID =\"' + id + '\"', function (err, rows) {
                console.log(rows);
                var result = JSON.parse(JSON.stringify(rows));
                var result1 = {code: 0};
                var result2 = {code: 1};
                if (result.affectedRows !== 0) {
                    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                    res.end(JSON.stringify(result1));
                } else {
                    console.log("修改失败！");
                    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                    res.end(JSON.stringify(result2));
                }
            });
            connection.end();
        })
    }
    /**
     * 修改管理员密码
     */
    else if (pathname == "/alterPwd2/") {
        console.log("修改管理员密码");
        postData = "";
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });
        req.addListener("end", function () {
            var oriData = querystring.parse(postData);
            var id = oriData.ID, pwd = oriData["Pwd"];
            var connection = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            connection.query('update manage SET Pwd=\"' + pwd + '\"' + 'where ID =\"' + id + '\"', function (err, rows) {
                console.log(rows);
                var result = JSON.parse(JSON.stringify(rows));
                var result1 = {code: 0};
                var result2 = {code: 1};
                if (result.affectedRows !== 0) {
                    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                    res.end(JSON.stringify(result1));
                } else {
                    console.log("修改失败！");
                    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                    res.end(JSON.stringify(result2));
                }
            });
            connection.end();
        })
    }
    /**
     * 判断用户是否已经填写了index5-2.html中表格（校级领导班子意见建议）
     */
    else if(pathname == "/judgeFillOutD1/"){
        var postData="";
        result1={code:0};//代表没有相应数据，前端需要加载表格让用户填写
        result2={code:1};//代表在数据库中查询到了相应的数据，前端展示用户填写的数据
        var result3={code:2};//error
        req.addListener("data",function(chunk){
            postData+=chunk;
        });
        req.addListener("end",function(){
            var oriData = querystring.parse(postData);
            var partname = oriData["partname"],name = oriData["name"];
            var sql_connect = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            /*var sql_connect = mysql.createConnection({
                host:'localhost',
                user:'root',
                password:'newpassword',
                database:'zzb02'
            });*/
            sql_connect.query('select * from dataD1 where partname='+'\"'+partname+'\"',function(err,rows){
                console.log(rows);
                console.log(rows.length);
                if(err) {
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result3));//error
                }else if(rows.length){
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(rows));//display数据
                }else{
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result1));//显示表格
                }
            })
        });
    }
    /**
     *  判断用户是否已经填写了index5-3.html中表格（党政部门意见建议）
     */
    else if(pathname == "/judgeFillOutE1/"){
        postData="";
        result1={code:0};//代表没有相应数据，前端需要加载表格让用户填写
        result2={code:1};//代表在数据库中查询到了相应的数据，前端展示用户填写的数据
        result3={code:2};//error
        req.addListener("data",function(chunk){
            postData+=chunk;
        });
        req.addListener("end",function(){
            var oriData = querystring.parse(postData);
            var partname = oriData["partname"],name = oriData["name"];
            var sql_connect = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            /*var sql_connect = mysql.createConnection({
             host:'localhost',
             user:'root',
             password:'newpassword',
             database:'zzb02'
             });*/
            sql_connect.query('select * from dataE1 where partname='+'\"'+partname+'\"',function(err,rows){
                console.log(rows);
                console.log(rows.length);
                if(err) {
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result3));//error
                }else if(rows.length){
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(rows));//display数据
                }else{
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result1));//显示表格
                }
            })
        });
    }
    /**
     *
     */
    else if(pathname == "/judgeFillOutF1/"){
        postData="";
        result1={code:0};//代表没有相应数据，前端需要加载表格让用户填写
        result2={code:1};//代表在数据库中查询到了相应的数据，前端展示用户填写的数据
        result3={code:2};//error
        req.addListener("data",function(chunk){
            postData+=chunk;
        });
        req.addListener("end",function(){
            var oriData = querystring.parse(postData);
            var partname = oriData["partname"],name = oriData["name"];
            var sql_connect = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            /*var sql_connect = mysql.createConnection({
             host:'localhost',
             user:'root',
             password:'newpassword',
             database:'zzb02'
             });*/
            sql_connect.query('select * from dataF1 where partname='+'\"'+partname+'\"',function(err,rows){
                console.log(rows);
                console.log(rows.length);
                if(err) {
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result3));//error
                }else if(rows.length){
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(rows));//display数据
                }else{
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result1));//显示表格
                }
            })
        });
    }
    /**
     *
     */
    else if(pathname == "/judgeFillOutG1/"){
        postData="";
        result1={code:0};//代表没有相应数据，前端需要加载表格让用户填写
        result2={code:1};//代表在数据库中查询到了相应的数据，前端展示用户填写的数据
        result3={code:2};//error
        req.addListener("data",function(chunk){
            postData+=chunk;
        });
        req.addListener("end",function(){
            var oriData = querystring.parse(postData);
            var partname = oriData["partname"],name = oriData["name"];
            var sql_connect = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            /*var sql_connect = mysql.createConnection({
             host:'localhost',
             user:'root',
             password:'newpassword',
             database:'zzb02'
             });*/
            sql_connect.query('select * from dataG1 where partname='+'\"'+partname+'\"',function(err,rows){
                console.log(rows);
                console.log(rows.length);
                if(err) {
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result3));//error
                }else if(rows.length){
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(rows));//display数据
                }else{
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result1));//显示表格
                }
            })
        });
    }
    else if(pathname == "/judgeFillOutH1/"){
        postData="";
        result1={code:0};//代表没有相应数据，前端需要加载表格让用户填写
        result2={code:1};//代表在数据库中查询到了相应的数据，前端展示用户填写的数据
        result3={code:2};//error
        req.addListener("data",function(chunk){
            postData+=chunk;
        });
        req.addListener("end",function(){
            var oriData = querystring.parse(postData);
            var partname = oriData["partname"],name = oriData["name"];
            var sql_connect = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            /*var sql_connect = mysql.createConnection({
             host:'localhost',
             user:'root',
             password:'newpassword',
             database:'zzb02'
             });*/
            sql_connect.query('select * from dataH1 where partname='+'\"'+partname+'\"',function(err,rows){
                console.log(rows);
                console.log(rows.length);
                if(err) {
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result3));//error
                }else if(rows.length){
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(rows));//display数据
                }else{
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result1));//显示表格
                }
            })
        });
    }
    else if(pathname == "/judgeFillOutI1/"){
        postData="";
        result1={code:0};//代表没有相应数据，前端需要加载表格让用户填写
        result2={code:1};//代表在数据库中查询到了相应的数据，前端展示用户填写的数据
        result3={code:2};//error
        req.addListener("data",function(chunk){
            postData+=chunk;
        });
        req.addListener("end",function(){
            var oriData = querystring.parse(postData);
            var partname = oriData["partname"],name = oriData["name"];
            var sql_connect = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            /*var sql_connect = mysql.createConnection({
             host:'localhost',
             user:'root',
             password:'newpassword',
             database:'zzb02'
             });*/
            sql_connect.query('select * from dataI1 where partname='+'\"'+partname+'\"',function(err,rows){
                console.log(rows);
                console.log(rows.length);
                if(err) {
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result3));//error
                }else if(rows.length){
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(rows));//display数据
                }else{
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result1));//显示表格
                }
            })
        });
    }
    else if(pathname == "/judgeFillOutJ1/"){
        postData="";
        result1={code:0};//代表没有相应数据，前端需要加载表格让用户填写
        result2={code:1};//代表在数据库中查询到了相应的数据，前端展示用户填写的数据
        result3={code:2};//error
        req.addListener("data",function(chunk){
            postData+=chunk;
        });
        req.addListener("end",function(){
            var oriData = querystring.parse(postData);
            var partname = oriData["partname"],name = oriData["name"];
            var sql_connect = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            /*var sql_connect = mysql.createConnection({
             host:'localhost',
             user:'root',
             password:'newpassword',
             database:'zzb02'
             });*/
            sql_connect.query('select * from dataJ1 where partname='+'\"'+partname+'\"',function(err,rows){
                console.log(rows);
                console.log(rows.length);
                if(err) {
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result3));//error
                }else if(rows.length){
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(rows));//display数据
                }else{
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result1));//显示表格
                }
            })
        });
    }
    else if(pathname == "/judgeFillOutK1/"){
        postData="";
        result1={code:0};//代表没有相应数据，前端需要加载表格让用户填写
        result2={code:1};//代表在数据库中查询到了相应的数据，前端展示用户填写的数据
        result3={code:2};//error
        req.addListener("data",function(chunk){
            postData+=chunk;
        });
        req.addListener("end",function(){
            var oriData = querystring.parse(postData);
            var partname = oriData["partname"],name = oriData["name"];
            var sql_connect = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            /*var sql_connect = mysql.createConnection({
             host:'localhost',
             user:'root',
             password:'newpassword',
             database:'zzb02'
             });*/
            sql_connect.query('select * from dataK1 where partname='+'\"'+partname+'\"',function(err,rows){
                console.log(rows);
                console.log(rows.length);
                if(err) {
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result3));//error
                }else if(rows.length){
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(rows));//display数据
                }else{
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result1));//显示表格
                }
            })
        });
    }
    else if(pathname == "/judgeFillOutN1/"){
        postData="";
        result1={code:0};//代表没有相应数据，前端需要加载表格让用户填写
        result2={code:1};//代表在数据库中查询到了相应的数据，前端展示用户填写的数据
        result3={code:2};//error
        req.addListener("data",function(chunk){
            postData+=chunk;
        });
        req.addListener("end",function(){
            var oriData = querystring.parse(postData);
            var com = oriData["partname"],name = oriData["name"];
            var sql_connect = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            /*var sql_connect = mysql.createConnection({
             host:'localhost',
             user:'root',
             password:'newpassword',
             database:'zzb02'
             });*/
            sql_connect.query('select * from dataN1 where com='+'\"'+com+'\"',function(err,rows){
                console.log(rows);
                // console.log(rows.length);
                if(err) {
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result3));//error
                }else if(rows.length){
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(rows));//display数据
                }else{
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result1));//显示表格
                }
            })
        });
    }
    else if(pathname == "/judgeFillOutM1/"){
        postData="";
        result1={code:0};//代表没有相应数据，前端需要加载表格让用户填写
        result2={code:1};//代表在数据库中查询到了相应的数据，前端展示用户填写的数据
        result3={code:2};//error
        req.addListener("data",function(chunk){
            postData+=chunk;
        });
        req.addListener("end",function(){
            var oriData = querystring.parse(postData);
            var partname = oriData["partname"],name = oriData["name"];
            var sql_connect = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            /*var sql_connect = mysql.createConnection({
             host:'localhost',
             user:'root',
             password:'newpassword',
             database:'zzb02'
             });*/
            sql_connect.query('select * from dataM1 where name='+'\"'+name+'\"',function(err,rows){
                console.log(rows);
                console.log(rows.length);
                if(err) {
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result3));//error
                }else if(rows.length){
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(rows));//display数据
                }else{
                    res.writeHead(200,{
                        "Content-type":"application/json", "Access-Control-Allow-Origin": "*"
                    });
                    res.end(JSON.stringify(result1));//显示表格
                }
            })
        });
    }
    /**
     * index.html表一数据保存到数据库dataC1表
     */
    else if (pathname == "/dataSaveC1/") {
        console.log("c1数据提交!");
        postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
        // 数据块接收中
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });

        req.addListener("end", function () {
            var oriData = querystring.parse(postData);
            var c1 = oriData.c1, partname = oriData["partname"];
            var c2 = oriData.c2, c3 = oriData.c3, c4 = oriData.c4, c5 = oriData.c5, c6 = oriData.c6, c7 = oriData.c7;
            // var data = {managername : managername, managerpassword : managerpassword};
            console.log(c1);
            console.log(c7);
            console.log(partname);
            var connection = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
            // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
            connection.query('insert into dataC1 values(NULL,' + '\"' + partname + '\"' + ',' + c1 + ',' + c2 + ',' + c3 + ',' + c4 + ',' + c5 + ',' + c6 + ',' + c7 + ')'
                , function (err, rows) {
                    if (err) throw err;
                    var result1 = {code: 0};
                    var result2 = {code: 1};

                    console.log('The solution is: ', rows);
                    if (rows.length) {
                        console.log("登录成功");
                        /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                         httpOnly: false,
                         maxAge: 60 * 60 * 24 * 7 // 1 week
                         }));*/
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result1));
                    } else {
                        console.log("登录失败！");
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result2));
                    }
                });
            // connection.query('select * from ')
            connection.end();
        });
    }
    /**
     * index.html表二数据保存到数据库dataA1表
     */
    else if (pathname == "/dataSaveA1/") {
        console.log("a1数据提交!");
        postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
        // 数据块接收中
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });

        req.addListener("end", function () {
            var oriData = querystring.parse(postData);
            // console.log(oriData);
            var a1 = oriData.a1, partname = oriData["partname"];
            var a2 = oriData.a2, a3 = oriData.a3, a4 = oriData.a4, a5 = oriData.a5, a6 = oriData.a6, a7 = oriData.a7,
                a8 = oriData.a8, a9 = oriData.a9, a10 = oriData.a10, a11 = oriData.a11;
            // var data = {managername : managername, managerpassword : managerpassword};
            // console.log(a1);
            // console.log(a11);
            // console.log(partname);
            var connection = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
            // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
            connection.query('insert into dataA1 values(NULL,' + '\"' + partname + '\"' + ',' + a1 + ',' + a2 + ',' + a3 + ',' + a4 + ',' + a5 + ',' + a6 + ',' + a7 + ',' + a8 + ',' + a9 + ',' + a10 + ',' + '\"' + a11 + '\"' + ')'
                , function (err, rows) {
                    if (err) throw err;
                    var result1 = {code: 0};
                    var result2 = {code: 1};

                    console.log('The solution is: ', rows);
                    if (rows.length) {
                        console.log("登录成功");
                        /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                         httpOnly: false,
                         maxAge: 60 * 60 * 24 * 7 // 1 week
                         }));*/
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result1));
                    } else {
                        console.log("登录失败！");
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result2));
                    }
                });
            // connection.query('select * from ')
            connection.end();
        });
    }
    /**
     * index5-2.html对校级领导班子的意见建议表
     * 数据保存到dataD1表
     */
    else if (pathname == "/dataSaveD1/") {
        console.log("D1数据提交!");
        postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
        // 数据块接收中
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });
        result1 = {code: 0};
        result2 = {code: 1};

        req.addListener("end", function () {
            var oriData = querystring.parse(postData);
            // console.log(oriData);
            var sqlInsert;
            var partname = oriData["partname"];
            var table5_2ItemCount = oriData["table5_2ItemCount"];
            if (table5_2ItemCount == 0) {
                table5_2ItemCount = 1;
            }
            console.log(table5_2ItemCount);
            // res.end("end");
            // console.log(d11);
            // console.log(partname);
            var connection = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });

            for (var i = 0; i < table5_2ItemCount; i++) {
                var m = i + 1;
                sqlInsert = 'insert into dataD1 values(' + '\"' + partname + '\"' + ',' + '\"' + oriData["d" + m] + '\"' + ',' + '\"' + oriData["d" + m + "_1"] + '\"'  + ')';
                connection.query(sqlInsert
                    , function (err) {
                        if (err) {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result2));
                            throw err;
                        } else {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result1));
                        }
                    });
            }
            connection.end();
        });
    }
    /**
     * index5-2.html对校级领导班子的意见建议表
     * 数据保存到dataD1表
     */
    /*else if (pathname == "/dataSaveD1/") {
        console.log("d1数据提交!");
        postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
        // 数据块接收中
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });
        var result1 = {code: 0};
        var result2 = {code: 1};

        req.addListener("end", function () {
            var oriData = querystring.parse(postData);
            // console.log(oriData);
            var sqlInsert;
            var d1 = oriData.d1, partname = oriData["partname"];
            var d11 = oriData.d11, d2 = oriData.d2, d21 = oriData.d21, d3 = oriData.d3, d31 = oriData.d31;
            // console.log(d11);
            // console.log(partname);
            var connection = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            if (d1 == "" && d2 == "" && d3 == "") {
                sqlInsert = "";
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
            }
            if (d2 == "" && d1 !== "") {
                sqlInsert = 'insert into dataD1 values(' + '\"' + partname + '\"' + ',' + '\"' + d1 + '\"' + ',' + '\"' + d11 + '\"' + ')';
                connection.query(sqlInsert
                    , function (err) {
                        if (err) {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result2));
                            throw err;
                        }
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result1));
                    });
            }
            if (d3 == "" && d2 !== "" && d1 !== "") {
                sqlInsert = 'insert into dataD1 values(' + '\"' + partname + '\"' + ',' + '\"' + d1 + '\"' + ',' + '\"' + d11 + '\"' + ')';
                sqlInsert2 = 'insert into dataD1 values(' + '\"' + partname + '\"' + ',' + '\"' + d2 + '\"' + ',' + '\"' + d21 + '\"' + ')';
                connection.query(sqlInsert
                    , function (err) {
                        if (err) {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result2));
                            throw err;
                        }
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result1));
                    });
                connection.query(sqlInsert2
                    , function (err) {
                        if (err) {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result2));
                            throw err;
                        }
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result1));
                    });
            }
            if (d1 !== "" && d2 !== "" && d3 !== "") {
                sqlInsert = 'insert into dataD1 values(' + '\"' + partname + '\"' + ',' + '\"' + d1 + '\"' + ',' + '\"' + d11 + '\"' + ')';
                var sqlInsert2 = 'insert into dataD1 values(' + '\"' + partname + '\"' + ',' + '\"' + d2 + '\"' + ',' + '\"' + d21 + '\"' + ')';
                var sqlInsert3 = 'insert into dataD1 values(' + '\"' + partname + '\"' + ',' + '\"' + d3 + '\"' + ',' + '\"' + d31 + '\"' + ')';
                connection.query(sqlInsert
                    , function (err) {
                        if (err) {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result2));
                            throw err;
                        }
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result1));
                    });
                connection.query(sqlInsert2
                    , function (err) {
                        if (err) {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result2));
                            throw err;
                        }
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result1));
                    });
                connection.query(sqlInsert3
                    , function (err) {
                        if (err) {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result2));
                            throw err;
                        }
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result1));
                    });
            }

            // connection.query('select * from ')
            connection.end();
        });
    }*/
    /**
     * index5-3.html对党政部门的意见建议表
     * 数据保存到dataE1表
     */
    else if (pathname == "/dataSaveE1/") {
        console.log("d1数据提交!");
        postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
        // 数据块接收中
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });
        result1 = {code: 0};
        result2 = {code: 1};

        req.addListener("end", function () {
            var oriData = querystring.parse(postData);
            // console.log(oriData);
            var sqlInsert;
            var e1 = oriData.e1, partname = oriData["partname"];
            var e11 = oriData.e11;
            // console.log(d11);
            // console.log(partname);
            var connection = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            if (e1 !== "") {
                sqlInsert = 'insert into dataE1 values(' + '\"' + partname + '\"' + ',' + '\"' + e1 + '\"' + ',' + '\"' + e11 + '\"' + ')';
                connection.query(sqlInsert
                    , function (err) {
                        if (err) {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result2));
                            throw err;
                        }
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result1));
                    });
            }


            // connection.query('select * from ')
            connection.end();
        });
    }
    /**
     * index5-4.html对教学科研单位领导班子及成员的意见建议
     * 数据保存到dataF1表
     */
    else if (pathname == "/dataSaveF1/") {
        console.log("d1数据提交!");
        postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
        // 数据块接收中
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });
        result1 = {code: 0};
        result2 = {code: 1};

        req.addListener("end", function () {
            var oriData = querystring.parse(postData);
            // console.log(oriData);
            var sqlInsert;
            var f1 = oriData.f1, partname = oriData["partname"];
            var f11 = oriData.f11;
            // console.log(d11);
            // console.log(partname);
            var connection = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            if (f1 !== "") {
                sqlInsert = 'insert into dataF1 values(' + '\"' + partname + '\"' + ',' + '\"' + f1 + '\"' + ',' + '\"' + f11 + '\"' + ')';
                connection.query(sqlInsert
                    , function (err) {
                        if (err) {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result2));
                            throw err;
                        }
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result1));
                    });
            }

            // connection.query('select * from ')
            connection.end();
        });
    }
    /**
     * index5-5.html对直属附属单位领导班子及成员的意见建议
     * 数据保存到dataG1表
     */
    else if (pathname == "/dataSaveG1/") {
        console.log("d1数据提交!");
        postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
        // 数据块接收中
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });
        result1 = {code: 0};
        result2 = {code: 1};

        req.addListener("end", function () {
            var oriData = querystring.parse(postData);
            // console.log(oriData);
            var sqlInsert;
            var g1 = oriData.g1, partname = oriData["partname"];
            var g11 = oriData.g11;
            // console.log(d11);
            // console.log(partname);
            var connection = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            if (g1 !== "") {
                sqlInsert = 'insert into dataG1 values(' + '\"' + partname + '\"' + ',' + '\"' + g1 + '\"' + ',' + '\"' + g11 + '\"' + ')';
                connection.query(sqlInsert
                    , function (err) {
                        if (err) {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result2));
                            throw err;
                        }
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result1));
                    });
            }

            // connection.query('select * from ')
            connection.end();
        });
    }
    /**
     * index6.html民主生活会准备情况表
     * 数据保存到数据库dataH1表
     */
    else if (pathname == "/dataSaveH1/") {
        console.log("H1数据提交!");
        postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
        // 数据块接收中
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });
        result1 = {code: 0};
        result2 = {code: 1};

        req.addListener("end", function () {
            var oriData = querystring.parse(postData);
            // console.log(oriData);
            var sqlInsert;
            var h1 = oriData.h1, partname = oriData["partname"];
            var h2 = oriData.h2, h3 = oriData.h3, h4 = oriData.h4;
            // console.log(d11);
            // console.log(partname);
            var connection = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            sqlInsert = 'insert into dataH1 values(' + '\"' + partname + '\"' + ',' + '\"' + h1 + '\"' + ',' + '\"' + h2 + '\"' + ',' + '\"' + h3 + '\"' + ',' + '\"' + h4 + '\"' + ')';
            connection.query(sqlInsert
                , function (err) {
                    if (err) {
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result2));
                        throw err;
                    }
                    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                    res.end(JSON.stringify(result1));
                });

            // connection.query('select * from ')
            connection.end();
        });
    }
    /**
     * index7.html民主生活会召开情况表
     * 数据保存到数据库dataI1表
     */
    else if (pathname == "/dataSaveI1/") {
        console.log("I1数据提交!");
        postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
        // 数据块接收中
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });
        result1 = {code: 0};
        result2 = {code: 1};

        req.addListener("end", function () {
            var oriData = querystring.parse(postData);
            // console.log(oriData);
            var sqlInsert;
            var i1 = oriData.i1, partname = oriData["partname"];
            var i2 = oriData.i2, i3 = oriData.i3, i4 = oriData.i4, i5 = oriData.i5;
            // console.log(d11);
            // console.log(partname);
            // console.log(i1);
            var connection = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            sqlInsert = 'insert into dataI1 values(' + '\"' + partname + '\"' + ',' + '\"' + i1 + '\"' + ',' + '\"' + i2 + '\"' + ',' + i3 + ',' + '\"' + i4 + '\"' + ',' + '\"' + i5 + '\"' + ')';
            connection.query(sqlInsert
                , function (err) {
                    if (err) {
                        res.writeHead(200, {
                            "Content-type": "application/json",
                            "Access-Control-Allow-Origin": "*"
                        });
                        res.end(JSON.stringify(result2));
                        throw err;
                    }
                    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                    res.end(JSON.stringify(result1));
                });

            // connection.query('select * from ')
            connection.end();
        });
    }
    /**
     * index8.html生活困难党员、老党员基本情况登记表
     * 数据保存到数据库dataJ1表
     */
    else if (pathname == "/dataSaveJ1/") {
        console.log("J1数据提交!");
        postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
        // 数据块接收中
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });
        result1 = {code: 0};
        result2 = {code: 1};

        req.addListener("end", function () {
            var oriData = querystring.parse(postData);
            // console.log(oriData);
            var sqlInsert;
            var partname = oriData["partname"];
            var table8ItemCount = oriData["table8ItemCount"];
            if (table8ItemCount == 0) {
                table8ItemCount = 1;
            }
            console.log(table8ItemCount);
            // res.end("end");
            // console.log(d11);
            // console.log(partname);
            var connection = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });

            for (var i = 0; i < table8ItemCount; i++) {
                var m = i + 1;
                sqlInsert = 'insert into dataJ1 values(' + '\"' + partname + '\"' + ',' + '\"' + oriData["j" + m] + '\"' + ',' + '\"' + oriData["j" + m + "_2"] + '\"' + ',' + '\"' + oriData["j" + m + "_3"] + '\"' + ',' + '\"' + oriData["j" + m + "_4"] + '\"' + ',' + '\"' + oriData["j" + m + "_5"] + '\"' + ')';
                connection.query(sqlInsert
                    , function (err) {
                        if (err) {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result2));
                            throw err;
                        } else {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result1));
                        }
                    });
            }
            connection.end();
        });
    }
    /**
     * index9.html党员领导干部结对帮扶困难师生情况统计表
     * 数据保存到dataK1表
     */
    else if (pathname == "/dataSaveK1/") {
        console.log("K1数据提交!");
        postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
        // 数据块接收中
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });
        result1 = {code: 0};
        result2 = {code: 1};

        req.addListener("end", function () {
            var oriData = querystring.parse(postData);
            // console.log(oriData);
            var sqlInsert;
            var partname = oriData["partname"];
            var table9ItemCount = oriData["table9ItemCount"];
            if (table9ItemCount == 0) {
                table9ItemCount = 1;
            }
            console.log(table9ItemCount);
            // res.end("end");
            // console.log(d11);
            // console.log(partname);
            var connection = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });

            for (var i = 0; i < table9ItemCount; i++) {
                var m = i + 1;
                sqlInsert = 'insert into dataK1 values(' + '\"' + partname + '\"' + ',' + '\"' + oriData["k" + m] + '\"' + ',' + '\"' + oriData["k" + m + "_2"] + '\"' + ',' + '\"' + oriData["k" + m + "_3"] + '\"' + ',' + '\"' + oriData["k" + m + "_4"] + '\"' + ',' + '\"' + oriData["k" + m + "_5"] + '\"' + ',' + '\"' + oriData["k" + m + "_6"] + '\"' + ',' + '\"' + oriData["k" + m + "_7"] + '\"' + ')';
                connection.query(sqlInsert
                    , function (err) {
                        if (err) {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result2));
                            throw err;
                        } else {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result1));
                        }
                    });
            }
            connection.end();
        });
    }
    /**
     * person.html个人整改意见书数据保存到dataM1表
     */
    else if (pathname == "/dataSaveM1/") {
        console.log("M1数据提交!");
        postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
        // 数据块接收中
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });
        result1 = {code: 0};
        result2 = {code: 1};

        req.addListener("end", function () {
            var oriData = querystring.parse(postData);
            // console.log(oriData);
            var sqlInsert;
            var partname = oriData["partname"];
            var tablePersonItemCount = oriData["tablePersonItemCount"];
            if (tablePersonItemCount == 0) {
                tablePersonItemCount = 1;
            }
            console.log(tablePersonItemCount);
            // res.end("end");
            // console.log(d11);
            // console.log(partname);
            var connection = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });

            for (var i = 0; i < tablePersonItemCount; i++) {
                var m = i + 1;
                sqlInsert = 'insert into dataM1 values(' + '\"' + partname + '\"' + ',' + '\"' + oriData["m" + m] + '\"' + ',' + '\"' + oriData["m" + m + "_2"] + '\"' + ',' + '\"' + oriData["m" + m + "_3"] + '\"' + ')';
                connection.query(sqlInsert
                    , function (err) {
                        if (err) {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result2));
                            throw err;
                        } else {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result1));
                        }
                    });
            }
            connection.end();
        });
    }
    /**
     * index10.html单位整改意见书数据保存到dataN1表
     */
    else if (pathname == "/dataSaveN1/") {
        console.log("N1数据提交!");
        postData = ""; //POST & GET ：
        // 数据块接收中
        req.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
        });
        //成功返回{code: 0},失败返回{code: 1}
        result1 = {code: 0};
        result2 = {code: 1};

        req.addListener("end", function () {
            //获取前端传来的值
            var oriData = querystring.parse(postData);
            // console.log(oriData);
            var sqlInsert;
            var partname = oriData["partname"];
            //获取前端传来的表格数据有几组数组
            var tableComItemCount = oriData["tableComItemCount"];
            if (tableComItemCount == 0) {
                tableComItemCount = 1;
            }
            console.log(tableComItemCount);
            // res.end("end");
            // console.log(d11);
            // console.log(partname);
            //连接数据库配置
            var connection = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            //将前端的数据存入数据库中
            for (var i = 0; i < tableComItemCount; i++) {
                var m = i + 1;
                //拼接sql语句
                sqlInsert = 'insert into dataN1 values(' + '\"' + partname + '\"' + ',' + '\"' + oriData["n" + m] + '\"' + ',' + '\"' + oriData["n" + m + "_2"] + '\"' + ',' + '\"' + oriData["n" + m + "_3"] + '\"' + ')';
                connection.query(sqlInsert
                    , function (err) {
                        if (err) {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result2));
                            throw err;
                        } else {
                            res.writeHead(200, {
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            });
                            res.end(JSON.stringify(result1));
                        }
                    });
            }
            connection.end();
        });
    }
    /**
     * 处理index12.html中的上传文件，将文件名加时间戳后缀
     */
    else if(pathname == "/uploadFile/"  && req.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        // form.uploadDir = "/Users/rvum/WebstormProjects/zzb02";
        form.uploadDir = "C:\\上传文件夹\\";

        form.keepExtensions = true;
        // formidable.File({})
        form.on('file', function(field, file) {
            console.log(file.path);
            console.log(file.name);
            //rename the incoming file to the file's name
            if(file.name && file.name.split(".") && file.name.split(".").length !== 1){
                var extName = file.name.split(".")[1];
                var oriName = file.name.split(".")[0];
                fs.rename(file.path,form.uploadDir+oriName+'_'+new Date().getTime()+'.'+extName);
            }else{
                fs.rename(file.path, form.uploadDir+file.name +"_"+new Date().getTime());
            }
        });

        form.parse(req, function(err, fields, files) {
            res.writeHead(200, {'content-type': 'text/html', "Access-Control-Allow-Origin": "*"});
            res.end('<script>alert("success!");window.location.href="http://"'+serverIP+'":8898/index5.html"</script>');
        });
    }
    /**
     * manage.html表一信息汇总
     */
    else if (pathname == "/add1/") {
        var connection = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
        // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
        connection.query('select * from dataC1', function (err, rows) {
            if (err) throw err;
            // var result1 = {code: 0};
            var result2 = {code: 1};

            // console.log(rows);
            console.log("typeof rows: " + typeof(rows));
            console.log(JSON.stringify(rows));
            if (rows.length) {
                console.log("登录成功");
                /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                 httpOnly: false,
                 maxAge: 60 * 60 * 24 * 7 // 1 week
                 }));*/
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(rows));
            } else {
                console.log("登录失败！");
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
            }
        });
        // connection.query('select * from ')
        connection.end();

    }
    /**
     * manage.html表二信息汇总
     */
    else if (pathname == "/add2/") {
        var connection2 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
        // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
        connection2.query('select * from dataA1', function (err, rows) {
            if (err) throw err;
            // var result1 = {code: 0};
            var result2 = {code: 1};

            // console.log(rows);
            if (rows.length) {
                console.log("登录成功");
                /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                 httpOnly: false,
                 maxAge: 60 * 60 * 24 * 7 // 1 week
                 }));*/
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(rows));
            } else {
                console.log("登录失败！");
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
            }
        });
        // connection.query('select * from ')
        connection2.end();
    }
    /**
     * manage2.html民主生活会准备表汇总
     */
    else if (pathname == "/add5/") {
        //数据库连接配置并连接
        var connection5 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
        // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
        connection5.query('select * from dataH1', function (err, rows) {
            //rows为查询结果
            if (err) throw err;
            // var result1 = {code: 0};
            var result2 = {code: 1};

            // console.log(rows);
            if (rows.length) {
                console.log("登录成功");
                /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                 httpOnly: false,
                 maxAge: 60 * 60 * 24 * 7 // 1 week
                 }));*/
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(rows));
            } else {
                console.log("登录失败！");
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
            }
        });
        // connection.query('select * from ')
        connection5.end();
    }
    /**
     * manage2.html民主生活会准备表名单统计
     */
    else if (pathname == "/add6/") {
        var connection6 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
        // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
        connection6.query('select ID,Name,Depart from mscom where Depart not in (select partname from dataH1)', function (err, rows) {
            if (err) throw err;
            // var result1 = {code: 0};
            var result2 = {code: 1};

            // console.log(rows);
            if (rows.length) {
                console.log("登录成功");
                /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                 httpOnly: false,
                 maxAge: 60 * 60 * 24 * 7 // 1 week
                 }));*/
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(rows));
            } else {
                console.log("登录失败！");
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
            }
        });
        // connection.query('select * from ')
        connection6.end();
    }
    /**
     * manage2.html民主生活会开展表汇总
     */
    else if (pathname == "/add7/") {
        var connection7 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
        // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
        connection7.query('select * from dataI1', function (err, rows) {
            if (err) throw err;
            // var result1 = {code: 0};
            var result2 = {code: 1};

            // console.log(rows);
            if (rows.length) {
                console.log("登录成功");
                /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                 httpOnly: false,
                 maxAge: 60 * 60 * 24 * 7 // 1 week
                 }));*/
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(rows));
            } else {
                console.log("登录失败！");
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
            }
        });
        // connection.query('select * from ')
        connection7.end();
    }
    /**
     * manage2.html民主生活会开展名单统计
     */
    else if (pathname == "/add8/") {
        var connection8 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
        // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
        connection8.query('select ID,Name,Depart  from mscom where Depart not in (select partname from dataI1)', function (err, rows) {
            if (err) throw err;
            // var result1 = {code: 0};
            var result2 = {code: 1};

            // console.log(rows);
            if (rows.length) {
                console.log("登录成功");
                /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                 httpOnly: false,
                 maxAge: 60 * 60 * 24 * 7 // 1 week
                 }));*/
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(rows));
            } else {
                console.log("登录失败！");
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
            }
        });
        // connection.query('select * from ')
        connection8.end();
    }
    /**
     * manage2.html单位整改任务书汇总
     */
    else if (pathname == "/add9/") {
        var connection9 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
        // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
        connection9.query('select * from dataN1', function (err, rows) {
            if (err) throw err;
            // var result1 = {code: 0};
            var result2 = {code: 1};

            // console.log(rows);
            if (rows.length) {
                console.log("登录成功");
                /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                 httpOnly: false,
                 maxAge: 60 * 60 * 24 * 7 // 1 week
                 }));*/
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(rows));
            } else {
                console.log("登录失败！");
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
            }
        });
        // connection.query('select * from ')
        connection9.end();
    }
    /**
     * manage2.html单位整改任务书名单统计
     */
    else if (pathname == "/add10/") {
        var connection10 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
        // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
        connection10.query('select ID,Name,Depart  from mscom where Depart not in (select com from dataN1)', function (err, rows) {
            if (err) throw err;
            // var result1 = {code: 0};
            var result2 = {code: 1};

            // console.log(rows);
            if (rows.length) {
                console.log("登录成功");
                /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                 httpOnly: false,
                 maxAge: 60 * 60 * 24 * 7 // 1 week
                 }));*/
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(rows));
            } else {
                console.log("登录失败！");
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
            }
        });
        // connection.query('select * from ')
        connection10.end();
    }
    /**
     * manage2.html个人整改任务书汇总
     */
    else if (pathname == "/add11/") {
        var connection11 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
        // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
        connection11.query('select * from dataM1', function (err, rows) {
            if (err) throw err;
            // var result1 = {code: 0};
            var result2 = {code: 1};
            // console.log(rows);
            if (rows.length) {
                console.log("登录成功");
                /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                 httpOnly: false,
                 maxAge: 60 * 60 * 24 * 7 // 1 week
                 }));*/
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(rows));
            } else {
                console.log("登录失败！");
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
            }
        });
        // connection.query('select * from ')
        connection11.end();
    }
    /**
     * manage2.html个人整改任务书名单统计
     */
    else if (pathname == "/add12/") {
        var connection12 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
        // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
        connection12.query('select ID,Name,Depart  from msuser where Name not in (select name from dataM1)', function (err, rows) {
            if (err) throw err;
            // var result1 = {code: 0};
            var result2 = {code: 1};

            // console.log(rows);
            if (rows.length) {
                console.log("登录成功");
                /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                 httpOnly: false,
                 maxAge: 60 * 60 * 24 * 7 // 1 week
                 }));*/
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(rows));
            } else {
                console.log("登录失败！");
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
            }
        });
        // connection.query('select * from ')
        connection12.end();
    }
    /**
     * manage2.html征求意见汇总
     */
    else if (pathname == "/add13/") {
        var connection13 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        // var result1 = {code: 0};
        result2 = {code: 1};
        // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
        // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
        connection13.query('(select * from dataD1) union all (select * from dataE1) union all (select * from dataF1) union all (select * from dataG1)', function (err, rows) {
            if (err) {
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
                throw err;
            }

            // console.log(rows);
            if (rows.length) {
                console.log("登录成功");
                /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                 httpOnly: false,
                 maxAge: 60 * 60 * 24 * 7 // 1 week
                 }));*/
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(rows));
            } else {
                console.log("登录失败！");
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
            }
        });

        // connection.query('select * from ')
        connection13.end();
    }
    /**
     * manage2.html征求意见汇总统计表
     */
    else if (pathname == "/add14/") {
        var connection14 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
        // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
        connection14.query('select ID,Name,Depart  from mscom where (Depart not in (select partname from dataD1)) && (Depart not in (select partname from dataE1)) && (Depart not in (select partname from dataF1)) && (Depart not in (select partname from dataG1)) ', function (err, rows) {
            if (err) throw err;
            // var result1 = {code: 0};
            var result2 = {code: 1};

            // console.log(rows);
            if (rows.length) {
                console.log("登录成功");
                /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                 httpOnly: false,
                 maxAge: 60 * 60 * 24 * 7 // 1 week
                 }));*/
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(rows));
            } else {
                console.log("登录失败！");
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
            }
        });
        // connection.query('select * from ')
        connection14.end();
    }
    /**
     * manage2.html生活困难党员、老党员基本情况汇总
     */
    else if (pathname == "/add15/") {
        var connection15 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
        // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
        connection15.query('select * from dataJ1', function (err, rows) {
            if (err) throw err;
            // var result1 = {code: 0};
            var result2 = {code: 1};

            // console.log(rows);
            if (rows.length) {
                console.log("登录成功");
                /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                 httpOnly: false,
                 maxAge: 60 * 60 * 24 * 7 // 1 week
                 }));*/
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(rows));
            } else {
                console.log("登录失败！");
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
            }
        });
        // connection.query('select * from ')
        connection15.end();
    }
    /**
     * manage2.html生活困难党员、老党员基本情况统计
     */
    else if (pathname == "/add16/") {
        var connection16 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
        // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
        connection16.query('select ID,Name,Depart  from mscom where Depart not in (select partname from dataJ1)', function (err, rows) {
            if (err) throw err;
            // var result1 = {code: 0};
            var result2 = {code: 1};

            // console.log(rows);
            if (rows.length) {
                console.log("登录成功");
                /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                 httpOnly: false,
                 maxAge: 60 * 60 * 24 * 7 // 1 week
                 }));*/
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(rows));
            } else {
                console.log("登录失败！");
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
            }
        });
        // connection.query('select * from ')
        connection16.end();
    }
    /**
     * manage2.html党员领导干部结对帮扶困难师生情况汇总
     */
    else if (pathname == "/add17/") {
        var connection17 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
        // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
        connection17.query('select * from dataK1', function (err, rows) {
            if (err) throw err;
            // var result1 = {code: 0};
            var result2 = {code: 1};

            // console.log(rows);
            if (rows.length) {
                console.log("登录成功");
                /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                 httpOnly: false,
                 maxAge: 60 * 60 * 24 * 7 // 1 week
                 }));*/
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(rows));
            } else {
                console.log("登录失败！");
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
            }
        });
        // connection.query('select * from ')
        connection17.end();
    }
    /**
     * manage2.html民主生活会开展名单统计
     */
    else if (pathname == "/add18/") {
        var connection18 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
        // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
        connection18.query('select ID,Name,Depart  from mscom where Depart not in (select partname from dataK1)', function (err, rows) {
            if (err) throw err;
            // var result1 = {code: 0};
            var result2 = {code: 1};

            // console.log(rows);
            if (rows.length) {
                console.log("登录成功");
                /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                 httpOnly: false,
                 maxAge: 60 * 60 * 24 * 7 // 1 week
                 }));*/
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(rows));
            } else {
                console.log("登录失败！");
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
            }
        });
        // connection.query('select * from ')
        connection18.end();
    }
    /**
     * index11.html
     */
    else if (pathname == "/getSuggest/") {
        postData="";
        req.addListener("data",function(chunk){
            postData+=chunk;
        });
        req.addListener("end",function(){
            var oriData = querystring.parse(postData);
            var partname = oriData["partname"];
            console.log(partname);
            var connect_suggest = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            // var result1 = {code: 0};
            result2 = {code: 1};
            // insert into dataC1 values(NULL,"zuzhibu",1,2,3,4,5,6,7);
            // 'insert into dataC1 values(NULL,'+string(partname)+','+string(c1)+','+string(c2)+','+string(c3)+','+string(c4)+','+string(c5)+','+string(c6)+','+string(c7)
            connect_suggest.query('(select suggest from dataD1 where suggestObj='+'\"'+partname+'\"'+') union (select suggest from dataE1 where suggestObj='+'\"'+partname+'\"'+') union (select suggest from dataF1 where suggestObj='+'\"'+partname+'\"'+') union (select suggest from dataG1 where suggestObj='+'\"'+partname+'\"'+')'
                , function (err, rows) {
                if (err) {
                    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                    res.end(JSON.stringify(result2));
                    throw err;
                }

                console.log(rows);
                if (rows.length) {
                    console.log("登录成功");
                    /*res.setHeader('Set-Cookie', cookie.serialize(String(managername), String(managerpassword), {
                     httpOnly: false,
                     maxAge: 60 * 60 * 24 * 7 // 1 week
                     }));*/
                    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                    res.end(JSON.stringify(rows));
                } else {
                    console.log("登录失败！");
                    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                    res.end(JSON.stringify(result2));
                }
            });

            // connection.query('select * from ')
            connect_suggest.end();
        });

    }
    /**
     * manage.html
     */
    else if (pathname == "/downloadTable1/") {
        var connection3 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        connection3.connect();
        connection3.query('select partname,c1,c2,c3,c4,c5,c6,c7 from dataC1', function (err, rows) {
            // var da = rows.replace();
            // var data = JSON.stringify(rows);
            // data:[{"id":1,"partname":"zuzhibu","c1":1,"c2":2,"c3":3,"c4":4,"c5":5,"c6":6,"c7":7},{"id":2,
            // "partname":"zuzhibu001","c1":1,"c2":2,"c3":2,"c4":3,"c5":3,"c6":3,"c7":4},{"id":3,"partname":"zuzhibu001",
            // "c1":1,"c2":2,"c3":2,"c4":3,"c5":3,"c6":3,"c7":4},{"id":4,"partname":"zuzhibu001","c1":1,"c2":111,"c3":222,
            // "c4":333,"c5":4,"c6":5,"c7":777},{"id":5,"partname":"zuzhibu001","c1":1,"c2":111,"c3":222,"c4":333,"c5":4,
            // "c6":5,"c7":777},{"id":6,"partname":"zuzhibu001","c1":1,"c2":111,"c3":222,"c4":333,"c5":4,"c6":5,"c7":777},
            // {"id":7,"partname":"zuzhibu001","c1":1,"c2":111,"c3":222,"c4":333,"c5":4,"c6":5,"c7":777}]
            /*s = s.replace(/\b(my|is|can)\b/g, function($0, $1) {
             return {
             "my": "his"
             , "is": "was"
             , "can": "could"
             }[$1];
             });*/
            // var dat = data.replace(/partname/g,"部门");
            console.log(rows.length);
            /*var  data = JSON.stringify(rows).replace(/\b(partname|c1|c2|c3|c4|c5|c6|c7)\b/g,function(match,p1){
             return {
             "partname":"所属部门",
             "c1":"慰问党费配套（元）",
             "c2":"慰问党费配套（元）",
             "c3":"其中：慰问建国前入党的老党员（人)",
             "c4":"帮助解决生产生活困难（个）",
             "c5":"帮助解决生产生活困难（个）",
             "c6":"听取工作意见建议（条）",
             "c7":"参加慰问的领导干部人数（人）"
             }[p1];
             });
             var excelData = JSON.stringify(data);
             var arr = excelData.replace(/}(,){/,"#").split("#");
             for(var i=0;i<arr.length;i++){
             arr[i] = json.parse(arr[i]);//转为对象
             }*/

            //利用alasql库，将数据库的数据转化为excel表格
            for (var i = 0; i < rows.length; i++) {
                rows[i]["所属部门"] = rows[i]["partname"];
                rows[i]["慰问党费配套（元）"] = rows[i]["c1"];
                rows[i]["慰问人数合计（人）"] = rows[i]["c2"];
                rows[i]["其中：慰问建国前入党的老党员（人）	"] = rows[i]["c3"];
                rows[i]["其中：慰问生活困难党员（人)"] = rows[i]["c4"];
                rows[i]["帮助解决生产生活困难（个）"] = rows[i]["c5"];
                rows[i]["听取工作意见建议（条）"] = rows[i]["c6"];
                rows[i]["参加慰问的领导干部人数（人）"] = rows[i]["c7"];
                delete rows[i]["partname"];
                delete rows[i]["c1"];
                delete rows[i]["c2"];
                delete rows[i]["c3"];
                delete rows[i]["c4"];
                delete rows[i]["c5"];
                delete rows[i]["c6"];
                delete rows[i]["c7"];
            }
            var mystyle = {
                headers: true,
                column: {style: {Font: {Bold: "1"}}}
            };
            alasql('SELECT * INTO XLSXML("table1.xls",?) FROM ?', [mystyle, rows]);
        });
        connection3.end();
        res.end();
    }
    /**
     * manage.html
     */
    else if (pathname == "/downloadTable2/") {
        var connection4 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        connection4.connect();
        connection4.query('select partname,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10 from dataA1', function (err, rows) {
            for (var i = 0; i < rows.length; i++) {
                rows[i]["所属部门"] = rows[i]["partname"];
                rows[i]["学习习近平总书记“七一”讲话精神情况-党委（党组）中心组研讨次数"] = rows[i]["a1"];
                rows[i]["学习习近平总书记“七一”讲话精神情况-党支部学习讨论次数"] = rows[i]["a2"];
                rows[i]["坚持边学边查、立行立改情况-查找问题数"] = rows[i]["a3"];
                rows[i]["坚持边学边查、立行立改情况-整改问题数"] = rows[i]["a4"];
                rows[i]["党员领导干部在所在支部讲党课情况-讲党课数"] = rows[i]["a5"];
                rows[i]["党员领导干部在所在支部讲党课情况-听党课人数"] = rows[i]["a6"];
                rows[i]["支部书记在所在支部讲党课情况-讲党课数"] = rows[i]["a7"];
                rows[i]["支部书记在所在支部讲党课情况-听党课人数"] = rows[i]["a8"];
                rows[i]["组织党员实地接收革命传统教育情况-批次"] = rows[i]["a9"];
                rows[i]["支部书记在所在支部讲党课情况-党员参加人数"] = rows[i]["a10"];
                delete rows[i]["partname"];
                delete rows[i]["a1"];
                delete rows[i]["a2"];
                delete rows[i]["a3"];
                delete rows[i]["a4"];
                delete rows[i]["a5"];
                delete rows[i]["a6"];
                delete rows[i]["a7"];
                delete rows[i]["a8"];
                delete rows[i]["a9"];
                delete rows[i]["a10"];
            }
            var mystyle = {
                headers: true,
                column: {style: {Font: {Bold: "1"}}}
            };
            alasql('SELECT * INTO XLSXML("table2.xls",?) FROM ?', [mystyle, rows]);
        });
        connection4.end();
        res.end();
    }
    /**
     * manage.html
     */
    else if (pathname == "/downloadTable3/") {
        var conn3 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        conn3.connect();
        conn3.query('select partname,a11 from dataA1', function (err, rows) {
            for (var i = 0; i < rows.length; i++) {
                rows[i]["单位名称"] = rows[i]["partname"];
                rows[i]["特色做法"] = rows[i]["a11"];
                delete rows[i]["partname"];
                delete rows[i]["a11"];
            }
            var mystyle = {
                headers: true,
                column: {style: {Font: {Bold: "1"}}}
            };
            alasql('SELECT * INTO XLSXML("table3.xls",?) FROM ?', [mystyle, rows]);
        });
        conn3.end();
        res.end();
    }
    /**
     * manage2.html民主生活会准备情况汇总
     */
    else if (pathname == "/downloadTable5/") {
        console.log("downloadTable5");
        var conn5 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        conn5.connect();

        //将数据库数据转化为excel表格
        conn5.query('select * from dataH1', function (err, rows) {
            var result1 = {code: 0};
            var result2 = {code: 1};
            if (err) {
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
                throw err;
            }
            //调整数据库列名，用语义化词语代替，显示为excel中列名
            for (var i = 0; i < rows.length; i++) {
                rows[i]["单位名称"] = rows[i]["partname"];
                rows[i]["会议时间"] = rows[i]["time"];
                rows[i]["会议地点"] = rows[i]["place"];
                rows[i]["参加校领导"] = rows[i]["leader"];
                rows[i]["征求意见情况"] = rows[i]["suggest"];
                delete rows[i]["partname"];
                delete rows[i]["time"];
                delete rows[i]["place"];
                delete rows[i]["leader"];
                delete rows[i]["suggest"];
            }
            //alasql库配置，字体加粗，显示头部（列名）
            var mystyle = {
                headers: true,
                column: {style: {Font: {Bold: "1"}}}
            };
            alasql('SELECT * INTO XLSXML("table5.xls",?) FROM ?', [mystyle, rows]);
            res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
            res.end(JSON.stringify(result1));
        });
        conn5.end();
    }
    /**
     * manage2.html民主生活会准备情况名单统计
     */
    else if (pathname == "/downloadTable6/") {
        console.log("downloadTable6");
        var conn6 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        conn6.connect();
        conn6.query('select ID,Name,Depart  from mscom where Depart not in (select partname from dataH1)', function (err, rows) {
            var result1 = {code: 0};
            var result2 = {code: 1};
            if (err) {
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
                throw err;
            }
            for (var i = 0; i < rows.length; i++) {
                rows[i]["工号"] = rows[i]["ID"];
                rows[i]["姓名"] = rows[i]["Name"];
                rows[i]["部门"] = rows[i]["Depart"];
                delete rows[i]["ID"];
                delete rows[i]["Name"];
                delete rows[i]["Depart"];
            }
            var mystyle = {
                headers: true,
                column: {style: {Font: {Bold: "1"}}}
            };
            alasql('SELECT * INTO XLSXML("table6.xls",?) FROM ?', [mystyle, rows]);
            res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
            res.end(JSON.stringify(result1));
        });
        conn6.end();
    }
    /**
     * manage2.html民主生活会召开情况汇总
     */
    else if (pathname == "/downloadTable7/") {
        var conn7 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        conn7.connect();
        conn7.query('select * from dataI1', function (err, rows) {
            var result1 = {code: 0};
            var result2 = {code: 1};
            if (err) {
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
                throw err;
            }
            for (var i = 0; i < rows.length; i++) {
                rows[i]["单位名称"] = rows[i]["partname"];
                rows[i]["会议时间"] = rows[i]["time"];
                rows[i]["会议地点"] = rows[i]["place"];
                rows[i]["参加处级干部数"] = rows[i]["chuji"];
                rows[i]["参加校领导"] = rows[i]["leader"];
                rows[i]["征求意见情况"] = rows[i]["suggest"];
                delete rows[i]["partname"];
                delete rows[i]["time"];
                delete rows[i]["place"];
                delete rows[i]["chuji"];
                delete rows[i]["leader"];
                delete rows[i]["suggest"];
            }
            var mystyle = {
                headers: true,
                column: {style: {Font: {Bold: "1"}}}
            };
            alasql('SELECT * INTO XLSXML("table7.xls",?) FROM ?', [mystyle, rows]);
            res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
            res.end(JSON.stringify(result1));
        });
        conn7.end();
    }
    /**
     * manage2.html民主生活会开展名单统计
     */
    else if (pathname == "/downloadTable8/") {
        var conn8 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        conn8.connect();
        conn8.query('select ID,Name,Depart  from mscom where Depart not in (select partname from dataI1)', function (err, rows) {
            var result1 = {code: 0};
            var result2 = {code: 1};
            if (err) {
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
                throw err;
            }
            for (var i = 0; i < rows.length; i++) {
                rows[i]["工号"] = rows[i]["ID"];
                rows[i]["姓名"] = rows[i]["Name"];
                rows[i]["部门"] = rows[i]["Depart"];
                delete rows[i]["ID"];
                delete rows[i]["Name"];
                delete rows[i]["Depart"];
            }
            var mystyle = {
                headers: true,
                column: {style: {Font: {Bold: "1"}}}
            };
            alasql('SELECT * INTO XLSXML("table8.xls",?) FROM ?', [mystyle, rows]);
            res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
            res.end(JSON.stringify(result1));
        });
        conn8.end();
    }
    /**
     * manage2.html单位整改任务书汇总
     */
    else if (pathname == "/downloadTable9/") {
        console.log("downloadTable9");
        var conn9 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        conn9.connect();
        conn9.query('select * from dataN1', function (err, rows) {
            var result1 = {code: 0};
            var result2 = {code: 1};
            if (err) {
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
                throw err;
            }
            for (var i = 0; i < rows.length; i++) {
                rows[i]["单位名称"] = rows[i]["com"];
                rows[i]["整改项目"] = rows[i]["project"];
                rows[i]["整改任务"] = rows[i]["task"];
                rows[i]["完成时限"] = rows[i]["finishTime"];
                delete rows[i]["com"];
                delete rows[i]["project"];
                delete rows[i]["task"];
                delete rows[i]["finishTime"];
            }
            var mystyle = {
                headers: true,
                column: {style: {Font: {Bold: "1"}}}
            };
            alasql('SELECT * INTO XLSXML("table9.xls",?) FROM ?', [mystyle, rows]);
            res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
            res.end(JSON.stringify(result1));
        });
        conn9.end();
    }
    /**
     * manage2.html单位整改任务书名单统计
     */
    else if (pathname == "/downloadTable10/") {
        console.log("downloadTable10");
        var conn10 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        conn10.connect();
        conn10.query('select ID,Name,Depart  from mscom where Depart not in (select com from dataN1)', function (err, rows) {
            var result1 = {code: 0};
            var result2 = {code: 1};
            if (err) {
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
                throw err;
            }
            for (var i = 0; i < rows.length; i++) {
                rows[i]["工号"] = rows[i]["ID"];
                rows[i]["姓名"] = rows[i]["Name"];
                rows[i]["部门"] = rows[i]["Depart"];
                delete rows[i]["ID"];
                delete rows[i]["Name"];
                delete rows[i]["Depart"];
            }
            var mystyle = {
                headers: true,
                column: {style: {Font: {Bold: "1"}}}
            };
            alasql('SELECT * INTO XLSXML("table10.xls",?) FROM ?', [mystyle, rows]);
            res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
            res.end(JSON.stringify(result1));
        });
        conn10.end();
    }
    /**
     * manage2.html个人整改任务书汇总
     */
    else if (pathname == "/downloadTable11/") {
        var conn11 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        conn11.connect();
        conn11.query('select * from dataM1', function (err, rows) {
            var result1 = {code: 0};
            var result2 = {code: 1};
            if (err) {
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
                throw err;
            }
            for (var i = 0; i < rows.length; i++) {
                rows[i]["姓名"] = rows[i]["name"];
                rows[i]["整改项目"] = rows[i]["project"];
                rows[i]["整改任务"] = rows[i]["task"];
                rows[i]["完成时限"] = rows[i]["finishTime"];
                delete rows[i]["name"];
                delete rows[i]["project"];
                delete rows[i]["task"];
                delete rows[i]["finishTime"];
            }
            var mystyle = {
                headers: true,
                column: {style: {Font: {Bold: "1"}}}
            };
            alasql('SELECT * INTO XLSXML("table11.xls",?) FROM ?', [mystyle, rows]);
            res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
            res.end(JSON.stringify(result1));
        });
        conn11.end();
    }
    /**
     * manage2.html个人整改任务书名单统计
     */
    else if (pathname == "/downloadTable12/") {
        var conn12 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        conn12.connect();
        conn12.query('select ID,Name,Depart  from msuser where Name not in (select name from dataM1)', function (err, rows) {
            var result1 = {code: 0};
            var result2 = {code: 1};
            if (err) {
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
                throw err;
            }
            for (var i = 0; i < rows.length; i++) {
                rows[i]["工号"] = rows[i]["ID"];
                rows[i]["姓名"] = rows[i]["Name"];
                rows[i]["部门"] = rows[i]["Depart"];
                delete rows[i]["ID"];
                delete rows[i]["Name"];
                delete rows[i]["Depart"];
            }
            var mystyle = {
                headers: true,
                column: {style: {Font: {Bold: "1"}}}
            };
            alasql('SELECT * INTO XLSXML("table12.xls",?) FROM ?', [mystyle, rows]);
            res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
            res.end(JSON.stringify(result1));
        });
        conn12.end();
    }
    /**
     * manage2.html征求意见汇总
     */
    else if (pathname == "/downloadTable13/") {
        console.log("downloadTable5");
        var conn13 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        conn13.connect();
        conn13.query('(select * from dataD1) union all (select * from dataE1) union all (select * from dataF1) union all (select * from dataG1)', function (err, rows) {
            var result1 = {code: 0};
            var result2 = {code: 1};
            if (err) {
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
                throw err;
            }
            for (var i = 0; i < rows.length; i++) {
                rows[i]["单位名称"] = rows[i]["partname"];
                rows[i]["意见建议对象单位"] = rows[i]["suggestObj"];
                rows[i]["意见建议"] = rows[i]["suggest"];
                delete rows[i]["partname"];
                delete rows[i]["suggestObj"];
                delete rows[i]["suggest"];
            }
            var mystyle = {
                headers: true,
                column: {style: {Font: {Bold: "1"}}}
            };
            alasql('SELECT * INTO XLSXML("table13.xls",?) FROM ?', [mystyle, rows]);
            res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
            res.end(JSON.stringify(result1));
        });
        conn13.end();
    }
    /**
     * manage2.html征求意见汇总统计表
     */
    else if (pathname == "/downloadTable14/") {
        console.log("downloadTable6");
        var conn14 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        conn14.connect();
        conn14.query('select ID,Name,Depart  from mscom where (Depart not in (select partname from dataD1)) && (Depart not in (select partname from dataE1)) && (Depart not in (select partname from dataF1)) && (Depart not in (select partname from dataG1)) ', function (err, rows) {
            var result1 = {code: 0};
            var result2 = {code: 1};
            if (err) {
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
                throw err;
            }
            for (var i = 0; i < rows.length; i++) {
                rows[i]["工号"] = rows[i]["ID"];
                rows[i]["姓名"] = rows[i]["Name"];
                rows[i]["部门"] = rows[i]["Depart"];
                delete rows[i]["ID"];
                delete rows[i]["Name"];
                delete rows[i]["Depart"];
            }
            var mystyle = {
                headers: true,
                column: {style: {Font: {Bold: "1"}}}
            };
            alasql('SELECT * INTO XLSXML("table14.xls",?) FROM ?', [mystyle, rows]);
            res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
            res.end(JSON.stringify(result1));
        });
        conn14.end();
    }
    /**
     * manage2.html生活困难党员、老党员基本情况汇总
     */
    else if (pathname == "/downloadTable15/") {
        var conn15 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        conn15.connect();
        conn15.query('select * from dataJ1', function (err, rows) {
            var result1 = {code: 0};
            var result2 = {code: 1};
            if (err) {
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
                throw err;
            }
            for (var i = 0; i < rows.length; i++) {
                rows[i]["单位名称"] = rows[i]["partname"];
                rows[i]["姓名"] = rows[i]["name"];
                rows[i]["出生年月"] = rows[i]["born"];
                rows[i]["入党时间"] = rows[i]["partyTime"];
                rows[i]["困难党员、老党员基本情况"] = rows[i]["state"];
                rows[i]["备注"] = rows[i]["other"];
                delete rows[i]["partname"];
                delete rows[i]["name"];
                delete rows[i]["born"];
                delete rows[i]["partyTime"];
                delete rows[i]["state"];
                delete rows[i]["other"];
            }
            var mystyle = {
                headers: true,
                column: {style: {Font: {Bold: "1"}}}
            };
            alasql('SELECT * INTO XLSXML("table15.xls",?) FROM ?', [mystyle, rows]);
            res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
            res.end(JSON.stringify(result1));
        });
        conn15.end();
    }
    /**
     * manage2.html生活困难党员、老党员基本情况统计
     */
    else if (pathname == "/downloadTable16/") {
        var conn16 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        conn16.connect();
        conn16.query('select ID,Name,Depart  from mscom where Depart not in (select partname from dataJ1)', function (err, rows) {
            var result1 = {code: 0};
            var result2 = {code: 1};
            if (err) {
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
                throw err;
            }
            for (var i = 0; i < rows.length; i++) {
                rows[i]["工号"] = rows[i]["ID"];
                rows[i]["姓名"] = rows[i]["Name"];
                rows[i]["部门"] = rows[i]["Depart"];
                delete rows[i]["ID"];
                delete rows[i]["Name"];
                delete rows[i]["Depart"];
            }
            var mystyle = {
                headers: true,
                column: {style: {Font: {Bold: "1"}}}
            };
            alasql('SELECT * INTO XLSXML("table16.xls",?) FROM ?', [mystyle, rows]);
            res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
            res.end(JSON.stringify(result1));
        });
        conn16.end();
    }
    /**
     * manage2.html党员领导干部结对帮扶困难师生情况汇总
     */
    else if (pathname == "/downloadTable17/") {
        var conn17 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        conn17.connect();
        conn17.query('select * from dataK1', function (err, rows) {
            var result1 = {code: 0};
            var result2 = {code: 1};
            if (err) {
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
                throw err;
            }
            for (var i = 0; i < rows.length; i++) {
                rows[i]["单位名称"] = rows[i]["partname"];
                rows[i]["姓名"] = rows[i]["name"];
                rows[i]["职务"] = rows[i]["work"];
                rows[i]["帮扶对象类别"] = rows[i]["type"];
                rows[i]["帮扶对象姓名"] = rows[i]["bangFuName"];
                rows[i]["住址"] = rows[i]["address"];
                rows[i]["帮扶对象基本情况"] = rows[i]["state"];
                rows[i]["备注"] = rows[i]["other"];
                delete rows[i]["partname"];
                delete rows[i]["name"];
                delete rows[i]["work"];
                delete rows[i]["type"];
                delete rows[i]["bangFuName"];
                delete rows[i]["address"];
                delete rows[i]["state"];
                delete rows[i]["other"];
            }
            var mystyle = {
                headers: true,
                column: {style: {Font: {Bold: "1"}}}
            };
            alasql('SELECT * INTO XLSXML("table17.xls",?) FROM ?', [mystyle, rows]);
            res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
            res.end(JSON.stringify(result1));
        });
        conn17.end();
    }
    /**
     * manage2.html党员领导干部结对帮扶困难师生情况统计
     */
    else if (pathname == "/downloadTable18/") {
        var conn18 = mysql.createConnection({
            host: serverIP,
            user: 'root',
            password: serverPasswd,
            database: 'zzb'
        });
        conn18.connect();
        conn18.query('select ID,Name,Depart  from mscom where Depart not in (select partname from dataK1)', function (err, rows) {
            var result1 = {code: 0};
            var result2 = {code: 1};
            if (err) {
                res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                res.end(JSON.stringify(result2));
                throw err;
            }
            for (var i = 0; i < rows.length; i++) {
                rows[i]["工号"] = rows[i]["ID"];
                rows[i]["姓名"] = rows[i]["Name"];
                rows[i]["部门"] = rows[i]["Depart"];
                delete rows[i]["ID"];
                delete rows[i]["Name"];
                delete rows[i]["Depart"];
            }
            var mystyle = {
                headers: true,
                column: {style: {Font: {Bold: "1"}}}
            };
            alasql('SELECT * INTO XLSXML("table18.xls",?) FROM ?', [mystyle, rows]);
            res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
            res.end(JSON.stringify(result1));
        });
        conn18.end();
    }
    /**
     *
     */
    else if (pathname == "/downloadTable_suggest/") {
        postData = "";
        var partname="";
        req.addListener("data",function(chunk){
            postData+=chunk;
        });
        req.addListener("end",function(){
            var oriData = querystring.parse(postData);
            partname= oriData["partname"];
            var connect_suggest = mysql.createConnection({
                host: serverIP,
                user: 'root',
                password: serverPasswd,
                database: 'zzb'
            });
            connect_suggest.connect();
            connect_suggest.query('(select suggest from dataD1 where suggestObj='+'\"'+partname+'\"'+') union (select suggest from dataE1 where suggestObj='+'\"'+partname+'\"'+') union (select suggest from dataF1 where suggestObj='+'\"'+partname+'\"'+') union (select suggest from dataG1 where suggestObj='+'\"'+partname+'\"'+')'
                , function (err, rows) {
                    var result1 = {code: 0};
                    var result2 = {code: 1};
                    if (err) {
                        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                        res.end(JSON.stringify(result2));
                        throw err;
                    }
                    for (var i = 0; i < rows.length; i++) {
                        rows[i]["序号"] = i+1;
                        rows[i]["意见建议"] = rows[i]["suggest"];
                        delete rows[i]["suggest"];
                    }
                    var mystyle = {
                        headers: true,
                        column: {style: {Font: {Bold: "1"}}}
                    };
                    alasql('SELECT * INTO XLSXML("suggest.xls",?) FROM ?', [mystyle, rows]);
                    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
                    res.end(JSON.stringify(result1));
                });
            connect_suggest.end();
        });
    }
    /**
     * manage.html
     */
    else if (pathname == "/table1.xls") {
        //创建可读流，并设置excel的mime类型，返回给前端相应文件
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./table1.xls").pipe(res);
    }
    /**
     * manage2.html
     */
    else if (pathname == "/table2.xls") {
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./table2.xls").pipe(res);
    }
    /**
     * manage2.html
     */
    else if (pathname == "/table3.xls") {
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./table3.xls").pipe(res);
    }
    /**
     * manage2.html民主生活会准备情况汇总,下载准备情况汇总表
     */
    else if (pathname == "/table5.xls") {
        //创建可读流，并设置excel的mime类型，返回给前端相应文件
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./table5.xls").pipe(res);
    }
    /**
     * manage2.html民主生活会准备情况名单统计,下载未填报名单
     */
    else if (pathname == "/table6.xls") {
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./table6.xls").pipe(res);
    }
    /**
     * manage2.html民主生活会召开情况汇总,下载召开情况汇总表
     */
    else if (pathname == "/table7.xls") {
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./table7.xls").pipe(res);
    }
    /**
     * manage2.html民主生活会开展名单统计,下载未填报名单
     */
    else if (pathname == "/table8.xls") {
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./table8.xls").pipe(res);
    }
    /**
     * manage2.html单位整改任务书汇总,下载单位整改任务书
     */
    else if (pathname == "/table9.xls") {
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./table9.xls").pipe(res);
    }
    /**
     * manage2.html单位整改任务书名单统计,下载未填报名单
     */
    else if (pathname == "/table10.xls") {
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./table10.xls").pipe(res);
    }
    /**
     * manage2.html个人整改任务书汇总,个人整改任务书汇总
     */
    else if (pathname == "/table11.xls") {
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./table11.xls").pipe(res);
    }
    /**
     * manage2.html个人整改任务书名单统计,下载未填报名单
     */
    else if (pathname == "/table12.xls") {
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./table12.xls").pipe(res);
    }
    /**
     * manage2.html征求意见汇总,下载征求意见汇总
     */
    else if (pathname == "/table13.xls") {
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./table13.xls").pipe(res);
    }
    /**
     * manage2.html征求意见汇总统计表,未填报名单
     */
    else if (pathname == "/table14.xls") {
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./table14.xls").pipe(res);
    }
    /**
     * manage2.html生活困难党员、老党员基本情况汇总,困难党员、老党员基本情况表
     */
    else if (pathname == "/table15.xls") {
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./table15.xls").pipe(res);
    }
    /**
     * manage2.html生活困难党员、老党员基本情况统计,未填报名单
     */
    else if (pathname == "/table16.xls") {
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./table16.xls").pipe(res);
    }
    /**
     * manage2.html党员领导干部结对帮扶困难师生情况汇总,困难师生情况表
     */
    else if (pathname == "/table17.xls") {
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./table17.xls").pipe(res);
    }
    /**
     * manage2.html党员领导干部结对帮扶困难师生情况统计，未填报名单
     */
    else if (pathname == "/table18.xls") {
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./table18.xls").pipe(res);
    }
    /**
     * index11.html下载意见建议
     */
    else if (pathname == "/suggest.xls") {
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./suggest.xls").pipe(res);
    }
    /**
     * 其他路由或未知路由
     */
    else {
        res.writeHeader(200, {'Content-Type': mime[extname], "Access-Control-Allow-Origin": "*"});
        fs.createReadStream("./client" + pathname).pipe(res);
        console.log("visit other at: " + getNowFormateDate());
    }
});

/**
 * 监听http服务器的8898端口
 */
server.listen(8898);

/**
 * 全局error捕获
 */
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





