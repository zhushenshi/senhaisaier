$(()=>{
	//轮播图效果
	var moved=1;
    var timer=null;
	function move(){
		var width=$("[data-toogle=banner]>li")[0].clientWidth;
		$("[data-toogle=banner]").animate({
			left:-width*moved
		},1000,()=>{
            if(moved>=5){
            	moved=1;
                $("[data-toogle=banner]").css({left:-width});
			}else if(moved<=0){
				moved=4
                 $("[data-toogle=banner]").css({left:-4*width});
				console.log(moved);
			}
            // console.log($("[data-toogle=banner]>li")[0].clientWidth);

		})
	};
	console.log($("[data-toggle=banner-left]"));
	$("[data-toggle=banner-left]").click(()=>{
		if(!$("[data-toogle=banner]").is(":animated")){
            moved++;
            move();
		}
	});
	$("[data-toggle=banner-right]").click(()=>{
        if(!$("[data-toogle=banner]").is(":animated")){
            moved--;
            move();
        }
	});
	timer=setInterval(()=>{
		moved++;
		move();
	},2000);
	$('.banner').hover(()=>{
		clearInterval(timer);
		//按钮显示
        $("[data-toggle=banner-right]").show();
        $("[data-toggle=banner-left]").show();
	},()=>{
        timer=setInterval(()=>{
            moved++;
            move();
        },2000);
        $("[data-toggle=banner-right]").hide();
        $("[data-toggle=banner-left]").hide();
	});
	//楼层1，2的商品hover事件
	$("[data-toggle=hover]").hover(
		function(e){
			$(this).children("div.list-up").show();
			$(this).children("div.list-bottom").css({"bottom":"-94px"})
		},
		function(e){
			$(this).children("div.list-up").hide();
			$(this).children("div.list-bottom").css({"bottom":"0"})
		}
	);
//3楼商品列表轮播展示
		//左右箭头hover事件
	$("[data-toogle=small-show]").hover(function(){
		$(this).children().children(".product-show>a").toggle(200);
	})

		function prevList(){
			liArr.unshift(LiArr[3]);
			liArr.pop();
				$("[data-toggle=move]>li").each(function(i,e){
					$(e).removeClass().addClass(liArr[i]);
				})
	}
	//绑定事件
	var liArr=[];
	$("[data-toggle=small-left]").click(function(e){
		e.preventDefault();
		$li=$(this).next().next().find("a>ul>li");
			liArr=[];
			$li.each(function(i,e){
				console.log($(e).attr('class'));
				liArr.push($(e).attr('class'));
			})
			liArr.push(liArr[0]);
			liArr.shift();
			$li.each(function(i,e){
				$(e).removeClass().addClass(liArr[i]);
			})
	});
	$("[data-toggle=small-right]").click(function(e){
		e.preventDefault();
		$li=$(this).next().find("a>ul>li");
		liArr=[];
		$li.each(function(i,e){
			console.log($(e).attr('class'));
			liArr.push($(e).attr('class'));
		})
		liArr.unshift(liArr[3]);
		liArr.pop();
			$li.each(function(i,e){
				$(e).removeClass().addClass(liArr[i]);
			})
	});
	//楼层滚动
    $(window).scroll(()=>{
        var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        var $f1=$(".floor:first");
        var offsetTop=$f1.offset().top;
        if(offsetTop<=scrollTop+innerHeight/2){
            $("#lift").show();
        }else{
            $("#lift").hide();
        }

        var $floors=$(".floor");
        for(var i=0;i<$floors.length;i++){
            var $f=$($floors[i]);
            if($f.offset().top>scrollTop+innerHeight/2){
                break;
            }
        }
        //	console.log(i);
        $(`#lift>ul>li:eq(${i-1})`).addClass("lift_item_on")
            .siblings().removeClass("lift_item_on")
    });
    $("#lift>ul").on("click","a.lift_btn",function(){
        var $a=$(this);
        var i=$a.parent().index();
        var offsetTop=$(`.floor:eq(${i})`).offset().top;
        $("html").stop(true).animate({
            scrollTop:offsetTop-50
        },500)
    });
	$('#return_top').click(()=>{
    	console.log('返回顶部');
        $("html").stop(true).animate({
            scrollTop:0
        },500)
	})
})
