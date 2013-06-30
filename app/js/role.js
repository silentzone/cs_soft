var appRole = new function(){};

appRole.init = function(){
	this.initUserTable();
	this.initRoleTable();
	this.initSysRoleTable();
	this.initMenu();
	this.elemEventBind();
}
/* user table init*/
appRole.initUserTable = function(){
	$('#table_userinfo').datagrid({
		singleSelect: true,striped:true,rownumbers:true,pagination:true,fitColumns:true,loadMsg:'获取数据中...',
		remoteSort:false,
		onClickRow:function(idx,rowData) {
			var userId = rowData.user_id;
			appRole.initRoleData(userId);
			if($("#layout").hasClass("close_layout")) {
				appRole.initUserInfo(rowData);
			}
		}
	});
	 //设置分页控件  
    var p = $('#table_userinfo').datagrid('getPager');  
    $(p).pagination({  
        pageSize: 5,//每页显示的记录条数，默认为10  
        pageList: [5,10,15],//可以设置每页记录条数的列表  
        beforePageText: '第',
        afterPageText: '页    1共 {pages} 页',  
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录', 
        onSelectPage:function(pageNumber,pageSize){
        	appRole.queryUser(pageNumber,pageSize);
        },
        onRefresh:function(pageNumber,pageSize){
        	appRole.queryUser(pageNumber,pageSize);
        } 
    }); 
}
/* query user method*/
appRole.queryUser = function(pageNumber,pageSize){

	$('#table_role').datagrid('loadData',[]);
	$('#table_sysRole').datagrid('loadData',[]);

	var dict = new DynamicDict("UBOSS_DESKTOP_USER_002");
	dict.setValue("OP_TYPE","3");
	dict.setValue("PAGE_NUMBER",pageNumber);
	dict.setValue("PAGE_SIZE",pageSize);
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
		$('#table_userinfo').datagrid('loadData',[]);
		return;
	}
	var json = dict.toJson(false);
	var obj = null;
	var pcount = dict.getValue("PAGE_COUNT");
	if(pcount>1){
		obj = json.user_info;
	}else if(pcount==1){//一条记录做特殊处理 toJson对象不同
		obj = {};
		obj.total = count;
		obj.rows = [json.user_info.rows];
	}
	$('#table_userinfo').datagrid('loadData',obj);
	// $(".pagination-num").val(pageNumber);
	// $(".pagination-page-list").val(pageSize);
}
/* query user role defined method*/
appRole.queryUserRoleDef = function(userId){
	var dict = new DynamicDict("UBOSS_DESKTOP_USER_002");
	dict.setValue("OP_TYPE","4");
	dict.setValue("QRY_TYPE","1");
	dict.setValue("USER_ID",userId);
	if(!dict.callService()){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','用户权限查询失败：'+dict.error.Desc,'error');
		return null;
	}
	return dict;
}
/* init role table and system role table 's datas*/
appRole.initRoleData = function(userId){
	$('#table_role').datagrid('loadData',[]);
	$('#table_sysRole').datagrid('loadData',[]);
	var dict = this.queryUserRoleDef(userId);
	if(dict==null) {
		return;
	}
	var json = dict.toJson(false);
	var role_count = json.role_count;
	var role_sys_count = json.role_sys_count;
	if(role_count>0){
		var roleObj = {};
		roleObj.total = role_count;
		if(role_count==1)
			roleObj.rows = [json.role];
		else
			roleObj.rows = json.role;
		$('#table_role').datagrid('loadData',roleObj);
	}
	if(role_sys_count>0){
		var roleObj = {};
		roleObj.total = role_sys_count;
		if(role_sys_count==1)
			roleObj.rows = [json.role_sys];
		else
			roleObj.rows = json.role_sys;
		$('#table_sysRole').datagrid('loadData',roleObj);
	}

}
/* user role table init*/
appRole.initRoleTable = function(){
	$('#table_role').datagrid({
		striped:true,fitColumns:true,loadMsg:'获取数据中...',
		onSelectAll:function(rows) {
		}
	});
}
/* system role table init*/
appRole.initSysRoleTable = function(){
	$('#table_sysRole').datagrid({
		striped:true,fitColumns:true,loadMsg:'获取数据中...'
	});
}
/* user information zoom menu init*/
appRole.initMenu = function(){
	$.fn.sMenu = function( opts ) {
		var win= $(this);
		var $silder = $("#silder");
		var $menu = this;
		var $section = $("#layout");

		var move = function () {
			if( $section.hasClass("close_layout")) {
				$section.animate({
					right : 0 
				}, 1000, function() {
						 // feedback  
						}
						);
				$section.removeClass("close_layout");
			} else {
				// return;
				$section.animate({
					right :"-=" +  ( $section.width() -50  ) 
				}, 1000, function() {
						 // feedback 
						}
						);
				$section.addClass("close_layout");
			}
		}
	 	// bind event
	 	$menu.click(function () {
	 		var $icon = $(this).find("i");
	 		if ($icon.hasClass("icon-arrow-right")) {
	 			var row = $("#table_userinfo").datagrid("getSelected");
				if(row==null){
					$.messager.defaults = { ok: "确定"};
					$.messager.alert('温馨提醒','您还未选择需要编辑的用户','warning');
					return;
				}
				appRole.initUserInfo(row);
	 			$icon.removeClass().addClass("icon-arrow-left");
	 		} else {
	 			$icon.removeClass().addClass("icon-arrow-right");
	 		} 
	 		move();
	 	}) 
	 }
	 $("#silder_menu").sMenu();
}
appRole.delRole = function(){
	var rows = $("#table_role").datagrid("getSelections");
	if(rows.length<1){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','请选择需要去除的角色','warning');
		return;
	}
	$("#table_role").datagrid("clearSelections");
	for(var i=0;i<rows.length;i++){
		$("#table_sysRole").datagrid("appendRow",rows[i]);
		var idx = $("#table_role").datagrid('getRowIndex',rows[i])
		$("#table_role").datagrid("deleteRow",idx);
	}
}
appRole.addRole = function(){
	var rows = $("#table_sysRole").datagrid("getSelections");
	if(rows.length<1){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','请选择需要增加的角色','warning');
		return;
	}
	$("#table_sysRole").datagrid("clearSelections");
	for(var i=0;i<rows.length;i++){
		$("#table_role").datagrid("appendRow",rows[i]);
		var idx = $("#table_sysRole").datagrid('getRowIndex',rows[i])
		$("#table_sysRole").datagrid("deleteRow",idx);
	}
}
/* binding page elements event*/
appRole.elemEventBind = function(){
	/* user query button*/
	$("#qry_btn").click(function(){appRole.queryUser('1','5')});
	/* delete roles button*/
	$("#mov_left").click(function() { appRole.delRole()});
	/* add roles button*/
	$("#mov_right").click(function() { appRole.addRole()});
	/* save roles button*/
	$("#save_btn").click(function() { appRole.saveRole()});
	/* modify user informations button*/
	$("#modify_btn").click(function() { appRole.modifyUser()});
	/* modify user password button*/
	$("#pwd_btn").click(function() { appRole.modifyPwd()});
}
/* save role information modify*/
appRole.saveRole = function(){
	var row = $("#table_userinfo").datagrid("getSelected");
	if(row==null){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','您还未选择用户','warning');
		return;
	}
	var userCode = row.user_code;
	var userId = row.user_id;
	var rows = $("#table_role").datagrid("getData").rows;
	if(rows.length<1){
		$.messager.defaults = { ok: "确定删除",cancel:"不删除"};
		$.messager.confirm('温馨提醒','您确定需要删除 <font color=red>'+userCode+'</font> 的所有角色吗？',
			function (data){
				if(data){
					var dict = new DynamicDict("UBOSS_DESKTOP_USER_001");
					dict.setValue("OP_TYPE","8");
					dict.setValue("USER_ID",userId);
					if(!dict.callService()){
						alert(dict.error.Desc);
					}
					$("#saveResult").html("<font color=green>&nbsp;&nbsp;操作成功!</font>");
					return;
				}else{
					return;
				}
			});
		return;
	}

	var dict = new DynamicDict("UBOSS_DESKTOP_USER_001");
	dict.setValue("OP_TYPE","8");
	dict.setValue("USER_ID",userId);
	for(var i=0;i<rows.length;i++){
		var uDict = new DynamicDictBo(dict.dataBO,"USER_ROLE");
		uDict.setValue("ROLE_ID",rows[i].role_id);
		uDict.setValue("ROLE_NAME",rows[i].role_name);
	}
	if(!dict.callService()){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','保存失败：'+dict.error.Desc,'error'); 
		return;
	}
	$("#saveResult").html("<font color=green>&nbsp;&nbsp;操作成功!</font>");

}
/* init user informations to model*/
appRole.initUserInfo = function(row){
	/* clear the old informations*/
	$("#USER_ID").val("");
	$("#PWD_ID").val("");
	$("#USER_CODE").val("");
	$("#USER_NAME").val("");
	$("#USER_PWD").val("");
	$("#USER_PWD_CF").val("");
	$("#E_MAIL").val("");
	$("#01_SAFETY").val("");
	$("#01_SAFETY_ANSWER").val("");
	$("#02_NAME").val("");
	$("#02_TEL").val("");
	$("#02_ADDR").val("");
	$("#03_NAME").val("");
	$("#03_ADDR").val("");
	$("#modifyResult").html("");
	// user basic informations
	$("#USER_ID").val(row.user_id);
	$("#PWD_ID").val(row.pwd_id);
	$("#USER_CODE").val(row.user_code);
	$("#USER_NAME").val(row.user_name);
	$("#E_MAIL").val(row.e_mail);
	var utObj = $("input[type='radio'][name='USER_TYPE'][value='"+row.user_type+"']");
	utObj.attr("checked","checked");
	// user details informations
	var dict = Pb.queryUserDetails(row.user_id,"0","0");
	var unum = dict.getDataObjCnt("USER_INFO");
	for(var i=0 ; i<unum; i++){
		var uObj = dict.getBOValue("USER_INFO",i);
		var name = uObj.getValue("ATTR_CODE");
		var value = uObj.getValue("ATTR_VALUE");
		
		if(name=='01_SAFETY'){
			$("#01_SAFETY").val(value);
			continue;
		}
		if(name=='01_SAFETY_ANSWER'){
			$("#01_SAFETY_ANSWER").val(value);
			continue;
		}
		if(name=='02_NAME'){
			$("#02_NAME").val(value);
			continue;
		}
		if(name=='02_TEL'){
			$("#02_TEL").val(value);
			continue;
		}
		if(name=='02_ADDR'){
			$("#02_ADDR").val(value);
			continue;
		}
		if(name=='03_NAME'){
			$("#03_NAME").val(value);
			continue;
		}
		if(name=='03_ADDR'){
			$("#03_ADDR").val(value);
			continue;
		}
	}
}
/* modify user informations*/
appRole.modifyUser = function(){
	// $("#registerform").Validform();

	var userId = $("#USER_ID").val();
	var userCode = $("#USER_CODE").val();
	var dict = new DynamicDict("UBOSS_DESKTOP_USER_001");
	dict.setValue("OP_TYPE","2");
	dict.setValue("USER_ID",userId);
	var userObj = new DynamicDictBo(dict.dataBO,"USER");
	userObj.setValue("USER_ID",userId);
	if($("#pwd_span").css("display")!='none'){
		userObj.setValue("PWD_ID",$("#PWD_ID").val());
		userObj.setValue("INPUT_PWD",$("#USER_PWD").val());
	}
	userObj.setValue("USER_NAME",$("#USER_NAME").val());
	userObj.setValue("E_MAIL",$("#E_MAIL").val());
	var utObj = $("input[type='radio'][name='USER_TYPE']");
	for(var i=0;i<utObj.length;i++){
		if(utObj[i].checked){
			userObj.setValue("USER_TYPE",utObj[i].value);
			break;
		}
	}

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
		$("#modifyResult").html("<font color='red'>用户 "+userCode+" 信息修改失败</font>");
		return;
	}
	$("#modifyResult").html("<font color='green'>用户 "+userCode+" 信息修改成功</font>");
	/* refresh the current page of user table  */
	var pageNumber = $(".pagination-num").val();
	var pageSize = $(".pagination-page-list").val();
	appRole.queryUser(pageNumber,pageSize);	
	
}
/* modify user password*/
appRole.modifyPwd = function(){
	if($("#pwd_span").css("display")=='none')
		$("#pwd_btn").val("取消修改");
	else
		$("#pwd_btn").val("修改密码");
	$("#pwd_span").toggle();
}