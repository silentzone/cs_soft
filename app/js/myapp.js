var appMy = new function(){};

appMy.init = function(){
	this.elemEventBind();
}
appMy.elemEventBind = function(){
	$(".btn-mini").bind("click",function () {appMy.showDetail(this);});	
}
appMy.showDetail = function(obj){
	var appId = $(obj).attr("appId");
	var appVersions = $(obj).attr("appVersions");
	$("#appId").val(appId);
	$("#appVersions").val(appVersions);
	var form = document.getElementById("detailForm");
	form.action = "./myapp/app_detail.jsp";
	form.submit();
}
var midMy = new function(){};
midMy.init = function(){
	this.elemEventBind();
}
midMy.elemEventBind = function(){
	$(".btn-mini").bind("click",function () {midMy.showDetail(this);});	
}
midMy.showDetail = function(obj){
	var appId = $(obj).attr("appId");
	var appVersions = $(obj).attr("appVersions");
	$("#appId").val(appId);
	$("#appVersions").val(appVersions);
	var form = document.getElementById("detailForm");
	form.action = "./myapp/app_detail.jsp";
	form.submit();
}
var appUpload = new function(){};
appUpload.init = function(){

}
appUpload.nextBtn = function(){
	var fileId = $("#fileId").val();
	if(fileId==""){
		alert("请上传应用文件");
		return;
	}
	var imgUrl = $("#imgUrl").val();
	if(imgUrl==""){
		alert("请上传应用图片");
		return;
	}
	var form = document.getElementById("fileForm");
	form.method="post";
	form.action = "detail.jsp";
	form.submit();

}

var appDetail = new function(){};
appDetail.init = function(flag){
	this.elemInit();
	// this.initSelect();
	if(flag=='true'){
		// modify detail information loading
		this.disabledBasicElem();
	}

}
appDetail.initSelect = function(){
	$('#app_catalog').combotree({
		multiple:true
	});
	var obj_usergrid = [{
	"id":1,
	"text":"My Documents",
	"children":[{
		"id":11,
		"text":"Photos",
		"state":"closed",
		"children":[{
			"id":111,
			"text":"Friend"
		},{
			"id":112,
			"text":"Wife"
		},{
			"id":113,
			"text":"Company"
		}]
	},{
		"id":12,
		"text":"Program Files",
		"children":[{
			"id":121,
			"text":"Intel"
		},{
			"id":122,
			"text":"Java",
			"attributes":{
				"p1":"Custom Attribute1",
				"p2":"Custom Attribute2"
			}
		},{
			"id":123,
			"text":"Microsoft Office"
		},{
			"id":124,
			"text":"Games",
			"checked":true
		}]
	},{
		"id":13,
		"text":"index.html"
	},{
		"id":14,
		"text":"about.html"
	},{
		"id":15,
		"text":"welcome.html"
	}]
}]

	$('#app_catalog').combotree('loadData',obj_usergrid); 
}
appDetail.disabledBasicElem = function(){

	var obj1 = $("input:radio[name='charge_mode'][value='"+$chargeMode+"']");
	obj1.attr("checked","checked"); 
	this.radioChk();
	var obj2 = $("input:radio[name='app_level'][value='"+$appLevel+"']");
	obj2.attr("checked","checked"); 

	var alObj = $("input[type='radio'][name='charge_mode']");
	for(var i=0;i<alObj.length;i++){
		$(alObj[i]).attr("disabled","disabled");
	}
	$("#price").attr("disabled","disabled");
	$("#app_versions").attr("disabled","disabled");
}
appDetail.elemInit = function(){
	// 标签
	var arr = [{key:"游戏",value: "001"},{key:"音乐",value: "002"},{key:"应用工具",value: "003"},{key:"其它",value: "004"}];
    $("#chkbox_list").checklist(arr);
 
	// 滚动条
    // $('body').jScrollPane();
    // $api = $('body').data('jsp');

	// 1 收费 0 免费
	var  $input = $("#t_radio").find("input");
	this.radioChk();
	$input.bind("change",function () {appDetail.radioChk();});	
}
appDetail.saveApp = function(){

	if(!this.validator()) return;
	var app_versions = $("#app_versions").trimval(); 
	var app_name = $("#app_name").trimval(); 
	var eff_date = $("#eff_date").trimval(); 
	var exp_date = $("#exp_date").trimval(); 
	var alObj = $("input[type='radio'][name='app_level']");
	var app_level = "";
	for(var i=0;i<alObj.length;i++){
		if(alObj[i].checked){
			app_level = alObj[i].value;
			break;
		}
	}

	var cmObj = $("input[type='radio'][name='charge_mode']");
	var charge_mode = "";
	for(var i=0;i<cmObj.length;i++){
		if(cmObj[i].checked){
			charge_mode = cmObj[i].value;
			break;
		}
	}

	var price = "0";
	if(charge_mode=='1'){
		price = $("#price").trimval(); 
	}


	var app_label = "";
	var alObj = $("input[type='hidden'][name='app_label']");
	app_label = alObj.val();
	
	var app_desc = $editor.html();
		
	var dict = new DynamicDict("UBOSS_DESKTOP_APP_001");
	dict.setValue("OP_TYPE","1");
	dict.setValue("APP_VERSIONS",app_versions);
	dict.setValue("USER_ID",$userId);
	var appObj = new DynamicDictBo(dict.dataBO,"APP");
	appObj.setValue("APP_NAME",app_name);
	appObj.setValue("APP_DESC",app_desc);
	appObj.setValue("REMARK",$("#remark").trimval());
	appObj.setValue("EFF_DATE",eff_date);
	appObj.setValue("EXP_DATE",exp_date);
	appObj.setValue("APP_LEVEL",app_level);
	appObj.setValue("APP_LABEL",app_label);
	appObj.setValue("APP_CODE",$("#app_code").trimval());
	appObj.setValue("APP_BAR_CODE",$("#app_bar_code").trimval());
	appObj.setValue("CHARGE_MODE",charge_mode);
	appObj.setValue("PRICE",price);
	var fileObj = new DynamicDictBo(dict.dataBO,"APP_FILE");
	fileObj.setValue("FILE_ID",$fileId);
	fileObj.setValue("APP_PIC",$imgUrl);

	// 应用分类
	// this.appCatalogBo(dict.dataBO);

	if(!dict.callService()){
		alert("应用保存失败："+dict.error.Desc);
		//$.messager.alert('温馨提醒','应用保存失败：'+dict.error.Desc,'error'); 
		// $("#modifyResult").html("<font color='red'>用户 "+userCode+" 信息修改失败</font>");
		return;
	}
	$("#appName").val(dict.getValue("APP_NAME"));
	$("#appId").val(dict.getValue("APP_ID"));
	$("#appVersions").val(dict.getValue("APP_VERSIONS"));
	var form = document.getElementById("sucForm");
	form.action = "detail_suc.jsp";
	form.submit();
}
appDetail.appCatalogBo = function(dataBO){
	// var obj = new DynamicDictBo(dataBO,"CATALOG");
	// obj.setValue("FILE_ID",$fileId);
	var wordstr= $("#app_catalog").combotree("getValues");
	var o= $("#app_catalog").combotree("options");
	for(var i=0;i<wordstr.length;i++){
		// alert(wordstr[i])
	}
}
appDetail.radioChk = function() { 
	var $charge_value = $("#charge_value");
	var radioStatus = $("#t_radio").find("input[name='charge_mode']:checked").val();
	if(radioStatus == 1) {
		$charge_value.show();
	} else {
		$charge_value.hide();
	}
}
appDetail.modifyApp = function(){
	
	if(!this.validator()) return;
	var app_versions = $("#app_versions").trimval(); 
	var app_name = $("#app_name").trimval(); 
	var eff_date = $("#eff_date").trimval(); 
	var exp_date = $("#exp_date").trimval(); 
	var alObj = $("input[type='radio'][name='app_level']");
	var app_level = "";
	for(var i=0;i<alObj.length;i++){
		if(alObj[i].checked){
			app_level = alObj[i].value;
			break;
		}
	}

	var app_label = "";
	var alObj = $("input[type='hidden'][name='app_label']");
	app_label = alObj.val();

	var app_desc = $editor.html();
		
	var dict = new DynamicDict("UBOSS_DESKTOP_APP_001");
	dict.setValue("OP_TYPE","3");
	dict.setValue("APP_ID",$("#appId").val());
	dict.setValue("APP_VERSIONS",app_versions);
	var appObj = new DynamicDictBo(dict.dataBO,"APP");
	appObj.setValue("APP_NAME",app_name);
	appObj.setValue("APP_DESC",app_desc);
	appObj.setValue("REMARK",$("#remark").trimval());
	appObj.setValue("EFF_DATE",eff_date);
	appObj.setValue("EXP_DATE",exp_date);
	appObj.setValue("APP_LEVEL",app_level);
	appObj.setValue("APP_LABEL",app_label);
	appObj.setValue("APP_CODE",$("#app_code").trimval());
	appObj.setValue("APP_BAR_CODE",$("#app_bar_code").trimval());
	// 应用分类
	// this.appCatalogBo(dict.dataBO);

	if(!dict.callService()){
		alert("应用保存失败："+dict.error.Desc);
		return;
	}
	$("#opType").val("3");
	$("#appName").val(app_name);
	$("#appVersions").val(app_versions);
	var form = document.getElementById("sucForm");
	form.action = "detail_suc.jsp";
	form.submit();
}
appDetail.validator = function(){

	var app_versions = $("#app_versions").trimval(); 
	if(app_versions==''){
		alert("应用版本号不能为空");
		$("#app_versions").focus();
		return false;
	}
	var app_name = $("#app_name").trimval(); 
	if(app_name==''){
		alert("应用名称不能为空");
		$("#app_name").focus();
		return false;
	}
	var eff_date = $("#eff_date").trimval(); 
	if(eff_date==''){
		alert("应用有效期不能为空");
		$("#eff_date").focus();
		return false;
	}
	var exp_date = $("#exp_date").trimval(); 
	if(exp_date==''){
		alert("应用失效期不能为空");
		$("#exp_date").focus();
		return false;
	}

	var alObj = $("input[type='radio'][name='app_level']");
	var app_level = "";
	for(var i=0;i<alObj.length;i++){
		if(alObj[i].checked){
			app_level = alObj[i].value;
			break;
		}
	}
	if(app_level==''){
		alert("请选择应用级别");
		return false;
	}
	var cmObj = $("input[type='radio'][name='charge_mode']");
	var charge_mode = "";
	for(var i=0;i<cmObj.length;i++){
		if(cmObj[i].checked){
			charge_mode = cmObj[i].value;
			break;
		}
	}

	var price = "";
	if(charge_mode=='1'){
		price = $("#price").trimval(); 
		if(price==''){
			alert("应用价格不能为空");
			$("#price").focus();
			return false;
		}
	}

	var alObj = $("input[type='hidden'][name='app_label']");
	if(alObj.val()==""){
		alert("请选择至少一个应用标签");
		return false;
	}

	// var wordstr= $("#app_catalog").combotree("getValues");
	// if(wordstr.length<1){
	// 	alert("请选择应用分类");
	// 	return false;
	// }

	var app_desc = $editor.html();
	if(app_desc==''){
		alert("应用描述不能为空");
		$("#app_desc").focus();
		return false;
	}
	return true;
}