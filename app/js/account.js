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
    $("#save_btn").click(function(){appAccount.recharge()});
}
appAccount.changeDiv = function(type){
    if(type=='1'){
        $("#recharge_div").show();
        $("#qry_div").hide();
    }else{
        $("#qry_div").show();
        $("#recharge_div").hide();
    }
}
appAccount.recharge = function(){
    $.messager.defaults = { ok: "确定"};
    var cardNo = $("#CARD_NO").trimval();
    if(cardNo == ''){
        $.messager.alert('温馨提醒','卡片编号不能为空','warning');
        $("#CARD_NO").focus();
        return;
    }
    var cardSn = $("#CARD_SN").trimval();
    if(cardSn == ''){
        $.messager.alert('温馨提醒','卡片密码不能为空','warning');
        $("#CARD_SN").focus();
        return;
    }
    // 先不验证直接充30元钱
    var dict = new DynamicDict("UBOSS_DESKTOP_USER_002");
    dict.setValue("OP_TYPE","7");
    dict.setValue("BILL_ID",$billId);
    dict.setValue("USER_ID",$userId);
    dict.setValue("MONEY","30");
    dict.setValue("NOTES","卡号:"+cardNo+"|密码:"+cardSn);
    if(!dict.callService()){
        $.messager.alert('温馨提醒','充值失败：'+dict.error.Desc,'error');
        return;
    }
    $("#saveResult").html("<font color='green'>充值[30元]成功</font>");
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