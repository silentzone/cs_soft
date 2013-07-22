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
 	request.getSession().setAttribute("OLD_URL",strWebRoot+"app/modifyPWD.jsp");
	response.sendRedirect(strWebRoot+"app/login.jsp");
	return;
 }
 String userId = sysLoginDto.getString("UserId");
 String userCode = sysLoginDto.getString("UserCode");
%>
<!DOCTYPE html>
<html >
<head>
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>个人中心 </title>
<link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" >
<link href="../css/page.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../plugins/themes/gray/easyui.css">
<link rel="stylesheet" type="text/css" href="../plugins/themes/icon.css">
</head>
<body style="width:800px; margin:0 auto;" onload="appPWD.init();"> 
	<div class="section">
		<!-- <div class="top">
			<div class="title"> 个人中心 </div>
		</div>  -->
		<div class="row-fluid">
			<div class="span3">
				<ul class="nav nav-list sideMenu" alt="modifyPWD">
					 <jsp:include page="includ/nav_user.jsp" flush="true" /> 
				</ul> 
			</div>
			<div class="span9">
				<div class="box-content">
					<div class="row-fluid">


						<div class="span6">

							<fieldset>
								<div class="control-group">
									<label class="control-label" >原密码</label>
									<div class="controls">
										<input type="password" id="OLD_PWD" name="OLD_PWD" maxlength="18"value="" >  
									</div>
									<label class="control-label" >新密码</label>
									<div class="controls">
										<input type="password"  id="NEW_PWD" name="NEW_PWD" maxlength="18" value="" >  
									</div>
									<label class="control-label" >确认新密码</label>
									<div class="controls">
										<input type="password" id="NEW_PWD_RE" name="NEW_PWD_RE" maxlength="18" value="" >  
									</div>
								</div> 

							</fieldset>
							<div class="control-group">
									<div class="controls">
										<span class="btn btn-info m_btn" id="modify_btn">确认修改</span><span id="modifyResult"></span>
									</div>
							</div>
							
						</div>  	
					</div>	
				</div>
			</div> 
		</div>

	</div> <!-- 左侧边NAV  -->	 

<script type="text/javascript" src="../js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="../plugins/jquery.easyui.min.js"></script>
<script language="javascript" src="../sys/js/request.js"></script>
<script language="javascript" src="../sys/js/jquery.xml2json.js"></script>
<script language="javascript" src="../sys/js/dict.js"></script>
<script language="javascript" src="../sys/js/Security.js"></script>
<script type="text/javascript" src="./js/modifyPWD.js"></script>
<script type="text/javascript">
var $userId = "<%=userId%>";
var $userCode = "<%=userCode%>";

	// 标识当前页面 
	var markid = $(".nav-list").attr("alt");
	$("#"+markid).addClass("active");
</script>
</body>
</html>