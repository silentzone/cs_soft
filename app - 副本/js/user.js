var appUser = new function(){};

appUser.init = function(){
	this.elemEventBind();
	this.initUserInfo();
}
/* init user informations to model*/
appUser.initUserInfo = function(){
	// user details informations(contain basic information)
	var dict = Pb.queryUserDetails($userId,"0","1");
	var count = dict.getDataObjCnt("USER");
	if(count<1){
		// $.messager.defaults = { ok: "确定"};
		// $.messager.alert('温馨提醒','用户信息有误','error');
		return;
	}
	var row = dict.getBOValue("USER",0);
	$("#USER_NAME").val(row.getValue("USER_NAME"));
	$("#E_MAIL").val(row.getValue("E_MAIL"));
	$("#USER_TYPE").val(row.getValue("USER_TYPE"));

	var unum = dict.getDataObjCnt("USER_INFO");
	for(var i=0 ; i<unum; i++){
		var uObj = dict.getBOValue("USER_INFO",i);
		var name = uObj.getValue("ATTR_CODE");
		var value = uObj.getValue("ATTR_VALUE");
		
		if(name=='01_SAFETY'){
			$("#01_SAFETY").val(value);
			continue;
		}
		if(name=='01_SAFETY_ANSWER'){
			$("#01_SAFETY_ANSWER").val(value);
			continue;
		}
		if(name=='02_NAME'){
			$("#02_NAME").val(value);
			continue;
		}
		if(name=='02_TEL'){
			$("#02_TEL").val(value);
			continue;
		}
		if(name=='02_ADDR'){
			$("#02_ADDR").val(value);
			continue;
		}
		if(name=='03_NAME'){
			$("#03_NAME").val(value);
			continue;
		}
		if(name=='03_ADDR'){
			$("#03_ADDR").val(value);
			continue;
		}
	}
}
/* binding page elements event*/
appUser.elemEventBind = function(){
	/* modify user informations button*/
	$("#modify_btn").click(function() { appUser.modifyUser()});
	$("#cancel_btn").click(function() { appUser.cancelModify()});
	$("#save_btn").click(function() { appUser.saveUser()});
}
/* modify user button event*/
appUser.modifyUser = function(){
	this.setUserModelView(false);
	$("#modify_btn").hide();
	$("#cancel_btn").show();
	$("#save_btn").show();
}
/* cancel modify user button event*/
appUser.cancelModify = function(){
	this.setUserModelView(true);
	$("#modify_btn").show();
	$("#cancel_btn").hide();
	$("#save_btn").hide();
}
/* save modify user button event*/
appUser.saveUser = function(){
	var userId = $userId;
	var userCode = $("#USER_CODE").val();
	var dict = new DynamicDict("UBOSS_DESKTOP_USER_001");
	dict.setValue("OP_TYPE","2");
	dict.setValue("USER_ID",userId);
	var userObj = new DynamicDictBo(dict.dataBO,"USER");
	userObj.setValue("USER_ID",userId);
	userObj.setValue("USER_NAME",$("#USER_NAME").val());
	userObj.setValue("E_MAIL",$("#E_MAIL").val());
	userObj.setValue("USER_NAME",$("#USER_NAME").val());
	userObj.setValue("USER_TYPE",$("#USER_TYPE").val());
	//附属信息
	var uad = Pb.userAttrDef();
	var uNum = uad.getDataObjCnt("USER_ATTR_DEF");
	for(var i=0;i<uNum;i++){

		var uObj = uad.getBOValue("USER_ATTR_DEF",i);
		var ele = $("#"+uObj.getValue("ATTR_CODE"));
		if(ele.length==0) continue;

		var infObj = new DynamicDictBo(userObj.dataBO,"USER_INFO");
		infObj.setValue("ATTR_ID",uObj.getValue("ATTR_ID"));
		infObj.setValue("SEQ","1");
		infObj.setValue("ATTR_NAME",uObj.getValue("ATTR_NAME"));
		infObj.setValue("ATTR_CODE",uObj.getValue("ATTR_CODE"));
		infObj.setValue("ATTR_VALUE",ele.val());
		infObj.setValue("ATTR_VALUE_TEXT",ele.val());
		infObj.setValue("GROUP_ID",uObj.getValue("GROUP_ID"));
	}
	$.messager.defaults = { ok: "确定"};
	if(!dict.callService()){
		$.messager.alert('温馨提醒','修改失败：'+dict.error.Desc,'error'); 
		$("#modifyResult").html("<font color='red'>修改失败</font>");
		return;
	}
	$.messager.alert('温馨提醒','修改成功','info'); 
	$("#modifyResult").html("<font color='green'>修改成功</font>");
	
	
	this.cancelModify();
}
/* the user informations show and hidden setting*/
appUser.setUserModelView = function(flag){
	$("#USER_NAME").attr("disabled",flag);
	$("#USER_TYPE").attr("disabled",flag);
	$("#01_SAFETY").attr("disabled",flag);
	$("#01_SAFETY_ANSWER").attr("disabled",flag);
	$("#E_MAIL").attr("disabled",flag);
	$("#02_NAME").attr("disabled",flag);
	$("#02_TEL").attr("disabled",flag);
	$("#02_ADDR").attr("disabled",flag);
	$("#03_NAME").attr("disabled",flag);
	$("#03_TEL").attr("disabled",flag);
	$("#03_ADDR").attr("disabled",flag);
}