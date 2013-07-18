
var appTalk = new function(){};
appTalk.sendFlag = '';
appTalk.entryNo = '';
appTalk.entryUserId = '';
appTalk.entryUserName = '';
appTalk.vEntryNo = '';
appTalk.vEntryUserId = '';
appTalk.vEntryUserName = '';
appTalk.vUserType = '';
appTalk.totalMsgNum = '0';
appTalk.servicePerson = null;
appTalk.keyMode = '0';
appTalk.interval1 = null;
appTalk.interval2 = null;
appTalk.interval3 = null;
appTalk.interval4 = null;
/* this.servicePerson.push(this.vEntryNo);
 * this.servicePerson.push(this.vEntryUserId);
 * this.servicePerson.push(this.vEntryUserName);
 * this.servicePerson.push(this.vUserType);
*/
appTalk.init = function(){
	//登录
	this.login();
	//刷新在线联系人
	this.renewContact('0');
	//刷新客服服务用户
	if(this.sendFlag=='B')
		this.renewVservice();
	//注册用户查询上次未查看到的聊天记录
	// this.queryLastMsg();
	// 快捷键设置
	this.setShortcuts();
	// 启动轮询
	this.interval();
	// 绑定留言载入事件
	$("#leave_a").click(function(){appTalk.loadLeave();});
	$("#online_a").click(function(){appTalk.clearLeave();});
}
appTalk.clearLeave = function(){
	$("#zxjk_p").empty();

}
appTalk.loadLeave = function(){
	$("#zxjk").show();
	$("#zxjk_p").load("leave.jsp",{entryNo:this.entryNo,userName:this.entryUserName}); 
}
appTalk.logout = function(flag){
	// if(flag!='1')
	// if(!confirm("您确定要退出IM吗？")) return;
	
	// $.messager.defaults = { ok: "确定"};
	var dict = new DynamicDict("UBOSS_DESKTOP_IM_001");
	dict.setValue("OP_TYPE","1");
	dict.setValue("SV_TYPE","2");
	dict.setValue("ENTRY_NO",this.entryNo);
	dict.setValue("USER_TYPE",this.sendFlag);
	if(!dict.callService()){
		// $.messager.alert('温馨提醒','用户注销失败：'+dict.error.Desc,'error');
		alert("用户注销失败："+dict.error.Desc);
		return;
	}
	// $.messager.alert('温馨提醒','用户注销成功','info');
	// alert("用户注销成功");
	if(flag!='1')
	Tools.CloseWin('talk_001');
}
appTalk.interval = function(){
	this.interval1 = window.setInterval('appTalk.queryMsg()',4000);
	this.interval2 = window.setInterval('appTalk.renewContact("0")',4000);
	if(this.sendFlag=='B')
		this.interval3 = window.setInterval('appTalk.renewVservice()',4000);
}
appTalk.clsInterval = function(){
	window.clearInterval(this.interval1);
	window.clearInterval(this.interval2);
	if(this.sendFlag=='B')
		window.clearInterval(this.interval3);
}
/*进入IM登录分配唯一签入标识*/
appTalk.login = function(){
	var dict = new DynamicDict("UBOSS_DESKTOP_IM_001");
	dict.setValue("OP_TYPE","1");
	dict.setValue("SV_TYPE","1");
	if(!dict.callService()){
		// $.messager.defaults = { ok: "确定"};
		// $.messager.alert('温馨提醒','用户登录IM失败：'+dict.error.Desc,'error');
		alert("用户登录IM失败："+dict.error.Desc);
		Tools.CloseWin('talk_001');
		return;
	}
	var imUser = dict.getBOValue("IM_USER",0);
	var userType = imUser.getValue("USER_TYPE");
	this.sendFlag = userType;
	this.entryNo = imUser.getValue("ENTRY_NO");
	this.entryUserId = imUser.getValue("USER_ID");
	this.entryUserName = imUser.getValue("USER_NAME");
	if(userType=='A'){
		var seo = imUser.getValue("SERVICE_ENTRY_NO");
		if(seo!='-1'){// 有接待客服
			this.vEntryNo = seo;
			this.vEntryUserId = imUser.getValue("SERVICE_USER_ID");
			this.vEntryUserName = imUser.getValue("SERVICE_USER_NAME");
			this.vUserType = imUser.getValue("SERVICE_USER_TYPE");
			this.servicePerson = [];
			this.servicePerson.push(this.vEntryNo);
			this.servicePerson.push(this.vEntryUserId);
			this.servicePerson.push(this.vEntryUserName);
			this.servicePerson.push(this.vUserType);
			this.renewContact('1');
			// $.messager.defaults = { ok: "确定"};
			// $.messager.alert('温馨提醒',appTalk.vEntryUserName+' 接待了您，您可与他通话。','info');
			alert(appTalk.vEntryUserName+" 接待了您，您可与他通话。");
		}
	}
	
	// $.messager.defaults = { ok: "现在进入",cancel:"不要别名"};
	// $.messager.prompt('温馨提示','请取一个别名方便大家联系您',function(val){
	// 	if(val!=undefined){
	// 		if(val!=''){
	// 			var uDict = new DynamicDict("UBOSS_DESKTOP_IM_002");
	// 			uDict.setValue("OP_TYPE","2");
	// 			uDict.setValue("ENTRY_NO",appTalk.entryNo);
	// 			uDict.setValue("USER_TYPE",userType);
	// 			var name = "";
	// 			if(userType=='A'){
	// 				if(appTalk.entryUserId=='-1')
	// 					name = '[游客]';
	// 				else name = '[注册用户]';
	// 			}else if(userType=='B'){
	// 				name = '[客服]';
	// 			}
	// 			appTalk.entryUserName = name+$.trim(val);
	// 			uDict.setValue("USER_NAME",appTalk.entryUserName);
	// 			uDict.callService();
	// 		} 
	// 	}
	// 	$("#userShow").html(appTalk.entryUserName);
	// 	appTalk.chatPerson(appTalk.vEntryUserName,appTalk.vUserType);
	// });

	art.dialog.prompt('', function(data){
	    // data 代表输入数据;
	    var val = $.trim(data);
	    if(val!=''){
	    	if(val == '您可以取一个别名') return;
	    	var uDict = new DynamicDict("UBOSS_DESKTOP_IM_002");
	    	uDict.setValue("OP_TYPE","2");
	    	uDict.setValue("ENTRY_NO",appTalk.entryNo);
			uDict.setValue("USER_TYPE",userType);
			var name = "";
			if(userType=='A'){
				if(appTalk.entryUserId=='-1')
					name = '[游客]';
				else name = '[注册用户]';
			}else if(userType=='B'){
				name = '[客服]';
			}
			appTalk.entryUserName = name+val;
			uDict.setValue("USER_NAME",appTalk.entryUserName);
			uDict.callService();
		    $("#userShow").html(appTalk.entryUserName);
	    	appTalk.chatPerson(appTalk.vEntryUserName,appTalk.vUserType);
	    }
	}, '您可以取一个别名');

    $("#userShow").html(appTalk.entryUserName);
    appTalk.chatPerson(appTalk.vEntryUserName,appTalk.vUserType);
	return true;
}
/*初始化聊天头显示信息html*/
appTalk.chatPerson = function(userName,userType){
	$("#chatPerson").empty();
	var varHtml = '';
	if(userName==''){
		varHtml = '<h5>请从左边栏选择您需要通话的对象</h5>';
	}else{
		varHtml = '<h5>您正在与<a href="#">'+userName+'</a>通话中</h5>';
	}
	$("#chatPerson").html(varHtml);
}
/*查询当前客服服务的在线用户*/
appTalk.queryVserviceUser = function(){
	var dict = new DynamicDict("UBOSS_DESKTOP_IM_002");
	dict.setValue("OP_TYPE","3");
	dict.setValue("ENTRY_NO",this.entryNo);

	if(!dict.callService()){
		// $.messager.defaults = { ok: "确定"};
		// $.messager.alert('温馨提醒','IM查询用户失败：'+dict.error.Desc,'error');
		alert("IM查询用户失败："+dict.error.Desc)
		return null;
	}
	return dict;
}
/*查询当前在线用户(不包括自己)*/
appTalk.queryUser = function(){
	var dict = new DynamicDict("UBOSS_DESKTOP_IM_002");
	dict.setValue("OP_TYPE","1");
	if(this.sendFlag=='B'){
		dict.setValue("QR_TYPE","1");
	}
	if(!dict.callService()){
		// $.messager.defaults = { ok: "确定"};
		// $.messager.alert('温馨提醒','IM查询用户失败：'+dict.error.Desc,'error');
		alert("IM查询用户失败："+dict.error.Desc)
		return null;
	}
	return dict;
}
/*更新客服服务的在线用户栏目div html*/
appTalk.renewVservice = function(){
	$("#vserviceLI").show();
	$("#vserviceUI").empty();
	var userDict = this.queryVserviceUser();
	var uNum = userDict.getValue("VSERVICE_USER_COUNT");
	if(userDict==null) return;
	for(var i=0;i<uNum;i++){
		var uObj = userDict.getBOValue("VSERVICE_USER",i);
		var entryNo = uObj.getValue("ENTRY_NO");
		var userId = uObj.getValue("ENTRY_USER_ID");
		var userName = uObj.getValue("ENTRY_USER_NAME");
		$("#vserviceUI").append('<a href="javascript:appTalk.selectContract(\''+entryNo+'\',\''+userId+'\',\''+userName+'\',\'A\')"><li>'+userName+'</li></a>');
	}
}
/*更新联系人栏目div html flag=0 全部刷新 1 刷新客服*/
appTalk.renewContact = function(flag){
	$("#serviceUL").empty();
	if(this.servicePerson!=null){//更新客服
		var entryNo =  this.servicePerson[0];
		var userId =  this.servicePerson[1];
		var userName =  this.servicePerson[2];
		$("#serviceUL").append('<a href="javascript:appTalk.selectContract(\''+entryNo+'\',\''+userId+'\',\''+userName+'\',\'B\')"><li>'+this.servicePerson[2]+'</li></a>');
	}
	if (flag=='1') return;
	
	var userUL = $("#userUL");
	var guestUL = $("#guestUL");
	userUL.empty();
	guestUL.empty();
	var userDict = this.queryUser();
	if(userDict==null) return;
	var uNum = userDict.getValue("ONLINE_USER_COUNT");
	var suNum = userDict.getValue("ONLINE_SERVICE_COUNT");
	var isLogin = '0';
	for(var i=0;i<uNum;i++){
		var uObj = userDict.getBOValue("ONLINE_USER",i);
		var entryNo = uObj.getValue("ENTRY_NO");
		if(entryNo==this.entryNo){
			//自己不载入到联系人div中
			isLogin = '1';
			//看是否有最新的客服信息
			var seo = uObj.getValue("SERVICE_ENTRY_NO");
			if(seo!='-1'&&this.servicePerson==null){// 有接待客服
				this.servicePerson = [];
				this.servicePerson.push(seo);
				this.servicePerson.push(uObj.getValue("SERVICE_USER_ID"));
				this.servicePerson.push(uObj.getValue("SERVICE_USER_NAME"));
				this.servicePerson.push(uObj.getValue("SERVICE_USER_TYPE"));
				this.renewContact('1');
			}
			continue;
		}
		var userId = uObj.getValue("ENTRY_USER_ID");
		var userName = uObj.getValue("ENTRY_USER_NAME");
		if(userId=='-1'){//游客
			guestUL.append('<a href="javascript:appTalk.selectContract(\''+entryNo+'\',\''+userId+'\',\''+userName+'\',\'A\')"><li>'+userName+'</li></a>');
		}else{
			userUL.append('<a href="javascript:appTalk.selectContract(\''+entryNo+'\',\''+userId+'\',\''+userName+'\',\'A\')"><li>'+userName+'</li></a>');
		}
	}
	if(suNum!=null){
		for(var i=0;i<suNum;i++){
			var uObj = userDict.getBOValue("ONLINE_SERVICE",i);
			var entryNo = uObj.getValue("ENTRY_NO");
			if(entryNo==this.entryNo){
				//自己不载入到联系人div中
				isLogin = '1';
				continue;
			}
			var userId = uObj.getValue("ENTRY_USER_ID");
			var userName = uObj.getValue("ENTRY_USER_NAME");
			serviceUL.append('<a href="javascript:appTalk.selectContract(\''+entryNo+'\',\''+userId+'\',\''+userName+'\',\'A\')"><li>'+userName+'</li></a>');
		}
	}

	if(isLogin=='0'){//已经退出

		this.clsInterval();
		// $.messager.defaults = { ok: "重新登入",cancel:"退出"};
		// $.messager.confirm("温馨提醒","您长时间未在线已退出系统，是否重新登入？", function (data) {
  //           if (data) {
	 //            var dict = new DynamicDict("UBOSS_DESKTOP_IM_001");
		// 		dict.setValue("OP_TYPE","4");
		// 		dict.setValue("USER_TYPE",appTalk.sendFlag);
		// 		dict.setValue("ENTRY_NO",appTalk.entryNo);
		// 		if(!dict.callService()){
		// 			alert(dict.error.Desc);
		// 			Tools.CloseWin('talk_001');
		// 		}
		// 		appTalk.interval();
  //           }else {
  //              	//移除session
		// 		Tools.RemoveSession("IM_ENTRY_NO");
		// 		Tools.CloseWin('talk_001');
  //           }
  //       });

        if(confirm("您长时间未在线已退出系统，是否重新登入？")){
        	var dict = new DynamicDict("UBOSS_DESKTOP_IM_001");
			dict.setValue("OP_TYPE","4");
			dict.setValue("USER_TYPE",appTalk.sendFlag);
			dict.setValue("ENTRY_NO",appTalk.entryNo);
			if(!dict.callService()){
				alert(dict.error.Desc);
				Tools.CloseWin('talk_001');
			}
			appTalk.interval();
        }else{
        	//移除session
			Tools.RemoveSession("IM_ENTRY_NO");
			Tools.CloseWin('talk_001');
        }
	}
}
appTalk.selectContract = function(vEntryNo,vEntryUserId,vEntryUserName,vUserType){
	this.vEntryNo = vEntryNo;
	this.vEntryUserId = vEntryUserId;
	this.vEntryUserName = vEntryUserName;
	this.vUserType = vUserType;
	appTalk.chatPerson(this.vEntryUserName,this.vUserType);
}
/*发送信息*/
appTalk.sendMsg = function(){
	// $.messager.defaults = { ok: "确定"};
	if(this.vEntryNo==''){
		// $.messager.alert('温馨提醒','请从左边栏选择您需要通话的对象！','warning'); 
		alert("请从左边栏选择您需要通话的对象！");
		return;
	}
	var msg = $.trim($("#SEND_MSG").val());
	if(msg==''){
		// $.messager.alert('温馨提醒','请输入消息！','warning'); 
		alert("请输入消息！");
		$("#SEND_MSG").focus();
		return;
	}
	
	//先写入数据库，后刷新页面
	var dict = new DynamicDict("UBOSS_DESKTOP_IM_001");
	dict.setValue("OP_TYPE","2");
	dict.setValue("SEND_FLAG",this.sendFlag);
	dict.setValue("ENTRY_NO",this.entryNo);
	dict.setValue("ENTRY_USER_ID",this.entryUserId);
	dict.setValue("ENTRY_USER_NAME",this.entryUserName);
	dict.setValue("V_ENTRY_NO",this.vEntryNo);
	dict.setValue("V_ENTRY_USER_ID",this.vEntryUserId);
	dict.setValue("V_ENTRY_USER_NAME",this.vEntryUserName);
	dict.setValue("V_USER_TYPE",this.vUserType);
	dict.setValue("CONTENT",msg);
	if(!dict.callService()){
		// $.messager.defaults = { ok: "确定"};
		// $.messager.alert('温馨提醒','信息发送失败：'+dict.error.Desc,'error'); 
		alert("信息发送失败："+dict.error.Desc);
		return;
	}
	var cNum = dict.getValue("CHAT_COUNT");
	if(cNum>0){
		$("#SEND_MSG").val("");
		var uObj = dict.getBOValue("CHAT",0);
		var time = uObj.getValue("SEND_DATE");
		var chatNo = uObj.getValue("CHAT_NO");
		this.insertMsg('我',this.vEntryUserName,time,msg,chatNo);
	}else{
		// $.messager.defaults = { ok: "确定"};
		// $.messager.alert('温馨提醒','系统忙......','error');
		alert("系统忙......");
		return;
	}
}
/*根据签入标签查询未接收信息*/
appTalk.queryMsg = function(){
	if(this.entryNo==''){
		return;
	}
	// 判断窗口是否打开 
	var IS_ACCT = "0" 
 	if(pop.ishide("talk_001") == true ) {
 		IS_ACCT = "1";	 // 1 为窗口隐藏 
 	}  
	var dict = new DynamicDict("UBOSS_DESKTOP_IM_001");
	dict.setValue("OP_TYPE","3");
	dict.setValue("USER_TYPE",this.sendFlag);
	dict.setValue("ENTRY_NO",this.entryNo);
	dict.setValue("IS_ACCT",IS_ACCT);

	if(!dict.callService()){
		return;
	}

	var uNum = dict.getValue("COUNT");



	// 数量提醒 by li 
	var topIm = top.bottomMenu.num
	var topMsg = top.bottomMenu.msg;
 
	if( IS_ACCT == "1") {
		if(uNum > 0 ) {
			topIm.html(uNum).show();
		} 
	} else {
		topIm.html(0).hide();
		topMsg.html("").hide();
	}


	for(var i=0;i<uNum;i++){
		var uObj = dict.getBOValue("USER_CHAT",i);
		var msg = uObj.getValue("CONTENT");
		var userName = uObj.getValue("ENTRY_USER_NAME");
		var time = uObj.getValue("SEND_DATE");
		var chatNo = uObj.getValue("CHAT_NO");

		// 隐藏消息 吸入提醒中  byli 
		 if( IS_ACCT == "1") {  topMsg.html( userName + ": " + msg.substring(0,12) + "...").show(); }

		this.insertMsg(userName,'我',time,msg,chatNo);
	}
}
/*根据userId查询注册用户上次未接收信息*/
appTalk.queryLastMsg = function(){

}
/*往消息窗口添加消息html(单条)*/
appTalk.insertMsg = function(name,vname,time,msg,chatNo){
	++appTalk.totalMsgNum;
	var msgHtml = '<dl class="chat_msg"><dt title="&lt;'+name+'&gt;"';
	msgHtml+='class="msgHead">&lt;'+name+'&gt;->&lt;'+vname+'&gt;<span style="margin-left:5px">'+time+'</span>';
	msgHtml+='</dt><dd  class="msgbox" chatNo="'+chatNo+'">'+msg+'</dd></dl>'
	$("#acctMsgDiv").append(msgHtml);
	$("#acctMsgDiv").scrollTop($("#acctMsgDiv")[0].scrollHeight);
}
/*发送消息快捷键设置 */
appTalk.setShortcuts = function(){
	var that = this;
    $("#SEND_MSG").keydown(function(ev) {
      if (!$("#Isend").attr("disabled")) {
        if (that.keyMode == "0") {
          if (ev.ctrlKey && ev.keyCode == 13)
            that.sendMsg();
        }
        else {
          if (ev.keyCode == 13)
            that.sendMsg();
        }
      }
    });
    return this;
}
/*发送消息快捷键选择*/
appTalk.shortcut = function(flag){
	if(flag=='0'){
		this.keyMode = "0";
		$("#shortDiv").html('按Ctrl+Enter发送消息');
	}else{
		this.keyMode = "1";
		$("#shortDiv").html('按Enter发送消息');
	}
}
/*清除消息窗口*/
appTalk.clearMsg = function(){
	var box = $(".msgbox");
	if(box.length<1) return;
	// var dict = new DynamicDict("UBOSS_DESKTOP_IM_001");
	// dict.setValue("OP_TYPE","8");
	// for(var i=0;i<box.length;i++){
	// 	var chatNo = $(box[i]).attr("chatNo");
	// 	var cDict = new DynamicDictBo(dict.dataBO,"CHAT");
	// 	cDict.setValue("CHAT_NO",chatNo);
	// }
	// if(!dict.callService()){
	// 	alert(dict.error.Desc);
	// 	return;
	// }
	appTalk.totalMsgNum = '0';
	$("#acctMsgDiv").empty();
}
/*关闭IM*/
appTalk.close = function(e){
	e = e || window.event;
    var msg = "您确定要离开此页面吗？";
      
    // IE
    e.cancelBubble = true;
    e.returnValue = msg;
      
    // Firefox
    if(e.stopPropagation) {
        e.stopPropagation();
        e.preventDefault();
    }
     
    // Chrome / Safari
    return msg;
}





var pop = {};
pop.ishide =  function (id) {
	
	var dglist = top.art.dialog.list;
	var dgapi = dglist[id];
	if(!dgapi) { return null; }
	var wrap = dgapi.DOM.wrap;
	var $wrap = $(wrap[0]);
	if($wrap.is(":hidden")) {
		return true;
	} else {
		return false;
	} 
}	  