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
	appRole.queryUser('1','5');//检索
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
	dict.setValue("ANSYC_FLAG","9");
	dict.setValue("PAGE_NUMBER",pageNumber); //第几页
	dict.setValue("PAGE_SIZE",pageSize);  //每页显示的行数
	
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

