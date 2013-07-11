// JavaScript Document


function addEvent( obj, type, fn ) { 
     if (obj.addEventListener) 
         obj.addEventListener( type, fn, false ); 
     else if (obj.attachEvent) { 
         obj["e"+type+fn] = fn; 
         obj.attachEvent( "on"+type, function() { obj["e"+type+fn](); } ); 
     } 
} 

addEvent(window,"load",initPage());

function initPage(){
	//加载 服务器模板推荐 及 tab 页
	//	insertMenu(); 
}
//插入菜单
function insertMenu(){ 
	loadData();  //取得数据
}

//取得数据
function loadData(){
	// $("#tablist").append('<li class="nav-header">服务器模板推荐</li>');
	
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","1"); //初始化数据
	
	if(!dict.callService()){
		$.messager.alert('温馨提醒',dict.error.Desc,'info');
		return ;
	}
	//得到数据
	var judge =0;
	var i = 0;
	var templist = dict.getValue("TEMPLETLIST");  //模板列表
	var tempItem ; //模板的内容
	for ( i =0;i<templist.getDataObjCnt("TEMPLETITEM");i++){
		var tab_name = templist.getBOValue("TEMPLETITEM",i).getValue("CONF_NAME");
		var tab_id = templist.getBOValue("TEMPLETITEM",i).getValue("CONF_ID");
		var state = templist.getBOValue("TEMPLETITEM",i).getValue("STATE");
		if (left(tab_id,8) =='USERINST' && judge==0){
		//	$("#tablist").append('<li class="nav-header">已购服务</li>');
			judge =1;
		}
		//插入tablist
		var tab_name_2 =tab_name;
		if (judge ==1){
			break;
		}
		if(tab_id == 1) {
			$("#tablist").append(' <li class="active"><a href="#WH'+tab_id+'"> '+tab_name_2+' </a></li> ');	
		} else {
			$("#tablist").append(' <li><a href="#WH'+tab_id+'">'+tab_name_2+' </a></li> ');
		}
		
		tempItem = templist.getBOValue("TEMPLETITEM",i);
		createTabGroups(tempItem,tab_id);
	}
	
	$("#tablist").sildeTab(); 
}

function getAllControlValue(dict){
	
	//得到网页上的值
	var tags = obj_parent.parentNode.parentNode.parentNode.getElementsByTagName("*");
	var os = "";
    if (tags != null && tags.length > 0) {
        for (var i = 0; i < tags.length; i++) {  
			var userMgr;
			var controlid =tags[i].getAttribute("id");
			if (controlid ==null || controlid =="") continue;
            if ( left(controlid,7)== "control") {  //cpu
				var value = tags[i].value;
				if (value =="-1") {
					$.messager.alert('温馨提醒',"请选择操作系统",'info');
					return ;
				}
				var attr_id = right(controlid,controlid.length - 7);
				userMgr = new DynamicDictBo(dict.dataBO,"USER_INST_ATTR");
				userMgr.setValue("ATTR_ID",attr_id); 
				userMgr.setValue("ATTR_INST_VALUE",tags[i].value); 
				
            }  
			if (controlid =="notes"){
				var vm_name = tags[i].value;
				if (vm_name == null || vm_name.length ==0 ){
					$.messager.alert('温馨提醒',"请输入名称",'info');
					return 0;
				}
				dict.setValue("NOTES",tags[i].value); //备注
				}
        }  
    }  
}
//判断名称是否有重复
function jugegDupName(dict){
	//判断名称是否有重复
	dict.setValue("ANSYC_FLAG","6"); //判断是否有重复
	if(!dict.callService()){
		$.messager.alert('温馨提醒',dict.error.Desc,'info');
		return 1;
	}else{
		var cnt = dict.getValue("CNT");  //重复
		if (cnt !='0') {
			$.messager.alert('温馨提醒','已经存在该名称','info');
			return 1;
		}
	}
	return 0
}

function countBill(dict){
	dict.setValue("ANSYC_FLAG","2"); //保存
	dict.setValue("OPERTYPE","0");
	if(!dict.callService()){
		$.messager.alert('温馨提醒',dict.error.Desc,'info');
	}else{
		billNum = dict.getValue("TOTAL_PRICE");
		balanceNum = dict.getValue("BILL_BALANCE");
		actBill =parseFloat(billNum) /100;
		actBalance = parseFloat(balanceNum) /100;
		$("#BILLNUM").val(actBill+'  云币');
		$("#BALANCENUM").val(actBalance+'  云币');
	}
	
}
//保存
function saveMGE(obj){
	
	var dict = new DynamicDict("UBOSS_USERMGR_001");

	getAllControlValue(dict)
	
	//得到支付密码
	var intPwd = $("#INT_PWD").trimval();
	if(intPwd==""){
		alert("请输入消费密码！");
		$("#INT_PWD").focus();
		return;
	}
	var base64Pwd = Base64.base64encode(Base64.utf16to8(intPwd));
	var md5Pwd = MD5.toMD5(base64Pwd);
	dict.setValue("MD5_PWD",md5Pwd);
	$('#win').window('close'); 
	//转换成
	
	if( !confirm("确定要保存配置吗？")) return ;
	 
	//保存
	dict.setValue("ANSYC_FLAG","2"); //保存
	dict.setValue("OPERTYPE","1");
	if(!dict.callService()){
		$.messager.alert('温馨提醒',dict.error.Desc,'info');
	}else{
		$.messager.alert('温馨提醒',"保存成功",'info');
		//刷新界面
		$("#tablist").empty();  //清空
		$("#tabgroups").empty();
		loadData();
	}
}


function left(mainStr,lngLen) { 
if (lngLen>0) {return mainStr.substring(0,lngLen)} 
else{return null} 
} 

function right(mainStr,lngLen) { 
// alert(mainStr.length) 
if (mainStr.length-lngLen>=0 && mainStr.length>=0 && mainStr.length-lngLen<=mainStr.length) { 
return mainStr.substring(mainStr.length-lngLen,mainStr.length)} 
else{return null} 
} 
function mid(mainStr,starnum,endnum){ 
if (mainStr.length>=0){ 
return mainStr.substr(starnum,endnum) 
}else{return null} 
//mainStr.length 
} 

//打开支付密码窗口
var obj_parent;
function openThdSaveWin(obj){
	obj_parent = obj;
	//得到费用总额
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	getAllControlValue(dict);
	if (jugegDupName(dict) ==1) return ;
	countBill(dict);
	$('#win').window('open'); 
}
function closePopwin(){
	$('#win').window('close'); 
}