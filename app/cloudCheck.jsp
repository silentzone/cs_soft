 
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
	<link rel="stylesheet" type="text/css" href="../plugins/themes/gray/easyui.css">
	<link rel="stylesheet" type="text/css" href="../plugins/themes/icon.css">

	<link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" />
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
    <script language="javascript" src="Cloud_componet.js"></script>
	<script language="javascript" src="cloud_login.js"></script>
    <link href="../css/page.css" rel="stylesheet" type="text/css" /> 

</head> 
<body  style=" width:800px; height:550px;" onload="appRole.init();">
<div class="section"> 
		<div class="row-fluid"> 
			<div class="span2 box-content" >
				<ul class="nav nav-list sideMenu" alt="adminchk">
					  <jsp:include page="includ/nav.jsp" flush="true" /> 
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
                                    类型<select id="insttype" class="easyui-combobox" name="insttype" style="width:80px;">  
                                        <option value=".">全部</option>  
                                        <option value="1">基础服务</option>  
                                        <option value="2">人才服务</option>  
                                    </select>  
                                    审核状态<select id="querystate" class="easyui-combobox" name="querystate" style="width:80px;">  
                                                <option value=".">全部</option>  
                                                <option value="0">新制</option>  
                                                <option value="1">已审核</option>  
                                                <option value="2">已创建</option>
                                                <option value="9">创建失败</option>   
                                            </select>  
							    	<input class="btn" type="button" value="查询" id="qry_btn"> 
							</div>
								<table id="table_mgrinfo" cellspacing="0" cellpadding="0" style="height:400px;">  
								    <thead>  
								        <tr>  
								            <th field="inst_id" width="0" hidden="true"></th>
                                            <th field="state" width="0" hidden="true"></th>
                                            <th field="inst_type" width="0" hidden="true"></th>
                                            <th field="vm_state" width="0" hidden="true"></th>
				                            <th field="user_id" width="90" sortable="true">用户</th> 
                                            <th field="user_vm_name" width="100" sortable="true">机器名称</th>  
                                            <th field="inst_type_desc" width="60" sortable="true">类型</th>  
                                            <th field="orders" width="40" sortable="true">数量</th>  
								            <th field="created_date" width="100" sortable="true">创建日期</th>  
								            <th field="statedesc" width="80">订单状态</th>  
                                            <th field="vm_state_desc" width="80">服务状态</th> 
                                            <th field="notes" width="120">备注</th>  
								        </tr>  
								    </thead>  
								</table> 
						</div> 
                    	<div class="section">
							<div class="datagrid-toolbar"> <!-- id="editUser" -->  
     							<input class="btn" type="button" value="审核" id="check_btn"> 
                                <input class="btn" type="button" value="修改配置" id="modify_btn"> 
                                <input class="btn" type="button" value="暂停/启动服务" id="shutStart_btn"> 
                            </div>
                    	</div>
					</div><!-- layout --> 
                   
                    


			</div><!-- span 9--> 
		</div>
</div>

 </div>
            <div id="win" class="easyui-window" title="配置修改" style=" top:100px;left:200px;width:400px;height:280px"  data-options="iconCls:'icon-save',modal:true" closed ="true">  
                <div  class="box-content form_optimize">
	                <div id="tabgroups">
	                </div> 
	                <div class="control-group">
						<div class="controls"> 
							<input class="btn" type="button" value="确定" id="surebtn"> 
	                        <input class="btn" type="button" value="取消" id="cancelbtn"> 
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
	  function openConsole(){
		  httpsRemoteClientLogin();
	  }
</script>
</html>




