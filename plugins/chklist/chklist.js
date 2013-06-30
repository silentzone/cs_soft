// 多选
$.fn.extend({  

   checklist:  function (arr,opt) {
        $node = this;
        if(!$node) { console.log(this + " undefinde checklist"); return; } 

        $node.css({ position: "relative"});
        var $content = $node.find(".ipt");
        var _val = $content.attr("value");
        var chkList =  _val.split(",");

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
                        alert(arr[i].value);
                         $inneript.attr("checked","checked");
                         $inneript.trigger('change');
                    }
                      
                }
            }  

            $chklist.css({ top : 35 , left : 205 }); 
            $node.append($chklist);
            $chklist.hide();



            return $chklist;
        })();
        $btn.click(function () {
            list.toggle();
        });
    }

});
    