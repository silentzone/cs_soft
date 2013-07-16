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
 DynamicDict detailsBO = sysLoginDto.getBOByName("UserDetailsDto");
 int roleNum = detailsBO.getCountByName("USER_ROLE");
 boolean havePower = false;
 for(int i=0;i<roleNum;i++){
	HashMap roleDict = (HashMap)detailsBO.getValueByName("USER_ROLE", i);
	String roleId = (String)roleDict.get("ROLE_ID");
	if(roleId.equals("video00001")){
		havePower = true;
		break;
	}
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
<link rel="stylesheet" type="text/css" href="../plugins/themes/gray/easyui.css">
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
				<%if(havePower){%>
				<li><a href="myvideo.jsp"><i class="icon-film"></i>我的视频</a></li> 
				<%}%>
				<li><a href="modifyPWD.jsp"><i class="icon-comment"></i>密码修改</a></li>
			</ul> 
		</div>
		<div class="span9">
			<div class="box-content">
				<div class="row-fluid">
					<div class="span6">
						<table class="table">
							<tr>
								<td style="border-top:0;">用户名：<%=userCode%></td><td style="border-top:0;"><span class="label">邮箱认证 <i class="icon-exclamation-sign"></i></span></td>
							 </tr>
							 <tr>
								<td colspan="2">账户ID：<%=billId%></td>
							</tr>
						</table> 
					 
					</div>
					<div class="span6">
						<h4>账户余额： <span id="moneyspan">0.00</span> <span>云币</span></h4>  
						<span class="btn btn-warning" id="czspan">充值</span>
						<span class="btn" id="cxspan">记录</span>
						<span class="btn btn-info m_btn" id="xfmm">消费密码设置</span>
					</div> 
				</div>
				<div class="row-fluid" id="qry_div">
					<div class="datagrid-toolbar"> <!-- id="editUser" -->  
				
				      	<div  class="input-append">
				      	<select id="qry_type">
				      		<option value="1">充值记录</option>
				      		<option value="2">消费记录</option>
				      	</select> 
				    	<span class="btn"    id="qry_btn" > 查询 </span>
				    	</div>
				    	<!-- <input id="start_date" data-options="formatter:myformatter " class="easyui-datebox" value="" ></input>
	                    <input id="end_date" class="easyui-datebox"  data-options="formatter:myformatter "></input>   -->
		              
					</div>
					<table id="table_info" cellspacing="0" cellpadding="0" style="height:200px;">  
					    <thead>  
					        <tr>  
					            <th field="op_desc" width="20%"></th> 
					            <th field="s_id" width="30%">流水</th> 
					            <th field="money" width="20%">金额(云币)</th>
					            <th field="s_time" width="30%" sortable="true">操作时间</th>  
					        </tr>  
					    </thead>  
					</table>
				</div>
				<div class="row-fluid" id="recharge_div" style="display:none;">
					<div class="top">卡片充值</div>
					<div class="control-group">
						<div class="controls">
							卡片编号&nbsp;&nbsp;<input type="text" id="CARD_NO" name="CARD_NO" maxlength="18" value="" class="easyui-numberbox" min="111">  
						</div>
					</div>
					<div class="control-group">
						<div class="controls">
							卡片密码&nbsp;&nbsp;<input type="text" id="CARD_SN" name="CARD_SN" maxlength="30" >  
							<input type="hidden" id="MONEY" value="MONEY" value="">
						</div>
					</div>
					<div class="form-actions">
						<span class="btn btn-success" id="save_btn" >提交充值</span><span id="saveResult"></span>
					</div>
				</div>

				<div class="row-fluid" id="pwd_div" style="display:none;">

					<div class="top">消费密码修改<span id="tip_span"><font color="red">(第一次设置原密码输入登录密码)</font></span></div>
					<div class="control-group">
						<div class="controls">
							原密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" id="OLD_PWD" name="OLD_PWD" maxlength="18" value="" >  
						</div>
					</div>
					<div class="control-group">
						<div class="controls">
							新密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="password" id="NEW_PWD" name="NEW_PWD" maxlength="18" >  
						</div>
					</div>
					<div class="control-group">
						<div class="controls">
							确认新密码&nbsp;&nbsp;<input type="password" id="NEW_PWD_RE" name="NEW_PWD_RE" maxlength="18" >  
						</div>
					</div>
					<div class="form-actions">
						<span class="btn btn-success" id="pwd_btn" >确认设置</span><span id="pwdResult"></span>
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
<script language="javascript" src="../sys/js/Security.js"></script>
<script type="text/javascript" src="./js/public.js"></script>
<script type="text/javascript" src="./js/account.js"></script>
<script type="text/javascript">
var $userId = "<%=userId%>";
var $billId = "<%=billId%>";
</script>
</body>
</html>
