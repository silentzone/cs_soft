 
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
}/*else{
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
		//response.sendRedirect(strWebRoot+"portal.jsp");
		out.println("对不起,您没有操作权限");
		return;
	}*/
%>
<!DOCTYPE html>
<html lang="zh_CN">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>云服务管理</title>
	<link rel="stylesheet" type="text/css" href="../plugins/themes/default/easyui.css">
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
	<script type="text/javascript" src="./cloudCheck.js"></script>
    <script type="text/javascript" src="./datagrid-detailview.js"></script>  
	<script language="javascript" src="cloud_login.js"></script>
    <link href="../css/page.css" rel="stylesheet" type="text/css" /> 

</head> 
<body  style=" width:800px; height:550px;" onload="appRole.init();">
<div class="section"> 
		<div class="row-fluid"> 
			<div class="span2 box-content" >
				<ul class="nav nav-list bs-docs-sidenav">
					<li><a href="cloud.jsp"><i class="icon-plus"></i>新建服务</a></li>
					<li><a href="cloud_buy.jsp"><i class="icon-shopping-cart"></i>已购服务</a></li>
					<li ><a href="cloudCheck.jsp"><i class="icon-lock"></i>管理员审核</a></li> 
                    <li ><a onClick="openConsole();" ><i class="icon-lock"></i>我的桌面</a></li> 
                    <li ><a href="cloudShowLinuVm.jsp"><i class="icon-lock"></i>我的主机</a></li> 
				</ul> 
		  </div>

			<div class="span10 box-content" >
				 
				 <div >   
						<div class="top"> 
							<span class="title">审核</span>
						</div>
						<div class="section">
							<div class="datagrid-toolbar"> <!-- id="editUser" -->  
									查询日期<input id="start_date" data-options="formatter:myformatter " class="easyui-datebox" value="" style=" width:100px"></input>  至
				                    <input id="end_date" class="easyui-datebox"  data-options="formatter:myformatter "  style=" width:100px"></input>  
                                    审核状态<select id="querystate" class="easyui-combobox" name="querystate" style="width:100px;">  
                                                <option value=".">全部</option>  
                                               <option value="0">新制</option>  
                                                <option value="1">已审核</option>  
                                                <option value="2">已创建</option>
                                                <option value="9">创建失败</option>   
                                            </select>  
							    	<input class="btn" type="button" value="查询" id="qry_btn">
							 
				               
							    	<input class="btn" type="button" value="审核" id="check_btn">
							 
				              
							</div>
								<table id="table_mgrinfo" cellspacing="0" cellpadding="0" style="height:400px;">  
								    <thead>  
								        <tr>  
								            <th field="inst_id" width="0" hidden="true"></th>
                                              <th field="state" width="0" hidden="true"></th>
				                            <th field="user_id" width="60" sortable="true">用户</th>  
                                            <th field="user_vm_name" width="80" sortable="true">机器名称</th>  
								            <th field="created_date" width="80" sortable="true">创建日期</th>  
								            <th field="statedesc" width="50">状态</th>  
                                            <th field="notes" width="120">备注</th>  
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
	  function openConsole(){
		  httpsRemoteClientLogin();
	  }
</script>
</html>




