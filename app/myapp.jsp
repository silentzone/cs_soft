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
 	request.getSession().setAttribute("OLD_URL",strWebRoot+"app/myapp.jsp");
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
<title>个人中心-我的应用 </title>
<link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" >
<link href="../css/page.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../plugins/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="../plugins/themes/icon.css">

</head>
<body style="width:800px; margin:0 auto;" onload="appMy.init();"> 
<div class="section">
	<!-- <div class="top">
		<div class="title"> 个人中心 </div>
	</div>  -->
	<div class="row-fluid">
		<div class="span3">
			<ul class="nav nav-list bs-docs-sidenav">
				<li><a href="user.jsp"><i class="icon-user"></i>个人信息</a></li>
				<li><a href="account.jsp"><i class="icon-bookmark"></i>账户信息 </a></li>
				<li class="active"><a href="myapp.jsp"><i class="icon-inbox"></i>我的应用</a></li> 
				<li><a href="modifyPWD.jsp"><i class="icon-comment"></i>密码修改</a></li>
			</ul> 
		</div>
		<div class="span9">
			<div class="box-content">
				<div class="top"> <a href="myapp/updata.jsp" class="btn btn_right"> <i class="icon-arrow-up"></i>上传</a> 我的应用</div>	 
				<div class="app_list_mini"> 
					<ul class="clearfix">
						<li> 
							<img src="../img/icon/icon_app.png" />
							 <p><a href="myapp/app_detail.html" class="btn btn-mini ">查看详细</a></p> 
						</li>
					</ul>
				</div>
				<div class="top">已购应用</div>
				<div class="app_list_mini"> 
					<ul class="clearfix">
						<li> 
							<img src="../img/icon/icon_app.png" />
							 <p><a href="myapp/own.html" class="btn btn-mini ">查看详细</a> </p> 
						</li> 
						 
					</ul>
				</div>
			</div>
		
		</div>
	</div>

</div>	 
<script type="text/javascript" src="../js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="../plugins/jquery.easyui.min.js"></script>
<script language="javascript" src="../sys/js/request.js"></script>
<script language="javascript" src="../sys/js/jquery.xml2json.js"></script>
<script language="javascript" src="../sys/js/dict.js"></script>
<script type="text/javascript" src="./js/public.js"></script>
<script type="text/javascript" src="./js/myapp.js"></script>
<script type="text/javascript">
var $userId = "<%=userId%>";
var $loginNo = "<%=loginNo%>";
</script>
</body> 
</html>