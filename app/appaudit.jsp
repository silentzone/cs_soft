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
 	request.getSession().setAttribute("OLD_URL",strWebRoot+"app/role.jsp");
	response.sendRedirect(strWebRoot+"app/login.jsp");
	return;
 }else{
 	DynamicDict detailsBO = sysLoginDto.getBOByName("UserDetailsDto");
 	int roleNum = detailsBO.getCountByName("USER_ROLE");
 	boolean havePower = false;
 	for(int i=0;i<roleNum;i++){
		HashMap roleDict = (HashMap)detailsBO.getValueByName("USER_ROLE", i);
		String roleId = (String)roleDict.get("ROLE_ID");
		if(roleId.equals("audit00001")){
			havePower = true;
			break;
		}
	}
	if(!havePower){
		out.println("对不起,您没有操作权限");
		return;
	}
 }
 %>
<!DOCTYPE html>
<html lang="zh_CN">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>应用定单审核</title>
	<link rel="stylesheet" type="text/css" href="../plugins/themes/gray/easyui.css">
	<link rel="stylesheet" type="text/css" href="../plugins/themes/icon.css">
	<link href="../css/page.css" rel="stylesheet" type="text/css" />
	<link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" >
	<link href="../css/validform.css" rel="stylesheet" type="text/css" />
</head> 
<body style=" width:800px; height:550px;" onload="appAudit.init();">
<div id="layout" >
	<div class="section">
		<div class="datagrid-toolbar"> 
	      <span class="input-append">
		    	<input class="span2" id="condition_value" type="text" value="" maxlength="50">
		    	<span class="btn"  id="qry_btn">定单号搜索</span>
		    </span>
		</div>
			<table id="table_orderinfo" cellspacing="0" cellpadding="0" style="width:800px;height:400px;">  
			    <thead>  
			        <tr> 
			            <th field="order_no" width="20%" sortable="true">定单号</th>  
			            <th field="action_type_desc" width="20%">定单类型</th>  
			            <th field="app_name" width="20%">应用名称</th>  
			            <th field="app_versions" width="20%">应用版本</th>
			            <th field="oper_date" width="20%" sortable="true">操作时间</th>  
			            <th field="state_desc" width="20%" sortable="true">定单状态</th> 
			        </tr>  
			    </thead>  
			</table> 
		<div class="form-actions"> 
			<button class="btn btn-primary start" id="pass_btn"> <i class="icon-upload icon-white"></i>审批通过</button>
			<button class="btn btn-warning cancel" id="nopass_btn"> <i class="icon-ban-circle icon-white"></i>审批不通过</button>
			<span id="auditResult"></span>
		</div>  
	</div> 
</div>
<script type="text/javascript" src="../js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="../js/impress.js"></script>
<script type="text/javascript" src="../js/artDialog.js"></script>
<script type="text/javascript" src="../js/iframeTools.js"></script>
<script type="text/javascript" src="../plugins/jquery.easyui.min.js"></script>
<script src="../plugins/bootstrap/js/bootstrap.js"></script>
<script language="javascript" src="../sys/js/request.js"></script>
<script language="javascript" src="../sys/js/jquery.xml2json.js"></script>
<script language="javascript" src="../sys/js/dict.js"></script>
<script type="text/javascript" src="./js/appaudit.js"></script>
</body>

</html>