 
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
<html lang="zh_CN">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>云服务管理</title>
	<link rel="stylesheet" type="text/css" href="../plugins/themes/gray/easyui.css">
	<link rel="stylesheet" type="text/css" href="../plugins/themes/icon.css">

	<link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" >
	<link href="../css/validform.css" rel="stylesheet" type="text/css" />

	<script type="text/javascript" src="../js/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="../plugins/jquery.easyui.min.js"></script>
	<script language="javascript" src="../sys/js/request.js"></script>
	<script language="javascript" src="../sys/js/jquery.xml2json.js"></script>
	<script language="javascript" src="../sys/js/dict.js"></script>
	<script type="text/javascript" src="../js/artDialog.js"></script>
	<script type="text/javascript" src="../js/Validform_v5.3.2.js"></script>
	<script src="../plugins/bootstrap/js/bootstrap.js"></script>
	<script type="text/javascript" src="./js/public.js"></script>
    <script type="text/javascript" src="./datagrid-detailview.js"></script>  
	<script language="javascript" src="cloudShowAccount.js"></script>
    <script language="javascript" src="cloud_login.js"></script>
    <link href="../css/page.css" rel="stylesheet" type="text/css" /> 

</head> 
<body  style=" width:800px; height:550px;" onload="appRole.init();">
<div class="section"> 
		<div class="row-fluid"> 
			<div class="span2 box-content" >
				<ul class="nav nav-list sideMenu" alt="cloudShowAccount">
					 <jsp:include page="includ/nav.jsp" flush="true" /> 
				</ul> 
		  </div>

			<div class="span10" >
				 
				 <div class="box-content">   
					<!-- 	<div class="top"> 
							<span class="title">我的LINUX主机</span>
						</div> -->
						<div class="section">
							<div class="datagrid-toolbar">
                            
                             平台名称   <span id="selecdiv"></span> 
                             			<span class="btn"  id="qry_btn"> 查询 </span>
							</div> 
							<table title="人才服务帐号" id="table_mgrinfo" cellspacing="0" cellpadding="0">  
							    <thead>  
							        <tr>  
			                    	   <th field="user_vm_name" width="190" hidden="true">平台名称</th>
                                       <th field="cs_code" width="190" hidden="true">用户</th>
                                       <th field="pwd" width="190" hidden="true">密码</th> 
							           <th field="created_date" width="90" sortable="true" hidden="true">创建日期</th>  
							        </tr>  
							    </thead>  
							</table> 
						</div> 
					</div><!-- layout --> 
			</div><!-- span 9--> 
		</div>
</div>


	


</body>
<script>
	$(function () {
		var markid = $(".nav-list").attr("alt")
		$("#"+markid).addClass("active") 
	});

	  function openConsole(){
		  httpsRemoteClientLogin();
	  }
</script>
</html>



