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
	cpuControlDiv.setAttribute("class","controls");
	
	var cgDiv = document.createElement("div");
	cgDiv.className = "control-group"
	cpuControlDiv.innerHTML =' <button style="margin-right:4px;" type="submit" class="btn btn-primary" onClick="openThdSaveWin(this);">保存</button><button type="button" class="btn">重置</button> ';
	cgDiv.appendChild(cpuControlDiv);
	mydiv.appendChild(cgDiv);
}