/**
 * Created by rvum on 2016/12/10.
 */
// require("./js/jquery-1.12.4.min.js");
// require("./js/bootstrap.min.js");
// require("./skin/normalize.css");
// require("./skin/bootstrap.min.css");
require("./skin/zzb.css");
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style');
    msViewportStyle.appendChild(
        document.createTextNode(
            '@-ms-viewport{width:auto!important}'
        )
    );
    document.querySelector('head').appendChild(msViewportStyle)
}

$(document).ready(
    /**
     * 初始化状态
     */
    function () {
        if (window.location.pathname.slice(1) !== "") {
            var name = getCookie("name");
            if (name) {
                var str = "已登录用户：" + name;
                $("#partname").html(str + '<span class="caret"></span>');
                $("#partname-2").html(str + '<span class="caret"></span>');
            } else {
                alert("请登录！");
                window.location.href = "http://localhost:8898/";
            }
        }

        if (window.location.pathname.slice(1) == "index5-2.html") {
            var data, partname = getCookie("depart");
            name = getCookie("name");
            data = "partname=" + partname + "&name=" + name;
            $.ajax({
                method: "POST",
                url: "http://localhost:8898/judgeFillOutD1/",
                data: data
            }).done(function (text) {
                console.log(text);
                /**
                 * 如果code存在，且为0，则用户未填写过信息，加载input_components中的模板
                 */
                if (text && text["code"] == 0) {//显示表格
                    var addModule = require("./input_components/table5-2.vm");
                    var parsedTpl = Velocity.parse(addModule);
                    var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml);
                    $("#saveAndSubmit5-2").click(saveAndSubmit5_2Click);
                    $("#button5-2-add").click(button5_2_addClick);
                    $("#button5-2-cut").click(button5_2_cutClick);
                } else if (text && text["code"] == 2) {
                    alert("数据库为空，或连接错误请重试！");
                }
                else {
                    var addModule2 = require("./display_components/display5-2.vm");
                    var parsedTpl2 = Velocity.parse(addModule2);
                    var compiledHtml2 = (new Velocity.Compile(parsedTpl2)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml2);
                    var len = text.length;
                    for(var i=0;i<len;i++){
                        $("#display5-2").append("<tr><td>" + text[i]["suggestObj"] + "</td><td>" + text[i]["suggest"]  + "</td></tr>")
                    }
                }
            })
        }
        else if (window.location.pathname.slice(1) == "index5-3.html") {
            partname = getCookie("depart");
            name = getCookie("name");
            data = "partname=" + partname + "&name=" + name;
            $.ajax({
                method: "POST",
                url: "http://localhost:8898/judgeFillOutE1/",
                data: data
            }).done(function (text) {
                console.log(text);
                /**
                 * 如果code存在，且为0，则用户未填写过信息，加载input_components中的模板
                 */
                if (text && text["code"] == 0) {//显示表格
                    var addModule = require("./input_components/table5-3.vm");
                    var parsedTpl = Velocity.parse(addModule);
                    var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml);
                    $("#saveAndSubmit5-3").click(saveAndSubmit5_3Click);
                } else if (text && text["code"] == 2) {
                    alert("数据库为空，或连接错误请重试！");
                }
                else {
                    var addModule2 = require("./display_components/display5-3.vm");
                    var parsedTpl2 = Velocity.parse(addModule2);
                    var compiledHtml2 = (new Velocity.Compile(parsedTpl2)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml2);
                    var len = text.length;
                    for(var i=0;i<len;i++){
                        $("#display5-3").append("<tr><td>" + text[i]["suggestObj"] + "</td><td>" + text[i]["suggest"]  + "</td></tr>")
                    }
                }
            })
        }
        else if (window.location.pathname.slice(1) == "index5-4.html") {
            partname = getCookie("depart");
            name = getCookie("name");
            data = "partname=" + partname + "&name=" + name;
            $.ajax({
                method: "POST",
                url: "http://localhost:8898/judgeFillOutF1/",
                data: data
            }).done(function (text) {
                console.log(text);
                /**
                 * 如果code存在，且为0，则用户未填写过信息，加载input_components中的模板
                 */
                if (text && text["code"] == 0) {//显示表格
                    var addModule = require("./input_components/table5-4.vm");
                    var parsedTpl = Velocity.parse(addModule);
                    var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml);
                    $("#saveAndSubmit5-4").click(saveAndSubmit5_4Click);
                } else if (text && text["code"] == 2) {
                    alert("数据库为空，或连接错误请重试！");
                }
                else {
                    var addModule2 = require("./display_components/display5-4.vm");
                    var parsedTpl2 = Velocity.parse(addModule2);
                    var compiledHtml2 = (new Velocity.Compile(parsedTpl2)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml2);
                    var len = text.length;
                    for(var i=0;i<len;i++){
                        $("#display5-4").append("<tr><td>" + text[i]["suggestObj"] + "</td><td>" + text[i]["suggest"]  + "</td></tr>")
                    }
                }
            })
        }
        else if (window.location.pathname.slice(1) == "index5-5.html") {
            partname = getCookie("depart");
            name = getCookie("name");
            data = "partname=" + partname + "&name=" + name;
            $.ajax({
                method: "POST",
                url: "http://localhost:8898/judgeFillOutG1/",
                data: data
            }).done(function (text) {
                console.log(text);
                /**
                 * 如果code存在，且为0，则用户未填写过信息，加载input_components中的模板
                 */
                if (text && text["code"] == 0) {//显示表格
                    var addModule = require("./input_components/table5-5.vm");
                    var parsedTpl = Velocity.parse(addModule);
                    var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml);
                    $("#saveAndSubmit5-5").click(saveAndSubmit5_5Click);
                } else if (text && text["code"] == 2) {
                    alert("数据库为空，或连接错误请重试！");
                }
                else {
                    var addModule2 = require("./display_components/display5-5.vm");
                    var parsedTpl2 = Velocity.parse(addModule2);
                    var compiledHtml2 = (new Velocity.Compile(parsedTpl2)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml2);
                    var len = text.length;
                    for(var i=0;i<len;i++){
                        $("#display5-5").append("<tr><td>" + text[i]["suggestObj"] + "</td><td>" + text[i]["suggest"]  + "</td></tr>")
                    }
                }
            })
        }
        else if (window.location.pathname.slice(1) == "index6.html") {
            partname = getCookie("depart");
            name = getCookie("name");
            data = "partname=" + partname + "&name=" + name;
            $.ajax({
                method: "POST",
                url: "http://localhost:8898/judgeFillOutH1/",
                data: data
            }).done(function (text) {
                console.log(text);
                /**
                 * 如果code存在，且为0，则用户未填写过信息，加载input_components中的模板
                 */
                if (text && text["code"] == 0) {//显示表格
                    var addModule = require("./input_components/table6.vm");
                    var parsedTpl = Velocity.parse(addModule);
                    var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml);
                    $("#saveAndSubmit6").click(saveAndSubmit6Click);
                } else if (text && text["code"] == 2) {
                    alert("数据库为空，或连接错误请重试！");
                }
                else {
                    var addModule2 = require("./display_components/display6.vm");
                    var parsedTpl2 = Velocity.parse(addModule2);
                    var compiledHtml2 = (new Velocity.Compile(parsedTpl2)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml2);
                    var len = text.length;
                    for(var i=0;i<len;i++){
                        $("#display6").append("<tr><td>" + text[i]["time"] + "</td><td>" + text[i]["place"] + "</td><td>" + text[i]["leader"] + "</td><td>" + text[i]["suggest"]  + "</td></tr>")
                    }
                }
            })
        }
        else if (window.location.pathname.slice(1) == "index7.html") {
            partname = getCookie("depart");
            name = getCookie("name");
            data = "partname=" + partname + "&name=" + name;
            $.ajax({
                method: "POST",
                url: "http://localhost:8898/judgeFillOutI1/",
                data: data
            }).done(function (text) {
                console.log(text);
                /**
                 * 如果code存在，且为0，则用户未填写过信息，加载input_components中的模板
                 */
                if (text && text["code"] == 0) {//显示表格
                    var addModule = require("./input_components/table7.vm");
                    var parsedTpl = Velocity.parse(addModule);
                    var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml);
                    $("#saveAndSubmit7").click(saveAndSubmit7Click);
                } else if (text && text["code"] == 2) {
                    alert("数据库为空，或连接错误请重试！");
                }
                else {
                    var addModule2 = require("./display_components/display7.vm");
                    var parsedTpl2 = Velocity.parse(addModule2);
                    var compiledHtml2 = (new Velocity.Compile(parsedTpl2)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml2);
                    var len = text.length;
                    for(var i=0;i<len;i++){
                        $("#display7").append("<tr><td>" + text[i]["time"] + "</td><td>" + text[i]["place"] + "</td><td>" + text[i]["chuji"] + "</td><td>" + text[i]["leader"] + "</td><td>" + text[i]["suggest"] + "</td></tr>")
                    }
                }
            })
        }
        else if (window.location.pathname.slice(1) == "index8.html") {
            partname = getCookie("depart");
            name = getCookie("name");
            data = "partname=" + partname + "&name=" + name;
            $.ajax({
                method: "POST",
                url: "http://localhost:8898/judgeFillOutJ1/",
                data: data
            }).done(function (text) {
                console.log(text);
                /**
                 * 如果code存在，且为0，则用户未填写过信息，加载input_components中的模板
                 */
                if (text && text["code"] == 0) {//显示表格
                    var addModule = require("./input_components/table8.vm");
                    var parsedTpl = Velocity.parse(addModule);
                    var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml);
                    $("#saveAndSubmit8").click(saveAndSubmit8Click);
                    $("#button8-add").click(button8_addClick);
                    $("#button8-cut").click(button8_cutClick);
                } else if (text && text["code"] == 2) {
                    alert("数据库为空，或连接错误请重试！");
                }
                else {
                    var addModule2 = require("./display_components/display8.vm");
                    var parsedTpl2 = Velocity.parse(addModule2);
                    var compiledHtml2 = (new Velocity.Compile(parsedTpl2)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml2);
                    var len = text.length;
                    for(var i=0;i<len;i++){
                        $("#display8").append("<tr><td>" + (i+1) + "</td><td>" + text[i]["name"] + "</td><td>" + text[i]["born"] + "</td><td>" + text[i]["partyTime"] + "</td><td>" + text[i]["state"]+ "</td><td>" + text[i]["other"] + "</td></tr>")
                    }
                }
            })
        }
        else if (window.location.pathname.slice(1) == "index9.html") {
            partname = getCookie("depart");
            name = getCookie("name");
            data = "partname=" + partname + "&name=" + name;
            $.ajax({
                method: "POST",
                url: "http://localhost:8898/judgeFillOutK1/",
                data: data
            }).done(function (text) {
                console.log(text);
                /**
                 * 如果code存在，且为0，则用户未填写过信息，加载input_components中的模板
                 */
                if (text && text["code"] == 0) {//显示表格
                    var addModule = require("./input_components/table9.vm");
                    var parsedTpl = Velocity.parse(addModule);
                    var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml);
                    $("#saveAndSubmit9").click(saveAndSubmit9Click);
                    $("#button9-add").click(button9_addClick);
                    $("#button9-cut").click(button9_cutClick);
                } else if (text && text["code"] == 2) {
                    alert("数据库为空，或连接错误请重试！");
                }
                else {
                    var addModule2 = require("./display_components/display9.vm");
                    var parsedTpl2 = Velocity.parse(addModule2);
                    var compiledHtml2 = (new Velocity.Compile(parsedTpl2)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml2);
                    var len = text.length;
                    for(var i=0;i<len;i++){
                        $("#display9").append("<tr><td>" + (i+1) + "</td><td>" + text[i]["name"] + "</td><td>" + text[i]["work"] + "</td><td>" + text[i]["type"] + "</td><td>" + text[i]["bangFuName"]+ "</td><td>" + text[i]["address"]+ "</td><td>" + text[i]["state"]+ "</td><td>" + text[i]["other"] + "</td></tr>")
                    }
                }
            })
        }
        else if (window.location.pathname.slice(1) == "index10.html") {
            partname = getCookie("depart");
            name = getCookie("name");
            data = "partname=" + partname + "&name=" + name;
            $.ajax({
                method: "POST",
                url: "http://localhost:8898/judgeFillOutN1/",
                data: data
            }).done(function (text) {
                console.log(text);
                /**
                 * 如果code存在，且为0，则用户未填写过信息，加载input_components中的模板
                 */
                if (text && text["code"] == 0) {//显示表格
                    var addModule = require("./input_components/table10.vm");
                    var parsedTpl = Velocity.parse(addModule);
                    var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml);
                    $("#saveAndSubmit-com").click(saveAndSubmit_comClick);
                    $("#com-add").click(com_addClick);
                    $("#com-cut").click(com_cutClick);
                } else if (text && text["code"] == 2) {
                    alert("数据库为空，或连接错误请重试！");
                }
                else {
                    var addModule2 = require("./display_components/display10.vm");
                    var parsedTpl2 = Velocity.parse(addModule2);
                    var compiledHtml2 = (new Velocity.Compile(parsedTpl2)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml2);
                    var len = text.length;
                    for(var i=0;i<len;i++){
                        $("#display10").append("<tr><td>" + (i+1) + "</td><td>" + text[i]["project"] + "</td><td>" + text[i]["task"] + "</td><td>" + text[i]["finishTime"]  + "</td></tr>")
                    }
                }
            })
        }
        else if (window.location.pathname.slice(1) == "person.html") {
            partname = getCookie("depart");
            name = getCookie("name");
            data = "partname=" + partname + "&name=" + name;
            $.ajax({
                method: "POST",
                url: "http://localhost:8898/judgeFillOutM1/",
                data: data
            }).done(function (text) {
                console.log(text);
                /**
                 * 如果code存在，且为0，则用户未填写过信息，加载input_components中的模板
                 */
                if (text && text["code"] == 0) {//显示表格
                    var addModule = require("./input_components/table_person.vm");
                    var parsedTpl = Velocity.parse(addModule);
                    var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml);
                    $("#saveAndSubmit-person").click(saveAndSubmit_personClick);
                    $("#person-add").click(person_addClick);
                    $("#person-cut").click(person_cutClick);
                } else if (text && text["code"] == 2) {
                    alert("数据库为空，或连接错误请重试！");
                }
                else {
                    var addModule2 = require("./display_components/display_person.vm");
                    var parsedTpl2 = Velocity.parse(addModule2);
                    var compiledHtml2 = (new Velocity.Compile(parsedTpl2)).render({
                        data: ""
                    });
                    // $(".onePage").append(compiledHtml);
                    $(".jumbotron").append(compiledHtml2);
                    var len = text.length;
                    for(var i=0;i<len;i++){
                        $("#display_person").append("<tr><td>" + (i+1) + "</td><td>" + text[i]["project"] + "</td><td>" + text[i]["task"] + "</td><td>" + text[i]["finishTime"] + "</td></tr>")
                    }
                }
            })
        }
    },
    /**
     * 登陆
     */
    $("#button").click(function () {
        var data = "managername=" + $("#username").val() + "&managerpassword=" + $("#password").val();
        var option = $("input[name='optionsRadios']:checked").val();
        var url;
        if (option == "option2") {
            url = "http://localhost:8898/managerlogin/";
        } else if (option == "option1") {
            url = "http://localhost:8898/userlogin/";
        } else if (option == "option0") {
            url = "http://localhost:8898/personlogin/";
        }
        $.ajax({
            method: "POST",
            url: url,
            data: data
        }).done(function (text) {
                // console.log(text);
                if (text && text["code"] && text["code"] == 1) {
                    $("#wrong").html("*密码错误 !").addClass("wrongLogin");
                } else if (text && text[0] && text[0]["code"] == 0) {
                    var code = text[0]["code"];
                    if (code == 0 && option == "option2") {
                        setCookie("name", text[0]["Name"], 1);
                        setCookie("ID", text[0]["ID"], 1);
                        setCookie("depart", text[0]["Depart"], 1);
                        setCookie("type", "option2", 1);
                        window.location.href = "../manage2.html";
                    } else if (code == 0 && option == "option1") {
                        setCookie("name", text[0]["Name"], 1);
                        setCookie("ID", text[0]["ID"], 1);
                        setCookie("depart", text[0]["Depart"], 1);
                        setCookie("type", "option1", 1);
                        window.location.href = "../index5.html";
                    } else if (code == 0 && option == "option0") {
                        setCookie("name", text[0]["Name"], 1);
                        setCookie("ID", text[0]["ID"], 1);
                        setCookie("depart", text[0]["Depart"], 1);
                        setCookie("type", "option0", 1);
                        window.location.href = "../person_index.html";
                    }
                }

            }
        )
    }),
    /**
     * 修改密码
     */
    $("#alterPwd").click(function () {
        var id = getCookie("ID");
        var type = getCookie("type");
        var url, newpass2 = $("#newpass2");
        if ($("#newpass").val() !== newpass2.val()) {
            $(".alert").html("*密码输入不一致！").css("color", "red").css("display", "inline-block");
        } else {
            if (type == "option0") {
                url = "http://localhost:8898/alterPwd0/";
            } else if (type == "option1") {
                url = "http://localhost:8898/alterPwd1/";
            } else if (type == "option2") {
                url = "http://localhost:8898/alterPwd2/";
            }
            // console.log(url);
            var data = "ID=" + id + "&Pwd=" + newpass2.val();
            // console.log(data);
            if (id) {
                $.ajax({
                    method: "POST",
                    url: url,
                    data: data
                }).done(
                    function (text) {
                        // console.log(text);
                        var code = text["code"];
                        if (code == 0) {
                            $(".alert").html("*保存成功！").css("display", "inline-block").css("color", "green");
                        } else {
                            $(".alert").html("*保存失败，请重试！").css("color", "red").css("display", "inline-block");
                        }
                    }
                )
            } else {
                alert("请登录！");
                window.location.href = "http://localhost:8898/";
            }
        }

    }),
    /**
     *注销登录
     */
    $("#exit").click(function () {
        setCookie("name", "", 0);
        setCookie("ID", "", 0);
        setCookie("depart", "", 0);
        setCookie("type", "", 0);
        window.location.href = "http://localhost:8898/";
    }),
    /**
     * index.html走访慰问老党员和生活困难党员情况
     * 中第一个表格提交到后台http://localhost:8898/dataSaveC1/接口
     */
    $("#saveAndContinue").click(function () {
        var partname = getCookie("depart");
        var data = "c1=" + $("#c1").val() + "&c2=" + $("#c2").val() + "&c3="
            + $("#c3").val() + "&c4=" + $("#c4").val() + "&c5=" + $("#c5").val()
            + "&c6=" + $("#c6").val() + "&c7=" + $("#c7").val() + "&partname=" + partname;
        $.ajax({
            method: "POST",
            url: "http://localhost:8898/dataSaveC1/",
            data: data
        }).done(function (text) {
                // console.log(text);
                var code = text["code"];
                if (code == 0) {
                    $(".alert").html("*保存成功！").css("display", "inline-block");
                } else {
                    $(".alert").html("*保存失败，请重试！").addClass("wrongLogin").css("display", "inline-block");
                }
            }
        )
    }),
    /**
     * index.html走访慰问老党员和生活困难党员情况
     * 中第二个表格提交到后台http://localhost:8898/dataSaveA1/接口
     */
    $("#saveAndSubmit").click(function () {
        var partname = getCookie("depart");
        var data = "a1=" + $("#a1").val() + "&a2=" + $("#a2").val() + "&a3="
            + $("#a3").val() + "&a4=" + $("#a4").val() + "&a5=" + $("#a5").val()
            + "&a6=" + $("#a6").val() + "&a7=" + $("#a7").val() + "&a8="
            + $("#a8").val() + "&a9=" + $("#a9").val() + "&a10=" + $("#a10").val() + "&a11=" + $("#a11").val() + "&partname=" + partname;

        $.ajax({
            method: "post",
            url: "http://localhost:8898/dataSaveA1/",
            data: data
        }).done(function (text) {
                // console.log(text);
                var code = text["code"];
                if (code == 0) {
                    $(".alert2").html("*保存成功！").css("display", "inline-block");
                } else {
                    $(".alert2").html("*保存失败，请重试！").addClass("wrongLogin").css("display", "inline-block");
                }
            }
        )
    }),
    /**
     * manage.html表一信息汇总
     */
    $("#add1").click(function (event) {
        event.preventDefault();
        $(".jumbotron").html("<div class=\'container title-download\'><div class=\'row\'><div class=\'col-md-10\'>" +
            "<h1>单位填报信息汇总</h1></div><div class=\'col-md-2 downtable\'><button class=\'downtablebutton download1\' id=\'download1\'>下载表1信息汇总</button>" +
            "</div></div></div>").append("<div class=\'table-responsive\'><table class=\'table table-striped table-hover table-bordered\' id=\'table1\'>" +
            "<tr><th>所属部门</th><th>慰问党费配套（元）</th>" +
            "<th>慰问人数合计（人）</th><th>其中：慰问建国前入党的老党员（人）	</th><th>其中：慰问生活困难党员（人）</th>" +
            "<th>帮助解决生产生活困难（个）</th><th>听取工作意见建议（条）</th>" +
            "<th>参加慰问的领导干部人数（人）</th></tr></table></div>");

        $.ajax({
            method: "get",
            url: "http://localhost:8898/add1/"
        }).done(function (text) {
            // console.log(text);
            // console.log(text.length);
            for (var i = 0; i < text.length; i++) {
                $("#table1").append("<tr><td>" + text[i]["partname"] + "</td><td>" + text[i]["c1"] +
                    "</td><td>" + text[i]["c2"] + "</td><td>" + text[i]["c3"] + "</td><td>" + text[i]["c4"] +
                    "</td><td>" + text[i]["c5"] + "</td><td>" + text[i]["c6"] + "</td><td>" + text[i]["c7"] +
                    "</td></tr>");
            }
            $("#download1").click(function (event) {
                event.preventDefault();
                // console.log("download1");
                $.ajax({
                    method: "get",
                    url: "http://localhost:8898/downloadTable1/"
                }).done(function () {
                    window.location = "http://localhost:8898/table1.xls";
                })
            })
        })
    }),
    /**
     * manage.html表二信息汇总
     */
    $("#add2").click(function (event) {
        event.preventDefault();
        $(".jumbotron").html("<div class=\'container title-download\'><div class=\'row\'><div class=\'col-md-10\'>" +
            "<h1>单位填报信息汇总</h1></div><div class=\'col-md-2 downtable\'><button class=\'downtablebutton download2\' id=\'download2\'>下载表2信息汇总</button>" +
            "</div></div></div>").append("<div class=\'table-responsive\'><table class=\'table table-striped table-hover table-bordered\' id=\'table2\'>" +
            "<tr><th rowspan=\'2\'>所属部门</th><th colspan=\'2\'>学习习近平总书记“七一”讲话精神情况</th><th colspan=\'2\'>坚持边学边查、立行立改情况</th>" +
            "<th colspan=\'2\'>党员领导干部在所在支部讲党课情况</th><th colspan=\'2\'>支部书记在所在支部讲党课情况</th>" +
            "<th colspan=\'2\'>组织党员实地接收革命传统教育情况</th></tr><tr><th>党支部数</th><th>完成数</th><th>查找问题数</th>" +
            "<th>整改问题数</th><th>讲党课数</th><th>听党课人数</th><th>讲党课数</th><th>听党课人数</th><th>批次</th><th>党员参加人数</th>" +
            "</tr></table></div>");
        $.ajax({
            method: "get",
            url: "http://localhost:8898/add2/"
        }).done(function (text) {
            // console.log(text);
            // console.log(text.length);
            for (var i = 0; i < text.length; i++) {
                $("#table2").append("<tr><td>" + text[i]["partname"] + "</td><td>" + text[i]["a1"] +
                    "</td><td>" + text[i]["a2"] + "</td><td>" + text[i]["a3"] + "</td><td>" + text[i]["a4"] +
                    "</td><td>" + text[i]["a5"] + "</td><td>" + text[i]["a6"] + "</td><td>" + text[i]["a7"] +
                    "</td><td>" + text[i]["a8"] + "</td><td>" + text[i]["a9"] + "</td><td>" + text[i]["a10"] +
                    "</td></tr>");
            }
            $("#download2").click(function (event) {
                event.preventDefault();
                // console.log("download2");
                $.ajax({
                    method: "get",
                    url: "http://localhost:8898/downloadTable2/"
                }).done(function () {
                    window.location = "http://localhost:8898/table2.xls";
                })
            })
        })
    }),
    /**
     * manage.html单位特色做法汇总
     */
    $("#add3").click(function (event) {
        event.preventDefault();
        $(".jumbotron").html("<div class=\'container title-download\'><div class=\'row\'><div class=\'col-md-10\'>" +
            "<h1>单位特色做法信息汇总</h1></div><div class=\'col-md-2 downtable\'><button class=\'downtablebutton download3\' id=\'download3\'>下载单位特色做法</button>" +
            "</div></div></div>").append("<div class=\'table-responsive\'><table class=\'table table-striped table-hover table-bordered\' id=\'table3\'>" +
            "<tr><th>单位名称</th><th>特色做法</th></tr></table></div>");
        $.ajax({
            method: "get",
            url: "http://localhost:8898/add2/"
        }).done(function (text) {
            // console.log(text);
            // console.log(text.length);
            for (var i = 0; i < text.length; i++) {
                $("#table3").append("<tr><td>" + text[i]["partname"] + "</td><td>" + text[i]["a11"] + "</td></tr>");
            }
            $("#download3").click(function (event) {
                event.preventDefault();
                // console.log("download3");
                $.ajax({
                    method: "get",
                    url: "http://localhost:8898/downloadTable3/"
                }).done(function () {
                    window.location = "http://localhost:8898/table3.xls";
                })
            })
        })
    }),
    /**
     * manage2.html民主生活会准备表汇总
     */
    /*$("#add5").click(function (event) {
     event.preventDefault();
     $(".jumbotron").html("<div class=\'container title-download\'><div class=\'row\'><div class=\'col-md-10\'><h1>民主生活会准备情况汇总</h1></div><div class=\'col-md-2 download downtable\'><button class=\'downtablebutton download5\' id=\'download5\'>下载准备情况汇总表</button></div></div></div>").append("<div class=\'table-responsive\'><table class=\'table table-striped table-hover table-bordered\' id=\'table5\'><tr><th>单位名称</th><th>会议时间</th><th>会议地点</th><th>参加校领导</th><th>征求意见情况</th></tr></table></div>");
     $.ajax({
     method: "get",
     url: "http://localhost:8898/add5/"
     }).done(function (text) {
     // console.log(text);
     // console.log(text.length);
     $("#download5").click(function () {
     // event.preventDefault();
     // console.log("download5");
     $.ajax({
     method: "get",
     url: "http://localhost:8898/downloadTable5/"
     }).done(function () {
     // console.log("down5");
     window.location = "http://localhost:8898/table5.xls";
     })
     });
     if (text && text["code"] && text["code"] == 1) {
     alert("连接错误，请重试！")
     } else {
     for (var i = 0; i < text.length; i++) {
     $("#table5").append("<tr><td>" + text[i]["partname"] + "</td><td>" + text[i]["time"] + "</td><td>" + text[i]["place"] + "</td><td>" + text[i]["leader"] + "</td><td>" + text[i]["suggest"] + "</td></tr>");
     }
     }
     })
     }),*/
    /**
     * manage2.html民主生活会准备表汇总
     */
    $("#add5").click(function (event) {
        event.preventDefault();
        var addModule = require("./manage_components/add5.vm");
        var parsedTpl = Velocity.parse(addModule);
        var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
            data: ""
        });
        // $(".onePage").append(compiledHtml);
        $(".jumbotron").html(compiledHtml);
        // alert("vm成功！");
        $.ajax({
            method: "get",
            url: "http://localhost:8898/add5/"
        }).done(function (text) {
            // console.log(text);
            // console.log(text.length);
            $("#download5").click(function () {
                // event.preventDefault();
                // console.log("download5");
                $.ajax({
                    method: "get",
                    url: "http://localhost:8898/downloadTable5/"
                }).done(function () {
                    // console.log("down5");
                    window.location = "http://localhost:8898/table5.xls";
                })
            });
            if (text && text["code"] && text["code"] == 1) {
                alert("数据库为空，或连接错误请重试！");
            } else {
                for (var i = 0; i < text.length; i++) {
                    $("#table5").append("<tr><td>" + text[i]["partname"] + "</td><td>" + text[i]["time"] + "</td><td>" + text[i]["place"] + "</td><td>" + text[i]["leader"] + "</td><td>" + text[i]["suggest"] + "</td></tr>");
                }
            }
        })
    }),
    /**
     * manage2.html民主生活会准备表名单统计
     */
    $("#add6").click(function (event) {
        event.preventDefault();
        var addModule = require("./manage_components/add6.vm");
        var parsedTpl = Velocity.parse(addModule);
        var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
            data: ""
        });
        $(".jumbotron").html(compiledHtml);
        // $(".jumbotron").html("<div class=\'container title-download\'><div class=\'row\'><div class=\'col-md-10\'><h1>民主生活会准备情况名单统计</h1></div><div class=\'col-md-2 download downtable\'><button class=\'downtablebutton download6\' id=\'download6\'>下载未填报名单</button></div></div><div class=\'row countNames\' id=\'countNames1\'><span>未填报人的名单为：</span></div></div>").append("<div class=\'table-responsive\'><table class=\'table table-striped table-hover table-bordered\' id=\'table6\'><tr><th>工号</th><th>姓名</th><th>部门</th></tr></table></div>");
        $.ajax({
            method: "get",
            url: "http://localhost:8898/add6/"
        }).done(function (text) {
            // console.log(text);
            // console.log(text.length);
            for (var i = 0; i < text.length; i++) {
                $("#table6").append("<tr><td>" + text[i]["ID"] + "</td><td>" + text[i]["Name"] + "</td><td>" + text[i]["Depart"] + "</td></tr>");
            }
            $("#download6").click(function (event) {
                event.preventDefault();
                // console.log("download6");
                $.ajax({
                    method: "get",
                    url: "http://localhost:8898/downloadTable6/"
                }).done(function () {
                    window.location = "http://localhost:8898/table6.xls";
                })
            })
        })
    }),
    /**
     * manage2.html民主生活会开展表汇总
     */
    $("#add7").click(function (event) {
        event.preventDefault();
        var addModule = require("./manage_components/add7.vm");
        var parsedTpl = Velocity.parse(addModule);
        var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
            data: ""
        });
        $(".jumbotron").html(compiledHtml);
        // $(".jumbotron").html("<div class=\'container title-download\'><div class=\'row\'><div class=\'col-md-10\'><h1>民主生活会召开情况汇总</h1></div><div class=\'col-md-2 download downtable\'><button class=\'downtablebutton download7\' id=\'download7\'>下载召开情况汇总表</button></div></div></div>").append("<div class=\'table-responsive\'><table class=\'table table-striped table-hover table-bordered\' id=\'table7\'><tr><th>单位名称</th><th>会议时间</th><th>会议地点</th><th>参加处级干部数</th><th>参加校领导</th><th>征求意见情况</th></tr></table></div>");
        $.ajax({
            method: "get",
            url: "http://localhost:8898/add7/"
        }).done(function (text) {
            // console.log(text);
            // console.log(text.length);
            $("#download7").click(function (event) {
                event.preventDefault();
                // console.log("download7");
                $.ajax({
                    method: "get",
                    url: "http://localhost:8898/downloadTable7/"
                }).done(function () {
                    window.location = "http://localhost:8898/table7.xls";
                })
            });
            if (text && text["code"] && text["code"] == 1) {
                alert("数据库为空，或连接错误请重试！")
            } else {
                for (var i = 0; i < text.length; i++) {
                    $("#table7").append("<tr><td>" + text[i]["partname"] + "</td><td>" + text[i]["time"] + "</td><td>" + text[i]["place"] + "</td><td>" + text[i]["chuji"] + "</td><td>" + text[i]["leader"] + "</td><td>" + text[i]["suggest"] + "</td></tr>");
                }
            }
        })
    }),
    /**
     * manage2.html民主生活会开展名单统计
     */
    $("#add8").click(function (event) {
        event.preventDefault();
        var addModule = require("./manage_components/add8.vm");
        var parsedTpl = Velocity.parse(addModule);
        var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
            data: ""
        });
        $(".jumbotron").html(compiledHtml);
        // $(".jumbotron").html("<div class=\'container title-download\'><div class=\'row\'><div class=\'col-md-10\'><h1>民主生活会开展名单统计</h1></div><div class=\'col-md-2 download downtable\'><button class=\'downtablebutton download8\' id=\'download8\'>下载未填报名单</button></div></div><div class=\'row countNames\' id=\'countNames2\'><span>未填报人的名单为：</span></div></div>").append("<div class=\'table-responsive\'><table class=\'table table-striped table-hover table-bordered\' id=\'table8\'><tr><th>工号</th><th>姓名</th><th>部门</th></tr></table></div>");
        $.ajax({
            method: "get",
            url: "http://localhost:8898/add8/"
        }).done(function (text) {
            // console.log(text);
            // console.log(text.length);
            for (var i = 0; i < text.length; i++) {
                $("#table8").append("<tr><td>" + text[i]["ID"] + "</td><td>" + text[i]["Name"] + "</td><td>" + text[i]["Depart"] + "</td></tr>");
            }
            $("#download8").click(function (event) {
                event.preventDefault();
                // console.log("download8");
                $.ajax({
                    method: "get",
                    url: "http://localhost:8898/downloadTable8/"
                }).done(function () {
                    window.location = "http://localhost:8898/table8.xls";
                })
            })
        })
    }),
    /**
     * manage2.html单位整改任务书汇总
     */
    $("#add9").click(function (event) {
        event.preventDefault();
        var addModule = require("./manage_components/add9.vm");
        var parsedTpl = Velocity.parse(addModule);
        var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
            data: ""
        });
        $(".jumbotron").html(compiledHtml);
        // $(".jumbotron").html("<div class=\'container title-download\'><div class=\'row\'><div class=\'col-md-10\'><h1>单位整改任务书汇总</h1></div><div class=\'col-md-2 download downtable\'><button class=\'downtablebutton download9\' id=\'download9\'>下载单位整改任务书</button></div></div></div>")
        //     .append("<div class=\'table-responsive\'><table class=\'table table-striped table-hover table-bordered personTable\' id=\'table9\'><tr id=\'com-1\'><th>单位名称</th><th>整改项目</th><th>整改任务</th><th>完成时限</th></tr></table></div>");
        $.ajax({
            method: "get",
            url: "http://localhost:8898/add9/"
        }).done(function (text) {
            // console.log(text);
            // console.log(text.length);
            for (var i = 0; i < text.length; i++) {
                $("#table9").append("<tr><td>" + text[i]["com"] + "</td><td>" + text[i]["project"] + "</td><td>" + text[i]["task"] + "</td><td>" + text[i]["finishTime"] + "</td></tr>");
            }
            $("#download9").click(function (event) {
                event.preventDefault();
                // console.log("download8");
                $.ajax({
                    method: "get",
                    url: "http://localhost:8898/downloadTable9/"
                }).done(function () {
                    window.location = "http://localhost:8898/table9.xls";
                })
            })
        })
    }),
    /**
     * manage2.html单位整改任务书名单统计
     */
    $("#add10").click(function (event) {
        event.preventDefault();
        var addModule = require("./manage_components/add10.vm");
        var parsedTpl = Velocity.parse(addModule);
        var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
            data: ""
        });
        $(".jumbotron").html(compiledHtml);
        // $(".jumbotron").html("<div class=\'container title-download\'><div class=\'row\'><div class=\'col-md-10\'><h1>单位整改任务书名单统计</h1></div><div class=\'col-md-2 download downtable\'><button class=\'downtablebutton download10\' id=\'download10\'>下载未填报名单</button></div></div><div class=\'row countNames\' id=\'countNames2\'><span>未填报人的名单为：</span></div></div>")
        //     .append("<div class=\'table-responsive\'><table class=\'table table-striped table-hover table-bordered\' id=\'table10\'><tr><th>工号</th><th>姓名</th><th>部门</th></tr></table></div>");
        $.ajax({
            method: "get",
            url: "http://localhost:8898/add10/"
        }).done(function (text) {
            // console.log(text);
            // console.log(text.length);
            for (var i = 0; i < text.length; i++) {
                $("#table10").append("<tr><td>" + text[i]["ID"] + "</td><td>" + text[i]["Name"] + "</td><td>" + text[i]["Depart"] + "</td></tr>");
            }
            $("#download10").click(function (event) {
                event.preventDefault();
                // console.log("download8");
                $.ajax({
                    method: "get",
                    url: "http://localhost:8898/downloadTable10/"
                }).done(function () {
                    window.location = "http://localhost:8898/table10.xls";
                })
            })
        })
    }),
    /**
     * manage2.html个人整改任务书汇总
     */
    $("#add11").click(function (event) {
        event.preventDefault();
        var addModule = require("./manage_components/add11.vm");
        var parsedTpl = Velocity.parse(addModule);
        var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
            data: ""
        });
        $(".jumbotron").html(compiledHtml);
        // $(".jumbotron").html("<div class=\'container title-download\'><div class=\'row\'><div class=\'col-md-10\'><h1>个人整改任务书汇总</h1></div><div class=\'col-md-2 download downtable\'><button class=\'downtablebutton download11\' id=\'download11\'>下载个人整改任务书汇总</button></div></div></div>")
        //     .append("<div class=\'table-responsive\'><table class=\'table table-striped table-hover table-bordered table11\' id=\'table11\'><tr id=\'com-1\'><th>姓名</th><th>整改项目</th><th>整改任务</th><th>完成时限</th></tr></table></div>");
        $.ajax({
            method: "get",
            url: "http://localhost:8898/add11/"
        }).done(function (text) {
            // console.log(text);
            // console.log(text.length);
            for (var i = 0; i < text.length; i++) {
                $("#table11").append("<tr><td>" + text[i]["name"] + "</td><td>" + text[i]["project"] + "</td><td>" + text[i]["task"] + "</td><td>" + text[i]["finishTime"] + "</td></tr>");
            }
            $("#download11").click(function (event) {
                event.preventDefault();
                // console.log("download8");
                $.ajax({
                    method: "get",
                    url: "http://localhost:8898/downloadTable11/"
                }).done(function () {
                    window.location = "http://localhost:8898/table11.xls";
                })
            })
        })
    }),
    /**
     * manage2.html个人整改任务书名单统计
     */
    $("#add12").click(function (event) {
        event.preventDefault();
        var addModule = require("./manage_components/add12.vm");
        var parsedTpl = Velocity.parse(addModule);
        var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
            data: ""
        });
        $(".jumbotron").html(compiledHtml);
        // $(".jumbotron").html("<div class=\'container title-download\'><div class=\'row\'><div class=\'col-md-10\'><h1>个人整改任务书名单统计</h1></div><div class=\'col-md-2 download downtable\'><button class=\'downtablebutton download12\' id=\'download12\'>下载未填报名单</button></div></div><div class=\'row countNames\' id=\'countNames2\'><span>未填报人的名单为：</span></div></div>")
        //     .append("<div class=\'table-responsive\'><table class=\'table table-striped table-hover table-bordered\' id=\'table12\'><tr><th>工号</th><th>姓名</th><th>部门</th></tr></table></div>");
        $.ajax({
            method: "get",
            url: "http://localhost:8898/add12/"
        }).done(function (text) {
            // console.log(text);
            // console.log(text.length);
            for (var i = 0; i < text.length; i++) {
                $("#table12").append("<tr><td>" + text[i]["ID"] + "</td><td>" + text[i]["Name"] + "</td><td>" + text[i]["Depart"] + "</td></tr>");
            }
            $("#download12").click(function (event) {
                event.preventDefault();
                // console.log("download8");
                $.ajax({
                    method: "get",
                    url: "http://localhost:8898/downloadTable12/"
                }).done(function () {
                    window.location = "http://localhost:8898/table12.xls";
                })
            })
        })
    }),
    /**
     * manage2.html征求意见汇总
     */
    $("#add13").click(function (event) {
        event.preventDefault();
        var addModule = require("./manage_components/add13.vm");
        var parsedTpl = Velocity.parse(addModule);
        var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
            data: ""
        });
        $(".jumbotron").html(compiledHtml);
        // $(".jumbotron").html("<div class=\'container title-download\'><div class=\'row\'><div class=\'col-md-10\'><h1>征求意见汇总</h1></div><div class=\'col-md-2 download downtable\'><button class=\'downtablebutton download13\' id=\'download13\'>下载征求意见汇总</button></div></div></div>")
        //     .append("<div class=\'table-responsive\'><table class=\'table table-striped table-hover table-bordered table13\' id=\'table13\'><tr id=\'com-1\'><th>单位名称</th><th>意见建议对象单位</th><th>意见建议</th></tr></table></div>");
        $.ajax({
            method: "get",
            url: "http://localhost:8898/add13/"
        }).done(function (text) {
            // console.log(text);
            // console.log(text.length);
            for (var i = 0; i < text.length; i++) {
                $("#table13").append("<tr><td>" + text[i]["partname"] + "</td><td>" + text[i]["suggestObj"] + "</td><td>" + text[i]["suggest"] + "</td></tr>");
            }
            $("#download13").click(function (event) {
                event.preventDefault();
                // console.log("download8");
                $.ajax({
                    method: "get",
                    url: "http://localhost:8898/downloadTable13/"
                }).done(function () {
                    window.location = "http://localhost:8898/table13.xls";
                })
            })
        })
    }),
    /**
     * manage2.html征求意见汇总统计表
     */
    $("#add14").click(function (event) {
        event.preventDefault();
        var addModule = require("./manage_components/add14.vm");
        var parsedTpl = Velocity.parse(addModule);
        var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
            data: ""
        });
        $(".jumbotron").html(compiledHtml);
        // $(".jumbotron").html("<div class=\'container title-download\'><div class=\'row\'><div class=\'col-md-10\'><h1>征求意见汇总统计表</h1></div><div class=\'col-md-2 download downtable\'><button class=\'downtablebutton download14\' id=\'download14\'>下载未填报名单</button></div></div><div class=\'row countNames\' id=\'countNames2\'><span>未填报人的名单为：</span></div></div>")
        //     .append("<div class=\'table-responsive\'><table class=\'table table-striped table-hover table-bordered\' id=\'table14\'><tr><th>工号</th><th>姓名</th><th>部门</th></tr></table></div>");
        $.ajax({
            method: "get",
            url: "http://localhost:8898/add14/"
        }).done(function (text) {
            // console.log(text);
            // console.log(text.length);
            for (var i = 0; i < text.length; i++) {
                $("#table14").append("<tr><td>" + text[i]["ID"] + "</td><td>" + text[i]["Name"] + "</td><td>" + text[i]["Depart"] + "</td></tr>");
            }
            $("#download14").click(function (event) {
                event.preventDefault();
                // console.log("download8");
                $.ajax({
                    method: "get",
                    url: "http://localhost:8898/downloadTable14/"
                }).done(function () {
                    window.location = "http://localhost:8898/table14.xls";
                })
            })
        })
    }),
    /**
     * manage2.html生活困难党员、老党员基本情况汇总
     */
    $("#add15").click(function (event) {
        event.preventDefault();
        var addModule = require("./manage_components/add15.vm");
        var parsedTpl = Velocity.parse(addModule);
        var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
            data: ""
        });
        $(".jumbotron").html(compiledHtml);
        // $(".jumbotron").html("<div class=\'container title-download\'><div class=\'row\'><div class=\'col-md-10\'><h1>生活困难党员、老党员基本情况汇总</h1></div><div class=\'col-md-2 download downtable\'><button class=\'downtablebutton download15\' id=\'download15\'>下载生活困难党员、老党员基本情况表</button></div></div></div>")
        //     .append("<div class=\'table-responsive\'><table class=\'table table-striped table-hover table-bordered table15\' id=\'table15\'><tr id=\'com-1\'><th>单位名称</th><th>姓名</th><th>出生年月</th><th>入党时间</th><th>困难党员、老党员基本情况</th><th>备注</th></tr></table></div>");
        $.ajax({
            method: "get",
            url: "http://localhost:8898/add15/"
        }).done(function (text) {
            // console.log(text);
            // console.log(text.length);
            for (var i = 0; i < text.length; i++) {
                $("#table15").append("<tr><td>" + text[i]["partname"] + "</td><td>" + text[i]["name"] + "</td><td>" + text[i]["born"] + "</td><td>" + text[i]["partyTime"] + "</td><td>" + text[i]["state"] + "</td><td>" + text[i]["other"] + "</td></tr>");
            }
            $("#download15").click(function (event) {
                event.preventDefault();
                // console.log("download8");
                $.ajax({
                    method: "get",
                    url: "http://localhost:8898/downloadTable15/"
                }).done(function () {
                    window.location = "http://localhost:8898/table15.xls";
                })
            })
        })
    }),
    /**
     * manage2.html生活困难党员、老党员基本情况统计
     */
    $("#add16").click(function (event) {
        event.preventDefault();
        var addModule = require("./manage_components/add16.vm");
        var parsedTpl = Velocity.parse(addModule);
        var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
            data: ""
        });
        $(".jumbotron").html(compiledHtml);
        // $(".jumbotron").html("<div class=\'container title-download\'><div class=\'row\'><div class=\'col-md-10\'><h1>生活困难党员、老党员基本情况统计</h1></div><div class=\'col-md-2 download downtable\'><button class=\'downtablebutton download16\' id=\'download16\'>下载未填报名单</button></div></div><div class=\'row countNames\' id=\'countNames2\'><span>未填报人的名单为：</span></div></div>")
        //     .append("<div class=\'table-responsive\'><table class=\'table table-striped table-hover table-bordered\' id=\'table16\'><tr><th>工号</th><th>姓名</th><th>部门</th></tr></table></div>");
        $.ajax({
            method: "get",
            url: "http://localhost:8898/add16/"
        }).done(function (text) {
            // console.log(text);
            // console.log(text.length);
            for (var i = 0; i < text.length; i++) {
                $("#table16").append("<tr><td>" + text[i]["ID"] + "</td><td>" + text[i]["Name"] + "</td><td>" + text[i]["Depart"] + "</td></tr>");
            }
            $("#download16").click(function (event) {
                event.preventDefault();
                // console.log("download8");
                $.ajax({
                    method: "get",
                    url: "http://localhost:8898/downloadTable16/"
                }).done(function () {
                    window.location = "http://localhost:8898/table16.xls";
                })
            })
        })
    }),
    /**
     * manage2.html党员领导干部结对帮扶困难师生情况汇总
     */
    $("#add17").click(function (event) {
        event.preventDefault();
        var addModule = require("./manage_components/add17.vm");
        var parsedTpl = Velocity.parse(addModule);
        var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
            data: ""
        });
        $(".jumbotron").html(compiledHtml);
        // $(".jumbotron").html("<div class=\'container title-download\'><div class=\'row\'><div class=\'col-md-10\'><h1>党员领导干部结对帮扶困难师生情况汇总</h1></div><div class=\'col-md-2 download downtable\'><button class=\'downtablebutton download17\' id=\'download17\'>下载党员领导干部结对帮扶困难师生情况表</button></div></div></div>")
        //     .append("<div class=\'table-responsive\'><table class=\'table table-striped table-hover table-bordered table17\' id=\'table17\'><tr id=\'com-1\'><th>单位名称</th><th>姓名</th><th>职务</th><th>帮扶对象类别</th><th>帮扶对象姓名</th><th>住址</th><th>帮扶对象基本情况</th><th>备注</th></tr></table></div>");
        $.ajax({
            method: "get",
            url: "http://localhost:8898/add17/"
        }).done(function (text) {
            // console.log(text);
            // console.log(text.length);
            for (var i = 0; i < text.length; i++) {
                $("#table17").append("<tr><td>" + text[i]["partname"] + "</td><td>" + text[i]["name"] + "</td><td>" + text[i]["work"] + "</td><td>" + text[i]["type"] + "</td><td>" + text[i]["bangFuName"] + "</td><td>" + text[i]["address"] + "</td><td>" + text[i]["state"] + "</td><td>" + text[i]["other"] + "</td></tr>");
            }
            $("#download17").click(function (event) {
                event.preventDefault();
                // console.log("download8");
                $.ajax({
                    method: "get",
                    url: "http://localhost:8898/downloadTable17/"
                }).done(function () {
                    window.location = "http://localhost:8898/table17.xls";
                })
            })
        })
    }),
    /**
     * manage2.html党员领导干部结对帮扶困难师生情况统计
     */
    $("#add18").click(function (event) {
        event.preventDefault();
        var addModule = require("./manage_components/add18.vm");
        var parsedTpl = Velocity.parse(addModule);
        var compiledHtml = (new Velocity.Compile(parsedTpl)).render({
            data: ""
        });
        $(".jumbotron").html(compiledHtml);
        // $(".jumbotron").html("<div class=\'container title-download\'><div class=\'row\'><div class=\'col-md-10\'><h1>党员领导干部结对帮扶困难师生情况统计</h1></div><div class=\'col-md-2 download downtable\'><button class=\'downtablebutton download18\' id=\'download18\'>下载未填报名单</button></div></div><div class=\'row countNames\' id=\'countNames2\'><span>未填报人的名单为：</span></div></div>")
        //     .append("<div class=\'table-responsive\'><table class=\'table table-striped table-hover table-bordered\' id=\'table18\'><tr><th>工号</th><th>姓名</th><th>部门</th></tr></table></div>");
        $.ajax({
            method: "get",
            url: "http://localhost:8898/add18/"
        }).done(function (text) {
            // console.log(text);
            // console.log(text.length);
            for (var i = 0; i < text.length; i++) {
                $("#table18").append("<tr><td>" + text[i]["ID"] + "</td><td>" + text[i]["Name"] + "</td><td>" + text[i]["Depart"] + "</td></tr>");
            }
            $("#download18").click(function (event) {
                event.preventDefault();
                // console.log("download8");
                $.ajax({
                    method: "get",
                    url: "http://localhost:8898/downloadTable18/"
                }).done(function () {
                    window.location = "http://localhost:8898/table18.xls";
                })
            })
        })
    })
);

/**
 * 设置cookie信息
 * @param c_name
 * @param value
 * @param expiredays
 */
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}
/**
 * 删除cookie信息
 * @param c_name
 * @returns {string}
 */
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

if ($("#getSuggest").length > 0) {
    $("#getSuggest").ready(function () {
        var partname = getCookie("depart");
        var data = "partname=" + partname;
        $.ajax({
            method: "post",
            url: "http://localhost:8898/getSuggest/",
            data: data
        }).done(function (text) {
            if (text && text["code"] && text["code"] == 1) {
                alert("暂无数据！");
            } else {
                for (var i = 0; i < text.length; i++) {
                    $("#table_suggest").append("<tr><td>" + (i + 1) + "</td><td>" + text[i]["suggest"] + "</td></tr>");
                }
                $("#download_suggest").click(function (event) {
                    event.preventDefault();
                    // console.log("download8");
                    var partname = getCookie("depart");
                    var data = "partname=" + partname;
                    $.ajax({
                        method: "post",
                        url: "http://localhost:8898/downloadTable_suggest/",
                        data: data
                    }).done(function () {
                        window.location = "http://localhost:8898/suggest.xls";
                    })
                })
            }
        })
    });
}

/**
 * index5-2.html对校级领导班子的意见建议表
 * 中表格数据提交到后台http://localhost:8898/dataSaveD1/接口
 */
function saveAndSubmit5_2Click() {
    var partname = getCookie("depart");

    var table5_2ItemCount = 0, data = "partname=" + partname;
    console.log(table5_2ItemCount);
    for (var i = 0; i < 40; i++) {
        var everyItemVal = $("#d" + (i + 1)+"_1").val();
        if (everyItemVal !== "" && everyItemVal !== undefined) {
            table5_2ItemCount++;
        }
    }

    data += "&table5_2ItemCount=" + table5_2ItemCount;
    console.log(table5_2ItemCount);
    if (table5_2ItemCount == 0) {
        data = "partname=" + partname + "&table5_2ItemCount=" + "0" + "&d1=" + "无" + "&d1_1=" + "无";
    } else {
        for (var j = 0; j < table5_2ItemCount; j++) {
            data += "&d" + (j + 1) + "=" + $("#d" + (j + 1)).val() + "&d" + (j + 1) + "_1=" + $("#d" + (j + 1) + "_1").val();
        }
    }
    console.log(data);

    $.ajax({
        method: "post",
        url: "http://localhost:8898/dataSaveD1/",
        data: data
    }).done(function (text) {
            // console.log(text);
            var code = text["code"];
            if (code == 0) {
                $("#alert5-2").html("*保存成功！").css("display", "inline-block").css("color", "green");
                $("#saveAndSubmit5-2").unbind("click");
            } else {
                $("#alert5-2").html("*请不要重复提交或保存失败请重试！").addClass("wrong").css("display", "inline-block").css("color", "red");
            }
        }
    );
}
/*$("#saveAndSubmit5-2").click(function () {
 var partname = getCookie("depart");
 var data = "d1=" + $("#d1").val() + "&d11=" + $("#d11").val()
 + "&d2=" + $("#d2").val() + "&d21=" + $("#d21").val() + "&d3="
 + $("#d3").val() + "&d31=" + $("#d31").val() + "&partname=" + partname;
 $.ajax({
 method: "post",
 url: "http://localhost:8898/dataSaveD1/",
 data: data
 }).done(function (text) {
 // console.log(text);
 var code = text["code"];
 if (code == 0) {
 $("#alert5-2").html("*保存成功！").css("display", "inline-block").css("color", "green");
 $("#saveAndSubmit5-2").unbind("click");
 } else {
 $("#alert5-2").html("*请不要重复提交或保存失败请重试！").addClass("wrong").css("display", "inline-block").css("color", "red");
 }
 }
 )
 }),*/
/**
 * index5-3.html对党政部门的意见建议表
 * 中表格数据提交到后台http://localhost:8898/dataSaveE1/接口
 */
function saveAndSubmit5_3Click() {
    var partname = getCookie("depart");
    var data = "e1=" + $("#e1").val() + "&e11=" + $("#e11").val() + "&partname=" + partname;

    $.ajax({
        method: "post",
        url: "http://localhost:8898/dataSaveE1/",
        data: data
    }).done(function (text) {
            // console.log(text);
            var code = text["code"];
            if (code == 0) {
                $("#alert5-3").html("*保存成功！").css("display", "inline-block").css("color", "green");
                $("#saveAndSubmit5-3").unbind("click");
            } else {
                $("#alert5-3").html("*请不要重复提交或保存失败请重试！").addClass("wrong").css("display", "inline-block").css("color", "red");
            }
        }
    )
}
/**
 * index5-4.html对教学科研单位领导班子及成员的意见建议
 * 中表格数据提交到后台http://localhost:8898/dataSaveF1/接口
 */
function saveAndSubmit5_4Click() {
    var partname = getCookie("depart");
    var data = "f1=" + $("#f1").val() + "&f11=" + $("#f11").val() + "&partname=" + partname;

    $.ajax({
        method: "post",
        url: "http://localhost:8898/dataSaveF1/",
        data: data
    }).done(function (text) {
            // console.log(text);
            var code = text["code"];
            if (code == 0) {
                $("#alert5-4").html("*保存成功！").css("display", "inline-block").css("color", "g");
                $("#saveAndSubmit5-4").unbind("click");
            } else {
                $("#alert5-4").html("*请不要重复提交或保存失败请重试！").addClass("wrong").css("display", "inline-block").css("color", "red");
            }
        }
    )
}
/**
 * index5-5.html对直属附属单位领导班子及成员的意见建议
 * 中表格数据提交到后台http://localhost:8898/dataSaveG1/接口
 */
function saveAndSubmit5_5Click() {
    var partname = getCookie("depart");
    var data = "g1=" + $("#g1").val() + "&g11=" + $("#g11").val() + "&partname=" + partname;
    $.ajax({
        method: "post",
        url: "http://localhost:8898/dataSaveG1/",
        data: data
    }).done(function (text) {
            // console.log(text);
            var code = text["code"];
            if (code == 0) {
                $("#alert5-5").html("*保存成功！").css("display", "inline-block").css("color", "g");
                $("#saveAndSubmit5-5").unbind("click");
            } else {
                $("#alert5-5").html("*请不要重复提交或保存失败请重试！").addClass("wrong").css("display", "inline-block").css("color", "red");
            }
        }
    )
}
/**
 * index6.html民主生活会准备情况表
 * 中表格数据提交到后台http://localhost:8898/dataSaveH1/接口
 */
function saveAndSubmit6Click() {
    var partname = getCookie("depart");
    var data = "h1=" + $("#h1").val() + "&h2=" + $("#h2").val() + "&h3="
        + $("#h3").val() + "&h4=" + $("#h4").val() + "&partname=" + partname;
    // console.log(data);
    $.ajax({
        method: "post",
        url: "http://localhost:8898/dataSaveH1/",
        data: data
    }).done(function (text) {
            // console.log(text);
            var code = text["code"];
            if (code == 0) {
                $("#alert6").html("*保存成功！").css("display", "inline-block").css("color", "green");
                $("#saveAndSubmit6").unbind("click");
            } else {
                $("#alert6").html("*请不要重复提交或保存失败请重试！").addClass("wrong").css("display", "inline-block").css("color", "red");
            }
        }
    )
}
/**
 * index7.html民主生活会召开情况表
 * 中表格数据提交到后台http://localhost:8898/dataSaveI1/接口
 */
function saveAndSubmit7Click() {
    var partname = getCookie("depart");
    var data = "i1=" + $("#i1").val() + "&i2=" + $("#i2").val() + "&i3="
        + $("#i3").val() + "&i4=" + $("#i4").val() + "&i5=" + $("#i5").val() + "&partname=" + partname;
    // console.log(data);
    $.ajax({
        method: "post",
        url: "http://localhost:8898/dataSaveI1/",
        data: data
    }).done(function (text) {
            // console.log(text);
            var code = text["code"];
            if (code == 0) {
                $("#alert7").html("*保存成功！").css("display", "inline-block").css("color", "green");
                $("#saveAndSubmit7").unbind("click");
            } else {
                $("#alert7").html("*请不要重复提交或保存失败请重试！").addClass("wrong").css("display", "inline-block").css("color", "red");
            }
        }
    )
}
/**
 * index8.html生活困难党员、老党员基本情况登记表
 * 中表格数据提交到后台http://localhost:8898/dataSaveJ1/接口
 */
function saveAndSubmit8Click() {
    var partname = getCookie("depart");

    var table8ItemCount = 0, data = "partname=" + partname;
    console.log(table8ItemCount);
    for (var i = 0; i < 40; i++) {
        var everyItemVal = $("#j" + (i + 1)+"_4").val();
        if (everyItemVal !== "" && everyItemVal !== undefined) {
            table8ItemCount++;
        }
    }
    data += "&table8ItemCount=" + table8ItemCount;
    console.log(table8ItemCount);
    if (table8ItemCount == 0) {
        data = "partname=" + partname + "&table8ItemCount=" + "0" + "&j1=" + "无" + "&j1_2=" + "无" + "&j1_3=" + "无" + "&j1_4=" + "无" + "&j1_5=" + "无";
    } else {
        for (var j = 0; j < table8ItemCount; j++) {
            data += "&j" + (j + 1) + "=" + $("#j" + (j + 1)).val() + "&j" + (j + 1) + "_2=" + $("#j" + (j + 1) + "_2").val() + "&j" + (j + 1) + "_3=" + $("#j" + (j + 1) + "_3").val() + "&j" + (j + 1) + "_4=" + $("#j" + (j + 1) + "_4").val() + "&j" + (j + 1) + "_5=" + $("#j" + (j + 1) + "_5").val();
        }
    }

    $.ajax({
        method: "post",
        url: "http://localhost:8898/dataSaveJ1/",
        data: data
    }).done(function (text) {
            // console.log(text);
            var code = text["code"];
            if (code == 0) {
                $("#alert8").html("*保存成功！").css("display", "inline-block").css("color", "green");
                $("#saveAndSubmit8").unbind("click");
            } else {
                $("#alert8").html("*请不要重复提交或保存失败请重试！").addClass("wrong").css("display", "inline-block").css("color", "red");
            }
        }
    )
}
/**
 * index9.html党员领导干部结对帮扶困难师生情况统计表
 * 中表格数据提交到后台http://localhost:8898/dataSaveK1/接口
 */
function saveAndSubmit9Click() {
    var partname = getCookie("depart");

    var table9ItemCount = 0, data = "partname=" + partname;
    for (var i = 0; i < 40; i++) {
        var everyItemVal = $("#k" + (i + 1)+"_4").val();
        if (everyItemVal !== "" && everyItemVal !== undefined) {
            table9ItemCount++;
        }
    }
    data += "&table9ItemCount=" + table9ItemCount;
    if (table9ItemCount == 0) {
        data = "partname=" + partname + "&table9ItemCount=" + "0" + "&k1=" + "无" + "&k1_2=" + "无" + "&k1_3=" + "无" + "&k1_4=" + "无" + "&k1_5=" + "无" + "&k1_6=" + "无" + "&k1_7=" + "无";
    } else {
        for (var j = 0; j < table9ItemCount; j++) {
            data += "&k" + (j + 1) + "=" + $("#k" + (j + 1)).val() + "&k" + (j + 1) + "_2=" + $("#k" + (j + 1) + "_2").val() + "&k" + (j + 1) + "_3=" + $("#k" + (j + 1) + "_3").val() + "&k" + (j + 1) + "_4=" + $("#k" + (j + 1) + "_4").val() + "&k" + (j + 1) + "_5=" + $("#k" + (j + 1) + "_5").val() + "&k" + (j + 1) + "_6=" + $("#k" + (j + 1) + "_6").val() + "&k" + (j + 1) + "_7=" + $("#k" + (j + 1) + "_7").val();
        }
    }
    console.log(data);

    $.ajax({
        method: "post",
        url: "http://localhost:8898/dataSaveK1/",
        data: data
    }).done(function (text) {
        // console.log(text);
        var code = text["code"];
        $("#saveAndSubmit9").unbind("click");
        if (code == 0) {
            $("#alert9").html("*保存成功！").css("display", "inline-block").css("color", "green");
        } else {
            $("#alert9").html("*请不要重复提交或保存失败请重试！").addClass("wrong").css("display", "inline-block").css("color", "red");
        }
    })
}
/**
 * person.html个人整改意见书
 * 中表格数据提交到后台http://localhost:8898/dataSaveM1/接口
 */
function saveAndSubmit_personClick() {
    var partname = getCookie("name");

    var tablePersonItemCount = 0, data = "partname=" + partname;
    for (var i = 0; i < 40; i++) {
        var everyItemVal = $("#m" + (i + 1)+"_2").val();
        if (everyItemVal !== "" && everyItemVal !== undefined) {
            tablePersonItemCount++;
        }
    }
    data += "&tablePersonItemCount=" + tablePersonItemCount;
    if (tablePersonItemCount == 0) {
        data = "partname=" + partname + "&tablePersonItemCount=" + "0" + "&m1=" + "无" + "&m1_2=" + "无" + "&m1_3=" + "无";
    } else {
        for (var j = 0; j < tablePersonItemCount; j++) {
            data += "&m" + (j + 1) + "=" + $("#m" + (j + 1)).val() + "&m" + (j + 1) + "_2=" + $("#m" + (j + 1) + "_2").val() + "&m" + (j + 1) + "_3=" + $("#m" + (j + 1) + "_3").val();
        }
    }
    console.log(data);

    $.ajax({
        method: "post",
        url: "http://localhost:8898/dataSaveM1/",
        data: data
    }).done(function (text) {
        // console.log(text);
        var code = text["code"];
        if (code == 0) {
            $("#alert-person").html("*保存成功！").css("display", "inline-block").css("color", "green");
            $("#saveAndSubmit-person").unbind("click");
        } else {
            $("#alert-person").html("*请不要重复提交或保存失败请重试！").addClass("wrong").css("display", "inline-block").css("color", "red");
        }
    })
}
/**
 * index10.html单位整改意见书
 * 中表格数据提交到后台http://localhost:8898/dataSaveN1/接口
 */
function saveAndSubmit_comClick() {
    var partname = getCookie("depart");

    var tableComItemCount = 0, data = "partname=" + partname;
    for (var i = 0; i < 40; i++) {
        var everyItemVal = $("#n" + (i + 1)+"_2").val();
        if (everyItemVal !== "" && everyItemVal !== undefined) {
            tableComItemCount++;
        }
    }
    data += "&tableComItemCount=" + tableComItemCount;
    if (tableComItemCount == 0) {
        data = "partname=" + partname + "&table9ItemCount=" + "0" + "&n1=" + "无" + "&n1_2=" + "无" + "&n1_3=" + "无";
    } else {
        for (var j = 0; j < tableComItemCount; j++) {
            data += "&n" + (j + 1) + "=" + $("#n" + (j + 1)).val() + "&n" + (j + 1) + "_2=" + $("#n" + (j + 1) + "_2").val() + "&n" + (j + 1) + "_3=" + $("#n" + (j + 1) + "_3").val();
        }
    }
    console.log(data);

    $.ajax({
        method: "post",
        url: "http://localhost:8898/dataSaveN1/",
        data: data
    }).done(function (text) {
        // console.log(text);
        var code = text["code"];
        if (code == 0) {
            $("#alert-com").html("*保存成功！").css("display", "inline-block").css("color", "green");
            $("#saveAndSubmit-com").unbind("click");
        } else {
            $("#alert-com").html("*请不要重复提交或保存失败请重试！").addClass("wrong").css("display", "inline-block").css("color", "red");
        }
    })

}

/**
 * index5-2.html中表格动态添加一行或删除一行
 */
function button5_2_addClick (event) {
    event.preventDefault();
    event.stopPropagation();
    var num;
    if ($(this).attr("data-itemNum")) {
        num = parseInt($(this).attr("data-itemNum"));
        $("#tr5-" + (num + 1)).after("<tr id=\'tr5-" + (num + 2) + "\'><td><input type=\'text\' name=\'d" + (num + 1) + "\' id=\'d" + (num + 1) + "\'></td><td colspan=\'100\'><textarea name=\'d" + (num + 1) + "1\' id=\'d" + (num + 1) + "_1\' style=\'width:100%;height:100%;outline:none;\'></textarea></td></tr>");
        $(this).attr("data-itemNum", num + 1);
    } else {
        alert("页面加载错误，请重新加载，或者联系管理员！");
    }
}
function button5_2_cutClick(event) {
        event.preventDefault();
        event.stopPropagation();
        var num;
        var button5Add = $("#button5-2-add");
        if (button5Add.attr("data-itemNum")) {
            num = parseInt(button5Add.attr("data-itemNum"));
            if (num > 0) {
                $("#tr5-" + (num + 1)).remove();
                button5Add.attr("data-itemNum", num - 1);
            }
        }
    }
/**
 * index8.html中表格动态添加一行或删除一行
 */
function button8_addClick (event) {
    event.preventDefault();
    event.stopPropagation();
    var num;
    if ($(this).attr("data-itemNum")) {
        num = parseInt($(this).attr("data-itemNum"));
        $("#tr8-" + (num + 1)).after("<tr id=\'tr8-" + (num + 2) + "\'><td>" + (num + 1) + "</td><td><input type=\'text\' name=\'j" + (num + 1) + "\' id=\'j" + (num + 1) + "\'></td><td><input type=\'text\' name=\'j" + (num + 1) + "2\' id=\'j" + (num + 1) + "_2\'></td><td><input type=\'text\' name=\'j" + (num + 1) + "3\' id=\'j" + (num + 1) + "_3\'></td><td><input type=\'text\' name=\'j" + (num + 1) + "4\' id=\'j" + (num + 1) + "_4\'></td><td><input type=\'text\' name=\'j" + (num + 1) + "5\' id=\'j" + (num + 1) + "_5\'></td></tr>");
        $(this).attr("data-itemNum", num + 1);
    } else {
        alert("页面加载错误，请重新加载，或者联系管理员！");
    }
}
function button8_cutClick (event) {
        event.preventDefault();
        event.stopPropagation();
        var num;
        var button8Add = $("#button8-add");
        if (button8Add.attr("data-itemNum")) {
            num = parseInt(button8Add.attr("data-itemNum"));
            if (num > 0) {
                $("#tr8-" + (num + 1)).remove();
                button8Add.attr("data-itemNum", num - 1);
            }
        }
    }
/**
 * index9.html中表格动态添加一行或删除一行
 */
function button9_addClick (event) {
        event.preventDefault();
        event.stopPropagation();
        var num;
        if ($(this).attr("data-itemNum")) {
            num = parseInt($(this).attr("data-itemNum"));
            $("#tr9-" + (num + 1)).after("<tr id=\'tr9-" + (num + 2) + "\'><td><input type=\'text\' name=\'k" + (num + 1) + "\' id=\'k" + (num + 1) + "\'></td><td><input type=\'text\' name=\'k" + (num + 1) + "2\' id=\'k" + (num + 1) + "_2\'></td><td><select name=\'帮扶对象类别\' class=\'form-control\' id=\'k" + (num + 1) + "_3\'><option value=\'教师\'>教师</option><option value=\'学生\'>学生</option></select></td><td><input type=\'text\' name=\'k" + (num + 1) + "4\' id=\'k" + (num + 1) + "_4\'></td><td><input type=\'text\' name=\'k" + (num + 1) + "5\' id=\'k" + (num + 1) + "_5\'></td><td><textarea type=\'text\' name=\'k" + (num + 1) + "6\' id=\'k" + (num + 1) + "_6\'></textarea></td><td><input type=\'text\' name=\'k" + (num + 1) + "7\' id=\'k" + (num + 1) + "_7\'></td></tr>");
            $(this).attr("data-itemNum", num + 1);
        } else {
            alert("页面加载错误，请重新加载，或者联系管理员！");
        }
    }
function button9_cutClick (event) {
        event.preventDefault();
        event.stopPropagation();
        var num;
        var button9Add = $("#button9-add");
        if (button9Add.attr("data-itemNum")) {
            num = parseInt(button9Add.attr("data-itemNum"));
            if (num > 0) {
                $("#tr9-" + (num + 1)).remove();
                button9Add.attr("data-itemNum", num - 1);
            }
        }
    }
/**
 * person.html中表格动态添加一行或删除一行
 */
function person_addClick (event) {
        event.preventDefault();
        event.stopPropagation();
        var num;
        if ($(this).attr("data-itemNum")) {
            num = parseInt($(this).attr("data-itemNum"));
            $("#person-" + (num + 1)).after("<tr id=\'person-" + (num + 2) + "\'><td>" + (num + 1) + "</td><td><input type=\'text\' name=\'m" + (num + 1) + "\' id=\'m" + (num + 1) + "\'></td><td><textarea type=\'text\' name=\'m" + (num + 1) + "2\' id=\'m" + (num + 1) + "_2\'></textarea></td><td><input type=\'text\' name=\'m" + (num + 1) + "3\' id=\'m" + (num + 1) + "_3\'></td></tr>");
            $(this).attr("data-itemNum", num + 1);
        } else {
            alert("页面加载错误，请重新加载，或者联系管理员！");
        }
    }
function person_cutClick (event) {
        event.preventDefault();
        event.stopPropagation();
        var num;
        var personAdd = $("#person-add");
        if (personAdd.attr("data-itemNum")) {
            num = parseInt(personAdd.attr("data-itemNum"));
            if (num > 0) {
                $("#person-" + (num + 1)).remove();
                personAdd.attr("data-itemNum", num - 1);
            }
        }
    }
/**
 * index10.html中表格动态添加一行或删除一行
 */
function com_addClick (event) {
        event.preventDefault();
        event.stopPropagation();
        var num;
        if ($(this).attr("data-itemNum")) {
            num = parseInt($(this).attr("data-itemNum"));
            $("#com-" + (num + 1)).after("<tr id=\'com-" + (num + 2) + "\'><td>" + (num + 1) + "</td><td><input type=\'text\' name=\'n" + (num + 1) + "\' id=\'n" + (num + 1) + "\'></td><td><textarea type=\'text\' name=\'n" + (num + 1) + "_2\' id=\'n" + (num + 1) + "2\'></textarea></td><td><input type=\'text\' name=\'n" + (num + 1) + "3\' id=\'n" + (num + 1) + "_3\'></td></tr>");
            $(this).attr("data-itemNum", num + 1);
        } else {
            alert("页面加载错误，请重新加载，或者联系管理员！");
        }
    }
function com_cutClick (event) {
        event.preventDefault();
        event.stopPropagation();
        var num;
        var comAdd = $("#com-add");
        if (comAdd.attr("data-itemNum")) {
            num = parseInt(comAdd.attr("data-itemNum"));
            if (num > 0) {
                $("#com-" + (num + 1)).remove();
                comAdd.attr("data-itemNum", num - 1);
            }
        }
    }