var $attr = null;
var $havaCycle = null;
var appBill = new function(){};
appBill.init = function(){
	this.elemEventBind();
	this.initCycle();
	this.initAttr();
	this.initAttrSelect();
	$(".boedit").attr("disabled","disabled");
}
appBill.elemEventBind = function(){

	$("#rule_ref").click(function(){appBill.ruleShow('1');});
	$("#basic_rule_ref").click(function(){appBill.ruleShow('2');});

	$("input[type='radio'][name='cycle_type']").click(function(){appBill.cycleShow(this.value);});
	$("#pricing_type").change(function(){appBill.ptChange(this.value);}); 
	$("#submit_cycle").click(function(){appBill.submitCycle();}); 

	$("#attr_id").change(function(){appBill.argsChange(this.value);});
	$("#add_rule").click(function(){appBill.optBtn('1');});
	$("#modify_rule").click(function(){appBill.optBtn('2');});
	$("#del_rule").click(function(){appBill.optBtn('3');});
	$("#submit_rule").click(function(){appBill.submitRule();}); 			    		
}
appBill.cycleShow = function(cycleType){
	if(cycleType=="01"){
		$("#cycle_tr").hide();

	}else if(cycleType=="02"){
		$("#cycle_tr").show();

	}
	var ctObj = $("input[type='radio'][name='cycle_type']");
	for(var i=0;i<ctObj.length;i++){
		if(ctObj[i].value == cycleType){
			$(ctObj[i]).attr("checked",true);
			break;
		}
	}
}
appBill.submitCycle = function(){
	var cycleType = "";
	var ctObj = $("input[type='radio'][name='cycle_type']");
	for(var i=0;i<ctObj.length;i++){
		if(ctObj[i].checked){
			cycleType = ctObj[i].value;
			break;
		}
	}
	if(cycleType==""){
		alert("请选择计费类型");
		return;
	}
	var cycle = $("#cycle").trimval();
	var cycleUnit = $("#cycle_unit").val();
	if(cycleType=="02"){
		if(cycle==""){
			alert("计费周期不能为空");
			$("#cycle").focus();
			return;
		}
		if(cycleUnit == ""){
			alert("计费周期单位为空");
			$("#cycle_unit").focus();
			return;
		}
	}

	var eventOpType = "";
	if($havaCycle==null){
		eventOpType = "1";
	}else{
		eventOpType = "2";
	}
	var dict = new DynamicDict("UBOSS_DESKTOP_BILL_002");
    dict.setValue("OP_TYPE","2");
    dict.setValue("EVENT_OP_TYPE",eventOpType);
	dict.setValue("EVENT_ID","100");
	dict.setValue("CYCLE_TYPE",cycleType);
	dict.setValue("CYCLE",cycle);
	dict.setValue("CYCLE_UNIT",cycleUnit);
	$.messager.defaults = { ok: "确定"};
    if(!dict.callService()){
        $.messager.alert('温馨提醒','提交失败：'+dict.error.Desc,'error');
        return;
    }
	$.messager.alert('温馨提醒','提交成功','info');

}
appBill.submitRule = function(){
	var prid = $("#pricing_rule_id").val();
	var eventOpType = "";
	if(prid==""){
		eventOpType = "1";
	}else{
		eventOpType = "2";
	}
	var prn = $("#pricing_rule_name").trimval();
	if(prn==""){
		alert("规则名称不能为空");
		$("#pricing_rule_name").focus();
		return;
	}
	var state = $("#state").val();
	if(state==""){
		alert("状态不能为空");
		$("#state").focus();
		return;
	}
	var attrId = $("#attr_id").val();
	if(attrId==""){
		alert("设备不能为空");
		$("#attr_id").focus();
		return;
	}
	var attrArgId = $("#attr_arg_id").val();
	if(attrArgId==""){
		alert("单位不能为空");
		$("#attr_arg_id").focus();
		return;
	}
	var ptype = $("#pricing_type").val();
	if(ptype==""){
		alert("类型不能为空");
		$("#pricing_type").focus();
		return;
	}
	var price = "";
	if(ptype=="0A"){
		price = $("#price").trimval();
		if(price==""){
			alert("价格不能为空");
			$("#price").focus();
			return;
		}
	}
	var extCode = attrId+"|"+attrArgId;

	$.messager.defaults = { ok: "确定"};
	var dict = new DynamicDict("UBOSS_DESKTOP_BILL_002");
    dict.setValue("OP_TYPE","1");
    dict.setValue("EVENT_OP_TYPE",eventOpType);
    dict.setValue("PRICING_ID","1001000");
    dict.setValue("PRICING_RULE_ID",prid);
    dict.setValue("PRICING_RULE_NAME",prn);
    dict.setValue("PRICING_RULE","-1");
    dict.setValue("RULE_PRIORITY","1");
    dict.setValue("EXT_CODE",extCode);
    dict.setValue("PRICING_TYPE",ptype);
    dict.setValue("PRICE",price);
    dict.setValue("STATE",state);
    dict.setValue("REMARK",$("#remark").trimval());
    if(!dict.callService()){
        $.messager.alert('温馨提醒','提交失败：'+dict.error.Desc,'error');
        return;
    }
    $.messager.alert('温馨提醒','提交成功','info');
    this.queryBillRule();

}
appBill.deleteRule = function(){
	
	if(!confirm("您确定要删除规则["+$("#pricing_rule_name").trimval()+"]吗?")) return;
	$.messager.defaults = { ok: "确定"};
	var dict = new DynamicDict("UBOSS_DESKTOP_BILL_002");
    dict.setValue("OP_TYPE","3");
    dict.setValue("PRICING_RULE_ID",$("#pricing_rule_id").val());
    if(!dict.callService()){
        $.messager.alert('温馨提醒','规则删除失败：'+dict.error.Desc,'error');
        return false;
    }
    return true;
}
appBill.optBtn = function(flag){
	if(flag=="1"){// new rule
		$("#pricing_rule_id").val("");
		$("#pricing_rule_name").val("");
		$("#state").val("");
		$("#attr_id").val("");
		$("#attr_arg_id").val("");
		$("#pricing_type").val("");
		$("#price").val("");
		$("#remark").val("");
		$(".boedit").removeAttr("disabled");
		this.ptChange('0A');
	}else if(flag=="2"){ // modify rule
		$.messager.defaults = { ok: "确定"};
		var row = $("#table_rule").datagrid("getSelected");
		if(row==null){
			$.messager.alert('温馨提醒','您还未选择规则','warning');
			return;
		}
		if($("#pricing_rule_id").val()==""){
			this.initRuleData(row);
		}
		$(".boedit").removeAttr("disabled");
	}else if(flag == "3"){ // delete rule
		$.messager.defaults = { ok: "确定"};
		var row = $("#table_rule").datagrid("getSelected");
		if(row==null){
			$.messager.alert('温馨提醒','您还未选择规则','warning');
			return;
		}
		var idx = $('#table_rule').datagrid("getRowIndex",row);
		if(this.deleteRule()){
			$.messager.alert('温馨提醒','规则删除成功','info');
		    $('#table_rule').datagrid("deleteRow",idx);
		    $("#pricing_rule_id").val("");
			$("#pricing_rule_name").val("");
			$("#state").val("");
			$("#attr_id").val("");
			$("#attr_arg_id").val("");
			$("#pricing_type").val("");
			$("#price").val("");
			$("#remark").val("");
			$(".boedit").attr("disabled","disabled");
		}
	}
}
appBill.ruleShow = function(flag){
	if(flag=='1'){
		$("#rule_div").hide();
		$("#cycle_div").show();
	}else if(flag=='2'){
		$("#cycle_div").hide();
		$("#rule_div").show();
		this.initRuleTable();
	}
}
appBill.initRuleTable = function(){
	$('#table_rule').datagrid({
		singleSelect: true,striped:true,rownumbers:true,fitColumns:true,loadMsg:'获取数据中...',
		remoteSort:false,
		onClickRow:function(idx,rowData) {
			$(".boedit").attr("disabled","disabled");
			appBill.initRuleData(rowData);
		}
	});
	this.queryBillRule();
}
appBill.initRuleData = function(obj){
	this.argsChange(obj.attr_id);
	this.ptChange(obj.pricing_type);
	$("#pricing_rule_id").val(obj.pricing_rule_id);
	$("#pricing_rule_name").val(obj.pricing_rule_name);
	$("#state").val(obj.state);
	$("#attr_id").val(obj.attr_id);
	$("#attr_arg_id").val(obj.attr_arg_id);
	$("#pricing_type").val(obj.pricing_type);
	$("#price").val(obj.price_desc);
	$("#remark").val(obj.remark);
}
appBill.queryBillRule = function(){
	var dict = new DynamicDict("UBOSS_DESKTOP_BILL_002");
    dict.setValue("OP_TYPE","4");
    dict.setValue("PRICING_ID","1001000");
    if(!dict.callService()){
        $.messager.alert('温馨提醒','参数查询失败：'+dict.error.Desc,'error');
        return;
    }
    var obj = this.dataFilter(dict);
    $('#table_rule').datagrid('loadData',obj);

}
appBill.dataFilter = function(dict){
	var tnum = dict.getValue("RULE_COUNT");
	if(tnum==0) return [];
	var json = dict.toJson(false);
	var rule = json.rule;
	var obj = null;
	if(tnum == 1){
		if(rule.state=='0'){
			rule.state_desc = "<font color='red'>无效</font>";
		}else if(rule.state=='1'){
			rule.state_desc = "<font color='green'>有效</font>";
		}
		if(rule.pricing_type=='0A'){
			rule.pricing_type_desc = "<font color='green'>内部定价</font>";
		}else if(rule.pricing_type=='0B'){
			rule.pricing_type_desc = "<font color='green'>外部定价</font>";
		}
		rule.attr_args = rule.attr_name+"-"+rule.name;
		obj = {};
		obj.total = tnum;
		obj.rows = [rule];
	}else{
		for(var i=0;i<tnum;i++){
			var o = rule[i];
			if(o.state=='0'){
				rule[i].state_desc = "<font color='red'>无效</font>";
			}else if(o.state=='1'){
				rule[i].state_desc = "<font color='green'>有效</font>";
			}
			if(o.pricing_type=='0A'){
				rule[i].pricing_type_desc = "<font color='green'>内部定价</font>";
			}else if(o.pricing_type=='0B'){
				rule[i].pricing_type_desc = "<font color='green'>外部定价</font>";
			}
			rule[i].attr_args = rule[i].attr_name+"-"+rule[i].name;
		}
		obj = {};
		obj.total = tnum;
		obj.rows = rule;
	}
	return obj;
}
appBill.initCycle = function(){
	$.messager.defaults = { ok: "确定"};
	var dict = new DynamicDict("UBOSS_DESKTOP_BILL_002");
    dict.setValue("OP_TYPE","6");
    dict.setValue("EVENT_ID","100");
    if(!dict.callService()){
        $.messager.alert('温馨提醒','周期查询失败：'+dict.error.Desc,'error');
        return;
    }
	var count = dict.getValue("CYCLE_COUNT");
    if(count>0){
    	$havaCycle = "1";
    	var bo = dict.getBOValue("CYCLE",0);
    	var cycleType = bo.getValue("CYCLE_TYPE");
    	this.cycleShow(cycleType);
    	if(cycleType=="02"){
    		var cycle = bo.getValue("CYCLE");
	    	var cycleUnit = bo.getValue("CYCLE_UNIT");
	    	$("#cycle").val(cycle);
	    	$("#cycle_unit").val(cycleUnit);
    	}
    }
}
appBill.initAttr = function(){
	$.messager.defaults = { ok: "确定"};
	var dict = new DynamicDict("UBOSS_DESKTOP_BILL_002");
    dict.setValue("OP_TYPE","7");
    if(!dict.callService()){
        $.messager.alert('温馨提醒','参数查询失败：'+dict.error.Desc,'error');
        return;
    }
    var count = dict.getValue("ATTR_COUNT");
    if(count>0){
    	$attr = [];
    	for(var i=0;i<count;i++){
    		var bo = dict.getBOValue("ATTR",i);
    		var obj = {};
    		obj.attr_id = bo.getValue("ATTR_ID");
    		obj.attr_name = bo.getValue("ATTR_NAME");
    		var argcount = bo.getValue("ATTR_ARG_COUNT");
    		var args = [];
    		for(var c=0;c<argcount;c++){
    			var cbo = bo.getBOValue("ATTR_ARG",c);
    			var cobj = {};
    			cobj.attr_arg_id = cbo.getValue("ATTR_ARG_ID");
    			cobj.name = cbo.getValue("NAME");
    			args.push(cobj);
    		}
    		obj.args = args;
    		$attr.push(obj);
    	}
    }
}
appBill.initAttrSelect = function(){
	$("#attr_id").empty();
	var Control =   document.getElementById("attr_id");
	var option 	= new Option();
	option.value= "";
    option.text = "---请选择---";
    Control.options.add(option);

	var count = $attr.length;
	for(var i=0;i<count;i++){
		var opt 	= new Option();
		opt.value= $attr[i]["attr_id"];
        opt.text = $attr[i]["attr_name"];
        Control.options.add(opt);
	}
	if(count>0){
		var args = $attr[0]["args"];
		this.initArgSelect(args);
	}
}
appBill.initArgSelect = function(args){
	$("#attr_arg_id").empty();
	var argsControl =   document.getElementById("attr_arg_id");
	var option 	= new Option();
	option.value= "";
    option.text = "---请选择---";
    argsControl.options.add(option);

	for(var i=0;i<args.length;i++){
		var opt 	= new Option();
		opt.value= args[i]["attr_arg_id"];
        opt.text = args[i]["name"];
        argsControl.options.add(opt);
	}
}
appBill.argsChange = function(attrId){
	var args = null;
	var count = $attr.length;
	for(var i=0;i<count;i++){
		var value = $attr[i]["attr_id"];
		if(value==attrId){
			args = $attr[i]["args"];
			break;
		}
	}
	if(args) this.initArgSelect(args);
}
appBill.ptChange = function(pt){
	var pa = $("#pricing_type").parent().nextAll();
	if(pt=='0A'){
		pa.show();
	}else if(pt=='0B'){
		pa.hide();
	}
}