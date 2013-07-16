var appAudit = new function(){};

appAudit.init = function(){
	this.elemEventBind();
	this.initOrderTable();
}
appAudit.elemEventBind = function(){
	$("#pass_btn").attr("disabled","disabled");
	$("#nopass_btn").attr("disabled","disabled");
	$("#qry_btn").click(function(){appAudit.queryOrder('1','5')});
	$("#pass_btn").click(function(){appAudit.auditPass()});
	$("#nopass_btn").click(function(){appAudit.auditNoPass()});
}
appAudit.initOrderTable = function(){
	$('#table_orderinfo').datagrid({
		singleSelect: true,striped:true,rownumbers:true,pagination:true,fitColumns:true,loadMsg:'获取数据中...',
		remoteSort:false,
		onClickRow:function(idx,rowData) {
			var auditState = rowData.audit_state;
			if(auditState=='0'){
				$("#pass_btn").removeAttr("disabled");
				$("#nopass_btn").removeAttr("disabled");
			}else{
				$("#pass_btn").attr("disabled","disabled");
				$("#nopass_btn").attr("disabled","disabled");
			}
		},
		onDblClickRow:function(idx,rowData){
			art.dialog.open('app/myapp/app_detail.jsp?appId='+rowData.app_id+'&appVersions='+rowData.app_versions+'&appModel='+rowData.app_model,
	        {   
	            id : rowData.app_id,
	            title: rowData.app_name,
	            resize:false,
	            lock:true,
	            background:'#000', // 背景色
	            opacity: 0.8 // 透明度 
	            ,close : function () { 
	        	   $("#impress").removeClass("noevent")
	       		}
			} 
			); 
		}
	});
	 //设置分页控件  
    var p = $('#table_orderinfo').datagrid('getPager');  
    $(p).pagination({  
        pageSize: 5,//每页显示的记录条数，默认为10  
        pageList: [5,10,15],//可以设置每页记录条数的列表  
        beforePageText: '第',
        afterPageText: '页    1共 {pages} 页',  
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录', 
        onSelectPage:function(pageNumber,pageSize){
        	appAudit.queryOrder(pageNumber,pageSize);
        },
        onRefresh:function(pageNumber,pageSize){
        	appAudit.queryOrder(pageNumber,pageSize);
        } 
    }); 
}
/* query order informations by database pages*/
appAudit.queryOrder = function(pageNumber,pageSize){
	$("#saveResult").empty();
	var dict = new DynamicDict("UBOSS_DESKTOP_APP_001");
	dict.setValue("OP_TYPE","7");
	dict.setValue("PAGE_NUMBER",pageNumber);
	dict.setValue("PAGE_SIZE",pageSize);
	var condVal = $.trim($("#condition_value").val());
	if(condVal!=""){
		var cDict = new DynamicDictBo(dict.dataBO,"QRY_CONDITION");
		cDict.setValue("FIELD","order_no");
		cDict.setValue("CONDITION","like");
		cDict.setValue("value","%"+condVal+"%");
	}
	$.messager.defaults = { ok: "确定"};
	if(!dict.callService()){
		$.messager.alert('温馨提醒','定单查询失败：'+dict.error.Desc,'error');
		return;
	}
	var count = dict.getValue("TOTAL_COUNT");
    if(count==0) {
        $.messager.alert('温馨提醒','查询结束，未找到记录','info');
        return;
    }
	var obj = this.dataFilter(dict);
	$('#table_orderinfo').datagrid('loadData',obj);
}
/* deal the source order data to datagrid*/
appAudit.dataFilter = function(dict){
	var tnum = dict.getValue("TOTAL_COUNT");
	if(tnum==0) return [];
	var pnum = dict.getValue("PAGE_COUNT");
	var json = dict.toJson(false);
	var order = json.order_info;
	var obj = null;
	if(pnum == 1){
		if(order.audit_state=='0'){
			order.state_desc = "<font color='red'>未审核</font>";
		}else if(order.audit_state=='1'){
			order.state_desc = "<font color='green'>审核通过</font>";
		}else if(order.audit_state=='9'){
			order.state_desc = "<font color='red'>审核未通过</font>";
		}
		if(order.action_type=='A'){
			order.action_type_desc = "<font color='blue'>应用下载</font>";
		}else if(order.action_type=='B'){
			order.action_type_desc = "<font color='green'>应用上传</font>";
		}else if(order.action_type=='C'){
			order.action_type_desc = "<font color='yellow'>应用推广</font>";
		}
		obj = {};
		obj.total = tnum;
		obj.rows = [order];
	}else{
		for(var i=0;i<pnum;i++){
			var o = order[i];
			if(o.audit_state=='0'){
				order[i].state_desc = "<font color='red'>未审核</font>";
			}else if(o.audit_state=='1'){
				order[i].state_desc = "<font color='green'>审核通过</font>";
			}else if(o.audit_state=='9'){
				order[i].state_desc = "<font color='red'>审核未通过</font>";
			}
			if(o.action_type=='A'){
				order[i].action_type_desc = "<font color='blue'>应用下载</font>";
			}else if(o.action_type=='B'){
				order[i].action_type_desc = "<font color='green'>应用上传</font>";
			}else if(o.action_type=='C'){
				order[i].action_type_desc = "<font color='yellow'>应用推广</font>";
			}
		}
		obj = {};
		obj.total = tnum;
		obj.rows = order;
	}
	return obj;
}
appAudit.auditPass = function(){
	$.messager.defaults = { ok: "确定"};
	var row = $("#table_orderinfo").datagrid("getSelected");
	if(row==null){
		$.messager.alert('温馨提醒','您还未选择定单','warning');
		return;
	}
	var orderId = row.order_id;
	var dict = new DynamicDict("UBOSS_DESKTOP_APP_001");
	dict.setValue("OP_TYPE","6");
	dict.setValue("ORDER_ID",orderId);
	dict.setValue("AUDIT_STATE","1");
	dict.setValue("WARE_STATE","1");
	if(!dict.callService()){
		$.messager.alert('温馨提醒','定单审核失败：'+dict.error.Desc,'error');
		return;
	}
	$.messager.alert('温馨提醒','定单审核操作成功','info');
	var idx = $('#table_orderinfo').datagrid("getRowIndex",row);
	row.audit_state = "1";
	row.state_desc = "<font color='green'>审核通过</font>";
	$('#table_orderinfo').datagrid("updateRow",{index:idx,row:row});
	$("#pass_btn").attr("disabled","disabled");
	$("#nopass_btn").attr("disabled","disabled");
}
appAudit.auditNoPass = function(){

	$.messager.defaults = { ok: "确定"};
	var row = $("#table_orderinfo").datagrid("getSelected");
	if(row==null){
		$.messager.alert('温馨提醒','您还未选择定单','warning');
		return;
	}
	var orderId = row.order_id;
	var dict = new DynamicDict("UBOSS_DESKTOP_APP_001");
	dict.setValue("OP_TYPE","6");
	dict.setValue("ORDER_ID",orderId);
	dict.setValue("AUDIT_STATE","9");
	dict.setValue("WARE_STATE","9");
	if(!dict.callService()){
		$.messager.alert('温馨提醒','定单审核失败：'+dict.error.Desc,'error');
		return;
	}
	$.messager.alert('温馨提醒','定单审核操作成功','info');
	var idx = $('#table_orderinfo').datagrid("getRowIndex",row);
	row.audit_state = "-1";
	row.state_desc = "<font color='red'>审核未通过</font>";
	$('#table_orderinfo').datagrid("updateRow",{index:idx,row:row});
	$("#pass_btn").attr("disabled","disabled");
	$("#nopass_btn").attr("disabled","disabled");
}