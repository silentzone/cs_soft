var Tools = function() {};
/*******************************************************************************
*	描述：
*		关闭窗口
*	参数：
*	返回值：
*		boolean
*******************************************************************************/
Tools.CloseWin = function(id) {
	if(!id){
		self.opener=null;
		self.open('', '_self');
		self.close();
	}else{
		// var list = art.dialog.list;
		// list[id].close();
		// $("#"+id).remove();
		art.dialog.close();
	}
	return true;
}
/*******************************************************************************
*	描述：
*		remove session
*	参数：
*		key:					session key
*	返回值：
*		boolean
*******************************************************************************/
Tools.RemoveSession = function(key) {
	var dict = new DynamicDict("removeSession");
	dict.setValue("KEY",key);
	if(!dict.callService()){
		return false;
	}
	return true;
}
/*******************************************************************************
*	描述：
*		遍历寻找最顶层窗口
*	参数：
*		window:					当前窗口对象
*	返回值：
*		返回能够找到的最顶层窗口，如果上面没有父窗口，那么返回自己
*******************************************************************************/
Tools.FindTopWindow = function(Window) {
	var TopWindow = Window.parent;

	if(TopWindow == Window) {
		return Window;
	} else {
		return arguments.callee(TopWindow);
	}
}
/*******************************************************************************
*	描述：
*		调用服务填充ComboBox或者ListBox
*	参数：
*		Control：				ComboBox或者ListBox控件
*		SqlName:				调用的Action名称，为null表示不按sql进行查找
*		InParams:				调用的Action的参数，二维数组，第一列为参数名，第二列为参数值，没有可以为null
*		DefData：				默认数据，二维数组，第一列为显示在ComboBox或者ListBox控件上的数据，第二列为值，没有可以为null
*		RetIndex：			    要读取的结果集在返回集中的位置，只能是长度为2的数组。一维数组
*								如果默认请填写null，并按照0、1、2、3...的循序读取
*		DefValue：			    默认值
*	返回值：
*		成功返回true，失败为false
*******************************************************************************/
Tools.LoadDataToControl = function (Control, SqlName, InParams, DefData, RetIndex, DefValue) {
	// var jdo = new Jdo(SqlName);
	// if(InParams != null && InParams != undefined) {
	// 	for(var i = 0; i < InParams.length; i++) {
	// 		jdo.newNode(jdo.Data,InParams[i][0],InParams[i][1]);
	// 	}
	// }
	// if(!jdo.exec()){
	// 	if(jdo.error)
	// 		showError("OSS_WF_ERROR_READ_UNSUCCESSFUL", jdo.error["Desc"]);
	// 	else
	// 		showMessage('控件初始化错误', 0);
	// 	return false;
	// }
	// Tools.ClearControlElements(Control);
	// var InsertDefault = function(Control, NewItem) {
	// 	var iLen = NewItem.length;
	// 	for(var i = 0; i < iLen; i++) {
	// 	    var option 	= new Option();
	// 		option.value= NewItem[i][0];
 //            option.text = NewItem[i][1];
 //            Control.options.add(option);
	// 	}
	// 	return iLen;
	// }
	// var dLen = 0;
	// if(System.isValid(DefData)) {
	//     dLen = InsertDefault(Control, DefData);
	// }
	// var arr = jdo.toZTEObject()['children'];
	// if(arr != null && arr != undefined){
	// 	var len = arr.length;
	// 	for(var i=0;i<len;i++){
	// 		var dataSet = arr[i];
	// 		var option = new Option();
	// 		option.value = dataSet[RetIndex[0]];
	// 		option.text = dataSet[RetIndex[1]];
	// 		for(var dataArr in dataSet){
	// 			option[dataArr] = dataSet[dataArr];
	// 		}
	// 		Control.options.add(option);	
	// 	}
	// 	if(len==1) Control.selctedIndex = dLen;
 //  	}
 //  	return true;
}