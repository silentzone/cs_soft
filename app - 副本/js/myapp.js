var appMy = new function(){};

appMy.init = function(){
	this.elemEventBind();
}
appMy.elemEventBind = function(){

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
appDetail.init = function(){
	this.elemInit();
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
	var app_versions = $("#app_versions").trimval(); 
	if(app_versions==''){
		alert("应用版本号不能为空");
		$("#app_versions").focus();
		return;
	}
	var app_name = $("#app_name").trimval(); 
	if(app_name==''){
		alert("应用名称不能为空");
		$("#app_name").focus();
		return;
	}
	var eff_date = $("#eff_date").trimval(); 
	if(eff_date==''){
		alert("应用有效期不能为空");
		$("#eff_date").focus();
		return;
	}
	var exp_date = $("#exp_date").trimval(); 
	if(exp_date==''){
		alert("应用失效期不能为空");
		$("#exp_date").focus();
		return;
	}

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

	var price = "";
	if(charge_mode=='1'){
		price = $("#price").trimval(); 
		if(price==''){
			alert("应用价格不能为空");
			$("#price").focus();
			return;
		}
	}

	var app_desc = $editor.html();
	if(app_desc==''){
		alert("应用描述不能为空");
		$("#app_desc").focus();
		return;
	}
	
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
	appObj.setValue("APP_CODE",$("#app_code").trimval());
	appObj.setValue("APP_BAR_CODE",$("#app_bar_code").trimval());
	appObj.setValue("CHARGE_MODE",charge_mode);
	appObj.setValue("PRICE",price);
	var fileObj = new DynamicDictBo(dict.dataBO,"APP_FILE");
	fileObj.setValue("FILE_ID",$fileId);
	fileObj.setValue("APP_PIC",$imgUrl);
	if(!dict.callService()){
		alert("应用保存失败："+dict.error.Desc);
		//$.messager.alert('温馨提醒','应用保存失败：'+dict.error.Desc,'error'); 
		// $("#modifyResult").html("<font color='red'>用户 "+userCode+" 信息修改失败</font>");
		return;
	}
	alert(dict.getValue("APP_ID"))
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