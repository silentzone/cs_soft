var Pb = function() {};
Pb.userAttrDef = function(){
	var uad = null;
	var dict = new DynamicDict("UBOSS_DESKTOP_USER_001");
	dict.setValue("OP_TYPE","9");
	dict.setValue("STATE","1");
	if(!dict.callService()){
		alert(dict.error.Desc);
	}else{
		uad = dict;
	}
	return uad;
}
/* query user details information*/
Pb.queryUserDetails = function(userId,qryType,qryBasic){
	var dict = new DynamicDict("UBOSS_DESKTOP_USER_001");
	dict.setValue("OP_TYPE","7");
	dict.setValue("USER_ID",userId);
	dict.setValue("QRY_TYPE",qryType);
	dict.setValue("QRY_BASIC",qryBasic);
	if(!dict.callService()){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','用户信息查询失败：'+dict.error.Desc,'error'); 
		return null;
	}
	return dict;
}
Pb.numberFix = function(obj){
	obj.value = obj.value.replace(/[^\d]/g,""); //清除"数字"以外的字符
}
Pb.clearNumberFix = function(obj){
	
	obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符

	obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字而不是

	obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的

	obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");

	obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
}
tabPlugin = function(tab) {
	var elemObj =  $("#"+tab+" a");
	this.tab = tab;
	this.elemObj = elemObj;
	var _self = this;
	for(var i=0;i<elemObj.length;i++){
		var ele = elemObj[i];
		var cls = $(ele).parent().attr("class");
		if(cls=='active')
		_self.setShow($(ele).attr("href"));
		$(ele).click(function(){
			_self.setShow($(this).attr("href"));
		});
	}
}
tabPlugin.prototype.setShow=function(str) {
	var sele;
	for(var i=0;i<this.elemObj.length;i++){
		var ele = this.elemObj[i];
		var href = $(ele).attr("href");
		if(href==str){
			$(ele).parent().addClass("active");
			$(str).show();
		}else{
			$(ele).parent().removeClass("active");
			$(href).hide();
		}
	}
}
tabPlugin.prototype.addEvent=function(str) {
	var objs = $("[href='"+str+"']");
	if(objs.length>1)
	$(objs[0]).bind("click",function() { alert(12) });
}