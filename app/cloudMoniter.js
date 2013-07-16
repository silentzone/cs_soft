// JavaScript Document

function drawMonitorPic(nameValue,callback){
 
	var par  = nameValue;
	var picobj = document.getElementById(par);
	if (picobj !=null){
		return 1;
	}
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","11");
	dict.setValue("MOINTORPAR",par);
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
		if (nameValue.indexOf("pif")>=0) {
			tabname="eth_tab_piclist";
			labelText ="网络:";
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

function addMoniterData(){

	$("#myTab").sildeTab();


	var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","12");
	dict.setValue("INST_ID","");
	var cpu= new Array(); 
	var memory=new Array();
	var eth=new Array();
	
	if(!dict.callService()){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','保存失败：'+dict.error.Desc,'error'); 
		return;
	}else{
		var moniter = dict.getValue("MONITERPARLIST");
		for ( i =0;i<moniter.getDataObjCnt("DSNAME");i++){
			var opt = moniter.getBOValue("DSNAME",i);
			// var opt_name = opt.dataBO.text;
			// var opt_name = opt.dataBO.nodeValue;
			var test = opt.getValue("DSNAME");
			var opt_name = opt.dataBO.childNodes[0].nodeValue; // text 和 innerHTML 都不兼容

			var obj ={};
			obj.key =opt_name;
			obj.value = opt_name;
			if (opt_name.indexOf("cpu")>=0)  cpu.push(obj);
			if (opt_name.indexOf("memory")>=0)  memory.push(obj);
			if (opt_name.indexOf("pif")>=0)  eth.push(obj);
			
		}
		createListControl(cpu,"cpu_chkbox_list");
		createListControl(memory,"rom_chkbox_list");
		createListControl(eth,"eth_chkbox_list");
	}
}

function createListControl(arr,controlname){
 // {  
	// 滚动条
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
		 // 计算滚动条 
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
		$('.widget a').lightBox();	
	}
	
	


	// move to  drawMonitorPic 
 
 
// }
}

function clearControl(){
		document.getElementById("cpu_chkbox_list").innerHTML='<div class="ipt span7" name="typelist" style="display:none"></div><span class="btn"> 选择 <span class="caret"></span></span>';
		document.getElementById("rom_chkbox_list").innerHTML='<div class="ipt span7" name="typelist" style="display:none"></div><span class="btn"> 选择 <span class="caret"></span></span>';
		document.getElementById("eth_chkbox_list").innerHTML='<div class="ipt span7" name="typelist" style="display:none"></div><span class="btn"> 选择 <span class="caret"></span></span>';
		
		document.getElementById("cpu_tab_piclist").innerHTML="";
		document.getElementById("rom_tab_piclist").innerHTML="";
		document.getElementById("eth_tab_piclist").innerHTML="";
		

		addMoniterData();


}
