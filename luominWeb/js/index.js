$(function(){
	$("#back-index").on("click",function(){
		window.location.href='#copy-nav1';
	});
	$("#back-dynamic").on("click",function(){
		window.location.href='#dynamic1';
	});
	$("#back-case").on("click",function(){
		window.location.href='#case1';
	});
	$("#back-business").on("click",function(){
		window.location.href='#business1';
	});
	$("#back-about").on("click",function(){
		window.location.href='#about1';
	});
	$("#back-partner").on("click",function(){
		window.location.href='#cooperation1';
	});
	$("#back-contact").on("click",function(){
		window.location.href='#contact1';
	});
	
	//关于罗岷部分，显示内容的设置
	function showContent(a,c,b){
		a.click(function(){
			var index = $(this).index()-1;
			console.log(index);
			b.eq(index).addClass("active-a").siblings().removeClass("active-a");
			c.removeClass("selected");
			c.eq(index).addClass("selected").siblings().removeClass("selected");
		});
	}
	showContent($(".container #about2 a"),$(".container #about2 a "),$(".content .tab"));
	
	//成功案例部分，显示内容的设置
	showContent($("#suc-case1 .menu a"),$("#suc-case1 .menu a "),$(".content .tab"));
	
	//业务板块部分，显示内容的设置
	showContent($("#bs-suc-case1 .menu a"),$("#bs-suc-case1 .menu a "),$(".content .tab"));

	//显示bs-suc-case1,业务板块部分，隐藏文化传播推广具体内容部分
	$("#business").click(function(){
		$("#bs-suc-case1").show();
		$("#bs-suc-case2").hide();
	});
	$("#business-back").click(function(){
		$("#bs-suc-case1").show();
		$("#bs-suc-case2").hide();
	});
	
	//显示suc-case2,文化传播推广具体内容部分，隐藏业务板块部分
	$("#business-menu1").click(function(){
		$("#bs-suc-case2").removeClass("hidden");
		$("#bs-suc-case2").show();
		$("#bs-suc-case1").hide();
	});
	
	
	
	
	//显示dynamic-1,公司动态的首页内容部分，隐藏公司动态的具体内容部分
	$("#dynamic").click(function(){
		$("#dynamic-1").show();
		$("#dynamic-2").hide();
	});
	$("#dynamic7-2").click(function(){
		$("#dynamic-1").show();
		$("#dynamic-2").hide();
	});
	
	//显示dynamic-2,公司动态的具体内容部分，隐藏公司动态的首页内容部分
	$("#dynamic4").click(function(){
		$("#dynamic-2").removeClass("hidden");
		$("#dynamic-2").show();
		$("#dynamic-1").hide();
	});	
});