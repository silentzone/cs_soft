var cardview = $.extend({}, $.fn.datagrid.defaults.view, {
    renderRow: function(target, fields, frozen, rowIndex, rowData){
		var cc = [];
		cc.push('<td colspan=' + fields.length + ' style="padding:2px 1px; ">');
		if (!frozen){
			cc.push('<img src="../img/whcomputer.png" style="height:72px; width:72px; float:left"> ');
			cc.push('<div style="float:left;margin-left:10px; width:550px;">');
			for(var i=0; i<fields.length; i++){
				var copts = $(target).datagrid('getColumnOption', fields[i]); 
				cc.push('<p class="datagrid_p" style="width:49.5%; float:left;"><span class="c-label">' + copts.title + ':</span> ' + rowData[fields[i]] + ' </p>'); //
				// cc.push('<span><span class="c-label">' + copts.title + ':</span> ' + rowData[fields[i]] + '</span>'); 
			}
			cc.push('</div>');
    	}
   	 	cc.push('</td>');
    	return cc.join('');
    }
});

var appRole = new function(){};

appRole.init = function(){
	this.initUserTable();
	this.elemEventBind();
	//appRole.queryUser('1','5');//检索
	innitSelectControl();
	
}


function innitSelectControl(){
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","18");


	if(!dict.callService()){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','用户查询失败：'+dict.error.Desc,'error');
		return;
	}
	var myDict = dict.getValue("VM_NAME");
	var selectControl = document.getElementById("selecdiv");
	var control = document.createElement("select");
	control.id ="user_vm_name_sel";
	control.setAttribute("class","easyui-combobox");
	control.setAttribute("style","width:120px; margin-bottom:0;");
	
	for ( i =0;i<myDict.getDataObjCnt("USER_VM_NAME");i++){
		var opt = myDict.getBOValue("USER_VM_NAME",i);
		var opt_name = opt.dataBO.childNodes[0].nodeValue; 
		control.options.add(new Option(opt_name,opt_name));

	}
	selectControl.appendChild(control);
	
	
}

appRole.elemEventBind = function(){
	/* user query button*/
	$("#qry_btn").click(function(){appRole.queryUser('1','5')});
	
}
/* user table init*/
appRole.initUserTable = function(){
	//$('#table_mgrinfo').datagrid({view: cardview});
	$('#table_mgrinfo').datagrid({    
		singleSelect: true,
		striped:true,
		// rownumbers:true,
		loadMsg:'获取数据中...', 
		remoteSort:false,   
		view: cardview
		});    
}
/* query user method*/
appRole.queryUser = function(pageNumber,pageSize){
	
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","17");
	dict.setValue("PAGE_NUMBER",pageNumber);
	dict.setValue("PAGE_SIZE",pageSize);  
	var vm_name = document.getElementById("user_vm_name_sel").value;
	dict.setValue("USER_VM_NAME",vm_name); 
	
	var condVal = $.trim($("#condition_value").val());
	if(condVal!=""){
		var cDict = new DynamicDictBo(dict.dataBO,"QRY_CONDITION");
		cDict.setValue("FIELD","user_code");
		cDict.setValue("CONDITION","like");
		cDict.setValue("value","%"+condVal+"%");
	}
	if(!dict.callService()){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','用户查询失败：'+dict.error.Desc,'error');
		return;
	}
	var count = dict.getValue("TOTAL_COUNT");
	if(count==0) {
		$('#table_mgrinfo').datagrid('loadData',[]);
		return;
	}
	var json = dict.toJson(false);
	var obj = null;
	if(count>1){
		obj = json.user_info;
	}else if(count==1){//一条记录做特殊处理 toJson对象不同
		obj = {};
		obj.total = count;
		obj.rows = [json.user_info.rows];
	}
	$('#table_mgrinfo').datagrid('loadData',obj);
}

