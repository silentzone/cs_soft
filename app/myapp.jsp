<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.ztesoft.zsmart.core.utils.Base"%>
<%@page import="com.ztesoft.zsmart.core.service.DynamicDict" %> 
<%@page import="com.ztesoft.uboss.desktop.DesktopPublic" %>
<%
 response.setHeader("Pragma","No-cache"); 
 response.setHeader("Cache-Control","no-cache"); 
 response.setDateHeader("Expires", 0);
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
 DynamicDict dict = new DynamicDict();
 dict.setServiceName("UBOSS_DESKTOP_APP_001");
 dict.setValueByName("OP_TYPE","4");
 dict.setValueByName("QRY_TYPE","0");
 dict.setValueByName("USER_ID",userId);
 try{
	DesktopPublic.webCallExternal(dict);
 }catch(Exception e){
 	return;
 }
 long appCount = dict.getLong("APP_COUNT");
 long ordCount = dict.getLong("ORD_COUNT");
%>
<!DOCTYPE html>
<html >
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="pragma" content="no-cache"> 
<meta http-equiv="cache-control" content="no-cache"> 
<meta http-equiv="expires" content="0">
<title>个人中心-我的应用 </title>
<link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" >
<link href="../css/page.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../plugins/themes/gray/easyui.css">
<link rel="stylesheet" type="text/css" href="../plugins/themes/icon.css">
<link type="text/css" href="../plugins/jscroll/jscroll.css" rel="stylesheet" media="all" /> 
</head>
<body style="width:800px; margin:0 auto;" onload="appMy.init();"> 
<div class="section">
	<div class="row-fluid">
		<div class="span3">
			<ul class="nav nav-list sideMenu" alt="myapp">
				 <jsp:include page="includ/nav_user.jsp" flush="true" /> 
			</ul> 
		</div>
		<div class="span9">
			<div class="box-content">
				<div class="top"> <a href="myapp/updata.jsp" class="btn btn_right"> <i class="icon-arrow-up"></i>上传新应用</a><!-- <a href="#" class="btn btn_right"> <i class="icon-upload"></i>应用推广</a> --> 我的应用</div>	 
				<div class="app_list_mini" style="width: 100%; height: 200px; overflow: auto;"> 
					<ul class="clearfix">
						<%for(int i=0;i<appCount;i++){
							HashMap map = (HashMap)dict.getValueByName("APP", i);
						%>
						<li>
							<img src="<%=map.get("APP_PIC")%>" />
							 <p>
								<a href="javascript:void(0)" class="btn btn-mini" appId="<%=map.get("APP_ID")%>" appVersions="<%=map.get("APP_VERSIONS")%>"><%=map.get("APP_NAME")%></a>
							 </p> 
						</li>
						<%}%> 




					</ul>
				</div>
				<div class="top">已购应用</div>
				<div class="app_list_mini" style="width: 100%; height: 200px; overflow: auto;"> 
					<ul class="clearfix">
						<%for(int i=0;i<ordCount;i++){
							HashMap map = (HashMap)dict.getValueByName("ORD", i);
						%>
						<li> 
							<img src="<%=map.get("APP_PIC")%>" />
							 <p>
							 	<a href="javascript:void(0)" class="btn btn-mini" appId="<%=map.get("APP_ID")%>" appVersions="<%=map.get("APP_VERSIONS")%>"><%=map.get("APP_NAME")%></a>
							 </p>
						</li> 
						<%}%> 
					</ul>
				</div>
			</div>
		
		</div>
	</div>
</div>
<form method="post" name="detailForm" id="detailForm">
	<input type="hidden" id="appId" name="appId" value="">
	<input type="hidden" id="appVersions" name="appVersions" value="">
</form>
<script type="text/javascript" src="../js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="../plugins/jquery.easyui.min.js"></script>
<script type="text/javascript" src="../plugins/jscroll/jquery.mousewheel.js"></script>
<script type="text/javascript" src="../plugins/jscroll/mwheelIntent.js"></script>
<script type="text/javascript" src="../plugins/jscroll/jscroll.js"></script>
<script language="javascript" src="../sys/js/request.js"></script>
<script language="javascript" src="../sys/js/dict.js"></script>
<script type="text/javascript" src="./js/public.js"></script>
<script type="text/javascript" src="./js/myapp.js"></script>
<script type="text/javascript">
var $userId = "<%=userId%>";
var $loginNo = "<%=loginNo%>";
$('.app_list_mini').jScrollPane();
// 标识当前页面 
var markid = $(".nav-list").attr("alt");
$("#"+markid).addClass("active");
</script>
</body> 
</html>
<%dict.destroy();%>