'use strict';

$(function () {
    // 购物车的件数
    var count = cookie.get('count');
    if (count) {
        count = JSON.parse(count);
        $('.count').text(count);
    }
    // 购物车内容
    var shop = cookie.get('shop');
    if (shop) {
        shop = JSON.parse(shop);
        var idList = shop.map(function (elm) {
            return elm.id;
        }).join();
        $.ajax({
            type: "get",
            url: "../lib/cart.php",
            data: {
                "idList": idList
            },
            dataType: "json",
            success: function success(response) {
                var template = "";
                var sum = null;
                response.forEach(function (elm) {
                    var pic = JSON.parse(elm.pic);
                    var arr = shop.filter(function (val, i) {
                        return val.id === elm.id;
                    });
                    template = ' <tr id=' + elm.id + '>\n                        <td>\n                            <span>\n                                <input type="checkbox">\n                            </span>\n                        </td>\n                        <td class="products">\n                            <img src="' + pic[0].src + '" alt="">\n                            <h3>\n                                <i> ' + elm.title + '</i>\n                            </h3>\n                            <div data-prop="sku-desc">\u5C3A\u7801: S</div>\n                        </td>\n                        <td class="price">\n                            <p><i data-price="unit">' + elm.nowPrice + '</i></p>\n                            <p><del data-price="original">' + elm.oldPrice + '</del>\n                            </p>\n                        </td>\n                        <td class="number">\n                            <p>\n                                <i class=" no-drop cart-count-sub" id=' + elm.id + '>-</i>\n                                <input type="text" name="count" class="num" value="' + arr[0].num + '" min="1" max="' + elm.num + '" id=' + elm.id + '>\n                                <i class="increase cart-count-add" id=' + elm.id + '>+</i>\n                            </p>\n                        </td>\n                        <td class="money sum">\n                            <div data-oldprice=' + elm.oldPrice + '\n                            data-newprice=' + elm.nowPrice + ' class="mon">' + arr[0].price + '</div>\n                        </td>\n                        <td class="operation">\n                            <span id=' + elm.id + ' class="detele">\u5220\u9664</span>\n                            <span>\u79FB\u5165\u6536\u85CF</span>\n                        </td>\n                    </tr>';
                    $('.cart_table').append(template);
                });
            }
        });
    }
});
$(function () {
    // 全选
    $('#headAll').on('click', function () {
        $('input').attr('checked', 'checked');
    });
    $('#footAll').on('click', function () {
        $('input').attr('checked', 'checked');
    });
    // 购物车删除
    $('body').on('click', '.detele', function () {
        var shop = cookie.get('shop');
        var count = cookie.get('count');
        var id = null;
        shop = JSON.parse(shop);
        id = $(this).attr("id");
        shop.map(function (elm, i) {
            if (elm.id === id) {
                shop.splice(i, 1);
            }
        });
        if (shop) {
            count--;
            $('.count').html(count);
            cookie.set('count', JSON.stringify(count), 1);
            cookie.set('shop', JSON.stringify(shop), 1);
            location.reload();
        }
    });
    // 增加
    $('body').on('click', '.cart-count-add', function () {
        var shop = cookie.get('shop');
        var id = null,
            num = null,
            max = null,
            price = null,
            val = null,
            elms = null,
            sum = null;
        shop = JSON.parse(shop);
        id = $(this).attr("id");
        $('.cart_table').children().map(function (i, elm) {
            if ($(elm).attr("id") == id) {
                elms = elm;
                // console.log(elms);
                return elms;
            }
        });
        max = $(elms).children('.number').children().children('input').attr("max");
        console.log(max);
        price = $(elms).children('.sum').children('div').attr("data-newprice");
        console.log(price);
        // num = $(elms).children('.number').children().children('.num').attr("value");
        shop.map(function (elm, i) {
            if (elm.id === id) {
                num = shop[i].num;
            }
        });
        num = parseInt(num) + 1;
        console.log(num);
        sum = num * price;
        if (num >= max) {
            num = max;
            sum = num * price;
        }
        $(elms).children('.number').children().children('.num').val(num);
        $(elms).children('.sum').children('.mon').html(sum);
        shop.map(function (elm, i) {
            if (elm.id === id) {
                shop[i].num = num;
                shop[i].price = sum;
            }
        });
        if (shop) {
            cookie.set('shop', JSON.stringify(shop), 1);
        }
    });
    // 删除
    $('body').on('click', '.cart-count-sub', function () {
        console.log(1);
        var shop = cookie.get('shop');
        var id = null,
            num = null,
            max = null,
            price = null,
            val = null,
            elms = null,
            sum = null;
        shop = JSON.parse(shop);
        id = $(this).attr("id");
        $('.cart_table').children().map(function (i, elm) {
            if ($(elm).attr("id") == id) {
                elms = elm;
                // console.log(elms);
                return elms;
            }
        });
        max = $(elms).children('.number').children().children('input').attr("max");
        console.log(max);
        price = $(elms).children('.sum').children('div').attr("data-newprice");
        console.log(price);
        // num = $(elms).children('.number').children().children('.num').attr("value");
        shop.map(function (elm, i) {
            if (elm.id === id) {
                num = shop[i].num;
            }
        });
        num = parseInt(num) - 1;
        console.log(num);
        sum = num * price;
        if (num <= 1) {
            num = 1;
            sum = price;
        }
        $(elms).children('.number').children().children('.num').val(num);
        $(elms).children('.sum').children('.mon').html(sum);
        shop.map(function (elm, i) {
            if (elm.id === id) {
                shop[i].num = num;
                shop[i].price = sum;
            }
        });
        if (shop) {
            cookie.set('shop', JSON.stringify(shop), 1);
        }
    });
});
