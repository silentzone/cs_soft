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
 	request.getSession().setAttribute("OLD_URL",strWebRoot+"app/cloudCheck.jsp");
	response.sendRedirect(strWebRoot+"app/login.jsp");
	return;
 }else{
 	DynamicDict detailsBO = sysLoginDto.getBOByName("UserDetailsDto");
 	int roleNum = detailsBO.getCountByName("USER_ROLE");
 	boolean havePower = false;
 	for(int i=0;i<roleNum;i++){
		HashMap roleDict = (HashMap)detailsBO.getValueByName("USER_ROLE", i);
		String roleId = (String)roleDict.get("ROLE_ID");
		if(roleId.equals("sys00001")){
			havePower = true;
			break;
		}
	}
	if(!havePower){
		response.sendRedirect(strWebRoot+"portal.jsp");
		return;
	}
 }
 %>
<!DOCTYPE html>
<html lang="zh_CN">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>用户角色权限</title>
	<link rel="stylesheet" type="text/css" href="../plugins/themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="../plugins/themes/icon.css">
	<link href="../css/page.css" rel="stylesheet" type="text/css" />
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
	<script type="text/javascript" src="./cloudCheck.js"></script>
     <script type="text/javascript" src="./datagrid-detailview.js"></script>   

</head> 
<body class="body_silder" style=" width:800px; height:550px;" onload="appRole.init();">
	<div id="layout" >   
		<div class="top"> 
			<span class="title">审核</span>
		</div>
		<div class="section">
			<div class="datagrid-toolbar"> <!-- id="editUser" -->  
				
		      <span class="input-append">
                    查询日期<input id="start_date" data-options="formatter:myformatter " class="easyui-datebox" value=""></input>  至
                    <input id="end_date" class="easyui-datebox"  data-options="formatter:myformatter " ></input>  
			    	<input class="btn" type="button" value="查询" id="qry_btn">
			    </span>
                 <span class="input-append">
			    	<input class="btn" type="button" value="审核" id="check_btn">
			    </span>
              
			</div>
				<table id="table_mgrinfo" cellspacing="0" cellpadding="0" style="height:400px;">  
				    <thead>  
				        <tr>  
				            <th field="inst_id" width="0" hidden="true"></th>
                            <th field="user_id" width="20%" sortable="true">用户</th>  
                    		<th field="notes" width="20%">机器名称</th>  
				            <th field="created_date" width="20%" sortable="true">创建日期</th>  
				            <th field="state" width="10%">状态</th>  
				        </tr>  
				    </thead>  
				</table> 
		</div> 
	</div><!-- layout --> 
    <div class="silder" id="detail">
    	
	</div> 
</body>

</html>