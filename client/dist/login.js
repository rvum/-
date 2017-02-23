/**
 * Created by rvum on 2016/12/10.
 */
/*var button = document.getElementById("button");
 var wrong = document.getElementById("wrong");
 var username = document.getElementById("username");
 var password = document.getElementById("password");
 window.onload=function (){
 button.addEventListener('click',login);
 };
 function login(){
 var data = "managername="+username.value+"&managerpassword="+password.value;
 var request = new XMLHttpRequest();
 request.open("POST","http://localhost:8898/managerlogin/");
 request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
 request.send(data);
 request.onreadystatechange=function(){
 if(request.readyState==4){
 if(request.status==200){
 var result = JSON.parse(request.responseText);
 var code = result.code;
 if(code==0){
 window.location.href="../pages/manage.html";
 }else{
 wrong.innerHTML="*密码错误";
 wrong.className="wrongLogin";
 }
 }
 }
 }
 }*/
$(document).ready(
    $("#button").click(function () {
        var data = "managername=" + $("#username").val() + "&managerpassword=" + $("#password").val();
        $.ajax({
            method: "POST",
            url: "http://localhost:8898/managerlogin/",
            data: data
        }).done(function (text) {
                console.log(text);
                var code = text["code"];
                if (code == 0) {
                    window.location.href = "../manage.html";
                } else {
                    $("#wrong").html("*密码错误");
                    $("#wrong").addClass("wrongLogin");
                }
            }
        )
    }))