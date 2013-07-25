// JavaScript Document
var cardview = $.extend({}, $.fn.datagrid.defaults.view, {
    renderRow: function(target, fields, frozen, rowIndex, rowData){
		var cc = [];
		cc.push('<td colspan=' + fields.length + ' style="padding:10px 5px;">');
		if (!frozen){
			cc.push('<img src="../img/whcomputer.png" style="width:72px; height:72px; float:left">');
			cc.push('<div style="float:left; margin-left:10px; width:540px;>');
			for(var i=0; i<fields.length; i++){
				var copts = $(target).datagrid('getColumnOption', fields[i]);
				cc.push('<p><span class="c-label">' + copts.title + ':</span> ' + rowData[fields[i]] + '</p>');
			}
			cc.push('</div>');
    	}
   	 	cc.push('</td>');
    	return cc.join('');
    }
});
	
var g_uuid ="";
function drawMonitorPic(nameValue,callback){
	
	var par  = nameValue;
	var picobj = document.getElementById(par);
	if (picobj !=null){
		return 1;
	}
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","11");
	dict.setValue("MOINTORPAR",par);
	dict.setValue("UUID",g_uuid);
	
	if(!dict.callService()){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','保存失败：'+dict.error.Desc,'error'); 
		return;
	}else{
		var pic = dict.getValue("PICNAME");
		var tabname = "";
		var labelText = "";
		if (nameValue.indexOf("cpu")>=0){
			 tabname="cpu_tab_piclist";
			 labelText ="CPU:";
		}
		if (nameValue.indexOf("memory")>=0){
			tabname="rom_tab_piclist";
			labelText ="内存:";
		}
		if (nameValue.indexOf("vbd")>=0) {
			tabname="vbd_tab_piclist";
			labelText ="硬盘:";
		}
		if (nameValue.indexOf("vif")>=0) {
			tabname="vif_tab_piclist";
			labelText ="网卡:";
		}

		var mydiv  =document.createElement("div")
		mydiv.id =par;
		mydiv.setAttribute("class","widget");
		var htmlTxt ='<div class="widget-head clearfix">';
		htmlTxt  = htmlTxt  +' <span class="pull-right">';
		htmlTxt  = htmlTxt  +'   <i class="icon_collapse icon-chevron-up"></i>';
		htmlTxt  = htmlTxt  +'   <i class="icon-remove"></i>';
		htmlTxt  = htmlTxt  +'</span>';
		htmlTxt  = htmlTxt  +'<span class="pull-left"> '+labelText+par+' </span> ';
		htmlTxt  = htmlTxt +'</div>';
		htmlTxt  = htmlTxt +'<div class="widget-content"> ';
		htmlTxt  = htmlTxt +'  <a href="#" >';
		htmlTxt  = htmlTxt +'     <img src="../rrddata/'+pic+'" />';
		htmlTxt  = htmlTxt +'		</a>';
		htmlTxt  = htmlTxt +'</div> ';
		mydiv.innerHTML = htmlTxt;
		
		
		document.getElementById(tabname).appendChild(mydiv);

	}
	if(callback) {
		callback();
	}
	return 0;
}

function addMoniterData(uuid){
	clearControl();
	g_uuid = uuid;
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","12");
	dict.setValue("UUID",uuid);
	var cpu= new Array(); 
	var memory=new Array();
	var eth=new Array();
	var vbd = new Array();
	
	if(!dict.callService()){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','保存失败：'+dict.error.Desc,'error'); 
		return;
	}else{
		var moniter = dict.getValue("MONITERPARLIST");
		for ( i =0;i<moniter.getDataObjCnt("DSNAME");i++){
			var opt = moniter.getBOValue("DSNAME",i);
			var opt_name = opt.dataBO.childNodes[0].nodeValue; // text 和 innerHTML 都不兼容
			var obj ={};
			obj.key =opt_name;
			obj.value = opt_name;
			if (opt_name.indexOf("cpu")>=0)  cpu.push(obj);
			if (opt_name.indexOf("memory")>=0)  memory.push(obj);
			if (opt_name.indexOf("vif")>=0){
				  eth.push(obj);
			}
			if (opt_name.indexOf("vbd")>=0)  {
				vbd.push(obj);
			}
			
		}
		createListControl(cpu,"cpu_chkbox_list");
		createListControl(memory,"rom_chkbox_list");
		createListControl(eth,"vif_chkbox_list");
		createListControl(vbd,"vbd_chkbox_list");
		
	}
}

function createListControl(arr,controlname){
 
	// // 滚动条
	// $("#jscroll").jScrollPane();
	// var jscrollAPI = $("#jscroll").data('jsp'); 


	// 多选控件的创建 
	var api =$("#"+controlname).checklist(arr);
	// 多选控件 checkbox change 时触发
	api.onchecked(function ($chkbox) {  
		 var boxid = $chkbox.val(); // 获取选中 checkbox 的value 值
 		 
		 // alert(boxid);
		 if($chkbox.attr('checked') == "checked") {
		 	//控件中 checkbox 选中  
			if (drawMonitorPic(boxid,bindEvent) ==1) $("#" +boxid).fadeIn(); 
		 } else {
		 	//取消选中  
		 	$("#" +boxid).fadeOut();  
		 }
		 // // 计算滚动条 
		 // jscrollAPI.reinitialise();
	});
	// // 默认选中第一个 chklist
	// api.setChecked("",0);

	// 回调
	function bindEvent () {	
		//监控图片折叠按钮事件 
		$(".icon_collapse").toggle(function () {
			$(this).parents(".widget-head").next(".widget-content").slideUp();
			$(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
		},function () {
			$(this).parents(".widget-head").next(".widget-content").slideDown();
			$(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
		});

		//监控图片关闭按钮事件  
		$(".icon-remove").click( function () {  
			var optionId = $(this).parents(".widget").attr("id");
			// 点击关闭同事取消控件中 checkbox 的选中状态
			api.unchecked(optionId); 
		});
		//light box 
		if(window.top.win) {
			$('.widget a').lightBox($(window.top.win.body));
		} else {
			$('.widget a').lightBox(); 
		}
	}
}

function getVMList(){
	// 创建页签
	 $("#myTab").sildeTab(); 

	 $(".btn_select").click( function () {
	 	 var $hideipt = $(this).next("input");
	 	 if($hideipt.length != 0 ) { return; } else {  
	 	 	 alert(" 请在‘我的主机’中选中一台主机");
	 	 }
	 })    

	/*$('#table_mgrinfo').datagrid({
		singleSelect: true,striped:true,rownumbers:true,loadMsg:'获取数据中...',
		remoteSort:false,
		onClickRow:function(idx,rowData) {
			addMoniterData(rowData.uuid)
		  }
		});*/
		
	$('#table_mgrinfo').datagrid({ singleSelect: true,striped:true,loadMsg:'获取数据中...', 
	remoteSort:false,view: cardview,
	onClickRow:function(idx,rowData) {
			addMoniterData(rowData.uuid)
		  }
	 });
		
	var pageNumber =1;
	var pageSize =5 ;

	var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","13");
	dict.setValue("PAGE_NUMBER",pageNumber); //第几页
	dict.setValue("PAGE_SIZE",pageSize);  //每页显示的行数

	var condVal = $.trim($("#condition_value").val());
	if(condVal!=""){
		var cDict = new DynamicDictBo(dict.dataBO,"QRY_CONDITION");
		
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
function clearControl(){
		document.getElementById("cpu_chkbox_list").innerHTML='<div class="ipt span7" style="display:none" name="typelist"></div><span class="btn"> 选择 <span class="caret"></span></span>';
		document.getElementById("rom_chkbox_list").innerHTML='<div class="ipt span7" style="display:none" name="typelist"></div><span class="btn"> 选择 <span class="caret"></span></span>';
		document.getElementById("vif_chkbox_list").innerHTML='<div class="ipt span7" style="display:none" name="typelist"></div><span class="btn"> 选择 <span class="caret"></span></span>';
		document.getElementById("vbd_chkbox_list").innerHTML='<div class="ipt span7" style="display:none" name="typelist"></div><span class="btn"> 选择 <span class="caret"></span></span>';
		
		document.getElementById("cpu_tab_piclist").innerHTML="";
		document.getElementById("rom_tab_piclist").innerHTML="";
		document.getElementById("vbd_tab_piclist").innerHTML="";
		document.getElementById("vif_tab_piclist").innerHTML="";
}
