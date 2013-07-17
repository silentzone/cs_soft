function httpsRemoteClientLogin(){
	//先开一个弹出窗口
	var url ='https://113.247.222.118/Citrix/CSSP-Cloud/auth/login.aspx';
	if (!judgeDeskTopReady()){
		return ;
	}
	var winparent = getTopFrame(window);
	var iDiv=winparent.document.getElementById("myXenAppdiv");
	if(iDiv ==null){
		preLoginOpenw(url);
		loginByAction(url);
	}else{
		window.open(url , 'openpopwin', 'width=1000,height=500, resizable=yes,status=no') ;
	}
}

function judgeDeskTopReady(){
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	var userid ="";
	dict.setValue("ANSYC_FLAG","8");
	dict.setValue("INST_ID","");
	if(!dict.callService()){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','打开失败：'+dict.error.Desc,'error'); 
		return;
	}else{
		var mess = dict.getValue("JUGETMESS");
		
		if (mess =="" || mess ==null){
			return true;
		}else{
			$.messager.defaults = { ok: "确定"};
			$.messager.alert('温馨提醒',mess,'info'); 
			return false;
		}
	}
	return false;
}

function preLoginOpenw(url){
	
	var playerUrl = url;
	var popupPlayer= window.open('', '登录中......', 'width=50,height=50, resizable=yes,status=no') ;
	if(popupPlayer.location == 'about:blank' ){
	    popupPlayer.location = url;
	}
	popupPlayer.focus();
	//window.open('cloudConsole.jsp','_blank');
}
function loginByAction(url){
	var winparent = getTopFrame(window);
	var dict = new DynamicDict("UBOSS_USERMGR_001");
	var userid ="";
	dict.setValue("ANSYC_FLAG","7");
	dict.setValue("INST_ID","");
	if(!dict.callService()){
		$.messager.defaults = { ok: "确定"};
		$.messager.alert('温馨提醒','保存失败：'+dict.error.Desc,'error'); 
		return;
	}else{
		var resource = dict.getValue("HTMLRESULT");
		userid = dict.getValue("USERID");
		resource = resource.replace('login.aspx',url);
		 var iDiv=winparent.document.getElementById("myXenAppdiv");
		if(iDiv ==null){
			iDiv = winparent.document.createElement("div");
			iDiv.id="myXenAppdiv";
			iDiv.style.display="none";
			winparent.document.body.appendChild(iDiv);
		}
		iDiv.innerHTML = resource;
		var loinguser ="";
		if (userid=="1"){
			 loinguser = "demouser" ;
		}else{
			 loinguser = "cssp"+userid;
		}
		winparent.document.getElementById("user").value =loinguser;
		winparent.document.getElementById("password").value ="123456";
		//alert("用户:"+loinguser+"  密码:");
		winparent.document.forms["CitrixForm"].target="_blank";
		winparent.document.forms["CitrixForm"].autocomplete="true"
		//winparent.document.forms["CitrixForm"].submit();
		//增加一个 submit 按钮
		var submitButton = document.createElement("input");
		submitButton.type = "submit";
		submitButton.id="subbutt"
		winparent.document.forms["CitrixForm"].appendChild(submitButton);
		setTimeout("loginFormSubmit();",5000);

		
		//删除div
	}
	
}

function loginFormSubmit(){

	var winparent = getTopFrame(window);
	winparent.document.getElementById("CitrixForm").value;
	winparent.document.forms["CitrixForm"].submit();
	
}

function getTopFrame(w) {
    if (w != w.parent) {
		return w.parent;
    }
    return w;
}