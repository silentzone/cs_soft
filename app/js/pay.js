var appPay = new function(){};
appPay.init = function(){
	
}
appPay.buyAppSn = function(){
	var intPwd = $("#INT_PWD").trimval();
	if(intPwd==""){
		alert("请输入消费密码！");
		$("#INT_PWD").focus();
		return;
	}
	var base64Pwd = Base64.base64encode(Base64.utf16to8(intPwd));
	var md5Pwd = MD5.toMD5(base64Pwd);
	var dict = new DynamicDict("UBOSS_DESKTOP_APP_001");
	dict.setValue("OP_TYPE","9");
	dict.setValue("FILE_ID",$("#fileId").val());
	dict.setValue("APP_ID",$("#appId").val());
	dict.setValue("APP_VERSIONS",$("#appVersions").val());
	dict.setValue("PRICE",$("#PRICE").val());
	dict.setValue("BILL_ID",$("#BILL_ID").val());
	dict.setValue("MD5_PWD",md5Pwd);
	if(!dict.callService()){
		alert(dict.error.Desc);
		return;
	}
	var sn = dict.getValue("SN");
	$("#SN").val(sn);
	var form = document.getElementById("postForm");
	form.action = "./pay_suc.jsp";
	form.submit();
}
appPay.recharge = function(){
	window.location.href='../account.jsp';
}