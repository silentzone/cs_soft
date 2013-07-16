 
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
	<script type="text/javascript" src="./cloudShowLinuVm.js"></script>
    <script type="text/javascript" src="./datagrid-detailview.js"></script>  
	<script language="javascript" src="cloudShowLinuVm.js"></script>
    <script language="javascript" src="cloud_login.js"></script>
    <link href="../css/page.css" rel="stylesheet" type="text/css" /> 

</head> 
<body  style=" width:800px; height:550px;" onload="appRole.init();">
<div class="section"> 
		<div class="row-fluid"> 
			<div class="span2 box-content" >
				<ul class="nav nav-list sideMenu" alt="myserver">
					 <jsp:include page="includ/nav.jsp" flush="true" /> 
				</ul> 
		  </div>

			<div class="span10" >
				 
				 <div class="box-content">   
					<!-- 	<div class="top"> 
							<span class="title">我的LINUX主机</span>
						</div> -->
						<div class="section">
							<div class="datagrid-toolbar"> <!-- id="editUser" -->  
                          	  <input class="btn" type="button" value="刷新" id="qry_btn">
							</div> 
							<table title="我的LINUX主机" id="table_mgrinfo" cellspacing="0" cellpadding="0">  
							    <thead>  
							        <tr>  
			                           <th field="user_id" width="190" hidden="true">用户</th>  
			                    	   <th field="user_linux_host" width="190" hidden="true">主机名称</th>
                                       <th field="user_linux_ip" width="190" hidden="true">IP地址</th>
                                       <th field="user_linux_port" width="190" hidden="true">端口号</th> 
                                       <th field="user_linux_key" width="90" hidden="true">密码</th> 
							           <th field="created_date" width="90" sortable="true" hidden="true">创建日期</th>  
                                       <!--<th field="notes" width="100" hidden="true">备注</th>-->
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




