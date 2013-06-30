 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
 <%@page import="java.util.HashMap"%>
 <%@page import="com.ztesoft.zsmart.core.utils.Base"%>
 <%@page import="com.ztesoft.zsmart.core.service.DynamicDict" %> 
 <%
 	String entryNo = request.getParameter("entryNo")==null?"22":request.getParameter("entryNo");
 	String userName = request.getParameter("userName")==null?"":request.getParameter("userName");
 	if(entryNo.equals("")) return;
 	String userId = null;
 	String userType = "-1";//默认游客
 	DynamicDict sysLoginDto = (DynamicDict)session.getAttribute("SYS_LOGIN_INFO");
	 if(sysLoginDto!=null){
	 	userId = sysLoginDto.getString("UserId");
	 	userType = "0";// 登陆用户
	 	DynamicDict detailsBO = sysLoginDto.getBOByName("UserDetailsDto");
	 	int roleNum = detailsBO.getCountByName("USER_ROLE");
	 	for(int i=0;i<roleNum;i++){
			HashMap roleDict = (HashMap)detailsBO.getValueByName("USER_ROLE", i);
			String roleId = (String)roleDict.get("ROLE_ID");
			if(roleId.equals("im00001")){
				userType = "1";// 客服
				break;
			}
		}
	}
 %>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>用户留言</title>
<link rel="stylesheet" type="text/css" href="../plugins/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="../plugins/themes/icon.css">
<link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" >
<link href="../css/page.css" rel="stylesheet" type="text/css" />
<link href="../css/showLoading.css" rel="stylesheet" media="screen" />
<script type="text/javascript" src="../js/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="../plugins/jquery.easyui.min.js"></script>
<script src="../plugins/bootstrap/js/bootstrap.js"></script>  
<script language="javascript" src="../sys/js/request.js"></script>
<script language="javascript" src="../sys/js/jquery.xml2json.js"></script>
<script language="javascript" src="../sys/js/dict.js"></script>
<script type="text/javascript" src="../js/jquery.showLoading.js"></script>
<script type="text/javascript" src="./js/public.js"></script> 
<script type="text/javascript" src="./js/leave.js"></script> 
</head>
<script type="text/javascript">
var $userType = "<%=userType%>";
var $userId = "<%=userId%>";
var $entryNo = "<%=entryNo%>";
</script>
<body>
<%if(userType.equals("-1")){%>	
<div style="width:600px;margin:0 auto;">
	<div class="row-fluid"> 
		<div class="span9 box-content">
			<form class="form-horizontal">
				<div class="control-group">
					<label class="control-label">您的姓名</label>
					<div class="controls">
						<input type="text" id="SEND_USER_NAME" name="SEND_USER_NAME" maxlength="20" value="<%=userName%>" >  
					</div>
				</div>
				<div class="control-group">
					<label class="control-label">您的邮箱</label>
					<div class="controls">
						<input type="text" id="SEND_MAIL" name="SEND_MAIL" maxlength="30" >  
					</div>
				</div>
				<div class="control-group">
					<label class="control-label">联系地址</label>
					<div class="controls">
						<input type="text" id="SEND_ADDR" name="SEND_ADDR" maxlength="300">  
					</div>
				</div>
				<div class="control-group">
					<label class="control-label">联系电话</label>
					<div class="controls">
						<input type="text" id="SEND_TEL" name="SEND_TEL" maxlength="20">  
					</div>
				</div>
				<div class="control-group">
					<label class="control-label">留言主题</label>
					<div class="controls">
						<input type="text" id="LEAVE_TITLE" name="LEAVE_TITLE" maxlength="300">  
					</div>
				</div>
				<div class="control-group">
					<label class="control-label">留言内容</label>
					<div class="controls">
						<TEXTAREA id="CONTENT" cols="50" rows="4" name="CONTENT" class="span12" maxlength="500"></TEXTAREA> 
					</div>
				</div>

				<div class="form-actions">
					<span class="btn btn-success" id="save_btn" >提交留言</span><span id="saveResult"></span>
				</div>

			</form>

		</div>
	</div>

</div>
<script type="text/javascript">
$("#save_btn").click(function() { appLeave.sendIMLeave()});
</script>
<%}else{%>
<div style="width:600px;margin:0 auto;">
	<div class="datagrid-toolbar">   
		<span class="input-append">
	    	<input  id="condition_value" type="text" value="" maxlength="50">
	    	<input class="btn" type="button" value="搜索留言" id="qry_btn">
	    </span>
	</div>
	<table id="table_leaveinfo" cellspacing="0" cellpadding="0" style="height:200px;">  
	    <thead>  
	        <tr>  
	            <th field="leave_no" width="0" hidden="true"></th>
	            <th field="leave_title" width="45%" >留言主题</th><th field="send_user_name" width="15%">留言人</th><th field="send_time" width="25%" sortable="true">留言时间</th>  
	            <th field="state_desc" width="15%" sortable="true">状态</th>
	        </tr>  
	    </thead>  
	</table>
	 

	<div class="clearfix" style="text-align:center" id="lyxx_div">
		<div class="listBox"> 
			 <div class="top">
				<div class="top_shadow"></div>
				<span class="title">留言答复</span>
			</div>
			<div class="controls">
				<TEXTAREA id="AS_CONTENT" cols="50" rows="5" name="AS_CONTENT" maxlength="500" disabled></TEXTAREA> 
			</div>
		</div>
		<div class="listBox" style="width:53%;"> 
			 <div class="top">
				<div class="top_shadow"></div>
				<span class="title" style="">留言内容</span>
				<div style="text-align:left;height:100px;overflow:auto" id="lynr_div">
				</div>
			</div>
		</div>
	</div>
	<div class="clearfix" style="text-align:left;display:none;" id="xjly_div">
		<div class="control-group">
			<div class="controls">
				您的姓名&nbsp;<input type="text" id="SEND_USER_NAME" name="SEND_USER_NAME" maxlength="20" value="<%=userName%>" >您的邮箱&nbsp;<input type="text" id="SEND_MAIL" name="SEND_MAIL" maxlength="30" >
			</div>
			<div class="controls">
				联系地址&nbsp;<input type="text" id="SEND_ADDR" name="SEND_ADDR" maxlength="300">联系电话&nbsp;<input type="text" id="SEND_TEL" name="SEND_TEL" maxlength="20">  
			</div>
			<div class="controls">
				留言主题&nbsp;<input type="text" id="LEAVE_TITLE" name="LEAVE_TITLE" maxlength="300" class="span6">
			</div>
			<div class="controls">
				留言内容&nbsp;<TEXTAREA id="CONTENT" cols="50" rows="5" name="CONTENT" class="span6" maxlength="500"></TEXTAREA> 
			</div>
		</div>
	</div>
	<div class="form-actions">
		<%if(userType.equals("1")){%>
		<span class="btn btn-success" id="as_btn" style="display:none;">提交答复</span>
		<%}%>
		<span class="btn btn-success" id="save_btn" style="display:none;">提交留言</span>
		<span class="btn btn-primary" id="cancel_btn" style="display:none;">取消留言</span>
		<span class="btn btn-primary" id="need_btn">我要留言</span><span id="saveResult"></span>
	</div>  
</div>
<script type="text/javascript">
appLeave.init();
</script>
<%}%>
</body>

</html>