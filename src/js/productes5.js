'use strict';

// 基础
$(function () {
    // 放大镜
    var scale = $('.scale'),
        small = $('.small'),
        movebox = $('.movebox'),
        big = $('.big');

    $('.detailpic').on('mouseover', small, function () {
        movebox.removeClass('hide').addClass('show');
        big.removeClass('hide').addClass('show');
        var bigpic = $('.bigpic');
        // 1，计算movebox大小  movebox:small = big:bigpic  movebox:big = small:bigpic

        // . movebox鼠标跟随
        small.on('mousemove', function (ev) {

            var left = ev.pageX - scale.offset().left - movebox.width() / 2;
            var top = ev.pageY - scale.offset().top - movebox.height() / 2;

            // . 比例计算 movebox:small = big:bigpic  movebox:big = small:bigpic
            var prop = bigpic.width() / small.height();
            // console.logbif
            //控制边界
            if (left < 0) {
                left = 0;
            } else if (left > small.width() - movebox.width()) {
                left = small.width() - movebox.width() - 2;
            }
            if (top < 0) {
                top = 0;
            } else if (top > small.height() - movebox.height()) {
                top = small.height() - movebox.height() - 2;
            }

            movebox.css({
                'left': left + 'px',
                'top': top + 'px'
            });

            bigpic.css({
                'left': -left * prop + "px",
                'top': -top * prop + "px"
            });
        });
    });
    $('.detailpic').on('mouseout', small, function () {
        movebox.removeClass('show').addClass('hide');
        big.removeClass('show').addClass('hide');
    });
    // 返回顶部
    $('.return_top').on('click', function () {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    });
    // 切换大图
    $('body').on('mouseenter', '.detailpic>ul>li', function () {
        $(this).addClass('imgst').siblings().removeClass('imgst');
        $('.detailpic_big img').attr("src", $(this).children().children().attr("src"));
        $('.big img').attr("src", $(this).children().children().attr("src"));
    });
    // 商品页面切换
    $('.nav_text>a').on('click', function () {
        $(this).addClass('cur').siblings().removeClass('cur');
        if ($(this).html() === "商品咨询") {
            $('.pro_zixun').removeClass('none').siblings().addClass('none');
        }
        if ($(this).html() === "宝贝详情") {
            $('.pro_info').removeClass('none').siblings('div').addClass('none');
            $('.fix').removeClass('none');
        }
    });
    // 尺寸
    $('.size>ul>li').on('click', function () {
        $(this).addClass('imgst').siblings().removeClass('imgst');
    });
    // 数量
    $('.add').on('click', function () {
        var num = null;
        num = $($('.num>p').children()[1]).val();
        num++;
        $($('.num>p').children()[1]).val(num);
        console.log($($('.num>p').children()[1]).val());
        // if (num >= 1) {
        //     $($('.num>p').children()[1]).val(max);
        // }
    });
    $('.subtract').on('click', function () {
        var num = null;
        num = $($('.num>p').children()[1]).val();
        num--;
        $($('.num>p').children()[1]).val(num);
        if (num <= 1) {
            $($('.num>p').children()[1]).val(1);
        }
    });
    // 获取商品
    $.ajax({
        type: "get",
        url: "../lib/getproductinfo.php",
        data: {
            "id": location.search.slice(4)
        },
        dataType: "json",
        success: function success(response) {
            var pic = $.parseJSON(response.pic);
            // 标题
            var product = $('main');
            var template = '';
            template = '\n                <div class="pos area">\n                    <a href="../html/index.html" target="_blank">\u7279\u5356\u5546\u57CE</a>\n                    <i>&gt;</i>\n                    <a target="_blank" href="javascript:;"> <em class="classification"\n                            data-tagid="3002">\u5973\u88C5</em></a>\n                    <i>&gt;</i>\n                    \u88D9\u88C5\n                    <i>&gt;</i>\n                    ' + response.title + '\n                </div>\n                ';
            product.prepend(template);
            // 大图
            var product = $('.detailpic_big');
            bigpic = '';
            bigpic = '\n                    <img src="' + pic[0].src + '" alt="">\n                ';
            product.prepend(bigpic);
            // 小图
            var product = $('.detailpic>ul');
            smallpic = '';
            pic.forEach(function (elm, i) {
                smallpic = '\n                    <li>\n                        <a href="javascript:;">\n                        <img src="' + elm.src + '" alt="">\n                        </a>\n                    </li>\n                ';
                product.append(smallpic);
            });
            // 放大镜图
            var product = $('.bigpic');
            pics = '';
            pics = '\n                <img src="' + pic[0].src + '">\n                ';
            product.append(pics);
            // 标题
            var product = $('.product_title');
            title = '';
            title = '\n            <h1>\n               ' + response.title + '\n            </h1>\n                ';
            product.append(title);
            // nowprice
            var product = $('.product_price>strong');
            newprice = '';
            newprice = '\n            <i id="new_price"class="nprice">' + response.nowPrice + '</i>\n                ';
            product.append(newprice);
            // oldprice
            var product = $('.product_price>del');
            oldprice = '';
            oldprice = '\n            <i id="old_price">' + response.oldPrice + '</i>\n                ';
            product.append(oldprice);
            // color
            var product = $('.pic');
            color = '';
            color = '\n             <img src="' + pic[0].src + '" alt=""\n              style="width:38px;height:38px;">\n                 ';
            product.append(color);
            // num
            var product = $('.subtract');
            num = '';
            num = '\n            <input type="text" value="1" \n             max="' + response.num + '" id="num">  \n                ';
            product.after(num);
            // 库存
            var product = $('.kucun');
            kucun = '';
            kucun = '\n            <i>' + response.num + '</i>  \n                ';
            product.append(kucun);
            // 商品展示 show
            var product = $('.pro_show');
            smallpic = '';
            pic.forEach(function (elm, i) {
                smallpic = '\n                    <li>\n                        <img src="' + elm.src + '" alt="">\n                    </li>  \n                ';
                product.append(smallpic);
            });
            // 加人
            var product = $('.submit');
            smallpic = '';
            smallpic = '\n                <input type="botton" class="addcart" name="" id="addcart" value="\u52A0\u5165\u8D2D\u7269\u8F66">\n                ';
            product.append(smallpic).find('.addcart').on('click', function () {
                addShopCar(response.id, response.nowPrice, $('#num').val());
            });
            // 修改title标题
            $(document).attr('title', response.title);
        }
    });
    // 购物车
    function addShopCar(id, price, num) {
        var shop = cookie.get('shop');
        var count = cookie.get('count');
        var product = {
            "id": id,
            "price": price,
            "num": num
        };
        if (shop) {
            shop = JSON.parse(shop);
            count = JSON.parse(count);
            if (shop.some(function (elm) {
                return elm.id == id;
            })) {
                shop.forEach(function (elm, i) {
                    elm.id == id ? elm.num = num : null;
                });
            } else {
                count++;
                $('.count').html(count);
                $('.cart_count').html(count);
                shop.push(product);
            }
            cookie.set('count', JSON.stringify(count), 1);
            cookie.set('shop', JSON.stringify(shop), 1);
        } else {
            count = 0;
            count++;
            $('.count').html(count);
            $('.cart_count').html(count);
            shop = [];
            shop.push(product);
            cookie.set('shop', JSON.stringify(shop), 1);
            cookie.set('count', JSON.stringify(count), 1);
        }
    }
    // 购物车的件数
    var count = cookie.get('count');
    if (count) {
        count = JSON.parse(count);
        $('.count').text(count);
        $('.cart_count').text(count);
    }
});
