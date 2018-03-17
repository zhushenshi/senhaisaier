$(()=>{
    $('[data-toggle=addCart]').hover(function(){
        console.log($(this).children().is(":animated"));
        if(!$(this).children().is(":animated")){
            $(this).children('i.right').animate({left:150},300,()=>{
                $(this).children('span').animate({left:35},200);
                $(this).children('i.left').animate({left:15},200);
            })
        }
    },function(){
        if(!$(this).children().is(":animated")){
            $(this).children('i.left').animate({left:-15},300,()=>{
                $(this).children('span').animate({left:15},200);
                $(this).children('i.right').animate({left:110},200);
            })
        }
    });
//商品小图片的左右箭头事件
    var $aBackward=$("[data-toggle=btn]>li.left>a");//向左箭头
    var $aForward=$("[data-toggle=btn]>li.right>a");//右箭头
    var LIWIDTH=100,OFFSET=20,moved=0;
    var $ul=$("[data-toggle=smBox]");
    if($ul.children().length>4){
        $("[data-toggle=btn]").show();
    };
    function move(i){
        moved+=i;
        $ul.css({left:(LIWIDTH+OFFSET)*moved});
    }
    function checkA(){
        if(moved==0){
            $aForward.addClass("disabled");
            $aBackward.removeClass("disabled");
        }else if($ul.children().length+moved==4){
            $aBackward.addClass("disabled");
            $aForward.removeClass("disabled");
        }else{
            $aForward.removeClass("disabled");
            $aBackward.removeClass("disabled");
        }
    };
    $aBackward.click(()=>{
        move(-1);
        checkA();
    });
    $aForward.click(()=>{
        move(1);
        checkA();
    });
    //小图对应大图
    // console.log($ul.children('li'));
    $ul.on("mouseover","img",function(){
        // console.log($(this).data('md'));
        $mask.next().attr({src:$(this).data('md')});
    });








//商品图片的放大镜功能
var $box=$("[data-toggle=box]");
var $mask=$("[data-toggle=mask]");
var $large=$("[data-toggle=large]");
    $box.hover(function(){
        // console.log(this);
         $large.toggle();
         $mask.toggle();
         //设置large的图为相对应的图片
        var url=$box.prev().attr("src");
        // console.log($box.prev().attr("src"));
         $large.css({backgroundImage:"url("+url+")"});

    });
    $box.mousemove((e)=>{
        // console.log(e.target);
        var offsetX=e.offsetX, offsetY=e.offsetY;
         var top=offsetY-215/2,
             left=offsetX-215/2;
        top=top<0?0:top>537-215?537-215:top;
        left=left<0?0:left>537-215?537-215:left;
        $mask.css({top:top,left:left});
         $large[0].style.backgroundPosition=
            -left*(1000-500)/(537-215)+"px "+(-top*(1000-500)/(537-215))+"px";
    });

    //加减
    $("#btn>a").click(function(){
        console.log(this);
        var $input=$(this).parent().prev().children("input");
        var $jifen=$(this).parent().parent().prev().children("span");
        var num=parseInt($input.val());
        var jifen=parseInt($jifen.html())/num;
        if($(this).html()=="＋")
            num+=1;
        else
            num--;
        if(num<1)
            num=1;
        $input.val(num);
        $jifen.html(jifen*num);

    });


    //产品详情的tab页面
    $("[data-toggle=infoTab]").on("click","a",function(e){
      $(this).parent().siblings().addClass("info-line")
          .children().children("span").hide()
          .next().css({width:0});
            $(this).css({color:"#0085bf"})
                .parent().siblings().children("a").css({color:"#000"});

      //;
        var index=$("[data-toggle=infoTab]>li").index($(this).parent());
        var $tar=$($("[data-toggle=infoDetail]>li")[index+1]);
        $tar.show();
        $tar.siblings(":not(':first-child')").hide();



        // console.log($(this).parent().siblings(":not(:has('.info-line'))"));
        $(this).parent().removeClass("info-line");
        $(this).children("i").addClass("line")
            .animate({width:194},300);
        $(this).children("span").show();


    })


})