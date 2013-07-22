var appRole = new function(){};
$.messager.defaults = { ok: "确定",cancel:"取消"};
appRole.init = function(){
	appRole.MGRDataGridDetail();//实始化表格
	this.elemEventBind();
	var myDate = new Date();
	$("#end_date").datebox("setValue",dateFormat(myDate));  
	myDate.setDate(myDate.getDate() -30);
	$("#start_date").datebox("setValue", dateFormat(myDate));  
}

function dateFormat(myDate){
	var currentDate	 = myDate.getFullYear() +"-"+ ((myDate.getMonth() +1)>9?(myDate.getMonth() +1).toString():'0' + (myDate.getMonth() +1)) +"-"+(myDate.getDate()>9?myDate.getDate().toString():'0' + myDate.getDate());
	return currentDate;
}
appRole.elemEventBind = function(){
	/* user query button*/
	$("#qry_btn").click(function(){appRole.queryUser('1','5')});
	$("#check_btn").click(function(){appRole.checkMGR()});
	$("#modify_btn").click(function(){openModifyWin();});
	$("#cancelbtn").click(function(){closePopwin();});
	$("#surebtn").click(function(){popWinOk();});
	$("#shutStart_btn").click(function(){shutdownOrStart();});

	
	
}
/* query user method*/
appRole.queryUser = function(pageNumber,pageSize){
	var start_date =  $('#start_date').datebox("getValue"); 
	var end_date =  $('#end_date').datebox("getValue");
	var state=  $('#querystate').combobox("getValue");
	var inst_type = $('#insttype').combobox("getValue");
	
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","3");
	dict.setValue("PAGE_NUMBER",pageNumber); //第几页
	dict.setValue("PAGE_SIZE",pageSize);  //每页显示的行数
	dict.setValue("START_DATE",start_date);  //开始日期
	dict.setValue("END_DATE",end_date);  //终止日期
	dict.setValue("STATE",state);//状态
	dict.setValue("INST_TYPE",inst_type);//订购类型
	
	var condVal = $.trim($("#condition_value").val());
	if(condVal!=""){
		var cDict = new DynamicDictBo(dict.dataBO,"QRY_CONDITION");
		cDict.setValue("FIELD","user_code");
		cDict.setValue("CONDITION","like");
		cDict.setValue("value","%"+condVal+"%");
	}
	if(!dict.callService()){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','查询失败：'+dict.error.Desc,'error');
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

appRole.checkMGR =  function(){  
            var row = $('#table_mgrinfo').datagrid('getSelected');  
            if (row){  
				var state_type  = row.state;
				if (state_type!="0") {
					$.messager.defaults = { ok: "确定"};
					$.messager.alert('温馨提醒','只有新制申请才能审核','info');
					return ;
				}
				$.messager.defaults = { ok: "确定",cancel:"取消"};
                $.messager.confirm('温馨提醒','你确定审核选定记录?',function (data) {
					if (data) {
						appRole.saveCheckMGR(row);
					}
					});
			}
}

//显示详细的数据表对象
appRole.MGRDataGridDetail  = function (){
	$('#table_mgrinfo').datagrid({    
	singleSelect: true,striped:true,rownumbers:true,loadMsg:'获取数据中...', 
	remoteSort:false,
    view: detailview,    
    detailFormatter:function(index,row){    
        return '<div style="padding:2px"><table id="ddv-' + index + '"></table></div>';    
    },    
    onExpandRow: function(index,row){    
        $('#ddv-'+index).datagrid({    
            //url:'datagrid22_getdetail.php?itemid='+row.itemid,    
            fitColumns:true,    
            singleSelect:true,    
            rownumbers:true,    
            loadMsg:'',    
            height:'auto',    
            columns:[[    
                {field:'attr_name',title:'设备名称',width:100},    
                {field:'name',title:'设备值',width:100}
            ]],    
            onResize:function(){    
                $('#table_mgrinfo').datagrid('fixDetailRowHeight',index);    
            },    
            onLoadSuccess:function(){    
                setTimeout(function(){    
                    $('#table_mgrinfo').datagrid('fixDetailRowHeight',index);    
                },0);    
            }    
        });   
		
		//检索数据
		 var dict = new DynamicDict("UBOSS_USERMGR_001");
		 dict.setValue("ANSYC_FLAG","5");
		 dict.setValue("INST_ID",row.inst_id); 
		 if(!dict.callService()){
				$.messager.defaults = { ok: "确定"};
				$.messager.alert('温馨提醒','用户查询失败：'+dict.error.Desc,'error');
				return;
			}
		var json = dict.toJson(false);
		var count = dict.getValue("TOTAL_COUNT");

		var obj = null;
		if(count>1){
			obj = json.user_info;
		}else if(count==1){//一条记录做特殊处理 toJson对象不同
			obj = {};
			obj.total = count;
			obj.rows = [json.user_info.rows];
		}
		$('#ddv-'+index).datagrid('loadData',obj);
		 
        $('#table_mgrinfo').datagrid('fixDetailRowHeight',index);    
    }    
});    

}

//保存审核
appRole.saveCheckMGR = function(row) {
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","4");
	dict.setValue("INST_ID",row.inst_id);
	//得到 row 的值
	if(!dict.callService()){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','审核失败：'+dict.error.Desc,'error'); 
		return;
	}else{
		appRole.queryUser();
		$.messager.alert('温馨提醒',"审核成功",'info');
	}

}

//格式化日期控件
 function myformatter(date){  
            var y = date.getFullYear();  
            var m = date.getMonth()+1;  
            var d = date.getDate();  
            return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);  
        }  
function myparser(s){  
	if (!s) return new Date();  
	var ss = (s.split('-'));  
	var y = parseInt(ss[0],10);  
	var m = parseInt(ss[1],10);  
	var d = parseInt(ss[2],10);  
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)){  
		return new Date(y,m-1,d);  
	} else {  
		return new Date();  
	}  
}  

function openModifyWin(){
	//清空
	var tabgroups = document.getElementById("tabgroups");
	tabgroups.innerHTML ="";
	var row = $('#table_mgrinfo').datagrid('getSelected');  
	var inst_id = row.inst_id;
	var state_type  = row.state;
	var inst_type = row.inst_type;
	if (inst_type!="1") {
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','只有基础服务才能修改配置','info');
		return ;
	}
	if (state_type!="2") {
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','只有已创建的机器才能修改配置','info');
		return ;
	}
	
	
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","14"); //初始化数据
	dict.setValue("INST_ID",inst_id);
	if(!dict.callService()){
		$.messager.alert('温馨提醒',dict.error.Desc,'info');
		return ;
	}
	var cpuid = dict.getValue("CPU"); 
	var memoryid = dict.getValue("MEMORY"); 
	
	var i = 0;
	var templist = dict.getValue("TEMPLETLIST");  //模板列表
	var tempItem ; //模板的内容
	for ( i =0;i<templist.getDataObjCnt("TEMPLETITEM");i++){
		var tab_name = templist.getBOValue("TEMPLETITEM",i).getValue("CONF_NAME");
		var tab_id = templist.getBOValue("TEMPLETITEM",i).getValue("CONF_ID");
		var state = templist.getBOValue("TEMPLETITEM",i).getValue("STATE");
		//插入tablist
		var tab_name_2 =tab_name;
		
		tempItem = templist.getBOValue("TEMPLETITEM",i);
		createTabGroups(tempItem,tab_id,3);
	}
	
	$('#win').window('open'); 
}
function closePopwin(){
	$('#win').window('close'); 
}
//确定
function popWinOk(){
	$.messager.confirm('提示','你确定修改机器的配置?',function (data) {
		if (data) {
			modifyVMSave();
			return ;
		}
	});
}

function modifyVMSave(){
	var row = $('#table_mgrinfo').datagrid('getSelected');  
	var inst_id = row.inst_id;
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","15");
	dict.setValue("INST_ID",inst_id);
	
	getAllControlValue(dict);
	
	if(!dict.callService()){
		$.messager.alert('温馨提醒',dict.error.Desc,'info');
	}else{
		$.messager.alert('温馨提醒',"修改配置成功",'info');
		appRole.queryUser(1,5);
	}
	closePopwin();
	
}

function getAllControlValue(dict){
	
	//得到网页上的值
	var tags = document.getElementsByTagName("*");
	var os = "";
    if (tags != null && tags.length > 0) {
        for (var i = 0; i < tags.length; i++) {  
			var userMgr;
			var controlid =tags[i].getAttribute("id");
			if (controlid ==null || controlid =="") continue;
			if ( left(controlid,7)== "control") {  //cpu
				var value = tags[i].value;
				var code = tags[i].options[tags[i].selectedIndex].code;
				var attr_id = right(controlid,controlid.length - 7);
				userMgr = new DynamicDictBo(dict.dataBO,"USER_INST_ATTR");
				userMgr.setValue("ATTR_ID",attr_id); 
				userMgr.setValue("ATTR_INST_VALUE",tags[i].value); 
				userMgr.setValue("CODE",code); 
				
            }  
			
        }  
    }  
	return 1;
}
function left(mainStr,lngLen) { 
if (lngLen>0) {return mainStr.substring(0,lngLen)} 
	else{return null} 
} 

function right(mainStr,lngLen) { 
	
	if (mainStr.length-lngLen>=0 && mainStr.length>=0 && mainStr.length-lngLen<=mainStr.length) { 
		return mainStr.substring(mainStr.length-lngLen,mainStr.length)} 
		else{return null} 
} 

function mid(mainStr,starnum,endnum){ 
	if (mainStr.length>=0){ 
		return mainStr.substr(starnum,endnum) 
	}else{return null} 

} 

function shutdownOrStart(){
	var row = $('#table_mgrinfo').datagrid('getSelected');  
	var inst_id = row.inst_id;
	var vm_state = row.vm_state;
	var vminst_type = row.inst_type;
	if (vminst_type!='1'){
		$.messager.defaults = { ok: "确定",cancel:"取消"};
		$.messager.alert('温馨提醒','人才服务,不能暂停或启动','info');
		return ;
	}
	if (vm_state =="" || vm_state==null ) {
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','非正常基础服务,不能暂停或启动','info');
		return ;
	}
	if (vm_state =="3") {
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','服务已停止,不能暂停或启动','info');
		return ;
	}
	var messtext = "确定启动服务";
	if (vm_state=="1") messtext = "确定暂停服务";
	  $.messager.confirm('提示',messtext,function (data) {
		if (data) {
				var dict = new DynamicDict("UBOSS_USERMGR_001");
				dict.setValue("ANSYC_FLAG","16");
				dict.setValue("INST_ID",inst_id);
				var messtext = "服务暂停成功";
				if (vm_state=="2") messtext = "服务启动成功";
				if(!dict.callService()){
					$.messager.alert('温馨提醒',dict.error.Desc,'info');
				}else{
					$.messager.alert('温馨提醒',messtext,'info');
					appRole.queryUser(1,5);
				}	
			}
		});
					
	
}