var demo = null;
$(function(){
	demo = $(".registerform").Validform({
		btnSubmit:"#btn_sub", 
		btnReset:"#btn_reset",
		tiptype:3,
		ajaxPost:false,
		datatype:{
			"euser":function(gets,obj,curform,datatype){
				var regxp = /[\w\W]+/;
				if(!regxp.test(gets)){
					$.Tipmsg.w["euser"]="请输入登陆账号！";
					return false;
				}
				var regxp2 = /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/;
				if(!regxp2.test(gets)){
					$.Tipmsg.w["euser"]="账号为6-18个字符！";
					return false;
				}

				var dict = new DynamicDict("UBOSS_DESKTOP_USER_001");
				dict.setValue("OP_TYPE","4");
				dict.setValue("USER_CODE",gets);
				if(!dict.callService()){
					$.Tipmsg.w["euser"]="系统忙！";
					return false;
				}
				var count = dict.getValue("COUNT");
				if(!count){
					$.Tipmsg.w["euser"]="系统忙！";
					return false;
				}else if(count>0){
					$.Tipmsg.w["euser"]="此账号已注册！";
					return false;
				}else{
					return;
				}
			}
		},
		beforeSubmit:function(curform){
			$("#mainDiv").showLoading({'addClass': 'loading-indicator-bars'});
		},
		callback:function(data){
			appReg.btnSubmit();
			$("#mainDiv").hideLoading();
			return false;
		}
	});
	demo.setStatus("posted");
})
var appReg = new function(){};
appReg.btnSubmit = function(){
	var userCode = $("#USER_CODE").val();
	var dict = new DynamicDict("UBOSS_DESKTOP_USER_001");
	dict.setValue("OP_TYPE","1");
	var userObj = new DynamicDictBo(dict.dataBO,"USER");
	userObj.setValue("INPUT_PWD",$("#USER_PWD").val());
	userObj.setValue("USER_NAME",$("#USER_NAME").val());
	userObj.setValue("USER_CODE",userCode);
	userObj.setValue("E_MAIL",$("#E_MAIL").val());
	userObj.setValue("USER_REG_TYPE","1");
	var utObj = $("input[type='radio'][name='USER_TYPE']");
	for(var i=0;i<utObj.length;i++){
		if(utObj[i].checked){
			userObj.setValue("USER_TYPE",utObj[i].value);
			break;
		}
	}
	userObj.setValue("IS_LOCKED","0");
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
	if(!dict.callService()){
		alert(dict.error.Desc);
		appReg.resultShow("0","用户 "+userCode+" 注册失败："+dict.error.Desc);
		return;
	}
	appReg.resultShow("1","用户 "+userCode+" 注册成功 <a href='./login.jsp'>登陆</a>");
}
appReg.resultShow = function(flag,desc){
	$("#resultSpan").removeClass();
	if(flag=="1"){
		$("#resultSpan").addClass("help-inline Validform_right");
	}else{
		$("#resultSpan").addClass("help-inline Validform_wrong");
	}
	$("#resultSpan").html(desc);
	$("#resultSpan").show();
}