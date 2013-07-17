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
 	//request.getSession().setAttribute("OLD_URL",strWebRoot+"app/app.jsp");
	//response.sendRedirect(strWebRoot+"app/login.jsp");
	//return;
 }
 DynamicDict dict = new DynamicDict();
 dict.setServiceName("UBOSS_DESKTOP_APP_001");
 dict.setValueByName("OP_TYPE","4");
 dict.setValueByName("QRY_TYPE","1");
 try{
	DesktopPublic.webCallExternal(dict);
 }catch(Exception e){
 	return;
 }
 long appCount = dict.getLong("APP_COUNT");

%>

<!DOCTYPE html> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="pragma" content="no-cache"> 
<meta http-equiv="cache-control" content="no-cache"> 
<meta http-equiv="expires" content="0">
<title>云应用-应用商店 </title>
<link rel="stylesheet" type="text/css" href="../plugins/themes/default/easyui.css">	
<link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="../css/page.css" rel="stylesheet" rel="stylesheet" type="text/css">
<link type="text/css" href="../plugins/jscroll/jscroll.css" rel="stylesheet" media="all" /> 
<link href="../plugins/themes/icon.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="../plugins/editor/themes/default/default.css" />
</head>

<body class="page" style="width:800px; height:600px;" onload="appStore.init();"> 
<div class="section"> 
	<div class="row-fluid">
		<div class="span2">
			<ul class="sideMenu">
		        <!-- <li ><a href="app_search.html"><i class="icon-search"></i> 搜索 </a></li> -->
				<li class="active"><a href="javascript:void(0)" onclick="appStore.queryApp('0',this);"><i class="icon-map-marker"></i> 所有</a></li>
				<li ><a href="javascript:void(0)" onclick="appStore.queryApp('1',this);"><i class="icon-gift"></i> 最新 </a></li>
				<li><a href="javascript:void(0)" onclick="appStore.queryApp('2',this);"><i class="icon-film"></i> 免费</a></li>
		    </ul>
		</div>
		<div class="span10"> 
			<div class="box-content row-fluid"> 
		 	 	<div class="span9"> 
		 	 		    <div class="top"> 
		 	 		    	<span class="title" id="type_title"><i class="icon-gift"></i> 最新</span>
						</div>	
		 	 		    <div class="box-content clearfix">
							<div class="video_list jscroll_list clearfix"> 
								<ul id="result_ul">
									<%for(int i=0;i<appCount;i++){
									HashMap map = (HashMap)dict.getValueByName("APP", i);
									%>
									<li class="text-center"> 
										<img src="<%=map.get("APP_PIC")%>" />
										 <p><a href="javascript:void(0)" class="btn btn-mini" appId="<%=map.get("APP_ID")%>" appVersions="<%=map.get("APP_VERSIONS")%>"><%=map.get("APP_NAME")%> </a></p> 
									</li>
									<%}%>
								</ul>
							</div>	
						</div>
				 		<!-- <div class="top">
							<span class="title">推荐应用</span> 	 
				 		</div>
						<div class="box-content ">
							<div class="video_list jscroll_list clearfix"> 
								<ul>
									  
								</ul>
							</div>	
						</div>  -->
		 	 	</div><!-- span9 -->
		 	 	<div class="span3">
		 	 	 	<div class="sidebar-nav"> 
		 	 	 		    <div class="top"><span class="title">应用标签</span></div>
							<ul class="nav nav-list">   
								<li><a href="javascript:void(0)" onclick="appStore.queryApp('001',this);"><i class="icon-th"></i> 游戏</a></li>
								<li><a href="javascript:void(0)" onclick="appStore.queryApp('002',this);"><i class="icon-align-justify"></i> 音乐 </a></li>  
								<li><a href="javascript:void(0)" onclick="appStore.queryApp('003',this);" class="cookie-delete"><i class="icon-wrench"></i> 应用工具 </a></li>
								<li><a href="javascript:void(0)" onclick="appStore.queryApp('004',this);" class="sidenav-style-1"><i class="icon-align-left"></i> 其他 </a></li> 
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
</div> 
<script type="text/javascript" src="../js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="../plugins/jquery.easyui.min.js"></script>
<script type="text/javascript" src="../plugins/bootstrap/js/bootstrap.js"></script>  
<script type="text/javascript" src="../plugins/jscroll/jquery.mousewheel.js"></script>
<script type="text/javascript" src="../plugins/jscroll/mwheelIntent.js"></script>
<script type="text/javascript" src="../plugins/jscroll/jscroll.js"></script>
<script type="text/javascript" src="../plugins/chklist/chklist.js"></script>
<script type="text/javascript" src="../plugins/editor/kindeditor.js"></script>
<script type="text/javascript" src="../plugins/editor/lang/zh_CN.js"></script>
<script type="text/javascript" src="../plugins/datetimepicker/WdatePicker.js"></script>
<script src="../plugins/tab/tab.js" type="text/javascript"></script>
<script type="text/javascript" src="../sys/js/request.js"></script>
<script type="text/javascript" src="../sys/js/dict.js"></script>
<script type="text/javascript" src="./js/appstore.js"></script>
<script type="text/javascript">
$(function() {
	$('.video_list').jScrollPane(); // 动态添加需要刷新  
 });
</script>
</body>
</html>