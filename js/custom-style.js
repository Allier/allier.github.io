/*jQuery(document).ready(function($) {
    var canvas=$('<div id="mystyle-wrapper"><div id="mystyle"><canvas id="color-palet" width="160" height="160"></canvas><div id="canvas-setting"></div></div><div id="canvas-bg"></div></div>').appendTo('body');
    $('#canvas-setting').html('<div id="buttons-container"><i class="style-icon"></i><div class="close-icon">×</div></div>');
    drawCanvas(); 
    animateCanvas();

    function drawCanvas(){
        var canvas = oCanvas.create({
            canvas: "#color-palet",
            background:'none',
            fps: 60
        });
        var style=['#D0482B','#d02b98','#4ed02b','#2bced0','#d02b2b','#d8c124','#8c2bd0','#e64f7e'];
        var data = [12.5,12.5, 12.5,12.5,12.5,12.5,12.5,12.5];
        var colors=['']

        var prototype = canvas.display.arc({
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: 70,
            pieSection: true
        });

        var pieces = [], end, lastEnd;
        for (var i = 0; i < data.length; i++) {

            end = (i > 0 ? lastEnd : 0) + 360 / (100 / data[i]) - (i < 1 ? 90 : 0);
            pieces.push(prototype.clone({
                start: (i < 1 ? -90 : lastEnd),
                end: end,
                fill: style[i]
            }));

            canvas.addChild(pieces[i]);
            lastEnd = end;

            pieces[i]._start = pieces[i].start;
            pieces[i]._end = pieces[i].end;

            pieces[i].bind("mouseenter touchenter", function () {
                this.stop(0,0).animate({radius:80},300);
                canvas.redraw();
            }).bind("mouseleave touchleave", function () {
                this.stop(0,0).animate({radius:70},300);
                canvas.redraw();
            }).bind("click tap", function () {
               injectStyle(this.fill);
            });
        }

    }

    function animateCanvas(){
        var container=$('#mystyle-wrapper'),
            canvas=$('#color-palet'),
            canvasBg=$('#canvas-bg'),
            canvasSetting=$("#canvas-setting"),
            styleIcon=canvasSetting.find('.style-icon'),
            closeIcon=canvasSetting.find('.close-icon'),
            paletAnimation= new TimelineLite({paused: true});
        paletAnimation
        .to(container,0.3,{left:0})
        .from(canvas,0.3,{scaleX: 0, scaleY: 0, opacity: 0},'-=0.3')

        var iconAnimation=new TimelineLite({paused: true});
        iconAnimation
        .to(styleIcon,0.3,{scaleX:0, scaleY:0, opacity: 0})
        .from(closeIcon,0.3,{scaleX:1.5, scaleY:1.5, opacity: 0},'-=0.2');

        canvasSetting.toggle(function() {
               paletAnimation.play();
               iconAnimation.play();
            }, function() {
              paletAnimation.reverse();
              iconAnimation.reverse();
            });
    }
    function injectStyle(color){
        var styleName,
            targetLink=$('#theme-style');
        switch(color){
            case '#D0482B':
            styleName='default';
            break
            case '#d02b98':
            styleName='purple';
            break
            case '#d02b2b':
            styleName='red';
            break
            case '#4ed02b':
            styleName='green';
            break
            case '#d8c124':
            styleName='yellow';
            break
            case '#2bced0':
            styleName='cyan';
            break
            case '#e64f7e':
            styleName='pink';
            break
            case '#8c2bd0':
            styleName='blue';
            break
        }
        var stylePath='css/styles/'+styleName+'.css';
        targetLink.attr('href',stylePath);
    }

});

*/

/*

   $('<div class="style-container">'+
        '<h4>Color styles</h4>'+
        '<ul class="pre-styles">'+
        '<li class="default"></li>'+
        '<li class="purple"></li>'+
        '<li class="red"></li>'+
        '<li class="green"></li>'+
        '<li class="orange"></li>'+
        '<li class="amber"></li>'+
        '<li class="gray"></li>'+
        '<li class="pink"></li>'+
        '</ul>'+
        '<div id="demo-custom"><i class="icon-cogs"></i></div>'+
        '</div>').appendTo('body');  
    $(".style-container li").click(function(){
        var selected = $(this).attr('class'),
            style='css/styles/'+selected+'.css';
        $('#theme-style').attr('href',style);
        return false;
    });
    $(".style-container").stop().delay(3000).animate({left:'-222px'},500);
    $("#demo-custom").click(function(){
        if($(".style-container").css('left') == '0px'){
            $(".style-container").stop().animate({left:'-222px'},300);
        }
        if($(".style-container").css('left') == '-222px'){
            $(".style-container").stop().animate({left:'0px'},300);
        }
    }); */