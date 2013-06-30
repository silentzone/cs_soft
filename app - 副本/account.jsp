<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.ztesoft.zsmart.core.utils.Base"%>
<%@page import="com.ztesoft.zsmart.core.service.DynamicDict" %> 
<%@page import="com.ztesoft.uboss.desktop.DesktopPublic" %> 
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
 	request.getSession().setAttribute("OLD_URL",strWebRoot+"app/account.jsp");
	response.sendRedirect(strWebRoot+"app/login.jsp");
	return;
 }
 String userId = sysLoginDto.getString("UserId");
 String userCode = sysLoginDto.getString("UserCode");
 String userName = sysLoginDto.getString("UserName");
 String billId = userId;
%>

<!DOCTYPE html> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>个人中心-账户信息 </title>
<link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" >
<link href="../css/page.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../plugins/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="../plugins/themes/icon.css">
</head>

<body style="width:800px; margin:0 auto;" onload="appAccount.init();">
<div class="section"> 
	<div class="row-fluid">
		<div class="span3">
			<ul class="nav nav-list bs-docs-sidenav">
				<li><a href="user.jsp"><i class="icon-user"></i>个人信息</a></li>
				<li class="active"><a href="account.jsp"><i class="icon-bookmark"></i>账户信息 </a></li>
				<li><a href="myapp.jsp"><i class="icon-inbox"></i>我的应用</a></li> 
				<li><a href="modifyPWD.jsp"><i class="icon-comment"></i>密码修改</a></li>
			</ul> 
		</div>
		<div class="span9">
			<div class="box-content">
				<div class="row-fluid">
					<div class="span6">
						<table class="table">
							<tr>
								<td>用户名：<%=userCode%></td><td><span class="label">邮箱认证 <i class="icon-exclamation-sign"></i></span></td>
							 </tr>
							 <tr>
								<td colspan="2">账户ID：<%=billId%></td>
							</tr>
						</table> 
					 
					</div>
					<div class="span6">
						<h3>账户余额： <span id="moneyspan">0.00</span> <span>元</span></h3>  
						<span class="btn btn-warning" id="czspan">充值</span>
						<span class="btn" id="cxspan">记录</span>
					</div> 
				</div>
				<div class="row-fluid" id="qry_div">
					<div class="datagrid-toolbar"> <!-- id="editUser" -->  
				
				      <span class="input-append">
				      	<select id="qry_type">
				      		<option value="1">充值记录</option>
				      		<option value="2">消费记录</option>
				      	</select>
				      	<!-- <input id="start_date" data-options="formatter:myformatter " class="easyui-datebox" value="" ></input>
	                    <input id="end_date" class="easyui-datebox"  data-options="formatter:myformatter "></input>   -->
				    	<input class="btn" type="button" value="查询" id="qry_btn">
				    </span>
		              
					</div>
					<!-- <div class="top">购买记录</div> -->
					<table id="table_info" cellspacing="0" cellpadding="0" style="height:200px;">  
					    <thead>  
					        <tr>  
					            <th field="op_desc" width="20%"></th> 
					            <th field="s_id" width="30%">流水</th> 
					            <th field="money" width="20%">金额(元)</th>
					            <th field="s_time" width="30%" sortable="true">操作时间</th>  
					        </tr>  
					    </thead>  
					</table>
				</div>
				<div class="row-fluid" id="recharge_div" style="display:none;">
					<div class="top">卡片充值</div>
					<div class="control-group">
						<div class="controls">
							卡片编号&nbsp;&nbsp;<input type="text" id="CARD_NO" name="CARD_NO" maxlength="20" value="" >  
						</div>
					</div>
					<div class="control-group">
						<div class="controls">
							卡片密码&nbsp;&nbsp;<input type="text" id="CARD_SN" name="CARD_SN" maxlength="30" >  
						</div>
					</div>
					<div class="form-actions">
						<span class="btn btn-success" id="save_btn" >提交充值</span><span id="saveResult"></span>
					</div>
				</div>

			</div>
		</div>
	</div> 
</div>
<script type="text/javascript" src="../js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="../plugins/jquery.easyui.min.js"></script>
<script language="javascript" src="../sys/js/request.js"></script>
<script language="javascript" src="../sys/js/jquery.xml2json.js"></script>
<script language="javascript" src="../sys/js/dict.js"></script>
<script type="text/javascript" src="./js/public.js"></script>
<script type="text/javascript" src="./js/account.js"></script>
<script type="text/javascript">
var $userId = "<%=userId%>";
var $billId = "<%=billId%>";
</script>
</body>
</html>
