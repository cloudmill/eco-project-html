$(function() {
    var site_template_path = "/local/templates/main";

    var go_to_block = function() {
        var href = document.location.href,
            href_splite = href.split('/'),
            href_splite_у = href_splite[href_splite.length - 1].split('#');
            if (href_splite_у[1]) {
                id_block = '#' + href_splite_у[1];
                pointOffset = 0;
                console.log(id_block)
                if (id_block.length > 1) {
                    pointOffset = $(id_block).offset().top;
                }
                if (pointOffset > 0) {
                    $("html, body").scrollTop(0)
                    $("html, body").animate({ scrollTop: pointOffset }, "slow");
                }
            }

    }
    go_to_block();
    $(".side_panel .menu").on("click", function(e) {
        e.preventDefault();
        $(".menu_full").addClass("active");
    });
    $(".menu_full .close_btn").on("click", function(e) {
        e.preventDefault();
        $(".menu_full").removeClass("active");
    });
    $(".job_list .item .name").on("click", function(e) {
        e.preventDefault();
        $(this)
            .parents(".item")
            .toggleClass("active");
    });

    $(".action_city").on("click", function() {
        var city = $(this).attr("data-id");
        $.ajax({
            type: "POST",
            url: site_template_path + "/include/ajax/main/city.php",
            data: {
                city: city
            },
            success: function(a) {
                //console.log(a);
                location.reload();
            }
        });
    });

    $(".steps_list .slides").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        speed: 500,
        fade: true,
        cssEase: "linear"
    });

    $(".years_list_scroll .slider").slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        verticalSwiping: true,
        centerMode: true,
        vertical: true,
        arrows: true,
        dots: false,
        speed: 350,
        fade: false,
        cssEase: "linear"
    });

    $(".steps_list .steps .item").on("click", function() {
        var ind = $(this).index();
        $(".steps_list .slides").slick("slickGoTo", ind);
    });

    $(".steps_list .slides").on("beforeChange", function(
        event,
        slick,
        currentSlide,
        nextSlide
    ) {
        $(".steps_list .steps .item").removeClass("active");
        $(".steps_list .steps .item:eq(" + nextSlide + ")").addClass("active");
    });

    $(".contacts .address").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false
    });

    $(".contacts .maps .city .item").on("click", function() {
        var ind = $(this).index();
        $(".contacts .address").slick("slickGoTo", ind);
    });

    $(".contacts .address").on("beforeChange", function(
        event,
        slick,
        currentSlide,
        nextSlide
    ) {
        $(".contacts .maps .city .item").removeClass("active");
        $(".contacts .maps .city .item:eq(" + nextSlide + ")").addClass("active");
    });

    $(".restor_slider .info").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false
    });
    $(".restor_slider .slider .slides").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false
    });

    $(".restor_slider .slider .next").on("click", function() {
        $(".restor_slider .slider .slides").slick("slickNext");
    });
    $(".restor_slider .slider .prev").on("click", function() {
        $(".restor_slider .slider .slides").slick("slickPrev");
    });

    $(".restor_slider .slider .slides").on("beforeChange", function(
        event,
        slick,
        currentSlide,
        nextSlide
    ) {
        $(".restor_slider .info").slick("slickGoTo", nextSlide);
        $(".restor_slider .slider .arrows .cnt b").html("0" + (nextSlide + 1));
    });

    if ($(".history_list").width()) {
        var canvas = document.getElementsByClassName("line");
        for (i = 0; i < canvas.length; i++) {
            var bezier = canvas[i].getContext("2d");
            bezier.beginPath();
            bezier.strokeStyle = "black";
            x0 = 0;
            y0 = 0;
            height = canvas.height();
            width = canvas.width();
            bezier.moveTo(x0, y0);
            bezier.bezierCurveTo(width, y0, width / 2, height / 2, x0, height);
            bezier.stroke();
        }
    }
    $(".main_slider.page_main .flag .corner").on("click", function() {
        $(this)
            .parent()
            .toggleClass("active");
    });

    $(".side_panel .back button").on("click", function() {
        window.history.back();
    });

    $(".pp_partner").on("click", function() {
        var item = $(this).attr("data-item");
        if (item) {
            $.ajax({
                type: "POST",
                url: site_template_path + "/include/pp/partner.php",
                data: {
                    item: item
                },
                success: function(a) {
                    $.fancybox.close(true);
                    $.fancybox.open(a);
                    $("#service_form input[name=phone]").mask("+7 (000) 000-00-00");
                }
            });
        }
    });

    $(".pp_tender").on("click", function() {
        var type = $(this).attr("data-type");
        $.ajax({
            type: "POST",
            url: site_template_path + "/include/pp/tender.php",
            data: {
                type: type
            },
            success: function(a) {
                $.fancybox.close(true);
                $.fancybox.open(a);
                $("#service_form input[name=phone]").mask("+7 (000) 000-00-00");
            }
        });
    });

    $(".pp_faq").on("click", function() {
        $.ajax({
            type: "POST",
            url: site_template_path + "/include/pp/faq.php",
            success: function(a) {
                $.fancybox.close(true);
                $.fancybox.open(a);
                $("#service_form input[name=phone]").mask("+7 (000) 000-00-00");
            }
        });
    });

    $(".pp_jobs").on("click", function() {
        $.ajax({
            type: "POST",
            url: site_template_path + "/include/pp/jobs.php",
            success: function(a) {
                $.fancybox.close(true);
                $.fancybox.open(a);
                $("#service_form input[name=phone]").mask("+7 (000) 000-00-00");
            }
        });
    });

    let products = null
        cartridge = null,
        dataIds = localStorage.getItem('productsIds') !== null ? localStorage.getItem('productsIds') : '[]',
        productsDataArr = localStorage.getItem('productsData') !== null ? localStorage.getItem('productsData') : '[]';
        productIds = dataIds ? JSON.parse(dataIds) : [],
        productsData = productsDataArr ? JSON.parse(productsDataArr) : [],
        lsProductIds = JSON.parse(localStorage.getItem('productsIds')),
        button = $('.checkout-butt-order-form'),
        resetSelectedItems = $('[data-type=reset-items]');
    
    $('[data-type=select-item]').on('change', function () {
        let blockProducts = $(this).parents('.items'),
            button = blockProducts.find('.checkout-butt-order-form'),
            resetSelectedItems = blockProducts.find('[data-type=reset-items]');
            products = blockProducts.find('[type=checkbox]:checked').map(function () {
                return this.value;
            }).get(),
            id = $(this).attr('data-id');

        if ($(this).prop('checked')) {
            if (productIds.indexOf(id) == -1) {
                productIds.push(id);
            }

            if (productsData.indexOf($(this).val()) == -1) {
                productsData.push($(this).val());
            }

            localStorage.setItem('productsIds', JSON.stringify(productIds)),
                cartridge = blockProducts.find('[type=checkbox]:checked').map(function () {
                    return $(this).attr('data-val-cartridge');
                }).get();
            localStorage.setItem('productsData', JSON.stringify(productsData));
        } else {
            let unsetLsProductsIds = JSON.parse(localStorage.getItem('productsIds')),
                unsetLsProductsData = JSON.parse(localStorage.getItem('productsData'));

            const index = productIds.indexOf(id);
            const indexData = productsData.indexOf($(this).val());

            if (index > -1) {
                productIds.splice(index, 1);
                unsetLsProductsIds.splice(index, 1);
            }

            if (indexData > -1) {
                productsData.splice(indexData, 1);
                unsetLsProductsData.splice(indexData, 1);
            }
            localStorage.setItem('productsIds', JSON.stringify(unsetLsProductsIds));
            localStorage.setItem('productsData', JSON.stringify(unsetLsProductsData));
        }
        let lsProductIds = JSON.parse(localStorage.getItem('productsIds'));

        if (lsProductIds !== null) {
            if (lsProductIds.length != 0) {
                enabledButtonOrder(button);
                resetSelectedItems.fadeIn(550);
            } else if (lsProductIds.length == 0) {
                disabledButtonOrder(button);
                resetSelectedItems.fadeOut(500);
            }
        } else {
            disabledButtonOrder(button);
            resetSelectedItems.hide();
        }
    });

    if (lsProductIds !== null) {
        if (lsProductIds.length != 0) {
            enabledButtonOrder(button);
            resetSelectedItems.fadeIn(550);
        } else if (lsProductIds.length == 0) {
            disabledButtonOrder(button);
            resetSelectedItems.fadeOut(500);
        }
    } else {
        disabledButtonOrder(button);
        resetSelectedItems.hide();
    }

    let getProductIds = localStorage.getItem('productsIds'),
        items = $('[data-type=price-list]').find('[data-type=select-item]');
    if (getProductIds) {
        items.each(function() {
            if (getProductIds.indexOf(this.getAttribute('data-id')) != -1) {
                $(this).attr('checked', true);
                $(this).parents('tr').addClass('tr--active');
            }
        });
    }

    function disabledButtonOrder(i) {
        i.attr('disabled', 'disabled');
        i.css('opacity', '0.6');
        i.css('cursor', 'no-drop');
    }
    
    function enabledButtonOrder(i) {
        i.removeAttr('disabled');
        i.css('opacity', '1');
        i.css('cursor', 'pointer');
    }

    $(".checkout-butt-order-form").on("click", function() {
        $.ajax({
            type: "POST",
            url: site_template_path + "/include/pp/checkout.php",
            success: function(a) {
                $.fancybox.close(true);
                $.fancybox.open(a);
                $("#service_form input[name=phone]").mask("+7 (000) 000-00-00");
                ajaxCheckout();
            }
        });
    })

    $('[data-type=reset-items').on('click', function () {
        localStorage.removeItem('productsIds');
        localStorage.removeItem('productsData');
        location.reload();
    });

    function ajaxCheckout() { 
        $('[data-type=checkout-form-submit]').on('click', function(e) {
            e.preventDefault();

            let form = $(this).parents('[data-type=checkout-form]'),
                name = form.find('input[name=name]').val(),
                phone = form.find('input[name=phone]').val(),
                mail = form.find('input[name=mail]').val(),
                dataProducts = JSON.parse(localStorage.getItem('productsData'));
            
            if (name && phone && mail && dataProducts) {
                $.ajax({
                    type: "POST",
                    url: site_template_path + "/include/ajax/form/to_order.php",
                    data: {
                        name: name,
                        phone: phone,
                        mail: mail,
                        dataProducts: dataProducts,
                        cartridge: cartridge
                    },
                    success: function(a) {
                        $.fancybox.close(true);
                        $.fancybox.open(a);
                        localStorage.removeItem('productsIds');
                        localStorage.removeItem('productsData');
                    }
                });
            }
        });
    }

    $('[data-type=mobile-filter]').on('click', function(e) {
        e.preventDefault();

        let priceBlock = $(this).parents('[data-type=price_list_block]'),
            filterBlock = priceBlock.find('[data-type=filter]');
        filterBlock.show();
    });

    $('[data-type=filter_close]').on('click', function(e) {
        e.preventDefault();

        let priceBlock = $(this).parents('[data-type=price_list_block]'),
            filterBlock = priceBlock.find('[data-type=filter]');
        filterBlock.hide();
    });

    $(".pp_calc").on("click", function() {
        var qty = $(this).attr("data-qty");
        var month = $(this).attr("data-month");
        var type = $(this).attr("data-type");
        $.ajax({
            type: "POST",
            url: site_template_path + "/include/pp/calc.php",
            data: {
                qty: qty,
                month: month,
                type: type
            },
            success: function(a) {
                $.fancybox.close(true);
                $.fancybox.open(a);
                $("#service_form input[name=phone]").mask("+7 (000) 000-00-00");
            }
        });
    });

    $(".calc_type").on("click", function() {
        var type = $(this).attr("data-type");
        var item_id = $(this).data("item-id");
        if (type) {
            $("#calculator input[name=type]").val(type);
            $("#calculator input[name=item_id]").val(item_id);
            $("#calculator").submit();
        }
    });

    $("#service_form input[name=phone]").mask("+7 (000) 000-00-00");

    $(document).on("click", "#service_form .action", function() {
        var mist = 0;
        var name = $("#service_form input[name=name]").val();
        var phone = $("#service_form input[name=phone]").val();
        var mail = $("#service_form input[name=mail]").val();
        var cartridge = $("#service_form input[name=cartridge]").val();
        var company = $("#service_form input[name=company]").val();
        var txt = $("#service_form textarea[name=txt]").val();
        var price_min = $("#service_form input[name=price_min]").val();
        var price_max = $("#service_form input[name=price_max]").val();
        var format = $("#service_form select[name=format]").val();
        var qty = $("#service_form select[name=qty]").val();
        var color = $("#service_form select[name=color]").val();
        var type = $("#service_form input[name=type]").val();
        var agree = "";
        agree = $("#service_form input[name=agree]:checked").val();

        if ($.trim(name)) {
            $("#service_form input[name=name]")
                .parents(".item")
                .removeClass("error");
        } else {
            mist++;
            $("#service_form input[name=name]")
                .parents(".item")
                .addClass("error");
        }

        if ($.trim(phone) && phone.length == 18) {
            $("#service_form input[name=phone]")
                .parents(".item")
                .removeClass("error");
        } else {
            mist++;
            $("#service_form input[name=phone]")
                .parents(".item")
                .addClass("error");
        }

        if ($.trim(agree) == "y") {
            $("#service_form input[name=agree]")
                .parents(".checkbox")
                .removeClass("error");
        } else {
            mist++;
            $("#service_form input[name=agree]")
                .parents(".checkbox")
                .addClass("error");
        }

        if (mist == 0) {
            $.ajax({
                type: "POST",
                url: site_template_path + "/include/ajax/form/service.php",
                data: {
                    name: name,
                    phone: phone,
                    mail: mail,
                    cartridge: cartridge,
                    company: company,
                    txt: txt,
                    price_min: price_min,
                    price_max: price_max,
                    format: format,
                    qty: qty,
                    color: color,
                    type: type
                },
                success: function(a) {
                    $.fancybox.close(true);
                    $.fancybox.open(a);
                }
            });
        }
    });

    $(document).on("click", "#subscribe_form .action", function() {
        var mist = 0;
        var mail = $(this)
            .parents("#subscribe_form")
            .find("input[name=mail]")
            .val();

        if ($.trim(mail)) {
            $(this)
                .parents("#subscribe_form")
                .removeClass("error");
        } else {
            mist++;
            $(this)
                .parents("#subscribe_form")
                .addClass("error");
        }

        if (mist == 0) {
            $.ajax({
                type: "POST",
                url: site_template_path + "/include/ajax/form/subscribe.php",
                data: {
                    mail: mail
                },
                success: function(a) {
                    $.fancybox.close(true);
                    $.fancybox.open(a);
                }
            });
        }
    });

    $("#calculator input[name=qty]").mask("000000000");
    $("#calculator input[name=month]").mask("00000000000");

    $("#calculator .action_finish").on("click", function(e) {
        e.preventDefault();
        var type = $("#calculator input[name=type]").val();
        var qty = $("#calculator input[name=qty]").val();
        var month = $("#calculator input[name=month]").val();
        var mist = 0;
        if (!$.trim("qty") || qty <= 0) {
            mist++;
            $("#calculator input[name=qty]")
                .parents(".item")
                .addClass("error");
        } else {
            $("#calculator input[name=qty]")
                .parents(".item")
                .removeClass("error");
        }
        if (!$.trim("month") || month <= 0) {
            mist++;
            $("#calculator input[name=month]")
                .parents(".item")
                .addClass("error");
        } else {
            $("#calculator input[name=month]")
                .parents(".item")
                .removeClass("error");
        }
        if (mist == 0) {
            $("#calculator").submit();
        }
    });

    $(".top_arrow").on("click", function() {
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    $(".scroll_to").on("click", function() {
        var point = "#" + $(this).attr("data-point");
        var pointOffset = 0;
        if ($(point).width()) {
            pointOffset = $(point).offset().top;
        }
        if (pointOffset > 0) {
            $("html, body").animate({ scrollTop: pointOffset }, "slow");
        }
    });

    $(".order_buy .next button").on("click", function() {
        $(".order_buy .step").addClass("active");
        $(this)
            .parents(".step")
            .removeClass("active");
    });
    $( document ).ready(function() {
        $("#filter input").on("change", function() {
            $("#filter").submit();
        });
    });

    $('[data-toggle="tooltip"]').tooltip();

    lines_to_points();
    var padding = 40;
    if ($(window).width() < 760) padding += 50
    if ($(".years_list_scroll").length > 0)
        fixed_in_block($(".years_list_scroll"), padding);

    $(document).on(
        "click",
        ".years_list_scroll .slider .slick-arrow",
        function(e) {
            slide = $(".years_list_scroll .slider").slick("getSlick").currentSlide;

            if (!no_slide_click) {
                $("html, body").animate({
                        scrollTop: $(".history_list .block .item .year").eq(slide).offset().top - $(".years_list_scroll").height()
                    },
                    "200",
                    function() {
                        no_slide_click = false;
                    }
                );
            }
            no_slide_click = true;

        }
    );

    $('[name=col-one]').on('click', function(){
        console.log('dfjd');
        if ( $(this).prop('checked')){
            $(this).closest('tr').addClass('tr--active');
            console.log($(this).closest('tr'));
        }else{
            $(this).closest('tr').removeClass('tr--active');
        }
    });
    /*  $('.years_list_scroll .slider').on('afterChange',function(){
       no_slide_click = false;
     }) */
});
var no_slide_click = false;
lines_to_points = function() {
    points = $(".main_content .history_list .block .item .point");
    points.after('<canvas class="canvas_line"></canvas>');
    for (i = 0; i < $(".canvas_line").length - 1; i++) {
        var height =
            parseInt(points.eq(i + 1).offset().top) -
            parseInt(points.eq(i).offset().top);
        $(".canvas_line")
            .eq(i)
            .height(height);
    }
    var canvas = document.getElementsByClassName("canvas_line");
    for (i = 0; i < $(".canvas_line").length - 1; i++) {
        var height =
            parseInt(points.eq(i + 1).offset().top) -
            parseInt(points.eq(i).offset().top);
        width = $(".canvas_line")
            .eq(i)
            .width();
        canvas[i].height = height;
        canvas[i].width = width;
        bezier = canvas[i].getContext("2d");
        bezier.beginPath();
        bezier.strokeStyle = "black";
        d = $(window).width() > 759 ? 6 : 0;
        d *= i % 2 == 0 ? 1 : -1;
        n_even = i % 2 == 0 ? 1 : -1;
        duga = $(window).width() > 759 ? 128 : 160;

        bezier.moveTo(width / 2 + d, 0);
        console.log(
            canvas[i].height,
            $(".canvas_line")
            .eq(i)
            .height()
        );
        bezier.bezierCurveTo(
            width / 2 + (height / duga) * 35 * n_even,
            height / 3,
            width / 2 + (height / duga) * 35 * n_even,
            (height / 3) * 2,
            width / 2 - d,
            height
        );
        bezier.lineWidth = 1;
        bezier.stroke();
        bezier.closePath();
    }
};
years_in_history = function(padding, height) {
    var year = $(".history_list .block .item .year"),
        j = -1,
        scroll = $(document).scrollTop();
    for (i = 0; i < year.length; i++) {
        year.eq(i).offset().top;
        if (scroll + height + padding > year.eq(i).offset().top) {
            j = i;
        }
    }
    if (j != -1) $(".years_list_scroll .slider").slick("slickGoTo", j);
};
fixed_in_block = function(el, padding) {
    var parent = el.parent(),
        par_height = parent.height(),
        par_top = parent.offset().top,
        par_left = parent.offset().left,
        el_height = el.height(),
        scroll = $(document).scrollTop();
    if (
        scroll + padding >= par_top &&
        scroll <= par_top + par_height - el_height - padding
    ) {
        el.css("left", par_left);
        el.css("position", "fixed");
        el.css("top", padding);
    }
    if (scroll + padding < par_top) {
        el.css("position", "absolute");
        el.css("left", 0);
        el.css("top", 0);
    }
    if (scroll + el_height > par_top + par_height - padding) {
        el.css("position", "absolute");
        el.css("left", 0);
        el.css("top", par_height - el_height);
    }
    if (!no_slide_click) {
        years_in_history(padding, el_height);
    }
    $(document).on("scroll", function() {
        var el_height = el.height(),
            scroll = $(document).scrollTop();
        if (
            scroll + padding >= par_top &&
            scroll <= par_top + par_height - el_height - padding
        ) {
            el.css("left", par_left);
            el.css("position", "fixed");
            el.css("top", padding);
        }
        if (scroll + padding < par_top) {
            el.css("position", "absolute");
            el.css("left", 0);
            el.css("top", 0);
        }
        if (scroll + el_height > par_top + par_height - padding) {
            el.css("position", "absolute");
            el.css("left", 0);
            el.css("top", par_height - el_height);
        }
        if (!no_slide_click) {
            years_in_history(padding, el_height);
        }
    });

};