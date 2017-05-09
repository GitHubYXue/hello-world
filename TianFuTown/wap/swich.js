/**
 * Created by Administrator on 2016/8/13 0013.
 */

angular.module("app", ['ionic']).controller('Ctrl', function ($scope) {
});
jQuery(function () {
    var school_list=jQuery(".top_82");
    school_list.first().addClass("show");
    var nav_li=jQuery(".nav_li ul li");
    nav_li.first().addClass("on");
    var width = jQuery(nav_li).first().outerWidth();
    var left = jQuery(nav_li).first().position().left;
    jQuery(".line").css({width: width, left: left});
    // alert(width+'+'+ left);
    jQuery(nav_li).click(function (){
        var listwidth=school_list.width();
        //  alert(listwidth);
        school_list.removeClass('show');
        jQuery(this).addClass("on").siblings().removeClass("on");
        var _index=jQuery(this).index();
        var width = jQuery(this).outerWidth();
        var left = jQuery(this).position().left;
        jQuery(".line").stop().animate({width: width, left: left});
        school_list.eq(_index).addClass('show');
    })
})
