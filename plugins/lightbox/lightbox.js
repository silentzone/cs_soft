(function() {
    $.fn.lightBox = function() {
        $body = $("body");
        var _window = window;
        // iframe 中则冒泡到父窗口中 
        if( window !== window.top) {
            _window = window.top
            $body = $(_window.document.body)
        } 
        var winWidth = $(_window).width();
        var winHeight = $(_window).height();
        // var self = {};
       var lightBoxMask,lightBox;

        function removeLightBox() {
            lightBoxMask.fadeTo(300, 0, function() {
                $(this).remove();
            });
            lightBox.fadeTo(100, 0, function() {
                $(this).remove();
            });
        }

        $(this).click(function() {
            $(this).attr('href', 'javascript:;');

            var img = new Image();
            img.src = $(this).children('img').attr('src');

           
            $body.append('<div class="lightBoxMask" style="width:'+winWidth+'px;height:'+winHeight+'px;"></div>')
                     .append('<div class="lightBox" style="width:'+img.width+'px;height:'+img.height+'px;"><div class="lightBoxContainer" style="width:'+img.width+'px;height:'+img.height+'px;"><img src="'+img.src+'" /></div><div class="lightBoxClose">x关闭</div></div>');

            lightBoxMask = $body.find('.lightBoxMask');
            lightBox = $body.find('.lightBox');
           
            lightBox.css({
                opacity : 0,
                left : ( winWidth - lightBox.width() ) / 2,
                top : ( winHeight - lightBox.height() ) / 2
            }).fadeTo(1000, 1);

            $body.find('.lightBoxClose').click(removeLightBox);
            lightBoxMask.css({opacity : 0}).fadeTo(500, 0.8).click(removeLightBox);
        });

        $(_window).resize(function(){
            $body.find('.lightBoxMask').css({
                width : $(_window).width(),
                height : $(_window).height()
            });

            $body.find('.lightBox').css({
                left : ( $(_window).width() - $body.find('.lightBox').width() ) / 2,
                top : ( $(_window).height() - $body.find('.lightBox').height() ) / 2
            });
            // alert(" left :" + ( $(_window).width() - $('.lightBox').width() ) / 2);
        });
    };
})();