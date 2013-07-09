<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.ztesoft.zsmart.core.utils.Base"%>
<%@page import="com.ztesoft.zsmart.core.service.DynamicDict" %> 
<%
 String strWebRoot = "";
 if(strWebRoot==null||strWebRoot.length()==0)
 {
	strWebRoot = request.getScheme();
	strWebRoot += "://";
	strWebRoot += request.getServerName();
 	int port = request.getServerPort();
 	if (port != 80){
 		strWebRoot += ":" + port;
 	}
 	strWebRoot +=  request.getContextPath()+"/";
 }
 DynamicDict sysLoginDto = (DynamicDict)session.getAttribute("SYS_LOGIN_INFO");
 if(sysLoginDto==null){
 	request.getSession().setAttribute("OLD_URL",strWebRoot+"app/user.jsp");
	response.sendRedirect(strWebRoot+"app/login.jsp");
	return;
 }
 DynamicDict detailsBO = sysLoginDto.getBOByName("UserDetailsDto");
 int roleNum = detailsBO.getCountByName("USER_ROLE");
 boolean havePower = false;
 for(int i=0;i<roleNum;i++){
	HashMap roleDict = (HashMap)detailsBO.getValueByName("USER_ROLE", i);
	String roleId = (String)roleDict.get("ROLE_ID");
	if(roleId.equals("video00001")){
		havePower = true;
		break;
	}
 }
 String userId = sysLoginDto.getString("UserId");
 String userCode = sysLoginDto.getString("UserCode");
 String loginNo = sysLoginDto.getString("LoginNo");
%>
<!DOCTYPE html>
<html >
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>个人中心 </title>
<link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" >
<link href="../css/page.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../plugins/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="../plugins/themes/icon.css">

</head>
<body style="width:800px; margin:0 auto;" onload="appUser.init();"> 
	<div class="section">
		<!-- <div class="top">
			<div class="title"> 个人中心 </div>
		</div>  -->
		<div class="row-fluid">
			<div class="span3">
				<ul class="nav nav-list bs-docs-sidenav">
					<li class="active"><a href="user.jsp"><i class="icon-user"></i>个人信息</a></li>
					<li><a href="account.jsp"><i class="icon-bookmark"></i>账户信息 </a></li>
					<li><a href="myapp.jsp"><i class="icon-inbox"></i>我的应用</a></li> 
					<%if(havePower){%>
					<li><a href="myvideo.jsp"><i class="icon-inbox"></i>我的视频</a></li> 
					<%}%>
					<li><a href="modifyPWD.jsp"><i class="icon-comment"></i>密码修改</a></li>
				</ul> 
			</div>
			<div class="span9">
				<div class="box-content">
					<div class="row-fluid">

						<div class="span6">
							<fieldset>
								<legend>注册信息 </legend>

								<div class="control-group">
									<label class="control-label" for="inputEmail">用户账号</label>
									<div class="controls">
										<input type="text" id="USER_CODE" name="USER_CODE" value="<%=userCode%>" disabled="true">  
									</div>
									<label class="control-label"  >用户名</label>
									<div class="controls">
										<input type="text" id="USER_NAME" name="USER_NAME" value="" disabled="false">  
									</div>
									<label class="control-label" >用户类型</label>
									<div class="controls">
										<select id="USER_TYPE" name="USER_TYPE" datatype="*" nullmsg="请选择用户类型！" disabled>
											<option value="">--请选择--</option>
											<option value="01">普通用户</option>
											<option value="02">园区企业用户</option>
											<option value="03">区外企业用户</option>
										</select>
										
									</div>
								</div>
							</fieldset>
							<fieldset>
								<legend>安全信息 </legend>
								<div class="control-group" >
									<label class="control-label" >安全问题</label>
									<div class="controls">
										<select id="01_SAFETY" name="01_SAFETY" datatype="*" nullmsg="请选择安全问题！" disabled>
											<option value="">--请选择--</option>
											<option value="001">父亲生日</option>
											<option value="002">母亲的名字</option>
										</select> 
									</div>
									<label class="control-label" >问题答案</label>
									<div class="controls">
										<input type="text" id="01_SAFETY_ANSWER" name="01_SAFETY_ANSWER" maxlength="40" datatype="*1-40" nullmsg="请填写问题答案！" disabled>
									</div>
									<label class="control-label" for="inputEmail">邮箱地址</label>
									<div class="controls">
										<input type="text" id="E_MAIL" name="E_MAIL" datatype="e" nullmsg="请输入您的邮箱！" errormsg="请输入正确邮箱" disabled>
									</div>
								</div> 
							</fieldset>

						</div> <!-- span6 -->

						<div class="span6">
							<fieldset>
								<legend>个人信息 </legend>
								<div class="control-group">
									<label class="control-label" >姓名</label>
									<div class="controls">
										<input type="text" id="02_NAME" name="02_NAME" value="" disabled>  
									</div>
									<label class="control-label" >电话</label>
									<div class="controls">
										<input type="text" id="02_TEL" name="02_TEL" value="" disabled>  
									</div>
									<label class="control-label" >地址</label>
									<div class="controls">
										<input type="text" id="02_ADDR" name="02_ADDR" value="" disabled>  
									</div>
								</div>
								
							</fieldset>

							<fieldset>
								<legend>企业信息 </legend>

								<div class="control-group">
									<label class="control-label" >企业名称</label>
									<div class="controls">
										<input type="text" id="03_NAME" name="03_NAME" maxlength="200"value="" disabled>  
									</div>
									<label class="control-label" >联系电话</label>
									<div class="controls">
										<input type="text"  id="03_TEL" name="03_TEL" maxlength="20" value="" disabled>  
									</div>
									<label class="control-label" >地址</label>
									<div class="controls">
										<input type="text" id="03_ADDR" name="03_ADDR" maxlength="200" value="" disabled>  
									</div>
								</div> 

							</fieldset>
							<span class="btn btn-info m_btn" id="cancel_btn" style="display:none;">取消修改</span>
							<span class="btn btn-success" id="save_btn" style="display:none;">保存修改</span>
							<span class="btn btn-info m_btn" id="modify_btn">修改用户</span><span id="modifyResult"></span>
							<span class="btn btn-info m_btn" id="exit_btn">登出</span>
						</div>  	
					</div>	
				</div>
			</div> 
		</div>

	</div> <!-- 左侧边NAV  -->	 
<script type="text/javascript" src="../js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="../plugins/jquery.easyui.min.js"></script>
<script type="text/javascript" src="../js/artDialog.js"></script>
<script type="text/javascript" src="../js/iframeTools.js"></script> 
<script language="javascript" src="../sys/js/request.js"></script>
<script language="javascript" src="../sys/js/jquery.xml2json.js"></script>
<script language="javascript" src="../sys/js/dict.js"></script>
<script type="text/javascript" src="./js/public.js"></script>
<script type="text/javascript" src="./js/user.js"></script>
<script type="text/javascript">
var $userId = "<%=userId%>";
var $loginNo = "<%=loginNo%>";
</script>
</body> 
<script type="text/javascript"> 
$(function () {
	// 关闭自身，厉害哦 
	$("#exit_btn").click(function () {
		
		$.messager.defaults = { ok: "确定"};
		$.ajax({
		    url: '../loginservlet.do?action=logout',
		    type:'POST',
		    data: 'loginNo=<%=loginNo%>',
		    dataType: "json",
		    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		    error: function(msg) {      // 设置表单提交出错 
		    	$.messager.alert('温馨提醒','执行出错：'+msg.responseText,'error');
	        },
		    success: function (resp) {
		    	if(resp.code=='0'){
		    		$.messager.alert('温馨提醒',resp.msg,'info');
		    		art.dialog.opener.location.reload();
				}else{
		    		$.messager.alert('温馨提醒',resp.msg,'error');
		    	}
		    },
		    cache: false
		});
	});

});
</script>
</html>