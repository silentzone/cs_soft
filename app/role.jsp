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
		if(roleId.equals("sys00001")){
			havePower = true;
			break;
		}
	}
	if(!havePower){
		//response.sendRedirect(strWebRoot+"portal.jsp");
		out.println("对不起,您没有操作权限");
		return;
	}
 }
 %>
<!DOCTYPE html>
<html lang="zh_CN">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title>用户角色权限</title>
	<link rel="stylesheet" type="text/css" href="../plugins/themes/gray/easyui.css">
	<link rel="stylesheet" type="text/css" href="../plugins/themes/icon.css">
	
	<link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" >
	<link href="../css/validform.css" rel="stylesheet" type="text/css" />

	<link href="../css/page.css" rel="stylesheet" type="text/css" />

	<script type="text/javascript" src="../js/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="../plugins/jquery.easyui.min.js"></script>
	<script language="javascript" src="../sys/js/request.js"></script>
	<script language="javascript" src="../sys/js/jquery.xml2json.js"></script>
	<script language="javascript" src="../sys/js/dict.js"></script>
	<script type="text/javascript" src="../js/artDialog.js"></script>
	<script type="text/javascript" src="../js/Validform_v5.3.2.js"></script>
	<script src="../plugins/bootstrap/js/bootstrap.js"></script>
	<script type="text/javascript" src="./js/public.js"></script>
	<script type="text/javascript" src="./js/role.js"></script>
<style>
  * {
    margin:0;
    padding:0;
  }
  .pop-window {
    position: absolute;
    top:50%;
    left:50%;
    border:1px solid #000;
  }

  .pop-window-head {
    background-color:#333;
    position: absolute;
    height:30px;
    width: 100%;
  }

  .pop-window-head h3 {
    color:#ffffff;
    font-weight:bold;
    margin-top:-5px;
    margin-left:5px;
    font-size: 12px;
  }

  .pop-window-ctr {
    position: absolute;
    right:0;
    top:50%;
    overflow: hidden;
    zoom:1;
    margin-top:-13px;
  }

  .pop-window-ctr a {

    display:block;
    width:15px;
    height:15px;
    float: left;
    background-color: #fff;
    margin:5px;
    text-indent: -100em;
    overflow: hidden;
  }
  .pop-window-body {
    margin-top:30px;
  }
  .button-region {
    border-top:1px solid #ccc;
    text-align: right;
    padding:5px;
    background-color: #eee;
  }
  .button-region button {
    padding:2px 10px;
  }
 </style>
</head> 
<body class="body_silder" style=" width:800px; height:550px;" onload="appRole.init();">
	<div id="layout" >
		<div class="section">
			<div class="datagrid-toolbar"> <!-- id="editUser" -->  
				<!--折叠 控件 按钮-->
				<span class="btn"   id="silder_menu" > <i class="icon-arrow-right"></i>编辑</span>  
		       	<!-- 搜索 控件 -->
		       <span class="input-append">
			    	<input class="span2" id="condition_value" type="text" value="" maxlength="50">
			    	<span class="btn"  id="qry_btn">搜索用户</span>
			    </span>
			</div>
				<table id="table_userinfo" cellspacing="0" cellpadding="0" style="height:200px;">  
				    <thead>  
				        <tr>  
				            <th field="user_id" width="0" hidden="true"></th>  
				            <th field="bill_id" width="0" hidden="true"></th>
				            <th field="user_code" width="20%" sortable="true">用户账号</th>  
				            <th field="user_name" width="20%">用户名</th>  
				            <th field="user_type" width="20%">用户类型</th>  
				            <th field="e_mail" width="20%">邮箱</th>
				            <th field="create_time" width="20%" sortable="true">创建时间</th>  
				        </tr>  
				    </thead>  
				</table> 
 
			<div class="top">
				<div class="top_shadow"></div>
				<span class="title">权限分配</span>
			</div> 

			<div class="clearfix" style="text-align:center" >
				<div class="listBox"> 
					<table id="table_role" cellspacing="0" cellpadding="0" style="height:140px">  
					    <thead>  
					        <tr>  
					            <th field="role_id" width="0" hidden="true"></th>  
					            <th field="ck" width="10%" checkbox="true"></th> 
					            <th field="role_name" width="90%" sortable="true">用户拥有角色</th>  
					        </tr>  
					    </thead>  
					</table> 
				</div>
				<div class="listbtn">
					<span></span><span id="mov_left" class="btn" style="margin-bottom:5px;"> <i class="icon-chevron-right"></i>删除</span>
					<span id="mov_right" class="btn"><i class="icon-chevron-left"></i>增加</span> 
				</div>
				<div class="listBox">
					<table id="table_sysRole" cellspacing="0" cellpadding="0" style="height:140px;">  
					    <thead>  
					        <tr>  
					            <th field="role_id" width="0" hidden="true"></th>  
					            <th field="ck" width="10%" checkbox="true"></th> 
					            <th field="role_name" width="90%" sortable="true">系统角色</th>  
					        </tr>  
					    </thead>  
					</table> 
				</div>
			</div>

			<div class="form_actions"> <span class="btn btn-success" id="save_btn"> <i class="icon-ok icon-white"></i>保存角色</span><span id="saveResult"></span></div>  
		</div> 
	</div><!-- layout --> 

	<div class="silder" id="silder">
		<div class="silder_box form-horizontal">
			<div class="row-fluid">

				<div class="span6">
					<fieldset>
						<legend>注册信息 </legend> 
						<div class="control-group">
							<label class="control-label" for="inputEmail">用户账号</label>
							<div class="controls">
								<input type="hidden" id="USER_ID" name="USER_ID" value="">
								<input type="hidden" id="PWD_ID" name="PWD_ID" value="">
								<input type="hidden" id="BILL_ID" name="BILL_ID" value="">
								<input type="text" id="USER_CODE" name="USER_CODE" disabled>
							</div> 
						</div>
						<div class="control-group">
							<label class="control-label"  >用户名</label>
							<div class="controls">
								<input type="text" id="USER_NAME" name="USER_NAME" datatype="s6-18" nullmsg="请输入您的用户名！" errormsg="用户名为6-18个字符！" ><span class="Validform_checktip help-inline"></span>
							</div> 
						</div>
						<div class="control-group">
							<div class="controls" id="pwd_div">
								<input type="button" class="btn btn-primary" value="修改密码" id="pwd_btn">
							</div>
						</div>

						<!--  -->
						<div id="pwd_span" style="display:none;" >
							<div class="control-group" >
								<label class="control-label" >新密码</label>
								<div class="controls">
									<input type="password" id="USER_PWD" name="USER_PWD" datatype="*6-10" nullmsg="请设置密码！" errormsg="密码为6~10位之间！"maxlength="10">  
								</div>
							</div>
							<div class="control-group" >
								<label class="control-label"  >确认新密码</label>
								<div class="controls">
									<input type="password" id="USER_PWD_CF" recheck="USER_PWD" name="USER_PWD_CF" datatype="*" maxlength="10" nullmsg="请输入确认密码！" errormsg="确认密码不正确！">  
								</div>
							</div>
						</div>   
					</fieldset> 

					<fieldset>
						<legend>安全信息 </legend>
						<div class="control-group" >
							<label class="control-label" >安全问题</label>
							<div class="controls">
								<select id="01_SAFETY" name="01_SAFETY" datatype="*" nullmsg="请选择安全问题！" >
									<option value="">--请选择--</option>
									<option value="001">父亲生日</option>
									<option value="002">母亲的名字</option>
								</select> 
							</div> 
						</div>

						<div class="control-group">
							<label class="control-label" >问题答案</label>
							<div class="controls">
								<input type="text" id="01_SAFETY_ANSWER" name="01_SAFETY_ANSWER" maxlength="40" datatype="*1-40" nullmsg="请填写问题答案！">
							</div> 
						</div>
						<div class="control-group">
							<label class="control-label" for="inputEmail">邮箱地址</label>
							<div class="controls">
								<input type="text" id="E_MAIL" name="E_MAIL" datatype="e" nullmsg="请输入您的邮箱！" errormsg="请输入正确邮箱"><span class="Validform_checktip help-inline"></span>  
							</div>
						</div>


					</fieldset>

				</div> <!-- span6 -->

				<div class="span6">
					<fieldset>
						<legend>个人信息 </legend>
						<div class="control-group">
							<label class="control-label" >姓名</label>
							<div class="controls">
								<input type="text" id="02_NAME" name="02_NAME" maxlength="20">  
							</div> 
						</div>
						<div class="control-group">
							<label class="control-label" >电话</label>
							<div class="controls">
								<input type="text" id="02_TEL" name="02_TEL" maxlength="20">  
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" >地址</label>
							<div class="controls">
								<input type="text" id="02_ADDR" name="02_ADDR" maxlength="200">
							</div>
						</div>
						 
					</fieldset>

					<fieldset>
						<legend>企业信息 </legend>
						<div class="control-group">
							<label class="control-label" >企业名称</label>
							<div class="controls">
								<input type="text" id="03_NAME" name="03_NAME" maxlength="200">  
							</div> 
						</div> 
						<div class="control-group">
							<label class="control-label" >联系电话</label>
							<div class="controls">
								<input type="text" id="03_TEL" name="03_TEL" maxlength="20">  
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" >地址</label>
							<div class="controls">
								<input type="text" id="03_ADDR" name="03_ADDR" maxlength="200">  
							</div>
						</div> 
					</fieldset>
				</div><!-- span6 -->	
			</div>
			<div> 
				<fieldset>
						<!--  个人 --><legend> </legend>
						<div class="control-group">
							<label class="control-label" >用户类型</label>
							<div class="controls">
								<label class="radio inline">
									<input  type="radio" name="USER_TYPE" value="01">普通用户
								</label>
								<label class="radio inline">
									<input type="radio" name="USER_TYPE" value="02">园区企业用户
								</label>
								<label class="radio inline">
									<input type="radio" name="USER_TYPE" value="03">区外企业用户
								</label> 
							</div>
						</div> 
						<div class="control-group">
							<label class="control-label" >账户余额</label>
							<div class="controls">
							  	<strong id="moneyspan">0.00</strong> <span>云币</span> 
							 	<span class="btn btn-small btn-warning"  id="account_btn">账户充值</span>
							</div>
						</div>
				</fieldset> 
			</div>
 
			<div class="form_actions">
				<span class="btn btn-primary"  id="modify_btn">保存修改</span> 
				<span id="modifyResult"></span>
			</div>  

		</div>


		<div class="pop-window" style="margin:-130px 0 0 -175px;display:none;">
		  <div class="pop-window-head">
		    <h3>账户充值</h3>
		  </div>
		  <div class="pop-window-body">
		    <div class="pop-inner">
		    	<div class="control-group"  >
					<div class="controls">
						 充值金额 <input type="text" id="MONEY" name="MONEY" maxlength="10" onkeyup="Pb.clearNumberFix(this)">云币 
					</div>
				</div>
		   </div>
		    <div class="button-region">
		      <button class="btn btn-success" id="recharge">确定</button>
		      <button class="btn btn-warning cancel" id="norecharge">取消</button>
		    </div>
		  </div>
		</div>
	</div>

</body>

</html>