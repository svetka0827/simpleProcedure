"use strict";
/* -------------------------------------
 CUSTOM FUNCTION WRITE HERE
 -------------------------------------- */
$(document).ready(function () {
    /* -------------------------------------
     Preloader
     -------------------------------------- */

    $(window).load(function () {
        setTimeout(function () {
            $('#preloader').velocity({
                opacity: 0.1,
                translateY: "-80px"
            }, {
                duration: 400,
                complete: function () {
                    $('#hola').velocity({
                        translateY: "-100%"
                    }, {
                        duration: 1000,
                        easing: [0.7, 0, 0.3, 1],
                        complete: function () {
                            $('body').addClass('animate-border divide');
                        }
                    });
                }
            });
        }, 1000);
    });
    /* -------------------------------------
     HOME SLIDER
     -------------------------------------- */
    $("#xp-homeslider").owlCarousel({
        navigation: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });
    /* -------------------------------------
     COUNTER
     -------------------------------------- */
    try {
        $('.xp-counter').appear(function () {
            $('.xp-timer').countTo();
        });
    } catch (err) {
    }
    /* -------------------------------------
     TESTIMONIALS SLIDER
     -------------------------------------- */
    $("#xp-testimonialsslider").owlCarousel({
        navigation: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });
    /* -------------------------------------
     PROGRESS BAR
     -------------------------------------- */
    try {
        $('#xp-ourskill').appear(function () {
            jQuery('.xp-skillholder').each(function () {
                jQuery(this).find('.xp-skillbar').animate({
                    width: jQuery(this).attr('data-percent')
                }, 2500);
            });
        });
    } catch (err) {
    }
    /* -------------------------------------
     CLIENT SLIDER
     -------------------------------------- */
    $("#xp-clientslider").owlCarousel({
        navigation: false,
        slideSpeed: 300,
        pagination: false,
        paginationSpeed: 400,
        singleItem: false,
        items: 6
    });
    /* -------------------------------------
     BLOG POSY SLIDER
     -------------------------------------- */
    $("#xp-blogpostslider").owlCarousel({
        autoPlay: true,
        navigation: false,
        slideSpeed: 400,
        pagination: false,
        paginationSpeed: 400,
        singleItem: true,
        items: 1
    });
    /* ------------------------------------------------------------------
     Lightbox
     ------------------------------------------------------------------ */
    $('.xp-work-item-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    /* -------------------------------------
     PRETTY PHOTO GALLERY
     -------------------------------------- */
    $("a[data-rel]").each(function () {
        $(this).attr("rel", $(this).data("rel"));
    });
    $("a[data-rel^='prettyPhoto']").prettyPhoto({
        animation_speed: 'normal',
        theme: 'dark_square',
        slideshow: 3000,
        autoplay_slideshow: false,
        social_tools: false
    });
	
	
	/*-------------------------------------------------------------------------------
	  Window load
	-------------------------------------------------------------------------------*/



	$(window).load(function(){

		$('.loader').fadeOut();

    	var wow = new WOW({
		    offset: 100,          
		    mobile: false
		  }
		);
		wow.init();
	});

	var navbar=$('.js-navbar-affix');
	var navbarAffixHeight=65



	/*-------------------------------------------------------------------------------
	  Affix
	-------------------------------------------------------------------------------*/



	navbar.affix({
	  offset: {
	    top: 12
	  }
	});

	navbar.on('affix.bs.affix', function() {
		if (!navbar.hasClass('affix')){
			navbar.addClass('animated fadeInDown');
  			navbar.find('.js-brand-hinge').addClass('animated hinge');
		}
	});

	navbar.on('affix-top.bs.affix', function() {
	  	navbar.removeClass('animated fadeOutDown');
	  	$('.navbar-collapse').collapse('hide');
	});


	
	/*-------------------------------------------------------------------------------
	 Navbar collapse
	-------------------------------------------------------------------------------*/



	$('.navbar-collapse').on('show.bs.collapse', function () {
	 	navbar.addClass('affix');
	});

	$('.navbar-collapse').on('hide.bs.collapse', function () {
		if (navbar.hasClass('affix-top')){
			navbar.removeClass('affix');
		}
	});

	$(".navbar-nav > li > a").on('click', function() {
	    $(".navbar-collapse").collapse('hide');
	});



	/*-------------------------------------------------------------------------------
	  Smooth scroll to anchor
	-------------------------------------------------------------------------------*/



    $('.js-target-scroll').on('click', function() {
        var target = $(this.hash);
        if (target.length) {
            $('html,body').animate({
                scrollTop: (target.offset().top - navbarAffixHeight + 1)
            }, 1000);
            return false;
        }
    });


    /*-------------------------------------------------------------------------------
	 Scrollspy
	-------------------------------------------------------------------------------*/



	$('body').scrollspy({
		offset:  navbarAffixHeight + 1
	});

    /* ==================================================================
     PORTFOLIO INFINITE SCROLL
     ================================================================== */
    var $portfolioContainer = $('.xp-portfolio-works');

    // filter items on button click
    $portfolioContainer.imagesLoaded(function () {
        $portfolioContainer.isotope({
            filter: '*',
            itemSelector: '.xp-work-item',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            },
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: '.xp-work-item'
            }
        });
    });


    $portfolioContainer.infinitescroll({
        navSelector: '#xp-portfolio-next-page-nav', // selector for the paged navigation 
        nextSelector: '#xp-portfolio-next-page-nav a', // selector for the NEXT link (to page 2)
        itemSelector: '.xp-work-item', // selector for all items you'll retrieve
        loading: {
            finishedMsg: 'No more pages to load.',
            img: 'images/controls/loader.GIF'
        }
    },
    // call Isotope as a callback
            function (newElements) {
                $portfolioContainer.imagesLoaded(function () {
                    $portfolioContainer.isotope('appended', $(newElements));
                });
                $('.xp-work-item-popup').magnificPopup({
                    type: 'image',
                    gallery: {
                        enabled: true
                    }
                });
            }
    );


    $('#xp-portfolio-filter a').on('click', function () {
        var selector = $(this).attr('data-filter');
        $portfolioContainer.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });


    var $optionSets = $('#xp-portfolio-filter .xp-portfolio-filter-btn-group'),
            $optionLinks = $optionSets.find('a');

    $optionLinks.on('click', function () {
        var $this = $(this);
        // don't proceed if already selected
        if ($this.hasClass('selected')) {
            return false;
        }
        var $optionSet = $this.parents('#xp-portfolio-filter .xp-portfolio-filter-btn-group');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');
    });

    /* ---------------------------------------
     Ajax Code for Contact Form
     --------------------------------------- */
    // jQuery('.contact_wrap').on('click', '.contact_now', function (e) {
    //     e.preventDefault();
    //     var $this = jQuery(this);

    //     var serialize_data = $this.parents('.contact_wrap').find('.contact_form').serialize();
    //     var dataString = serialize_data;

    //     $this.parents('.contact_wrap').find('.message_contact').html('').hide();
    //     jQuery($this).parents('fieldset').append("<i class='fa fa-refresh fa-spin'></i>");
    //     $this.parents('.contact_wrap').find('.message_contact').removeClass('alert-success');
    //     $this.parents('.contact_wrap').find('.message_contact').removeClass('alert-danger');

    //     var path = document.location
    //     var loc = window.location;
    //     var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/'));
    //     var dir = loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));

    //     jQuery.ajax({
    //         type: "POST",
    //         url: dir + '/php/mailer.php',
    //         data: dataString,
    //         dataType: "json",
    //         success: function (response) {
    //             jQuery($this).parents('fieldset').find('i').remove();
    //             jQuery('.message_contact').show();
    //             if (response.type == 'error') {
    //                 $this.parents('.contact_wrap').find('.message_contact').addClass('alert alert-danger').show();
    //                 $this.parents('.contact_wrap').find('.message_contact').html(response.message);
    //             } else {
    //                 $this.parents('.contact_wrap').find('.contact_form').get(0).reset();
    //                 $this.parents('.contact_wrap').find('.message_contact').addClass('alert alert-success').show();
    //                 $this.parents('.contact_wrap').find('.message_contact').html(response.message);
    //             }
    //         }
    //     });

    //     return false;

    // });
});