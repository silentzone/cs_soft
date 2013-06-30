/* 取值去空格 */
jQuery.fn.trimval = function(){
	return $.trim(this.val());
}
var WEB_ROOT_PATH=getRootPath();
var SERVICE_URI = WEB_ROOT_PATH+"/callservice.do";
var JSON_SERVICE_URI = WEB_ROOT_PATH+"";//json格式调用，json格式返回的后台servlet
var JSON_SERVICE_XML_URI = WEB_ROOT_PATH+"";////xml格式调用，json格式返回 服务的后台servlet
var Sys = {};
function getRootPath(){
    //获取当前网址
    var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名，如：/soft
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
}
function checkBrowserVersion(){
	var ua = navigator.userAgent.toLowerCase();
	var s;
	(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
	(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
	(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;   
}
checkBrowserVersion();

var dictMethod = {

	dictsetValue:function(name,value,type){
		var childNode = null;
		var node =null;
		
		if (value == null) value = "";	
		//object类型的变量传递进来是BO，BO允许同名，所以直接添加进去
		else  if(typeof(value) =="object")
		{
			this.dataBO.appendChild(value);
			return;
		}

		childNode = getChildNodeByName(this.dataBO,name.toUpperCase());
		if(childNode == null||type=="1") {
			
			childNode=this.doc.createElement(name.toUpperCase());
			this.dataBO.appendChild(childNode);
			childNode.appendChild(this.doc.createTextNode(value));
		} else{
			childNode.childNodes[0].nodeValue=value;
		}
		return childNode;
	},
	dictgetDataObj:function(name) {
		var dataObj = null;
		dataObj = new DictDataObj();
		dataObj.doc = this.doc;
		if(arguments.length == 0)//parentNode ==null)
		{		
			dataObj.dataBO = this.dataBO;
		}else {
			var node = this.doc.createElement(name.toUpperCase());
			this.dataBO.appendChild(node);
			dataObj.dataBO = node;
		}
		return dataObj;
	},
	dictgetDataObjCnt:function(name){
		var nodes=this.dataBO.childNodes;
		var iCnt = 0;
		
		for(var i=0;i<nodes.length;i++) {
			var node=nodes[i];
			if(node.nodeName==name.toUpperCase())
				iCnt ++;
			
		}
		return iCnt;
	},
	dictgetDictValue:function(name,idx) {
		var value = null;
		var iCnt = 0;
		
		var nodes = nodes=this.dataBO.childNodes;
		
		for(var i=0;i<nodes.length;i++) {
			var node=nodes[i];
			if(node.nodeName==name.toUpperCase())
				{
					if(iCnt==idx)
					{
						value = new DictDataObj();
						value.doc = this.doc;
						value.dataBO = node;
						break;
					}
					iCnt ++;
				}
			
		}
		
		return value;
	},
	dictgetValue:function(name) {
		var value = null;
		var node = getChildNodeByName(this.dataBO,name.toUpperCase());
		if(node == null)
		{
			if(arguments.length == 1){
				// alert("此变量的值不存在"+name);
				return null;
			}else if (arguments.length == 2){
				return arguments[1];  //返回缺省值
			}
		}
		//check the node has child nodes
		if(checkBO(node)== false)
		{
			if(node.firstChild == null)
				value ="";
			else
				value = node.firstChild.nodeValue;
		}else{
			// create new DictDataObj
			value = new DictDataObj();
			value.doc = this.doc;
			value.dataBO = node;
			
		}
		
		return value;
	},
	getNextNode:function(node){
	    node=typeof node=="string"?document.getElementById(node):node;
	    var nextNode=node.nextSibling;
	    if(!nextNode)return null;
	    if(!document.all){
	        while(true){
	            if(nextNode.nodeType==1){
	                break;
	            }else{
	                if(nextNode.nextSibling){
	                    nextNode=nextNode.nextSibling;
	                }else{
	                    break;
	                }
	            }
	        }
	    }
	    return nextNode;
	}
};

DynamicDictBo = function(parentNode,nodeName){
	this.doc=createXMLObj();
	var node = this.doc.createProcessingInstruction("xml", "version='1.0' encoding='utf-8'");
	node = this.doc.createElement(nodeName);
	this.rootBO = parentNode;
	this.rootBO.appendChild(node);
	this.dataBO = node;
	this.setValue = dictMethod.dictsetValue;
	this.getDataObj = dictMethod.dictgetDataObj;
	this.getValue = dictMethod.dictgetValue;
	this.getDataObjCnt = dictMethod.dictgetDataObjCnt;
	this.getBOValue = dictMethod.dictgetDictValue;
};
DynamicDict = function(serviceName) {
	
	//后台读取时大小写敏感,需要注意,如 zsmart不要写成ZSmart
	this.doc=createXMLObj();
	var node = this.doc.createProcessingInstruction("xml", "version='1.0' encoding='utf-8'");
	this.doc.appendChild(node);
	this.rootBO = this.doc.createElement("zsmart");
	this.doc.appendChild(this.rootBO);
	
	// ServiceName
	node = this.doc.createElement("ServiceName");
	this.rootBO.appendChild(node);
	node.appendChild(this.doc.createTextNode(serviceName));
	
	// type=1
	node = this.doc.createElement("Type");
	this.rootBO.appendChild(node);
	node.appendChild(this.doc.createTextNode("1"));
	
	// BO
	node = this.doc.createElement("Data");
	this.rootBO.appendChild(node);
	this.dataBO = node;
	this.setValue = dictMethod.dictsetValue;
	this.getDataObj = dictMethod.dictgetDataObj;
	this.getValue = dictMethod.dictgetValue;
	this.getDataObjCnt = dictMethod.dictgetDataObjCnt;
	this.getBOValue = dictMethod.dictgetDictValue;
	
	this.error = null;
};
DictDataObj = function(){
	this.dataBO = null;
	this.doc = null;
	this.setValue = dictMethod.dictsetValue;
	this.getDataObj = dictMethod.dictgetDataObj;
	this.getValue = dictMethod.dictgetValue;
	this.getDataObjCnt = dictMethod.dictgetDataObjCnt;
	this.getBOValue = dictMethod.dictgetDictValue;
};

DynamicDict.prototype.loadXml=function(sXml) {
	if(this.rootBO != null)
		this.rootBO.removeChild(this.dataBO);
	this.dataBO=null;
	this.rootBO=null;

	if(Sys.ie)
	{		
		this.doc.loadXML(sXml);
	}else{
		var oParser = new DOMParser();
		this.doc= oParser.parseFromString(sXml, "text/xml");
	}
	if(this.doc != null)
	{
		var zsmartNode = getChildNodeByName(this.doc,"zsmart");
		if(null == zsmartNode) return false;
		var returnNode = getChildNodeByName(zsmartNode,'Return');
		if(null == returnNode) return false;
		var errorCode = returnNode.getAttributeNode("Code").nodeValue;
			if(NaN == parseInt(errorCode) || 0 != parseInt(errorCode)) {
			this.parseError(returnNode);
			return false;
		} else {
			this.rootBO = this.doc.documentElement;
			this.dataBO = getChildNodeByName(this.rootBO,"Data");
			this.error = null;
		}
	}
	return true;
}
/*extended:true every node into an array. false only use arrays and objects when necessary.*/
DynamicDict.prototype.toJson=function(extended) {
	var sXml = this.getXml();
	var json = $.xml2json(sXml,extended);
	if(extended) return json.data[0];
	return json.data;
}
DynamicDict.prototype.getXml=function() {
	var sXml = null;
	
	if(Sys.ie)
	{
		sXml = this.doc.xml ; 
		
	}else{
		var oSerializer=new XMLSerializer();
		 
		sXml =oSerializer.serializeToString(this.doc,"text/xml");
		
	}
	return sXml;

}

DynamicDict.prototype.callAsyncService = function(f,url) {

	var oXMLHttpRequest	= new XMLHttpRequest;
	var sXml = this.getXml();
	var self = this;

	if(arguments.length == 1)
		oXMLHttpRequest.open("POST", SERVICE_URI, true);
	else if(arguments.length == 2)
		oXMLHttpRequest.open("POST", url, true);
	else
		return;
	oXMLHttpRequest.onreadystatechange	=f;
	oXMLHttpRequest.send(sXml);
    return ;//this.getValue("ResultFlag");
}

DynamicDict.prototype.callService = function(url) {

	var oXMLHttpRequest	= new XMLHttpRequest;
	var sXml = this.getXml();
	var self = this;
	
	if(arguments.length == 0)
		oXMLHttpRequest.open("POST", SERVICE_URI, false);
	else 
		oXMLHttpRequest.open("POST", url, false);
	oXMLHttpRequest.onreadystatechange	= function() {
		if (this.readyState == XMLHttpRequest.DONE||this.readyState == XMLHttpRequest.UNSENT) {
			self.loadXml(oXMLHttpRequest.responseText); 
		}
	}
	oXMLHttpRequest.send(sXml);
	if(!this.dataBO) return false;
    //return this.getValue("ResultFlag");
	return true;
}
DynamicDict.prototype.callJSonService = function() {

	var oXMLHttpRequest	= new XMLHttpRequest;
	var sXml = this.getXml();
	var self = this;
	var sRet = null;

	oXMLHttpRequest.open("POST", JSON_SERVICE_XML_URI, false);
	oXMLHttpRequest.onreadystatechange	= function() {
		if (this.readyState == XMLHttpRequest.DONE) {
			sRet  = oXMLHttpRequest.responseText;	
			if(sRet.length>10)
				{
					if(sRet.substring(0,10).indexOf("?xml")>0)
						{
							self.loadXml(sRet);
							
							if(parseInt(self.getValue("ResultFlag"))<1)
								{
								sRet="[]";
								alert(self.getValue("ResultDesc"));
								
								}
						}
				}
		}
	}

	oXMLHttpRequest.send(sXml);
    return sRet;
}
/**
 * 把dict转换成一个JS对象（带有节点名）<br>
 * 此函数在XML的层次越扁平的情况下面效率越高
 * 
 * @param process
 * 		回调函数，原型为：function process(o) {...}<br>
 * 		每完成一个节点到对象的转换触发一次此函数，参数o包含此节点下面的所有元素
 * @param level
 * 		需要转换的层数，如果XML的层次很多，并且当前仅需要转换一层的或者几层的时候，可以设置此值<br>
 * 		如果为空，转换所有节点
 * 
 * @return 返回一个Object对象，此对象对应了XML包的层次结构
 * 
 * @see
 * 		jdo.toObject(function(o) {<br>
 * 			&nbsp;&nbsp;alert(o.ord_no);<br>
 * 		});<br>
 * 
 */
DynamicDict.prototype.toObject = function(process, level) {
	
	var $begin = function(currentNode, process, l) {
		var cursor = currentNode;
		var o = {};
		while(null != cursor) {
			var nodeName = cursor.nodeName.toLocaleLowerCase();
			var nodeValue = "";
			if(cursor.firstChild!=null) 
				nodeValue = cursor.firstChild.nodeValue;
			// if(cursor.hasChildNodes && null != cursor.firstChild) {
			if(cursor.childNodes){
			    if(cursor.childNodes.length>0){
					if(3 == cursor.firstChild.nodeType) {
						o[nodeName] = nodeValue;
					} else {
						if(null == level || undefined == level || level > l) {
							if(typeof o[nodeName] == 'undefined') {
								o[nodeName] = [];
							}
							o[nodeName].push(arguments.callee(cursor.firstChild, process, l + 1));
						}
					}
				}
			} else {
				o[nodeName] = nodeValue;
			}
			
			// cursor = cursor.nextSibling;
			cursor = dictMethod.getNextNode(cursor);
		}
		if(null != process && undefined != process && null != o) process(o, l);

		return o;
	}

	return $begin(this.dataBO.firstChild, process, 0);
}
/**
 * 解析异常包，并填充到DynamicDict的error对象(此函数不对外使用)
 * 
 * @param returnNode
 * 		包含异常信息的DOMDocument对象
 * 
 * @return 无
 * 
 */
DynamicDict.prototype.parseError = function(returnNode) {
	
	var idNode = getChildNodeByName(returnNode,"ID").firstChild;
	var idText = "";
	if(idNode) idText = idNode.nodeValue;
	var timeNode = getChildNodeByName(returnNode,"Time").firstChild;
	var timeText = "";
	if(timeNode) timeText = timeNode.nodeValue;
	var codeNode = getChildNodeByName(returnNode,"Code").firstChild;
	var codeText = "";
	if(codeNode) codeText = codeNode.nodeValue;
	var descNode = getChildNodeByName(returnNode,"Desc").firstChild;
	var descText = "";
	if(descNode) descText = descNode.nodeValue;
	var traceNode = getChildNodeByName(returnNode,"Trace").firstChild;
	var traceText = "";
	if(traceNode) traceText = traceNode.nodeValue;
	
	this.error = {
		ID: idText,
		Time: timeText,
		Type: 0,
		Code: codeText,
		Desc: descText,
		Trace: traceText
	};
	
	var _this = this;
	
	var errorInfo = '调用错误';
	var unknownError = 'UNKNOWN ERROR.';
	
	var errorText = this.error.Trace;
	if('' == this.error.Desc || unknownError == this.error.Desc) {
		if(-1 < errorText.indexOf('errorDesc')) {
			errorText = errorText.substr(errorText.indexOf('errorDesc'));
			errorText = errorText.substr(errorText.indexOf('[') + 1);
			var count = 0;
			for(var i = 0; i < errorText.length; i++) {
				var subStr = errorText.substr(i, 1);
				if('[' == subStr) count++;
				if(']' == subStr) count--;
				if(-1 >= count) {
					this.error.Desc = errorText.substr(0, i);
					break;
				}
			}
		}
	}
	
	if('' == this.error.Desc || unknownError == this.error.Desc) {
		if(-1 < errorText.indexOf('Describing')) {
			errorText = errorText.substr(errorText.indexOf('Describing'));
			errorText = errorText.substr(errorText.indexOf('[') + 1);
			var count = 0;
			for(var i = 0; i < errorText.length; i++) {
				var subStr = errorText.substr(i, 1);
				if('[' == subStr) count++;
				if(']' == subStr) count--;
				if(-1 >= count) {
					this.error.Desc = errorText.substr(0, i);
					break;
				}
			}
		}
	}

	if('' == this.error.Desc || unknownError == this.error.Desc) {
		this.error.Desc = errorInfo;
	}
}
function createXMLObj() {
	
	var oXml =null;
	if (window.ActiveXObject) {
		var arrSignatures = ["MSXML2.DOMDocument.5.0", "MSXML2.DOMDocument.4.0",
		"MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument",
		"Microsoft.XmlDom"];
		for (var i=0; i < arrSignatures.length; i++) {
		try {
		 oXml = new ActiveXObject(arrSignatures[i]);
		
		  } catch (oError) {
		// ignore
		            }
		        }    
		if(oXml == null)
		throw new Error("MSXML is not installed on your system."); 
	
		}
	   else if (document.implementation && document.implementation.createDocument) {
		   oXml = document.implementation.createDocument("","",null);
		    } else {
		    	throw new Error("Your browser doesn't support an XML DOM object.");
		    }
	oXml.async = false;
	oXml.validateOnParse = false;
	oXml.resolveExternals = false;
  return oXml;
}

function getChildNodeByName(parentNode,nodeName) {

	if(!parentNode) return;
	var nodes=parentNode.childNodes;
	var retNode = null;
	
	
	for(var i=0;i<nodes.length;i++) {
		var node=nodes[i];
		if(node.nodeName==nodeName)
		{
		  retNode = node;
	
		  break;
		}
	}
	return retNode;
}
function getChildNodesByName(parentNode,nodeName) {

	var nodes=parentNode.childNodes;

	var childNotes=new Array();
	for(var i=0;i<nodes.length;i++) {
		var node=nodes[i];
		if(node.nodeName==nodeName)
			childNotes[childNotes.length]=node;
		
	}
	return childNotes;
}
function checkBO(node) {

	var nodes=node.childNodes;

	for(var i=0;i<nodes.length;i++) {
		if(nodes[i].nodeType == 1) //element node type 
		{
			
			return true;
		}
		
	}
	return false;
}
