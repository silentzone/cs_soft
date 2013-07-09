// JavaScript Document


function addEvent( obj, type, fn ) { 
     if (obj.addEventListener) 
         obj.addEventListener( type, fn, false ); 
     else if (obj.attachEvent) { 
         obj["e"+type+fn] = fn; 
         obj.attachEvent( "on"+type, function() { obj["e"+type+fn](); } ); 
     } 
} 

addEvent(window,"load",initPage());

function initPage(){
	//加载 服务器模板推荐 及 tab 页
//	insertMenu();
	
}
//插入菜单
function insertMenu(){
	
	loadData();  //取得数据
}

//取得数据
function loadData(){
	//$("#tablist").append('<li class="nav-header">服务器模板推荐</li>');
	
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	dict.setValue("ANSYC_FLAG","1"); //初始化数据
	
	if(!dict.callService()){
		$.messager.alert('温馨提醒',dict.error.Desc,'info');
		return ;
	}
	//得到数据
	var judge =0;
	var i = 0;
	var templist = dict.getValue("TEMPLETLIST");  //模板列表
	var tempItem ; //模板的内容
	for ( i =0;i<templist.getDataObjCnt("TEMPLETITEM");i++){
		var tab_name = templist.getBOValue("TEMPLETITEM",i).getValue("CONF_NAME");
		var tab_id = templist.getBOValue("TEMPLETITEM",i).getValue("CONF_ID");
		var state = templist.getBOValue("TEMPLETITEM",i).getValue("STATE");
		if (left(tab_id,8) =='USERINST' && judge==0){
			$("#tablist").append('<li class="nav-header">已购服务</li>');
			judge =1;
		}
		//插入tablist
		var tab_name_2 =tab_name;
		if (judge ==1){
			if (state =='1') tab_name_2='<span class="label label-info">已审</span>' + tab_name;
			if (state =='0') tab_name_2='<span class="label label-success">新制</span>' + tab_name; 
			//设置默认激活
	 
			if(i == 5) {
				$("#tablist").append(' <li class="active"><a href="#WH'+tab_id+'">'+tab_name_2+' </a></li> ');
			}else {
				$("#tablist").append(' <li><a href="#WH'+tab_id+'">'+tab_name_2+' </a></li> ');
			}
			
			tempItem = templist.getBOValue("TEMPLETITEM",i);
			createTabGroups(tempItem,tab_id);  //生成组件
		}
		
	}
	
	$("#tablist").sildeTab(); 
}


//生成 tab页组件
function createTabGroups(aDict,tab_id){
		//各模板的参数
		var jj =0;
		//生成 tab 页
		var mydiv= document.createElement("div");
		mydiv.id = "WH" + tab_id;
		mydiv.setAttribute("class","form-horizontal");
		//得到控件组的值
		var controlCnt = aDict.getDataObjCnt("TEMCONTROL");
		var controlI =0;
		var type =0;  //类型
		if (left(tab_id,8) !='USERINST') type = 1;
		for (controlI = 0;controlI <controlCnt;controlI++){
			//每一个control 的值
			var controlItem = aDict.getBOValue("TEMCONTROL",controlI);
			var attr_id = controlItem.getValue("ATTR_ID");  //id
			var attr_name = controlItem.getValue("ATTR_NAME");  //名称
			//生成值和数组
			var valueCnt = controlItem.getDataObjCnt("CONTROLVALUE");
			var valueI;
			var cpuArr =new Array();
			for (valueI = 0;valueI <valueCnt;valueI++){
				var controlvalue = controlItem.getBOValue("CONTROLVALUE",valueI);
				var obj1 = {};
				obj1.label = controlvalue.getValue("NAME");
				obj1.value = controlvalue.getValue("VALUE");;
				cpuArr.push(obj1);
			}
			createSelectControl(mydiv,attr_name,attr_id,cpuArr,type); 
		}
		
		//备注
		if (type ==1) createMemoControl(mydiv);
		
		
		//按钮
		if (left(tab_id,8) !='USERINST') creatButton(mydiv); //生成按钮
		
		$("#tabgroups").append(mydiv);

}

//生成 radio 单选框
function createInputControl(mydiv,controlId,optionArr){
	var ControlGroup = document.createElement("div");
	ControlGroup.setAttribute("class","control-group");
	
	var cpuControlDiv = document.createElement("div");
	cpuControlDiv.setAttribute("class","controls");
	var i =0;  
	//生成 radio 控件
	for (i =0;i<optionArr.length;i++){
			var opt = optionArr[i];
			var t_radio_0 =document.createElement("input");
			t_radio_0.setAttribute("type","radio");
			t_radio_0.setAttribute("name","optionsRadios");
			t_radio_0.setAttribute("value",opt.value);
			t_radio_0.setAttribute("id","os"+i);   
			cpuControlDiv.appendChild(t_radio_0);
			
			//生成 radio 的标签
			var cpulabel = document.createElement("label");
			cpulabel.innerHTML =opt.label;
			cpulabel.setAttribute("align","left");
			cpulabel.setAttribute("class","radio inline");
			cpuControlDiv.appendChild(cpulabel);
	}
	ControlGroup.appendChild(cpuControlDiv)
	mydiv.appendChild(ControlGroup);
	
	
}

//生成select控件组
function createSelectControl(mydiv,labelText,attr_Id,optionArr,type){
	var controlId = "control"+attr_Id;  //控件id
	var ControlGroup = document.createElement("div");
	ControlGroup.setAttribute("class","control-group");
	//div对象, 标签名,控件id
	var cpulabel = document.createElement("label");
	cpulabel.innerHTML =labelText;
	cpulabel.setAttribute("class","control-label");
	
	var cpuControlDiv = document.createElement("div");
	cpuControlDiv.setAttribute("class","controls");
	
	var cpuControl =document.createElement("select");  
	cpuControl.id=controlId;
	//增加选项
	var i =0;
	for (i =0;i<optionArr.length;i++){
		//cpuControl.options.add( new Option(optionArr[i][0], optionArr[i][1]));     
		var opt = optionArr[i];
		cpuControl.options.add(  new Option(opt.label,opt.value));
	}
	//增加事件
	if (attr_Id =='5' && type ==1 )	{
		cpuControl.options.add(new Option("",'-1'));
		cpuControl.value = '-1';
		cpuControl.onchange = function(){
			var obj=this;
			var myDate = new Date();
			for(var j=0;j<obj.length;j++){
			   if(obj[j].selected==true){
				// 设置 名称
					var tags = this.parentNode.parentNode.parentNode.getElementsByTagName("*");
					for (var i = 0; i < tags.length; i++) {  
						var userMgr;
						var controlid =tags[i].getAttribute("id");
						if (controlid =="notes"){
							tags[i].value = obj[j].innerText +" "+dateTimeFormat(myDate);
						}
					}
			   }
		   }
		}
	}
	cpuControlDiv.appendChild(cpuControl);
	
	ControlGroup.appendChild(cpulabel);
	ControlGroup.appendChild(cpuControlDiv);
	mydiv.appendChild(ControlGroup);
	
}
function dateTimeFormat(myDate){
	var currentDate	 = myDate.getFullYear() +"-"+ ((myDate.getMonth() +1)>9?(myDate.getMonth() +1).toString():'0' + (myDate.getMonth() +1)) +"-"+(myDate.getDate()>9?myDate.getDate().toString():'0' + myDate.getDate()) +" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds();
	return currentDate;
}
//生成备注控件
function createMemoControl(mydiv){
	var ControlGroup = document.createElement("div");
	ControlGroup.setAttribute("class","control-group");
	
	var cpulabel = document.createElement("label");
	cpulabel.setAttribute("class","control-label");
	cpulabel.innerHTML ="名称";
	
	var cpuControlDiv = document.createElement("div");
	cpuControlDiv.setAttribute("class","controls");
	
	//var textareaControl = document.createElement("textarea");
	//textareaControl.setAttribute("rows","2")
	var textareaControl = document.createElement("input");
	textareaControl.setAttribute("type", "text");

	textareaControl.setAttribute("id","notes")

	cpuControlDiv.appendChild(textareaControl);
	
	ControlGroup.appendChild(cpulabel);
	ControlGroup.appendChild(cpuControlDiv);
	mydiv.appendChild(ControlGroup);
}

//生成按钮
function creatButton(mydiv){
	var cpuControlDiv = document.createElement("div");
	cpuControlDiv.setAttribute("class","form-actions");
	
	cpuControlDiv.innerHTML =' <button type="submit" class="btn btn-primary" onClick="saveMGE(this);">保存</button><button type="button" class="btn">重置</button> ';
	mydiv.appendChild(cpuControlDiv);
}

//保存
function saveMGE(obj){
	
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	
	
	//得到网页上的值
	var tags = obj.parentNode.parentNode.getElementsByTagName("*");
	var os = "";
    if (tags != null && tags.length > 0) {
        for (var i = 0; i < tags.length; i++) {  
			var userMgr;
			var controlid =tags[i].getAttribute("id");
			if (controlid ==null || controlid =="") continue;
            if ( left(controlid,7)== "control") {  //cpu
				var value = tags[i].value;
				if (value =="-1") {
					$.messager.alert('温馨提醒',"请选择操作系统",'info');
					return ;
				}
				var attr_id = right(controlid,controlid.length - 7);
				userMgr = new DynamicDictBo(dict.dataBO,"USER_INST_ATTR");
				userMgr.setValue("ATTR_ID",attr_id); 
				userMgr.setValue("ATTR_INST_VALUE",tags[i].value); 
				
            }  
			if (controlid =="notes"){
				var vm_name = tags[i].value;
				if (vm_name == null || vm_name.length ==0 ){
					$.messager.alert('温馨提醒',"请输入名称",'info');
					return 0;
				}
				dict.setValue("NOTES",tags[i].value); //备注
				}
        }  
    }  
	//判断名称是否有重复
	dict.setValue("ANSYC_FLAG","6"); //判断是否有重复
	if(!dict.callService()){
		$.messager.alert('温馨提醒',dict.error.Desc,'info');
		return ;
	}else{
		var cnt = dict.getValue("CNT");  //重复
		if (cnt !='0') {
			$.messager.alert('温馨提醒','已经存在该名称','info');
			return ;
		}
	}
	
	 if( !confirm("确定要保存配置吗？")) return ;
	 
	//保存
	dict.setValue("ANSYC_FLAG","2"); //保存
	if(!dict.callService()){
		$.messager.alert('温馨提醒',dict.error.Desc,'info');
	}else{
		$.messager.alert('温馨提醒',"保存成功",'info');
		//刷新界面
		$("#tablist").empty();  //清空
		$("#tabgroups").empty();
		loadData();
	}
}


function left(mainStr,lngLen) { 
if (lngLen>0) {return mainStr.substring(0,lngLen)} 
else{return null} 
} 

function right(mainStr,lngLen) { 
// alert(mainStr.length) 
if (mainStr.length-lngLen>=0 && mainStr.length>=0 && mainStr.length-lngLen<=mainStr.length) { 
return mainStr.substring(mainStr.length-lngLen,mainStr.length)} 
else{return null} 
} 
function mid(mainStr,starnum,endnum){ 
if (mainStr.length>=0){ 
return mainStr.substr(starnum,endnum) 
}else{return null} 
//mainStr.length 
} 
