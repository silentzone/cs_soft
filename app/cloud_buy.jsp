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
<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>云应用</title> 
	<link rel="stylesheet" type="text/css" href="../css/page.css"> 
	<link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" >
	<link rel="stylesheet" type="text/css" href="../plugins/themes/gray/easyui.css">
	<link rel="stylesheet" type="text/css" href="../plugins/themes/icon.css">

	<script type="text/javascript" src="../js/jquery-1.8.2.min.js"></script>  
	<script type="text/javascript" src="../plugins/jquery.easyui.min.js"></script>
	<script type="text/javascript" src="../js/artDialog.js"></script>
	<script type="text/javascript" src="../js/iframeTools.js"></script>

	<script language="javascript" src="../sys/js/Security.js"></script>
	<script language="javascript" src="../sys/js/request.js"></script>
	<script language="javascript" src="../sys/js/dict.js"></script>
	<script language="javascript" src="cloud_buy.js"></script>
    <script language="javascript" src="Cloud_componet.js"></script>
	<script language="javascript" src="cloud_login.js"></script>

	<!-- chosen  ie 9- 不支持-->
  <!--<link rel="stylesheet" href="../plugins/chosen/chosen.css" />
  <script src="../plugins/chosen/chosen.jquery.js" type="text/javascript"></script>-->
  <!-- tab -->
  <script src="../plugins/tab/tab.js" type="text/javascript"></script>

  <!-- styles needed by jScrollPane -->
  <link type="text/css" href="../plugins/jscroll/jscroll.css" rel="stylesheet" media="all" /> 
  <!-- the mousewheel plugin - optional to provide mousewheel support -->
  <script type="text/javascript" src="../plugins/jscroll/jquery.mousewheel.js"></script>
  <!-- the mwheelIntent plugin -->
  <script type="text/javascript" src="../plugins/jscroll/mwheelIntent.js"></script>
  <!-- the jScrollPane script -->
  <script type="text/javascript" src="../plugins/jscroll/jscroll.js"></script>


  <!-- Bootstrap -->
  <link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" >
  <!-- <link href="plugins/bootstrap/css/bootstrap-responsive.css" rel="stylesheet" > -->
  <script src="../plugins/bootstrap/js/bootstrap.js"></script>  
  <!----> 
  <link href="../css/page.css" rel="stylesheet" type="text/css" />
  
</head>

<body class="sidebg_sp2" style="width:800px; height:550px">   <!-- onLoad="insertMenu()" -->
	<div class="section"> 
		<div class="row-fluid"> 
			<div class="span2 box-content" >
				<ul class="nav nav-list sideMenu" alt="buyserver">
					 <jsp:include page="includ/nav.jsp" flush="true" /> 
				</ul> 
		  </div> 

			<div class="span3 box-content">

				<div class="tabbable jscroll_nav" > 
					<ul class="list_btn" id="tablist"> 
					</ul> 
				</div>  
			</div>

			<div class="span7 box-content form_optimize" id="tabgroups">
			</div> 
 
		</div>
	</div>
</body> 
<script type="text/javascript">  
$(function() {

		// //滚动条
		// var api;
		// function jScroll () {
		// 	var $nav = $('#siderNav'); 
		// 	$nav.jScrollPane();
		// 	return $nav.data('jsp'); 
		// }
		// var refresh =  function () {
		// 			alert(api + " --- refresh" );
		// 			api.reinitialise(); 
		// }
		// // tab 
		// // 滚动条 需要在内部元素高度确定之后再创建 比较合适  
		// opt= {}; 
		// opt.feedback =  function () { api = jScroll();   }; 
		// opt.tabclick = refresh // tab 点击刷新高度 
		// $("#tablist").sildeTab(opt); 

		// tab 页面签  
		// $("#tablist").sildeTab();

		// // 滚动条 需要在内部元素高度确定之后再创建 比较合适
		// $('body').jScrollPane();
		// $('#jscrollNav').jScrollPane();

		$(".jscroll_nav").jScrollPane();
		var jcAPI = $(".jscroll_nav").data('jsp');   
		insertMenu();
		// jcAPI  动态刷新滚动条区域
		jcAPI.reinitialise();


		
	 
	});

      // $(".mselect").chosen({});
	  
	  function openConsole(){
		  httpsRemoteClientLogin();
	  }


      </script> 

      </html>
