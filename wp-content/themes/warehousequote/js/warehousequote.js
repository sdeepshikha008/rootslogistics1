(function($) {
    var resizeId;
    $(window).resize(function() {
        stopTransition();
    });

    function stopTransition() {
        $('.container').addClass('notransition');
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 500);
    }

    function doneResizing() {
        offsetCalc();

        if (($('.wq-solution-img-wrap').length > 0) && ($('.wq-solution-img-wrap').css('position') != 'absolute'))
            $('.wq-solution-img-wrap').removeAttr('style');
    }

    /*smooth scroll*/
    $(document).ready(function() {
        smoothScroll();
        offsetCalc();
        scrollTopCheck();
    });

    function smoothScroll() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if ($('.menu-button').css('display') == 'block')
                var fixedOffset = $("nav.main-navigation").height();
            else
                var fixedOffset = $("header.masthead").height();

            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname && !$(this).hasClass('no-scroll')) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - fixedOffset
                    }, 800);
                    return false;
                }
            }
        });
    }

    /*controls*/
    $(document).ready(function() {
        /*typewriter*/
        if ($('#typewriter').length > 0) {
            var TxtType = function(el, toRotate, period) {
                this.toRotate = toRotate;
                this.el = el;
                this.loopNum = 0;
                this.period = parseInt(period, 10) || 2000;
                this.txt = '';
                this.tick();
                this.isDeleting = false;
            };

            TxtType.prototype.tick = function() {
                var i = this.loopNum % this.toRotate.length;
                var fullTxt = this.toRotate[i];

                if (this.isDeleting) {
                    this.txt = fullTxt.substring(0, this.txt.length - 1);
                } else {
                    this.txt = fullTxt.substring(0, this.txt.length + 1);
                }

                this.el.innerHTML = '<span class="wq-typewriter-wrap">' + this.txt + '</span>';

                var that = this;
                var delta = 200 - Math.random() * 100;

                if (this.isDeleting) {
                    delta /= 2;
                }

                if (!this.isDeleting && this.txt === fullTxt) {
                    delta = this.period;
                    this.isDeleting = true;
                } else if (this.isDeleting && this.txt === '') {
                    this.isDeleting = false;
                    this.loopNum++;
                    delta = 500;
                }

                setTimeout(function() {
                    that.tick();
                }, delta);
            };

            /*window.onload = function() {*/
            var elements = document.getElementsByClassName('wq-typewriter');
            for (var i = 0; i < elements.length; i++) {
                var toRotate = elements[i].getAttribute('data-type');
                var period = elements[i].getAttribute('data-period');
                if (toRotate) {
                    new TxtType(elements[i], JSON.parse(toRotate), period);
                }
            }
            /*};*/
        }
        /*typewriter*/

        /*menu*/
        var menubutton = '<button class="menu-control" type="button"><span class="menu-label">Menu</span><span class="menu-icon"></span></button>';
        $('.main-navigation').after(menubutton);

        $('.menu-control, .wq-nav-bg').on('click', function() {
            $('.container').toggleClass('nav-active');
            $('body').toggleClass('overlay-open');

            $.magnificPopup.close();

            $('.main-navigation ul').removeClass('sub-active');
            $('.main-navigation .menu-item').removeClass('item-active');
        });
        /*$('.main, .main-navigation .menu > .menu-item > a').on('click', function () {
        	if (($('.menu-control').css('display') == 'block') && ($('.container').hasClass('nav-active'))) {
        		$('.container').toggleClass('nav-active');
        		$('body').toggleClass('overlay-open');
        	}
        });*/

        /*submenu*/
        /*$( ".main-navigation > .menu > .menu-item-has-children > a" ).each(function() {
        	$(this).after('<span class="sub-control"></span>');
        });*/

        //$('.main-navigation .menu-item-has-children .sub-control').on('click', function(){
        $('.main-navigation > .menu > .menu-item-has-children > a').on('click', function(e) {
            e.preventDefault();
            $('.menu-item-current-parent').text($(this).text());

            if (!$(this).parent().hasClass('item-active')) {
                $(this).closest('ul').removeClass('sub-active');
                $(this).parent().siblings().removeClass('item-active');
            }

            $(this).closest('ul').toggleClass('sub-active');
            $(this).parent().toggleClass('item-active');
        });

        $(".main-navigation > .menu > .menu-item-has-children > .sub-menu").each(function() {
            $(this).prepend('<li class="menu-item menu-item-back"><a href="#">Back</a><span class="menu-item-current-parent"></span></li>');
        });
        $('.main-navigation .menu-item-back a').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.sub-active').removeClass('sub-active');
            $(this).closest('.item-active').removeClass('item-active');

            $('.menu-item-current-parent').text('');
        });

        /*accordion*/
        $(".wq-accordion-title").on('click', function() {
            if ($('.wq-solution-img-wrap').length > 0) {
                if (($('.wq-solution-img-wrap').css('position') == 'absolute') && (!$(this).parents('.wq-solution-wrap').children('.wq-solution-img-wrap').attr('style'))) {
                    var solutionHeight = $(this).parents('.wq-solution-wrap').outerHeight();
                    $(this).parents('.wq-solution-wrap').children('.wq-solution-img-wrap').css('height', solutionHeight + 'px');
                }
            }

            $(this).toggleClass('wq-accordion-active');
            $(this).siblings('.wq-accordion-content').slideToggle();

            if ($(this).siblings('.wq-accordion-img').length > 0) {
                var accordimagesrc = $(this).siblings('.wq-accordion-img').attr('src');
                $('#wq-solution-img').fadeOut(600, function() {
                    $('#wq-solution-img').attr('src', accordimagesrc).fadeIn(1000);
                });
            }
        });

        /*popups*/
        $('.popup-video, .popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
        $('.wq-btn-video').magnificPopup({
            type: 'inline',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
        $('.popup-gallery').magnificPopup({
            delegate: '.slide a',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    });
    $(document).on('click', function(event) {
        if (($('.menu-control').css('display') == 'none')) {
            if (!$(event.target).closest('.item-active').length) {
                $('.main-navigation ul').removeClass('sub-active');
                $('.main-navigation .menu-item').removeClass('item-active');
            }
        }
    });

    /*sliders*/
    $(window).load(function() {
        $('.wq-slider.slickslider').slick({
            arrows: false,
            dots: true,
            autoplay: true,
            pauseOnFocus: true,
            pauseOnHover: true,
            pauseOnDotsHover: true
        });
        $('.wq-integrations-slider.slickslider').slick({
            arrows: false,
            dots: false,
            pauseOnFocus: true,
            pauseOnHover: true,
            pauseOnDotsHover: true,
            /*slidesToShow: 1,*/
            variableWidth: true,

            slidesToScroll: 1,
            centerMode: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 0,
            speed: 1000,
            cssEase: 'linear'
        });

        $('.wq-careers-testimonials-slider.slickslider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            autoplay: true,
            pauseOnFocus: true,
            pauseOnHover: true,
            pauseOnDotsHover: true
        });
        var filter = $('.wq-careers-testimonial-team.wq-active').attr('data-filter');
        $('.wq-careers-testimonials-slider.slickslider').slick('slickFilter', filter);
        $('.wq-careers-testimonials-slider.slickslider').addClass('wq-ready');

        $('.wq-careers-testimonial-team').on('click', function(e) {
            e.preventDefault();
            $('.wq-careers-testimonial-team').removeClass('wq-active');
            filter = $(this).attr('data-filter');
            teamName = $(this).text();
            $('.wq-careers-testimonials-slider.slickslider').slick('slickUnfilter');
            $('.wq-careers-testimonials-slider.slickslider').slick('slickFilter', filter);
            $(this).addClass('wq-active');
            $('#team').text(teamName);
        });
    });

    var didScroll;
    var delta = 50;
    var navbarHeight = $('header.masthead').outerHeight();
    var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    $(window).scroll(function(event) {
        didScroll = true;
    });
    setInterval(function() {
        if (didScroll) {
            scrollTopCheck();
            didScroll = false;
        }
    }, 100);

    function scrollTopCheck() {
        if ($('.masthead').length > 0) {
            var st = $(this).scrollTop();

            if ((st == 0) && $(".container").hasClass("not-top")) {
                $(".container").removeClass("not-top");
            } else if ((st != 0) && !$(".container").hasClass("not-top")) {
                $(".container").addClass("not-top");
            }

            if (Math.abs(lastScrollTop - st) <= delta) {
                return;
            }

            if (st > lastScrollTop && st > navbarHeight) {
                // Scroll Down
                $('.container').removeClass('scrolling-up').addClass('scrolling-down');
            } else {
                // Scroll Up
                if (st + $(window).height() < $(document).height()) {
                    $('.container').removeClass('scrolling-down').addClass('scrolling-up');
                }
            }

            lastScrollTop = st;
        }
    }

    function offsetCalc() {
        $('.container').addClass('notransition');

        var navbarHeight = $('header.masthead').outerHeight();
        $('.main').css('padding-top', navbarHeight + 'px');

        timeoutID = window.setTimeout(function() {
            $('.container').removeClass('notransition');
        }, 500);
    }

    var didScrollPassive;

    function reveal() {
        var reveals = document.querySelectorAll(".wq-reveal");

        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;

            var elementVisible = 350;
            if ($('.menu-control').css('display') == 'block')
                elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("wq-action");
            } else {
                //reveals[i].classList.remove("wq-action");
            }
        }
    }
    setInterval(function() {
        if (didScrollPassive) {
            reveal();
            didScroll = false;
        }
    }, 100);
    window.addEventListener("scroll", () => {
        didScrollPassive = true;
    }, {
        passive: true
    });
})(jQuery);