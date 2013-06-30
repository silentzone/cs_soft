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
	response.sendRedirect(strWebRoot+"app/login.jsp");
	return;
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
<script type="text/javascript" src="../js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="../plugins/jquery.easyui.min.js"></script>
<script language="javascript" src="../sys/js/request.js"></script>
<script language="javascript" src="../sys/js/jquery.xml2json.js"></script>
<script language="javascript" src="../sys/js/dict.js"></script>
<script type="text/javascript" src="./js/public.js"></script>
<script type="text/javascript" src="./js/user.js"></script>
<script type="text/javascript">
var $userId = "<%=userId%>";
var $loginNo = "<%=loginNo%>";
</script>
</head>
<body style="width:800px; margin:0 auto;" onload="appUser.init();"> 
	<div class="section">
		<div class="top">
			<div class="title"> 个人中心 </div>
		</div> 
		<div class="row-fluid">
			<div class="span3">
				<ul class="nav nav-list bs-docs-sidenav">
					<li class="active"><a href="user.jsp"><i class="icon-user"></i>个人信息</a></li>
					<li><a href="account.jsp"><i class="icon-bookmark"></i>账户信息 </a></li>
					<li><a href="#"><i class="icon-inbox"></i>我的应用</a></li> 
					<li><a href="modifyPassWord.jsp"><i class="icon-comment"></i>密码修改</a></li>
				</ul> 
			</div>
			<div class="span9">
				<div class="box-content">
					<div class="row-fluid">


						<div class="span6">

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
							<span class="btn btn-success" id="save_btn" style="display:none;">保存修改</span>
							<span class="btn btn-info m_btn" id="modify_btn">修改用户</span><span id="modifyResult"></span>
						</div>  	
					</div>	
				</div>
			</div> 
		</div>

	</div> <!-- 左侧边NAV  -->	 

</body>
</html>