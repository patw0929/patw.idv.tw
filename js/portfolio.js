var initPortfolio = function () {
	
	// We only want these styles applied when javascript is enabled
	$('div.portfolio-content').css('display', 'block');

	// Initially set opacity on thumbs and add
	// additional styling for hover effect on thumbs
	var onMouseOutOpacity = 0.67;
	$('#thumbs ul.thumbs li').opacityrollover({
		mouseOutOpacity:   onMouseOutOpacity,
		mouseOverOpacity:  1.0,
		fadeSpeed:         'fast',
		exemptionSelector: '.selected'
	});
	
	// Initialize Advanced Galleriffic Gallery
	var gallery = $('#thumbs').galleriffic({
		delay:                     2500,
		numThumbs:                 30,
		preloadAhead:              0,
		enableTopPager:            true,
		enableBottomPager:         true,
		maxPagesToShow:            7,
		imageContainerSel:         '#slideshow',
		controlsContainerSel:      '#controls',
		captionContainerSel:       '#caption',
		loadingContainerSel:       '#loading',
		renderSSControls:          false,
		renderNavControls:         false,
		playLinkText:              'Play Slideshow',
		pauseLinkText:             'Pause Slideshow',
		prevLinkText:              '&lsaquo; Previous Photo',
		nextLinkText:              'Next Photo &rsaquo;',
		nextPageLinkText:          'Next &rsaquo;',
		prevPageLinkText:          '&lsaquo; Prev',
		enableHistory:             false,
		autoStart:                 false,
		syncTransitions:           false,
		defaultTransitionDuration: 900,
		onSlideChange:             function(prevIndex, nextIndex) {
			// 'this' refers to the gallery, which is an extension of $('#thumbs')
			this.find('ul.thumbs').children()
				.eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
				.eq(nextIndex).fadeTo('fast', 1.0);
		},
		onPageTransitionOut:       function(callback) {
			this.fadeTo('fast', 0.0, callback);
		},
		onPageTransitionIn:        function() {
			this.fadeTo('fast', 1.0);
		}
	});

};


var getContent = function (url) {
    $.ajax({
        url: url + "index.html",
        dataType: "html"
    }).done(function (html) {
        $("#work_wrapper_ajax").html(html).fadeIn();
        _gaq.push(['_trackPageview', '/' + url]);
    });
};

var sliderInit = function () {
	$("#slider").nivoSlider();
	if ( $(window).width() > 1200 )	{
		$('#slider').data('nivoslider').start()
	} else {
		$('#slider').data('nivoslider').stop();
	}
};


// DOM ready
$(function () {

    /**
     * Portfolio Collection
     * 
     */
    var Portfolios = Backbone.Collection.extend({

        url: 'js/portfolio.json'

    });

    /**
     * Portfolio List View
     *
     */
    var PortfolioList = Backbone.View.extend({

        el: $('#portfolio'),
        render: function () {
            var that = this;
            var datas = new Portfolios();
            datas.fetch({
                success: function () {
                    var template = _.template($("#portfolio-template").html(), { datas: datas.models });
                    that.$el.find('#thumbs').html(template);
                    initPortfolio();
                }
            })
        },
        events: {
            "click #btn_close": "closePreview",
            "click #section_work": "clickMaskToClose",
            "click #portfolio_mask": "closePreview",
            "click a.advance-link": "showPreview"
        },
        showPreview: function (e) {
            e.preventDefault();
            var $this = $(e.currentTarget);

            $("<div id='portfolio_mask'></div>").prependTo("#portfolio");

            $("#portfolio_mask").fadeIn("slow");

            if ($(window).width() > 910) {
                $("#section_work").fadeIn(function () {
                    $("#work_wrapper_ajax").show();
                });
            } else {
                $("#section_work").show('fast');
            }

            trigger = 1;
            url = $this.attr("data-url");
            $('#section_work').show();
            $('.work_wrapper').show();
            getContent(url);
            $this.blur();

        },
        closePreview: function (e) {
            e.preventDefault();
            $("#portfolio_mask").fadeOut("slow", function () {
                $(this).remove();
            });
            $("#section_work").fadeOut("slow", function () {
                $("#work_wrapper_ajax").empty();
            });
        },
        clickMaskToClose: function (e) {

            if (e.target.id == "section_work") {
                $("#btn_close").trigger("click");
            }
        }
    });

    var portfolioList = new PortfolioList();
    portfolioList.render();

});