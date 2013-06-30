var appRole = new function(){};

appRole.init = function(){
	this.initUserTable();
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
	$("#deatil_btn").click(function(){appRole.showMGRDetail()});
	
}
/* user table init*/
appRole.initUserTable = function(){
	$('#table_mgrinfo').datagrid({
		singleSelect: true,striped:true,rownumbers:false,pagination:true,fitColumns:false,loadMsg:'获取数据中...',
		remoteSort:false,
		/*onClickRow:function(idx,rowData) {
			var userId = rowData.user_id;
			appRole.initRoleData(userId);
			if($("#layout").hasClass("close_layout")) {
				appRole.initUserInfo(rowData);
			}
		}*/
	});
	 //设置分页控件  
    var p = $('#table_mgrinfo').datagrid('getPager');  
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
	appRole.MGRDataGridDetail();
	var start_date =  $('#start_date').datebox("getValue"); 
	var end_date =  $('#end_date').datebox("getValue"); 
	
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","3");
	dict.setValue("PAGE_NUMBER",pageNumber); //第几页
	dict.setValue("PAGE_SIZE",pageSize);  //每页显示的行数
	dict.setValue("START_DATE",start_date);  //开始日期
	dict.setValue("END_DATE",end_date);  //终止日期
	
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

	// var testobj ={ total:"1" ,rows :[{ 
	// 	created_date: "2013-06-20 ",
	// 	inst_id:"12",
	// 	notes:"测试用 ",
	// 	state:"新制",
	// 	user_id:"系统超级 "
	// },{
	// 	created_date: "2013-06-20 ",
	// 	inst_id:"12",
	// 	notes:"测试用 ",
	// 	state:"新制",
	// 	user_id:"系统超级 "

	// }]}

	$('#table_mgrinfo').datagrid('loadData',obj);
}

appRole.checkMGR =  function(){  
            var row = $('#table_mgrinfo').datagrid('getSelected');  
            if (row){  
                $.messager.confirm('提示','你确定按选定记录生成',function (data) {
					if (data) {
						appRole.saveCheckMGR(row);
					}
					});
			}
}

//显示详细的数据表对象
appRole.MGRDataGridDetail  = function (){
	$('#table_mgrinfo').datagrid({    
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


appRole.saveCheckMGR = function(row) {
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","4");
	dict.setValue("INST_ID",row.inst_id);
	//得到 row 的值
	if(!dict.callService()){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','保存失败：'+dict.error.Desc,'error'); 
		return;
	}else{
		appRole.queryUser();
		$.messager.alert('温馨提醒',"保存成功",'info');
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