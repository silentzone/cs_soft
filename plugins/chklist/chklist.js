// 多选
$.fn.extend({  
   //arr 为select 的 option 
   // input value 为 设置默认选中

   checklist:  function (arr,opt) {
        $node = this;
        if(!$node) { console.log(this + " undefinde checklist"); return; }
        var api = {
            checkedAll : null,
            unchecked : null,
            onchecked : null,
            setChecked :null
        };

        $node.css({ position: "relative"});
        var $content = $node.find(".ipt");
        var _val = $content.attr("value");
        var chkList = _val ? _val.split(",") : 0;

        var $btn = $node.find(".btn");
        var $hideipt = $("<input type='hidden' />");
        
        $hideipt.attr("name",$content.attr("name"));
        var addlab = function () {
            var labstr = "";
            $content.find("span").each( function () {
               labstr += $(this).attr("value") + ",";  
            });
            // 清除最后一个标点符号 
            var str = labstr.substring(0 ,labstr.length-1)
            $hideipt.val(str);
            // alert($hideipt.val());
        }
        $content.removeAttr("name");
        $node.append($hideipt);
     
        var list = (function() {
            //create 
            var $chklist = $("<ul class='chklist' />");
            for(var i =0; i<arr.length; i++) {
                var $item = $("<li />");
                var $inneript = $("<input type='checkbox' />");
                $inneript.val(arr[i].value);
                $inneript.attr("title",arr[i].key);
                var $label = $("<label class='checkbox inline' />");

                // checkbox 绑定事件 
                $inneript.bind("change",function () {
                    if($(this).attr('checked') == "checked") { 
                        // 往$ipt 中填入标签 <span class="label label-info">工具类</span>    
                        var $span = $("<span class='label label-info' />");
                        $span.attr("value",$(this).val()).html($(this).attr("title"));
                        $content.append($span);
 
                        // $hideipt 
                    } else {
                        var that = $(this);
                        $content.find("span").each(function () {
                            if($(this).attr("value") == that.val()) {
                                $(this).remove();
                            }
                        })
                    }
                    // 触发写入隐藏域的方法
                    addlab();
                });

                $label.append($inneript).append(arr[i].key);
                $item.append($label); 
                $chklist.append($item);
                 //根据 chkList 设置默认选中
                for(var j=0; j<chkList.length; j++) { 
                    if(arr[i].value == chkList[j]) {
                        // alert(arr[i].value);
                         $inneript.attr("checked","checked");
                         $inneript.trigger('change');
                    }   
                }
            }  

            //
            btnPos = $btn.position();
            
            $chklist.css({ top : ( btnPos.top + 35 ), left : btnPos.left , position: "absolute" }); 
            $node.append($chklist);
            $chklist.hide(); 

            return $chklist;
        })();
        $btn.click(function () {
            list.toggle();
        });
        api.checkedAll = function () {
            list.find("input[type='checkbox']").each(function () {
                $(this).attr("checked","checked");
                $(this).trigger('change');   
            });
        };
        api.unchecked = function (val) {
            list.find("input[type='checkbox']").each(function () {
               if($(this).attr("value") == val ) {
                // 测试点1 是否需要 remove  多浏览器中 
                // 测试点2  change  在checked 状态不变情况下  重复调用情况下 是否触发 
                    $(this).removeAttr("checked");
                    $(this).trigger('change'); 
                } 
            });
        };
        api.onchecked = function (fn) {
            list.find("input[type='checkbox']").on("change",function () {
                fn($(this));
            }) 
        };
        api.setChecked = function (val,idx) {
            list.find("input[type='checkbox']").each(function (index) {
               if($(this).attr("value") == val || index == idx ) {
                // 测试点1 是否需要 remove  多浏览器中 
                // 测试点2  change  在checked 状态不变情况下  重复调用情况下 是否触发 
                    $(this).attr("checked","checked");
                    $(this).trigger('change');  
                } 
            });

        }


        return api;
    }

});
    