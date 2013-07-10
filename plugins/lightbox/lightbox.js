(function() {
    $.fn.lightBox = function() {
        $body = $("body");
        var _window = window;
      
        if( window !== window.top) {
            _window = window.top
            $body = _window.win.body
        } 

        function removeLightBox() {
            $body.find('.lightBoxMask').fadeTo(300, 0, function() {
                $(this).remove();
            });
            $body.find('.lightBox').fadeTo(100, 0, function() {
                $(this).remove();
            });
        }

        $(this).click(function() {
            $(this).attr('href', 'javascript:;');

            var img = new Image();
            img.src = $(this).children('img').attr('src');

           
            $body.append('<div class="lightBoxMask" style="width:'+$(_window).width()+'px;height:'+$(_window).height()+'px;"></div>')
                     .append('<div class="lightBox" style="width:'+img.width+'px;height:'+img.height+'px;"><div class="lightBoxContainer" style="width:'+img.width+'px;height:'+img.height+'px;"><img src="'+img.src+'" /></div><div class="lightBoxClose">x关闭</div></div>');

            $body.find('.lightBox').css({
                opacity : 0,
                left : ( $(_window).width() - $body.find('.lightBox').width() ) / 2,
                top : ( $(_window).height() - $body.find('.lightBox').height() ) / 2
            }).fadeTo(1000, 1);

            $body.find('.lightBoxClose').click(removeLightBox);
            $body.find('.lightBoxMask').css({opacity : 0}).fadeTo(500, 0.8).click(removeLightBox);
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