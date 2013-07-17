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
var appAccount = new function(){};
appAccount.init = function(){
    this.initInfoTable();
    this.elemEventBind();
    this.queryBillInfo();
}
/* binding page elements event*/
appAccount.elemEventBind = function(){
    /* information query button*/
    $("#qry_btn").click(function(){appAccount.queryInfo('1','5')});
    $("#czspan").click(function(){appAccount.changeDiv('1')});
    $("#cxspan").click(function(){appAccount.changeDiv('2')});
    $("#xfmm").click(function(){appAccount.changeDiv('3')});
    $("#save_btn").click(function(){appAccount.recharge()});
    $("#pwd_btn").click(function() { appAccount.modifyPwd()});
}
appAccount.changeDiv = function(type){
    if(type=='1'){
        $("#recharge_div").show();
        $("#qry_div").hide();
        $("#pwd_div").hide();
    }else if(type=='2'){
        $("#qry_div").show();
        $("#recharge_div").hide();
        $("#pwd_div").hide();
    }else if(type=='3'){
        $("#qry_div").hide();
        $("#recharge_div").hide();
        if(this.isPayPwd()){
            $("#tip_span").empty();
        }
        $("#pwd_div").show();
    }
}
appAccount.cardValidator = function(){
    $("#MONEY").val("");
    var cardNo = $("#CARD_NO").trimval();
    if(cardNo == ''){
        $.messager.alert('温馨提醒','卡片编号不能为空','warning');
        $("#CARD_NO").focus();
        return false;
    }
    var cardSn = $("#CARD_SN").trimval();
    if(cardSn == ''){
        $.messager.alert('温馨提醒','卡片密码不能为空','warning');
        $("#CARD_SN").focus();
        return false;
    }
    var len = cardNo.length;
    var bit_1 = cardNo.substr(len-2,1);
    var bit_2 = cardNo.substr(len-1,1);
    var m = cardSn.substr(bit_1,bit_2);
    var reg = new RegExp("^[0-9]*$");
    if(m==""||!reg.test(m)){
        $.messager.alert('温馨提醒','卡片密码不正确','warning');
        $("#CARD_SN").focus();
        return false;
    }
    
    $("#MONEY").val(m);

    return true;
}
appAccount.recharge = function(){

    if(!this.cardValidator()) return;
    
    $.messager.defaults = { ok: "确定"};
    var cardNo = $("#CARD_NO").trimval();
    var cardSn = $("#CARD_SN").trimval();
    var money = $("#MONEY").trimval();
    var ba = parseFloat(money);
    ba = ba/100;

    var base64Pwd = Base64.base64encode(Base64.utf16to8(cardSn));
    var md5Pwd = MD5.toMD5(base64Pwd);

    var base64M = Base64.base64encode(Base64.utf16to8(money));
    var md5M = MD5.toMD5(base64M);

    var dict = new DynamicDict("UBOSS_DESKTOP_USER_002");
    dict.setValue("OP_TYPE","7");
    dict.setValue("BILL_ID",$billId);
    dict.setValue("USER_ID",$userId);
    dict.setValue("CRAD_NO",cardNo);
    dict.setValue("MD5_PWD",md5Pwd);
    dict.setValue("MD5_MONEY",md5M);
    dict.setValue("NOTES","卡号:"+cardNo+"|密码:"+cardSn);
    if(!dict.callService()){
        $.messager.alert('温馨提醒','充值失败：'+dict.error.Desc,'error');
        return;
    }
    $("#saveResult").html("<font color='green'>&nbsp;充值["+ba+"云币]成功</font>");
    this.queryBillInfo();
}
/* information table init*/
appAccount.initInfoTable = function(){
    $('#table_info').datagrid({
        singleSelect: true,striped:true,rownumbers:true,pagination:true,fitColumns:true,loadMsg:'获取数据中...',
        remoteSort:false,
        onClickRow:function(idx,rowData) {
            
        }
    });
     //设置分页控件  
    var p = $('#table_info').datagrid('getPager');  
    $(p).pagination({  
        pageSize: 5,//每页显示的记录条数，默认为10  
        pageList: [5,10,15],//可以设置每页记录条数的列表  
        beforePageText: '第',
        afterPageText: '页    1共 {pages} 页',  
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录', 
        onSelectPage:function(pageNumber,pageSize){
            appAccount.queryInfo(pageNumber,pageSize);
        },
        onRefresh:function(pageNumber,pageSize){
            appAccount.queryInfo(pageNumber,pageSize);
        } 
    }); 
}
appAccount.queryInfo = function(pageNumber,pageSize){
    $('#table_info').datagrid('loadData',[]);

    var dict = new DynamicDict("UBOSS_DESKTOP_USER_002");
    dict.setValue("OP_TYPE","8");
    dict.setValue("PAGE_NUMBER",pageNumber);
    dict.setValue("PAGE_SIZE",pageSize);
    dict.setValue("QRY_TYPE",$("#qry_type").val());
    $.messager.defaults = { ok: "确定"};
    if(!dict.callService()){
        $.messager.alert('温馨提醒','信息查询失败：'+dict.error.Desc,'error');
        return;
    }
    var count = dict.getValue("TOTAL_COUNT");
    if(count==0) {
        $.messager.alert('温馨提醒','查询结束，未找到记录','info');
        return;
    }
    var json = dict.toJson(false);
    var obj = null;
    var pcount = dict.getValue("PAGE_COUNT");
    if(pcount>1){
        obj = json.qry_info;
    }else if(pcount==1){
        obj = {};
        obj.total = count;
        obj.rows = [json.qry_info.rows];
    }
    $('#table_info').datagrid('loadData',obj);
}
appAccount.queryBillInfo = function(){
    $("#moneyspan").empty();
    var dict = new DynamicDict("UBOSS_DESKTOP_USER_002");
    dict.setValue("OP_TYPE","9");
    dict.setValue("BILL_ID",$billId);
    dict.setValue("USER_ID",$userId);
    $.messager.defaults = { ok: "确定"};
    if(!dict.callService()){
        $.messager.alert('温馨提醒','账户信息查询失败：'+dict.error.Desc,'error');
        return;
    }
    var num = dict.getValue("BILL_COUNT");
    if(num>0){
        var bo = dict.getBOValue("BILL",0);
        var ba = parseFloat(bo.getValue("BILL_BALANCE"));
        ba = ba/100;
        $("#moneyspan").html(ba.toFixed(2));
    }
}
appAccount.modifyPwd = function(){
    var billId = $billId;
    var oldPwd = $.trim($("#OLD_PWD").val());
    var newPwd = $.trim($("#NEW_PWD").val());
    var newPwdRe = $.trim($("#NEW_PWD_RE").val());

    $.messager.defaults = { ok: "确定"};
    if(oldPwd =="")
    {
        $.messager.alert('温馨提醒','原密码不能为空','warning');
        $("#OLD_PWD").focus();
        return; 
    }
    if(newPwd =="")
    {
        $.messager.alert('温馨提醒','新密码不能为空','warning');
        $("#NEW_PWD").focus();
        return; 
    }
    if(newPwdRe !=newPwd)
    {
        $.messager.alert('温馨提醒','确认密码与新密码不一致','warning');
        $("#NEW_PWD_RE").focus();
        return; 
    }
    var base64Pwd = Base64.base64encode(Base64.utf16to8(oldPwd));
    var md5Pwd = MD5.toMD5(base64Pwd);

    var dict = new DynamicDict("UBOSS_DESKTOP_USER_002");
    dict.setValue("OP_TYPE","10");
    dict.setValue("BILL_ID",billId);
    dict.setValue("MD5_PWD",md5Pwd);
    dict.setValue("INPUT_PWD",newPwd);
    $.messager.defaults = { ok: "确定"};
    if(!dict.callService()){
        $.messager.alert('温馨提醒','设置失败：'+dict.error.Desc,'error'); 
        $("#pwdResult").html("<font color='red'>&nbsp;消费密码设置失败</font>");
        return;
    }
    $.messager.alert('温馨提醒','消费密码设置成功','info'); 
    $("#pwdResult").html("<font color='green'>&nbsp;消费密码设置成功</font>");
    
}
appAccount.isPayPwd = function(){
    var dict = new DynamicDict("UBOSS_DESKTOP_USER_003");
    dict.setValue("OP_TYPE","4");
    dict.setValue("BILL_ID",$billId);
    if(!dict.callService()){
        return false;
    }
    return true;
}