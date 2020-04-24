;(function () {
	
	'use strict';

	// iPad and iPod detection	
	var isiPad = function(){
	  return (navigator.platform.indexOf("iPad") != -1);
	}

	var isiPhone = function(){
    return (
      (navigator.platform.indexOf("iPhone") != -1) || 
      (navigator.platform.indexOf("iPod") != -1)
    );
	}

	// Mobile Menu Clone ( Mobiles/Tablets )
	var mobileMenu = function() {
		if ( $(window).width() < 769 ) {
			$('html,body').addClass('emil-overflow');

			if ( $('#emil-mobile-menu').length < 1 ) {
				
				var clone = $('#emil-primary-menu').clone().attr({
					id: 'emil-mobile-menu-ul',
					class: ''
				});
				var cloneLogo = $('#emil-logo').clone().attr({
					id : 'emil-logo-mobile',
					class : ''
				});

				$('<div id="emil-logo-mobile-wrap">').append(cloneLogo).insertBefore('#emil-header-section');
				$('#emil-logo-mobile-wrap').append('<a href="#" id="emil-mobile-menu-btn"><i class="ti-menu"></i></a>')
				$('<div id="emil-mobile-menu">').append(clone).insertBefore('#emil-header-section');

				$('#emil-header-section').hide();
				$('#emil-logo-mobile-wrap').show();
			} else {
				$('#emil-header-section').hide();
				$('#emil-logo-mobile-wrap').show();
			}

		} else {

			$('#emil-logo-mobile-wrap').hide();
			$('#emil-header-section').show();
			$('html,body').removeClass('emil-overflow');
			if ( $('body').hasClass('emil-mobile-menu-visible')) {
				$('body').removeClass('emil-mobile-menu-visible');
			}
		}
	};


	// Parallax
  // var scrollBanner = function () {
  //   var scrollPos = $(this).scrollTop();
  //   console.log(scrollPos);
  //   $('.emil-hero-intro').css({
  //     'opacity' : 1-(scrollPos/300)
  //   });
  // }


	// Click outside of the Mobile Menu
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#emil-mobile-menu, #emil-mobile-menu-btn");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      $('body').removeClass('emil-mobile-menu-visible');
	    }
		});
	};


	// Mobile Button Click
	var mobileBtnClick = function() {
		// $('#emil-mobile-menu-btn').on('click', function(e){
		$(document).on('click', '#emil-mobile-menu-btn', function(e){
			e.preventDefault();
			if ( $('body').hasClass('emil-mobile-menu-visible') ) {
				$('body').removeClass('emil-mobile-menu-visible');	
			} else {
				$('body').addClass('emil-mobile-menu-visible');
			}
			
		});
	};


	// Main Menu Superfish
	var mainMenu = function() {

		$('#emil-primary-menu').superfish({
			delay: 0,
			animation: {
				opacity: 'show'
			},
			speed: 'fast',
			cssArrows: true,
			disableHI: true
		});

	};

	// Superfish Sub Menu Click ( Mobiles/Tablets )
	var mobileClickSubMenus = function() {

		$('body').on('click', '.emil-sub-ddown', function(event) {
			event.preventDefault();
			var $this = $(this),
				li = $this.closest('li');
			li.find('> .emil-sub-menu').slideToggle(200);
		});

	};

	// Window Resize
	var windowResize = function() {
		$(window).resize(function(){
			mobileMenu();
		});

	};

	// Window Scroll
	var windowScroll = function() {
		$(window).scroll(function() {

			var scrollPos = $(this).scrollTop();
			if ( $('body').hasClass('emil-mobile-menu-visible') ) {
				$('body').removeClass('emil-mobile-menu-visible');
			}

			if ( $(window).scrollTop() > 70 ) {
				$('#emil-header-section').addClass('emil-scrolled');
			} else {
				$('#emil-header-section').removeClass('emil-scrolled');
			}


			// Parallax
			$('.emil-hero-intro').css({
	      'opacity' : 1-(scrollPos/300)
	    });

		});
	};

	// Fast Click for ( Mobiles/Tablets )
	var mobileFastClick = function() {
		if ( isiPad() && isiPhone()) {
			FastClick.attach(document.body);
		}
	};

	// Easy Repsonsive Tabs
	var responsiveTabs = function(){
		
		$('#emil-tab-feature').easyResponsiveTabs({
      type: 'default',
      width: 'auto', 
      fit: true, 
      inactive_bg: '',
      active_border_color: '',
      active_content_border_color: '',
      closed: 'accordion',
      tabidentify: 'hor_1'
            
    });
    $('#emil-tab-feature-center').easyResponsiveTabs({
      type: 'default',
      width: 'auto',
      fit: true, 
      inactive_bg: '',
      active_border_color: '',
      active_content_border_color: '',
      closed: 'accordion', 
      tabidentify: 'hor_1' 
      
    });
    $('#emil-tab-feature-vertical').easyResponsiveTabs({
      type: 'vertical',
      width: 'auto',
      fit: true,
      inactive_bg: '',
      active_border_color: '',
      active_content_border_color: '',
      closed: 'accordion',
      tabidentify: 'hor_1'
    });
	};

	// Owl Carousel
	var owlCrouselFeatureSlide = function() {
		
		var owl2 = $('.owl-carousel-2');
		owl2.owlCarousel({
				items: 1,
		    loop: true,
		    margin: 0,
		    lazyLoad: true,
		    responsiveClass: true,
		    nav: true,
		    dots: true,
		    smartSpeed: 500,
		    navText: [
		      "<i class='ti-arrow-left owl-direction'></i>",
		      "<i class='ti-arrow-right owl-direction'></i>"
	     	],
		    responsive: {
		        0: {
		          items: 1,
		          nav: true
		        },
		        600: {
		          items: 1,
		          nav: true,
		        },
		        1000: {
		          items: 1,
		          nav: true,
		        }
	    	}
		});
	};

	// MagnificPopup
	var magnifPopup = function() {
		$('.image-popup').magnificPopup({
			type: 'image',
		  gallery:{
		    enabled:true
		  }
		});
	};

	$(function(){

		mobileFastClick();
		responsiveTabs();
		mobileMenu();
		mainMenu();
		magnifPopup();
		mobileBtnClick();
		mobileClickSubMenus();
		mobileMenuOutsideClick();
		owlCrouselFeatureSlide();
		windowResize();
		windowScroll();


	});


}());
