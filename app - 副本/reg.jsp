 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html >
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>用户注册</title>
<link href="../plugins/bootstrap/css/bootstrap.css" rel="stylesheet" >
<link href="../css/page.css" rel="stylesheet" type="text/css" />
<link href="../css/validform.css" rel="stylesheet" type="text/css" />
<link href="../css/showLoading.css" rel="stylesheet" media="screen" /> 
<script type="text/javascript" src="../js/jquery-1.8.2.min.js"></script>
<script language="javascript" src="../sys/js/request.js"></script>
<script language="javascript" src="../sys/js/dict.js"></script>
<script type="text/javascript" src="../js/Validform_v5.3.2.js"></script>
<script type="text/javascript" src="../js/jquery.showLoading.js"></script>
<script type="text/javascript" src="./js/public.js"></script>
<script type="text/javascript" src="./js/reg.js"></script>
</head>
<body style="width:800px;height:500px; margin:0 auto;"> 
	<div class="section reg_box" id="mainDiv">
		<form class="registerform" method="post" >
		<div class="row-fluid">

			<div class="span6">
				<fieldset>
					<legend>注册信息 </legend>

					<div class="control-group">
						<label class="control-label" for="inputEmail">用户账号</label>
						<div class="controls">
							<input type="text" id="USER_CODE" name="USER_CODE" datatype="euser" sucmsg="账号验证通过！" tip="您的登陆账号" altercss="gray"><span class="Validform_checktip help-inline"></span>
						</div>
						<label class="control-label"  >用户名</label>
						<div class="controls">
							<input type="text" id="USER_NAME" name="USER_NAME" datatype="*" nullmsg="请输入您的用户名！" maxlength="20"><span class="Validform_checktip help-inline"></span>
						</div>
						
                        <label class="control-label" >密码</label>
						<div class="controls">
							<input type="password" id="USER_PWD" name="USER_PWD" datatype="*6-10" nullmsg="请设置密码！" errormsg="密码为6~10位之间！"maxlength="10">  
						</div>
						<label class="control-label"  >确认密码</label>
						<div class="controls">
							<input type="password" id="USER_PWD_CF" recheck="USER_PWD" name="USER_PWD_CF" datatype="*" maxlength="10" nullmsg="请输入确认密码！" errormsg="确认密码不正确！">  
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
						<label class="control-label" >问题答案</label>
						<div class="controls">
							<input type="text" id="01_SAFETY_ANSWER" name="01_SAFETY_ANSWER" maxlength="40" datatype="*1-40" nullmsg="请填写问题答案！">
						</div>
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
						<label class="control-label" >电话</label>
						<div class="controls">
							<input type="text" id="02_TEL" name="02_TEL" maxlength="20">  
						</div>
						<label class="control-label" >地址</label>
						<div class="controls">
							<input type="text" id="02_ADDR" name="02_ADDR" maxlength="200">
						</div>
						<label class="control-label" >用户类型</label>
						<div class="controls">
							<label class="radio inline">
								<input  type="radio" name="USER_TYPE" value="01" checked>普通用户
							</label>
							<label class="radio inline">
								<input type="radio" name="USER_TYPE" value="02">园区企业用户
							</label>
							<label class="radio inline">
								<input type="radio" name="USER_TYPE" value="03">区外企业用户
							</label> 
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
						<label class="control-label" >联系电话</label>
						<div class="controls">
							<input type="text" id="03_TEL" name="03_TEL" maxlength="20">  
						</div>
						<label class="control-label" >地址</label>
						<div class="controls">
							<input type="text" id="03_ADDR" name="03_ADDR" maxlength="200">  
						</div>
					</div> 

				</fieldset>
			</div>  	
		</div>
		<div class="form-actions">
			<button id = "btn_sub" class="btn btn-primary" type="button">注册</button>
			<button id = "btn_reset" type="button" class="btn">重置</button>
			<span id= "resultSpan" style="display:none;"></span>
		</div>	
		</form>	  
	</div>
</body>
</html>