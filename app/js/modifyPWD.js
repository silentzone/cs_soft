var appPWD = new function(){};
appPWD.init = function(){
	$("#modify_btn").click(function() { appPWD.modifyPwd()});
}
appPWD.modifyPwd = function(){
	var userId = $userId;
	var oldPwd = $.trim($("#OLD_PWD").val());
	var newPwd = $.trim($("#NEW_PWD").val());
	var newPwdRe = $.trim($("#NEW_PWD_RE").val());

	$.messager.defaults = { ok: "确定"};
	if(oldPwd =="")
	{
		$.messager.alert('温馨提醒','原密码不能为空','warning');
		$("#OLD_PWD").focus();
		return;	
	}
	if(newPwd =="")
	{
		$.messager.alert('温馨提醒','新密码不能为空','warning');
		$("#NEW_PWD").focus();
		return;	
	}
	if(newPwdRe !=newPwd)
	{
		$.messager.alert('温馨提醒','确认密码与新密码不一致','warning');
		$("#NEW_PWD_RE").focus();
		return;	
	}
	var base64Pwd = Base64.base64encode(Base64.utf16to8(oldPwd));
	var md5Pwd = MD5.toMD5(base64Pwd);

	var dict = new DynamicDict("UBOSS_DESKTOP_USER_002");
	dict.setValue("OP_TYPE","6");
	dict.setValue("USER_ID",userId);
	dict.setValue("MD5_PWD",md5Pwd);
	dict.setValue("INPUT_PWD",newPwd);
	$.messager.defaults = { ok: "确定"};
	if(!dict.callService()){
		$.messager.alert('温馨提醒','修改失败：'+dict.error.Desc,'error'); 
		$("#modifyResult").html("<font color='red'>用户 "+$userCode+" 密码修改失败</font>");
		return;
	}
	$.messager.alert('温馨提醒','密码修改成功','info'); 
	$("#modifyResult").html("<font color='green'>用户 "+$userCode+" 密码修改成功</font>");
	
}