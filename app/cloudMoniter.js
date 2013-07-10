// JavaScript Document
var imgid=0;
var divid = 0;
function drawMonitorPic(){
	
	
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","11");
	
	var par = $("#moniterpar").val(); 
	var picobj = document.getElementById(par)
	if (picobj !=null){
		alert("该参数的图已存在");
		return ;
	}
	dict.setValue("MOINTORPAR",par);
	if(!dict.callService()){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','保存失败：'+dict.error.Desc,'error'); 
		return;
	}else{
		var pic = dict.getValue("PICNAME");
//		alert("../rrddata/"+pic);
		var mydiv  =document.createElement("div")
		mydiv.id =par;
		
		var myimg = document.createElement("img")
		myimg.id ="myimg"+imgid;
		
		var myLabel = document.createElement("label")
		myLabel.innerHTML =par;
		
		
		imgid++;
		divid++;
		
		myimg.src = "../rrddata/"+pic;
		mydiv.appendChild(myLabel);
		mydiv.appendChild(myimg);
		//document.getElementById("tabshowpic").appendChild(mydiv);
		document.body.appendChild(mydiv);

	}
}

function addMoniterData(){
	document.getElementById("moniterpar").length = 0;
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","12");
	dict.setValue("INST_ID","");
	if(!dict.callService()){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','保存失败：'+dict.error.Desc,'error'); 
		return;
	}else{
		var moniter = dict.getValue("MONITERPARLIST");
		for ( i =0;i<moniter.getDataObjCnt("DSNAME");i++){
			var opt = moniter.getBOValue("DSNAME",i);
			var opt_name = opt.dataBO.text;
			document.getElementById("moniterpar").options.add(new Option(opt_name,opt_name));
		}
		drawMonitorPic();
	}
}