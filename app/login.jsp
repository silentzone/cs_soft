<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String tg = request.getParameter("tg")==null?"":(String)request.getParameter("tg");
%>
<!DOCTYPE html>
<html >
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>登录 </title>
<link rel="stylesheet" type="text/css" href="../css/page.css"> 
<link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" >
<link rel="stylesheet" type="text/css" href="../plugins/themes/gray/easyui.css">
<link rel="stylesheet" type="text/css" href="../plugins/themes/icon.css">
<script type="text/javascript"  src="../js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="../plugins/jquery.easyui.min.js"></script>
<script language="javascript" src="../sys/js/Security.js"></script>
<script type="text/javascript" src="../js/artDialog.js"></script>
<script type="text/javascript" src="../js/iframeTools.js"></script>
<script type="text/javascript" src="../plugins/alert/alert.js"></script>  


<script type="text/javascript"> 
$(function () {  
	 $(document).keydown(function(e) { 
	 	 var curKey = e.which; 
            if(curKey == 13){ 
                login();
                return false; 
            } 
	 });


	$("#login_btn").click(function () { 
		 login(); 
	});

 
	$("#reg_btn").click(function () { 
	 	var win = art.dialog.top;  
	 	art.dialog.close(); 
	 	// 弹注册 
	 	if(win.showDialog(12)) {
	 		return;
	 	};//  
	 	win.art.dialog.open('app/reg.jsp',/** 弹出ART窗体*/
			{   
				id :"12",
				title: "注册",	
				width:830,//设置窗口宽度自动适应width
				height:550,
				resize:false,
				lock: true,
				background: '#000', // 背景色
				opacity: 0.8// 透明度 
			}
		);
	 	
	});


	 
});

// var response = null;
function login(){
	// 清除之前的 
 	// $.alert().clear();

	$.messager.defaults = { ok: "确定"}; //  替换为 $.alert
	var userName = $("#edt_username").val();
	if( !userName && userName == "") {
		$.alert('温馨提醒:请输入用户名','warning');
		return;
	}
	var password = $('#edt_pwd').val();
	if(password != null && password !="")
	{
		var base64Password = Base64.base64encode(Base64.utf16to8(password));
		var md5Password = MD5.toMD5(base64Password);
		$('#md5Password').val(md5Password);
	} else {
		$.alert('温馨提醒:请输入密码','warning');
		return;
	}

	// 防止重复提交
 	// if(response) { response.abort(); return; } 
 	// 添加当前窗口的 等待状态   		 
	// top.art.dialog.focus.showloading();
	

	// // 添加当前窗口的 等待状态   		 
	// top.art.dialog.focus.showloading();	
	
	var response = $.ajax({
	    url: '../loginservlet.do?action=login',
	    type:'POST',
	    data: $("#fm_login").serialize(),
	    dataType: "json",
	    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
	    error: function(msg) {      // 设置表单提交出错 
	    	$.alert('温馨提醒','执行出错：'+msg.responseText,'error');
        },
	    success: function (resp) { 
	    	var code = resp.code; 
	    	if(code=='0'){  
	    		<%if(tg.equals("1")){%> 
	    			art.dialog.opener.location.reload();
	    		<%}else{%>
	    			art.dialog.opener.portal.toggle(resp);
		    		window.location.href=resp.url;
	    		<%}%>
			}else{
				var msg = resp.msg;
				if(code=="-1"){
					msg = "达到密码重试错误次数,用户被锁定";
				}else if(code=="-2"){
					msg = "密码错误";
				}else if(code=="-3"){
					msg = "用户名不存在";
				}else if(code=="-4"){
					msg = "用户被锁定";
				}else if(code=="-6"){
					msg = "系统忙，请稍后再试";
				}
	    		$.alert('温馨提醒:'+ msg , 'error');
	    	} 
	    	// top.art.dialog.focus.hideloading(); 
	    },
	    cache: false
	});
}
</script>


</head>

<body>
	<div class="section">
	
 	<form id="fm_login" action="loginservlet.do?action=login" METHOD="POST" >
		<div class="reg_box box-content">
			<div class="control-group">
				<label class="control-label" for="username">用户名</label>
				<div class="controls">
					<input type="text" id="edt_username" name="edt_username" maxlength="40" class="span6"  >  
				</div>
			</div>
			<div class="control-group">
				<label class="control-label" for="password">密码</label>
				<div class="controls">
					<input type="password" id="edt_pwd" name="edt_pwd"  maxlength="10" class="span6"  >
					<input type="hidden" id="md5Password" NAME="md5Password">
				</div>
			</div>
			<div id="tip" style="height:36px;"></div>
			<div class="control-group">
				<div class="controls">
					<span class="btn btn-success m_btn" id="login_btn">登录</span>
					<span class="btn btn-info m_btn" id="reg_btn">注册</span>
				</div>
			</div> 
		</div>
	</form>
	</div>	
</body>
</html>
