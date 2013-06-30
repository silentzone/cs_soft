var appLeave = new function(){}
appLeave.state = null;
appLeave.init = function(){
	/* leave query button*/
	$("#qry_btn").click(function(){appLeave.queryLeave('1','5')});
	$("#as_btn").click(function() { appLeave.asIMLeave();});
	$("#save_btn").click(function() { appLeave.sendIMLeave();});
	$("#need_btn").click(function() { appLeave.initLeaveAsDiv()});
	$("#cancel_btn").click(function() { appLeave.cancelLeaveDiv()});
	
	// $("#test").toggle();
	this.initLeaveTable();
}
/* leave table init*/
appLeave.initLeaveTable = function(){
	$('#table_leaveinfo').datagrid({
		singleSelect: true,striped:true,rownumbers:true,pagination:true,fitColumns:true,loadMsg:'获取数据中...',
		remoteSort:false,
		onClickRow:function(idx,rowData) {
			appLeave.initLeaveDiv(rowData);
			appLeave.cancelLeaveDiv();
		}
	});
	 //设置分页控件  
    var p = $('#table_leaveinfo').datagrid('getPager');  
    $(p).pagination({  
        pageSize: 5,//每页显示的记录条数，默认为10  
        pageList: [5,10,15],//可以设置每页记录条数的列表  
        beforePageText: '第',
        afterPageText: '页    1共 {pages} 页',  
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录', 
        onSelectPage:function(pageNumber,pageSize){
        	appLeave.queryLeave(pageNumber,pageSize);
        },
        onRefresh:function(pageNumber,pageSize){
        	appLeave.queryLeave(pageNumber,pageSize);
        }
    }); 
}
/* query leave informations by database pages*/
appLeave.queryLeave = function(pageNumber,pageSize){
	$("#saveResult").empty();
	var dict = new DynamicDict("UBOSS_DESKTOP_IM_002");
	dict.setValue("OP_TYPE","5");
	dict.setValue("PAGE_NUMBER",pageNumber);
	dict.setValue("PAGE_SIZE",pageSize);
	var condVal = $.trim($("#condition_value").val());
	if(condVal!=""){
		var cDict = new DynamicDictBo(dict.dataBO,"QRY_CONDITION");
		cDict.setValue("FIELD","leave_title");
		cDict.setValue("CONDITION","like");
		cDict.setValue("value","%"+condVal+"%");
	}
	// registered users only query their own
	if($userType=="0"){
		var cDict = new DynamicDictBo(dict.dataBO,"QRY_CONDITION");
		cDict.setValue("FIELD","send_user_id");
		cDict.setValue("CONDITION","=");
		cDict.setValue("value",$userId);
	}
	if(!dict.callService()){
		$.messager.defaults = { ok: "确定"};
		// $.messager.alert('温馨提醒','留言查询失败：'+dict.error.Desc,'error');
		alert("留言查询失败："+dict.error.Desc);
		return;
	}
	var obj = this.dataFilter(dict);
	$('#table_leaveinfo').datagrid('loadData',obj);
}
/* deal the source leave data to datagrid*/
appLeave.dataFilter = function(dict){
	var tnum = dict.getValue("TOTAL_COUNT");
	if(tnum==0) return [];
	var pnum = dict.getValue("PAGE_COUNT");
	var json = dict.toJson(false);
	var leave = json.leave_info;
	var obj = null;
	if(pnum == 1){
		if(leave.state=='0'){
			leave.state_desc = "<font color='red'>未答复</font>";
		}else if(leave.state=='1'){
			leave.state_desc = "<font color='green'>已答复</font>";
		}
		obj = {};
		obj.total = tnum;
		obj.rows = [leave];
	}else{
		for(var i=0;i<pnum;i++){
			var o = leave[i];
			if(o.state=='0'){
				leave[i].state_desc = "<font color='red'>未答复</font>";
			}else if(o.state=='1'){
				leave[i].state_desc = "<font color='green'>已答复</font>";
			}
		}
		obj = {};
		obj.total = tnum;
		obj.rows = leave;
	}
	return obj;
}

/* onclick the as_btn button to init the div*/
appLeave.initLeaveAsDiv = function(){
	$("#saveResult").empty();
	$("#lyxx_div").hide();
	$("#as_btn").hide();
	$("#need_btn").hide();
	$("#xjly_div").show();
	$("#save_btn").show();
	$("#cancel_btn").show();
}
appLeave.cancelLeaveDiv = function(){
	$("#saveResult").empty();
	$("#xjly_div").hide();
	$("#save_btn").hide();
	$("#cancel_btn").hide();
	$("#lyxx_div").show();
	if(this.state=='0')
	$("#as_btn").show();
	$("#need_btn").show();
}
/* onclick the leave to init leave div information*/
appLeave.initLeaveDiv = function(row){
	var div = $("#lynr_div");
	div.empty();
	$("#AS_CONTENT").val("");
	var color = '';
	this.state = row.state;
	if(this.state=='1') {
		color = 'green';
		$("#AS_CONTENT").val(row.as_content);
		$("#AS_CONTENT").attr("disabled","disabled");
		$("#as_btn").hide();
	}else if(this.state=='0'){
		color = 'red';
		if($userType=='1')
		$("#AS_CONTENT").removeAttr("disabled");
		$("#as_btn").show();
	}
	div.append("<font color='"+color+"'>"+row.leave_title+"</font>:<br/>");
	div.append("&nbsp;&nbsp;&nbsp;&nbsp;"+row.content+"<br/>");
	div.append("<p/>");
	div.append("邮箱:"+row.send_mail+"<br/>");
	div.append("联系电话:"+row.send_tel+"<br/>");
	div.append("地址:"+row.send_addr);
}
/* as leave*/
appLeave.asIMLeave = function(){
	$("#saveResult").empty();
	$.messager.defaults = { ok: "确定"};
	var row = $("#table_leaveinfo").datagrid("getSelected");
	var idx = $('#table_leaveinfo').datagrid("getRowIndex",row);
		
	if(row==null){
		// $.messager.alert('温馨提醒','您还未选择留言','warning');
		alert("您还未选择留言");
		return;
	}
	if(row.state=='1'){
		// $.messager.alert('温馨提醒','此留言已有客服答复','warning');
		alert("此留言已有客服答复");
		return;
	}
	var content = $("#AS_CONTENT").trimval();
	if(content==''){
		// $.messager.alert('温馨提醒','答复内容不能为空','warning');
		alert("答复内容不能为空");
		$("#AS_CONTENT").focus();
		return;
	}
	var dict = new DynamicDict("UBOSS_DESKTOP_IM_001");
	dict.setValue("OP_TYPE","6");
	dict.setValue("LEAVE_NO",row.leave_no);
	dict.setValue("AS_ENTRY_NO",$entryNo);
	dict.setValue("AS_TYPE","1");//1 网站答复
	dict.setValue("AS_CONTENT",content);
	if(!dict.callService()){
		// $.messager.alert('温馨提醒','留言答复失败：'+dict.error.Desc,'error'); 
		alert("留言答复失败："+dict.error.Desc);
		$("#saveResult").html("<font color='red'>留言答复失败</font>");
		return;
	}
	// $.messager.alert('温馨提醒','留言答复成功','info'); 
	alert("留言答复成功");
	$("#saveResult").html("<font color='green'>留言答复成功</font>");
	if($userType!='-1'){
		row.as_entry_no = $entryNo;
		row.as_type = "1";
		row.as_content = content;
		row.state = "1";
		row.state_desc = "<font color='green'>已答复</font>";
		$('#table_leaveinfo').datagrid("updateRow",{index:idx,row:row});
		$("#AS_CONTENT").attr("disabled","disabled");
		$("#as_btn").hide();
	}
}
/* new leave*/
appLeave.sendIMLeave = function(){
	$("#saveResult").empty();
	$.messager.defaults = { ok: "确定"};
	var userName = $("#SEND_USER_NAME").trimval();
	if(userName==''){
		// $.messager.alert('温馨提醒','您的姓名不能为空','warning');
		alert("您的姓名不能为空");
		$("#SEND_USER_NAME").focus();
		return;
	}
	var sendMail = $("#SEND_MAIL").trimval();
	if(sendMail==''){
		// $.messager.alert('温馨提醒','您的邮箱不能为空','warning');
		alert("您的邮箱不能为空");
		$("#SEND_MAIL").focus();
		return;
	}
	var leaveTitle = $("#LEAVE_TITLE").trimval();
	if(leaveTitle==''){
		// $.messager.alert('温馨提醒','留言主题不能为空','warning');
		alert("留言主题不能为空");
		$("#LEAVE_TITLE").focus();
		return;
	}
	var content = $("#CONTENT").trimval();
	if(content==''){
		// $.messager.alert('温馨提醒','留言内容不能为空','warning');
		alert("留言内容不能为空");
		$("#CONTENT").focus();
		return;
	}
	var sendAddr = $("#SEND_ADDR").trimval();
	var sendTel = $("#SEND_TEL").trimval();

	var dict = new DynamicDict("UBOSS_DESKTOP_IM_001");
	dict.setValue("OP_TYPE","5");
	dict.setValue("ENTRY_NO",$entryNo);
	dict.setValue("LEAVE_TYPE","2");// 对客服留言
	dict.setValue("NEED_AS_TYPE","1");// 网站答复
	dict.setValue("SEND_USER_NAME",userName);
	dict.setValue("LEAVE_TITLE",leaveTitle);
	dict.setValue("SEND_MAIL",sendMail);
	dict.setValue("SEND_ADDR",sendAddr);
	dict.setValue("SEND_TEL",sendTel);
	dict.setValue("CONTENT",content);
	if(!dict.callService()){
		// $.messager.alert('温馨提醒','留言失败：'+dict.error.Desc,'error'); 
		alert("留言失败："+dict.error.Desc);
		$("#saveResult").html("<font color='red'>用户 "+userName+" 留言失败</font>");
		return;
	}
	// $.messager.alert('温馨提醒','留言成功','info'); 
	alert("留言成功");
	$("#CONTENT").val("");
	$("#saveResult").html("<font color='green'>用户 "+userName+" 留言成功</font>");
	if($userType!='-1'){
		var row = {};
		row.entry_no = $entryNo;
		row.leave_type = "2";
		row.need_as_type = "1";
		row.send_user_name = userName;
		row.leave_title = leaveTitle;
		row.send_mail = sendMail;
		row.send_addr = sendAddr;
		row.send_tel = sendTel;
		row.content = content;
		row.SEND_MAIL = sendMail;
		// sys return
		row.leave_no = dict.getValue("LEAVE_NO");
		row.state = "0";
		row.state_desc = "<font color='red'>未答复</font>";
		$('#table_leaveinfo').datagrid("appendRow",row);
	}
}