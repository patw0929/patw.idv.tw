/*jslint browser: true*/
/*global $, jQuery*/

// ==== Google Analytics ===============================================================================
var SetGAEvent = function (category, action) {
    "use strict";

    _gaq.push(['_trackEvent', category, action]);
};
// ==== Google Analytics ===============================================================================

var flag = 0,
    anchor = window.location.hash.substring(2),
    _baseURL = "";

var changeMenuButton = function (n) {
    "use strict";

    $("#nav1, #nav2, #nav3, #nav5").removeClass("on");

    switch (n) {
    case "home":
        $("#nav1").addClass("on");
        break;

    case "about":
        $("#nav2").addClass("on");
        break;

    case "portfolio":
        $("#nav3").addClass("on");
        break;

    case "contact":
        $("#nav5").addClass("on");
        break;
    }
};

var bindContactGA = function () {
    "use strict";

    $('#contact_info').on('click', 'a', function (e) {

        var anchorClass = $(this).attr('class');

        switch(anchorClass) {
        case 'email':
            SetGAEvent('OutLink', 'E-mail');
            break;

        case 'blog':
            SetGAEvent('OutLink', 'Blog');
            break;

        case 'linkedin':
            SetGAEvent('OutLink', 'Linkedin');
            break;

        case 'flickr':
            SetGAEvent('OutLink', 'Flickr');
            break;

        case 'googleplus':
            SetGAEvent('OutLink', 'GooglePlus');
            break;

        case 'github':
            SetGAEvent('OutLink', 'Github');
            break;

        case 'bbs':
            SetGAEvent('OutLink', 'BBS');
            break;
        }
    });
};

// 動態秀出個人檔案元素
var profileShow = function () {
    "use strict";

    //$("#profile_intro").show().css("opacity", "0");
    //TweenMax.to( $('#profile_intro'), 3, {css:{opacity:1, top:'270px'}, repeat:0, ease:Bounce.easeOut});
    //TweenMax.to( $('#profile_skills'), 1.5, {css:{opacity:1, right:'140px'}, repeat:0, ease:Quad.easeInOut});
    //TweenMax.to( $('#profile_experience'), 1, {css:{opacity:1, right:'300px'}, repeat:0, ease:Quad.easeInOut});


    $("#profile_intro").show().css("opacity", 0).stop().animate({ 'opacity': 1, 'top': '270px' }, {
        duration: 3000,
        easing: 'easeOutBounce'
    });

    $("#profile_skills").stop().animate({ 'opacity': 1, 'right': '140px' }, {
        duration: 1500,
        easing: 'easeInOutQuad'
    });

    //$('.ie8 #profile_intro, .ie8 #profile_skills, .ie8 #profile_experience').css('filter', 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#33FFFFFF,endColorstr=#33FFFFFF)');

    $("#profile_experience").stop().animate({ 'opacity': 1, 'right': '300px' }, {
        duration: 1000,
        easing: 'easeInOutQuad'
    });

};

var profileHide = function () {
    "use strict";

    //TweenMax.to( $('#profile_intro'), 3, {css:{opacity:0, top:'80px'}, repeat:0, ease:Elastic.easeOut});
    //TweenMax.to( $('#profile_skills'), 1.5, {css:{opacity:0, right:'80px'}, repeat:0, ease:Quad.easeInOut});
    //TweenMax.to( $('#profile_experience'), 1, {css:{opacity:0, right:'150px'}, repeat:0, ease:Quad.easeInOut});

    $("#profile_intro").stop().animate({ 'opacity': 0, 'top': '80px' }, {
        duration: 3000,
        easing: 'easeOutElastic'
    });

    $("#profile_skills").stop().animate({ 'opacity': 0, 'right': '80px' }, {
        duration: 1500,
        easing: 'easeInOutQuad'
    });

    $("#profile_experience").stop().animate({ 'opacity': 0, 'right': '150px' }, {
        duration: 1000,
        easing: 'easeInOutQuad'
    });

};

// 物件移動事件
var elementMoveEvent = function () {
    "use strict";

    // 螢幕真的太窄 ( < 1200 )，就用固定式排版
    if ($(window).width() > 1200) {
        if (($(window).scrollTop() > 850) && ($(window).scrollTop() <= 1200)) {

            profileShow();

        } else {

            if (flag === 1) {
                profileHide();
            }
        }
    }

    if ($(window).scrollTop() >= 0) {
        if ($(window).scrollTop() <= 1200) {

            // name
            $('#profile_name h2').css({
                'position': 'relative',
                'left': ($(window).scrollTop() * 0.1) - 100 + 'px',
                'opacity': ($(window).scrollTop() * 0.001)
            });

        } else {

            $('#profile_name h2').css({
                'position': 'relative',
                'left': '0',
                'opacity': '1'
            });
        }

        if ($(window).scrollTop() <= 1600) {
            $('#cloud1').css({
                'position': 'absolute',
                'top': Math.abs($(window).scrollTop() - 1000) + 400 + 'px',
                'opacity': ($(window).scrollTop() * 0.001)
            });
        }

        if ($(window).scrollTop() < 2860) {

            $("#moon").stop().animate({ 'opacity': 0 }, {
                duration: 500,
                easing: 'easeInOutQuad'
            });

            $("#moon > img").stop().animate({ 'opacity': 0 }, {
                duration: 500,
                easing: 'easeInOutQuad'
            });

        } else {

            $("#moon").css({
                'top': ($(window).scrollTop() - 2850) + 20 + 'px'
            }).stop().animate({ 'opacity': 1 }, {
                duration: 2000,
                easing: 'easeOutBounce'
            });

            $("#moon > img").stop().animate({ 'opacity': 1 }, {
                duration: 2000,
                easing: 'easeInOutQuad'
            });
        }
    }
};

// 輪巡 .sections 物件，設定個別動畫效果
var sectionAnimation = function () {

    ($(".ie6").length >= 1 || $('.sections').each(function () {

        // 儲存現在物件所在的位置
        var $self = $(this),
            offsetCoords = $self.offset(), // 物件的座標
            topOffset = offsetCoords.top; // 物件的 Y 軸座標，就是頂點

        // 當被捲動時
        $(window).scroll(function () {

            // 如果區塊是在目前可視位置，也就是：
            // 當
            //   頂端至卷軸所在位置 + 視窗高度 大於 物件的 Y 軸座標
            // 且
            //   物件的 Y 軸座標 + 物件的高度 大於 頂端至卷軸所在位置
            if (($(window).scrollTop() + $(window).height()) > topOffset && ((topOffset + $self.height()) > $(window).scrollTop())) {

                // 用 speed 值捲動背景
                var yPos = -($(window).scrollTop() / $self.data('speed')), // yPos 是負值，因為是往「上」捲
                    coords = '50% ' + yPos + 'px'; // 把最後的 background position 值組合在一起

                // 如果這個元素有 Y 偏移值，就加上去
                if ($self.data('offsetY')) {
                    yPos += $self.data('offsetY');
                }

                // 螢幕真的太窄 ( < 1200 )，就用固定式排版
                if ($(window).width() > 1200) {
                    // 背景慢慢到定位
                    $self.stop().animate({
                        "background-position-y": yPos + "px"
                    }, 2000, "easeOutCirc");

                    // 每個小物件
                    $('[data-type="element"]').each(function () {
                        var $element = $(this);

                        yPos = -($(window).scrollTop() / $element.data('speed'));
                        coords = (yPos + $element.data('offsetY')) + 'px';
                        // 物件慢慢到定位
                        $element.css({
                            top: coords
                        });

                    });
                }

            } // if

        }); // window scroll
    })); // each data-type

}

$(function () {
    "use strict";

    var loaderAnimation = $("#html5Loader").LoaderAnimation(),
        hash,
        $window = $(window),
        menu = "home";


    /**
     * Router
     *
     */
    var Router = Backbone.Router.extend({

        routes: {
            "":             "home",
            "!/about":      "about",
            "!/portfolio":  "portfolio",
            "!/contact":    "contact"
        },

        home: function () {

        },

        about: function () {

        },

        portfolio: function () {

        },

        contact: function () {

        }

    });

    /**
     * Navigation View
     *
     */
    var NavView = Backbone.View.extend({

        el: $("nav"),
        events: {
            'click li': 'changeCategory',
            'mouseover li': 'mouseOver',
            'mouseout li': 'mouseOut'
        },
        changeCategory: function (e) {

            e.preventDefault();
            var $this = $(e.currentTarget);

            $('html, body').stop().animate({
                'scrollTop': $($this.find("a").attr('href')).position().top
            }, 1500);

            router.navigate('!/' + $this.find("a").attr('href').replace('#', ''), {trigger:true});

            _gaq.push(['_trackPageview', '/' + $this.find("a").attr('href').replace('#', '')]);

        },
        mouseOver: function (e) {

            $(e.currentTarget).addClass('on');

        },
        mouseOut: function (e) {

            var $this = $(e.currentTarget);
            var thisMenu = $this.find('a').attr('href').replace('#', '');
            if (menu !== thisMenu) {
                $this.removeClass("on");
            }

        }
    });

    /**
     * Stage View
     *
     */
    var StageView = Backbone.View.extend({

        el: $('body'),
        initialize: function () {

            $(window).on('resize.app', _.bind(this.resize, this));
            $(window).on('scroll.app', _.bind(this.scroll, this));

            // 自動捲動到定位
            if (window.location.hash) {
                var hash = window.location.hash.substring(3);
                $('html, body').stop().animate({
                    'scrollTop': $("#" + hash).position().top
                }, 300);
            }

            // 綁定聯絡我單元 Google Analytics
            bindContactGA();

            // 輪巡 .sections 物件，設定個別的動畫效果
            sectionAnimation();

            // 暫存每個物件的 Y 軸值、X 軸值、移動速度到 offsetY, Xposition, speed 三個 data 變數值中
            $('[data-type]').each(function () {
                $(this).data('offsetY', parseInt($(this).attr('data-offsetY'), 10));
                $(this).data('Xposition', $(this).attr('data-Xposition'));
                $(this).data('speed', $(this).attr('data-speed'));
            });

            $("#profile_intro").hide();


        },
        render: function () {

            changeMenuButton("home");

            $.html5Loader({
                filesToLoad: 'js/files.json',
                onUpdate: loaderAnimation.update
            });

        },
        resize: function () {

            if ($(window).width() <= 1200) {
                $("#about").css("background-position-y", 0);
                $("#profile_name").removeAttr("style");
                $('#profile_name h2').removeAttr("style");
                $("#profile_picture").removeAttr("style");
                $("#profile_intro").removeAttr("style").css("opacity", "1");
                $("#profile_skills").removeAttr("style").css("opacity", "1");
                $("#profile_experience").removeAttr("style").css("opacity", "1");
            } else {
                $("#profile_intro").removeAttr("style").css({ "top": "270px" }).show().css("opacity", "1");
                $("#profile_skills").css("opacity", "1");
                $("#profile_experience").css("opacity", "1");
            }
        },
        scroll: function () {

            var position = $(window).scrollTop();

            if (position > 800) {
                flag = 1;
            }

            if ((position >= 0) && (position < 1000)) {

                menu = "home";
                router.navigate('!/home', {trigger:true});

            } else if ((position >= 1000) && (position < 2000)) {

                menu = "about";
                router.navigate('!/about', {trigger:true});

            } else if ((position >= 2000) && (position < 3000)) {

                menu = "portfolio";
                router.navigate('!/portfolio', {trigger:true});

            } else if ((position >= 3000) && (position < 4000)) {

                menu = "contact";
                router.navigate('!/contact', {trigger:true});

            }

            changeMenuButton(menu);

            // 物件移動事件
            elementMoveEvent();
        }

    });

    var navView = new NavView();
    var stageView = new StageView();
    var router = new Router();

    stageView.render();

    Backbone.history.start();

}); // document ready