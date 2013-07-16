<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.ztesoft.zsmart.core.utils.Base"%>
<%@page import="com.ztesoft.zsmart.core.service.DynamicDict" %> 
<%
String strWebRoot = "";
if(strWebRoot==null||strWebRoot.length()==0){
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
	request.getSession().setAttribute("OLD_URL",strWebRoot+"app/cloud.jsp");
	response.sendRedirect(strWebRoot+"app/login.jsp");
	return;
}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>云应用</title>  

	<link rel="stylesheet" type="text/css" href="../plugins/themes/gray/easyui.css">
	<link rel="stylesheet" type="text/css" href="../plugins/themes/icon.css">

	<script type="text/javascript" src="../js/jquery-1.8.2.min.js"></script>  
	<script type="text/javascript" src="../plugins/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="../js/artDialog.js"></script>
	<script type="text/javascript" src="../js/iframeTools.js"></script>

	<link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" >
	<script src="../plugins/bootstrap/js/bootstrap.js"></script> 

	<script language="javascript" src="../sys/js/Security.js"></script>
	<script language="javascript" src="../sys/js/request.js"></script>
	<script language="javascript" src="../sys/js/dict.js"></script>
	 <script language="javascript" src="cloudMoniter.js"></script> 
	<script language="javascript" src="cloud_login.js"></script>

	<!-- styles needed by jScrollPane -->
  	<link type="text/css" href="../plugins/jscroll/jscroll.css" rel="stylesheet" media="all" /> 
  	<!-- the mousewheel plugin - optional to provide mousewheel support -->
  	<script type="text/javascript" src="../plugins/jscroll/jquery.mousewheel.js"></script>
  	<!-- the mwheelIntent plugin -->
  	<script type="text/javascript" src="../plugins/jscroll/mwheelIntent.js"></script>
  	<!-- the jScrollPane script -->
  	<script type="text/javascript" src="../plugins/jscroll/jscroll.js"></script>

	<!--lightbox -->
	<script src="../plugins/lightbox/lightbox.js" type="text/javascript"></script> 
	<link rel="stylesheet" type="text/css" href="../plugins/lightbox/lightbox.css">

	<link rel="stylesheet" type="text/css" href="../css/page.css">
	<script src="../plugins/tab/tab.js" type="text/javascript"></script>
	<script src="../plugins/chklist/chklist.js" type="text/javascript"></script>

</head>

<body onload="addMoniterData();" class="sidebg_sp2" style="width:800px; height:550px" >
<div class="section"> 
	<div class="row-fluid"> 
			<div class="span2 box-content" > 
			 
				<ul class="nav nav-list sideMenu" alt="servermot"> <!--  bs-docs-sidenav -->
					<jsp:include page="includ/nav.jsp" flush="true" /> 
				</ul> 
	        </div> 

			<div class="span10 box-content">
				<ul class="nav nav-tabs" id="myTab">
					<li class="active"><a href="#cpu_tab">cpu</a></li>
					<li><a  href="#rom_tab">内存</a></li>
					<li class="dropdown">
						<a href="#eth_tab">网络</a>  
					</li>
				</ul>
				<div id="jscroll" style="width:100%; height:500px; overflow:auto;" class="tab_content"> 
					<div id="cpu_tab" >
						<div class="moniter_toolbar clearfix">
							<!--  checkbox  多选列表 -->
							<div id="cpu_chkbox_list" class="chkbox_list pull-left" >
								<div class="ipt span7" style="display:none;" name="typelist" ></div>
								<span class="btn"> 选择 <span class="caret"></span></span>
							</div> 
							<span class="btn" onclick="clearControl();"><i class="icon-refresh"></i> 刷新</span> 
						</div>
						<div id="cpu_tab_piclist"></div> 
					</div>
					<div id="rom_tab">
						<div class="moniter_toolbar clearfix">
							<!--  checkbox  多选列表 -->
							<div id="rom_chkbox_list" class="chkbox_list pull-left" >
								<div class="ipt span7" name="typelist"  style="display:none;" ></div>
								<span class="btn"> 选择 <span class="caret"></span></span>
							</div> 
							<span class="btn" onclick="clearControl();"><i class="icon-refresh"></i> 刷新</span> 
						</div>
                        <div id="rom_tab_piclist"></div>
					</div>
					<div id="eth_tab"> 
						<div class="moniter_toolbar clearfix">
							<!--  checkbox  多选列表 -->
							<div id="eth_chkbox_list" class="chkbox_list pull-left" >
								<div class="ipt span7" name="typelist"  style="display:none;" ></div>
								<span class="btn"> 选择 <span class="caret"></span></span>
							</div> 
							<span class="btn" onclick="clearControl();"><i class="icon-refresh"></i> 刷新</span> 
						</div>
                         <div id="eth_tab_piclist"></div>
					</div> 
				</div>
			</div>
	</div>
</div>
</body>
<script type="text/javascript">
$(function () {
 
	var markid = $(".nav-list").attr("alt")
	$("#"+markid).addClass("active") 
}) 
</script>
</html>