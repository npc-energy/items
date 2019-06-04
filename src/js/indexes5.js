'use strict';

// 轮播
(function ($) {
    $.fn.extend({
        slider: function slider(options) {
            var main = null,
                //主函数
            that = this,
                //保存上下文环境
            init = null,
                //初始化
            stop = null,
                //停止
            start = null,
                //开始
            next = null,
                //下一张
            prev = null,
                //上一张
            timer = null,
                //计时器
            elems = {},
                //命名空间，用于选取元素
            defaults = {
                speed: 600, //动画时间
                delay: 5000 //展示时间
            };
            options = $.extend(defaults, options); //合并参数

            // 1. 初始化
            init = function init() {
                elems._index = 1; //初始播放第一张
                elems.sliderDiv = that.children('div'); //选择需要移动的div元素
                elems.btn = that.children('span'); //选择按钮
                elems.sliderDiv.append(elems.sliderDiv.children('img').first().clone());
                elems.sliderUl = that.children('ul');
                elems.sliderLi = elems.sliderUl.children('li');
                //所有的li
                elems.btn.on('click', function () {
                    if (elems.btn.index($(this))) {
                        next();
                    } else {
                        prev();
                    }
                });

                that.hover(function () {
                    stop();
                }, function () {
                    timer = setInterval(start.bind(null, 1), options.delay + options.speed);
                });
            };

            // 2. 开始动画
            start = function start(fx) {
                var t = "-=951px";
                if (!fx) {
                    t = "+=951px";
                    if (elems._index <= 1) {
                        var divLeft = that.offset().left,
                            imgLeft = elems.sliderDiv.children('img').last().offset().left;
                        elems._index = 6;
                        elems.sliderDiv.css('left', '-' + (imgLeft - divLeft) + 'px');
                    }
                }

                elems.sliderDiv.animate({ left: t }, options.speed, function () {
                    if (fx) {
                        elems._index++;
                        $(elems.sliderLi[elems._index - 1]).addClass('selected').siblings().removeClass('selected');
                    } else {
                        elems._index--;
                        $(elems.sliderLi[elems._index - 2]).addClass('selected').siblings().removeClass('selected');
                    }

                    if (elems._index === 6) {
                        elems._index = 1;
                        elems.sliderDiv.css('left', 0);
                        $(elems.sliderLi[0]).addClass('selected').siblings().removeClass('selected');
                    }
                });
            };

            // 3. 上一张
            prev = function prev() {
                stop();
                start(0);
            };
            // 4. 下一张
            next = function next() {
                stop();
                start(1);
            };

            // 5. 停止
            stop = function stop() {
                elems.sliderDiv.stop(true, true);
                clearInterval(timer);
            };
            main = function main() {
                init();
                timer = setInterval(start.bind(null, 1), options.delay + options.speed);
            };

            main();
        }
    });
})(jQuery);

$(function () {
    // 返回顶部
    $('.return_top').on('click', function () {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    });
    // 品牌精选
    $('.brand_right>em').on('click', function () {
        $(this).addClass('show').siblings().removeClass('show');
    });
    // 限时秒杀
    $('.flash_right>em').on('click', function () {
        $(this).addClass('show').siblings().removeClass('show');
    });
    // 今日已更新
    $('.right>em').on('click', function () {
        $(this).addClass('show').siblings().removeClass('show');
    });
    //  侧边栏
    $('.gender>div>i').on('click', function () {
        $(this).addClass('change').siblings().removeClass('change');
    });
    //轮播      
    $(function () {
        $('.banner').slider();
    });
    // 轮播点击
    $('.sld-ft-nav>li').on('mouseenter', function () {
        var t = null,
            defaults = {
            speed: 600 //动画时间
        };
        $(this).addClass('selected').siblings().removeClass('selected');
        t = -$(this).index() * 951 + "px";
        $('.banner>div').animate({ left: t }, defaults.speed);
    });
    // 获取商品
    $.ajax({
        type: "get",
        url: "../lib/getproduct.php",
        dataType: "json",
        success: function success(response) {
            var product = $('.product');
            var template = '';
            response.forEach(function (elm, i) {
                var pic = $.parseJSON(elm.pic);
                template = '<div class="con">\n                        <a href="products.html?id=' + elm.id + '"> \n                            <img src="' + pic[0].src + '" alt="">\n                        </a>\n                        <div class="title_time">\n                            <a href="javascript:;">' + elm.title + '</a>\n                            <span class="remain_time">\u5269\u4F596\u5929</span>\n                        </div>\n                        <div class="coupon_collect">\n                            <span class="coupon">\u6EE12\u4EF66.5\u6298</span>\n                            <span class="brand_fav">\u6536\u85CF\u54C1\u724C</span>\n                        </div>\n                    </div>\n                ';
                product.append(template);
            });
        }
    });
    // 购物车的件数
    var count = cookie.get('count');
    if (count) {
        count = JSON.parse(count);
        $('.count').text(count);
        $('.cart_count').text(count);
    }
});
