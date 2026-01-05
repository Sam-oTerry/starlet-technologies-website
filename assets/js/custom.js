(function ($) {
	
	"use strict";

	// Header Type = Fixed
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    var box = $('.header-text').height();
    var header = $('header').height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });


	$('.loop').owlCarousel({
      center: true,
      items:1,
      loop:true,
      autoplay: true,
      nav: true,
      margin:0,
      responsive:{ 
          1200:{
              items:5
          },
          992:{
              items:3
          },
          760:{
            items:2
        }
      }
  });
  
  // Bootstrap Modal - Reset when opened
	var loginModal = new bootstrap.Modal(document.getElementById('loginModal'), {
		backdrop: true,
		keyboard: true
	});

	// Reset modal when opened
	$('#loginModal').on('show.bs.modal', function () {
		$(".system_selection").show();
		$(".social_login").hide();
		$(".user_login").hide();
		$(".user_register").hide();
		$(".header_title").text('Select System');
		$(".system_option").removeClass('active loading');
		// Reset system option content if it was changed
		$(".system_option").each(function() {
			if ($(this).data('original-html')) {
				$(this).html($(this).data('original-html'));
			}
		});
	});

	// Reset modal when closed
	$('#loginModal').on('hidden.bs.modal', function () {
		$(".system_selection").show();
		$(".social_login").hide();
		$(".user_login").hide();
		$(".user_register").hide();
		$(".header_title").text('Select System');
		$(".system_option").removeClass('active loading');
	});

$(function() {
		// ============================================
		// SYSTEM SELECTION AND REDIRECTION
		// ============================================
		// When a user selects a system, they are automatically
		// redirected to that system's login page.
		// 
		// TO CONFIGURE: Update the systemUrls object below with
		// the actual URLs/paths to your system login pages.
		// ============================================
		
		var selectedSystem = '';
		var systemNames = {
			'school': 'School Management System',
			'hospital': 'Hospital/Drugshop Management System',
			'pos': 'Point of Sale Systems'
		};

		// ============================================
		// ENVIRONMENT CONFIGURATION
		// ============================================
		// Automatically detect if running on localhost or production
		// You can also manually set 'production' or 'local' if needed
		var isLocalhost = window.location.hostname === 'localhost' || 
		                  window.location.hostname === '127.0.0.1' ||
		                  window.location.hostname === '';
		
		// ============================================
		// SYSTEM LOGIN URLs CONFIGURATION
		// ============================================
		// Update these URLs based on your server setup:
		// - If both sites are on the same domain: use relative paths like '/school-management-system/login.php'
		// - If on different domains: use full URLs like 'https://school.starlettech.com/login.php'
		// - For localhost: uses 'http://localhost/school-management-system/login.php'
		// ============================================
		
		var systemUrls = {
			// Local development URLs
			local: {
				'school': 'http://localhost/school-management-system/login.php',
				'hospital': 'http://localhost/hospital-management-system/login.php',
				'pos': 'http://localhost/pos-system/login.php'
			},
			// Production URLs - UPDATE THESE with your actual production URLs
			production: {
				'school': '/school-management-system/login.php', // Relative path (same domain)
				// Alternative: 'https://school.starlettech.com/login.php', // Full URL (different domain)
				'hospital': '/hospital-management-system/login.php',
				'pos': '/pos-system/login.php'
			}
		};
		
		// Select URLs based on environment
		var activeUrls = isLocalhost ? systemUrls.local : systemUrls.production;

		// Store original HTML for system options
		$(".system_option").each(function() {
			$(this).data('original-html', $(this).html());
		});

		// Handle system selection - Redirect to system login page
		$(".system_option").click(function() {
			selectedSystem = $(this).data('system');
			var $option = $(this);
			
			// Prevent multiple clicks
			if ($option.hasClass('loading')) {
				return false;
			}
			
			$(".system_option").removeClass('active');
			$option.addClass('active loading');
			
			// Store original content
			var originalContent = $option.data('original-html');
			
			// Show loading state
			$option.html('<div style="text-align: center; padding: 20px;"><i class="fas fa-spinner fa-spin" style="font-size: 32px; color: #fff; margin-bottom: 15px;"></i><p style="margin-top: 10px; color: #fff; font-size: 16px; font-weight: 500;">Redirecting to ' + systemNames[selectedSystem] + '...</p></div>');
			
			// Close modal and redirect after short delay
			setTimeout(function() {
				// Close the Bootstrap modal
				var modalElement = document.getElementById('loginModal');
				var modal = bootstrap.Modal.getInstance(modalElement);
				if (modal) {
					modal.hide();
				}
				
				// Redirect to system login page
				if (activeUrls[selectedSystem]) {
					window.location.href = activeUrls[selectedSystem];
				} else {
					// Fallback if URL not defined
					console.error('Login URL not defined for system: ' + selectedSystem);
					alert('System login page is being configured. Please try again later.');
					// Reset the option
					$option.removeClass('loading').html(originalContent);
					$option.removeClass('active');
				}
			}, 800);
		});

		// Calling Login Form
		$("#login_form").click(function() {
				$(".social_login").hide();
				$(".user_login").show();
				$("#selected_system_name").text(systemNames[selectedSystem]);
				$(".header_title").text('Login to ' + systemNames[selectedSystem]);
				return false;
		});

		// Calling Register Form
		$("#register_form").click(function() {
				$(".social_login").hide();
				$(".user_register").show();
				$(".header_title").text('Register for ' + systemNames[selectedSystem]);
				return false;
		});

		// Going back to System Selection
		$(".back_to_systems").click(function() {
				$(".user_login").hide();
				$(".user_register").hide();
				$(".social_login").hide();
				$(".system_selection").show();
				$(".header_title").text('Select System');
				selectedSystem = '';
				$(".system_option").removeClass('active');
				return false;
		});

		// Going back to Social Forms from login/register
		$(".back_btn").click(function() {
				$(".user_login").hide();
				$(".user_register").hide();
				$(".social_login").show();
				$(".header_title").text('Login to ' + systemNames[selectedSystem]);
				return false;
		});

		// Modal close is handled by Bootstrap modal events above
});

  // Acc
  $(document).on("click", ".naccs .menu div", function() {
    var numberIndex = $(this).index();

    if (!$(this).is("active")) {
        $(".naccs .menu div").removeClass("active");
        $(".naccs ul li").removeClass("active");

        $(this).addClass("active");
        $(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");

        var listItemHeight = $(".naccs ul")
          .find("li:eq(" + numberIndex + ")")
          .innerHeight();
        $(".naccs ul").height(listItemHeight + "px");
      }
  });
	

	// Menu Dropdown Toggle
  if($('.menu-trigger').length){
    $(".menu-trigger").on('click', function() { 
      $(this).toggleClass('active');
      $('.header-area .nav').slideToggle(200);
    });
  }


  // Menu elevator animation
  $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        var width = $(window).width();
        if(width < 991) {
          $('.menu-trigger').removeClass('active');
          $('.header-area .nav').slideUp(200);  
        }       
        $('html,body').animate({
          scrollTop: (target.offset().top) + 1
        }, 700);
        return false;
      }
    }
  });

  $(document).ready(function () {
      $(document).on("scroll", onScroll);
      
      //smoothscroll
      $('.scroll-to-section a[href^="#"]').on('click', function (e) {
          e.preventDefault();
          $(document).off("scroll");
          
          $('.scroll-to-section a').each(function () {
              $(this).removeClass('active');
          })
          $(this).addClass('active');
        
          var target = this.hash,
          menu = target;
          var target = $(this.hash);
          $('html, body').stop().animate({
              scrollTop: (target.offset().top) + 1
          }, 500, 'swing', function () {
              window.location.hash = target;
              $(document).on("scroll", onScroll);
          });
      });
  });

  function onScroll(event){
      var scrollPos = $(document).scrollTop();
      $('.nav a').each(function () {
          var currLink = $(this);
          var refElement = $(currLink.attr("href"));
          if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
              $('.nav ul li a').removeClass("active");
              currLink.addClass("active");
          }
          else{
              currLink.removeClass("active");
          }
      });
  }


  // Acc
  $(document).on("click", ".naccs .menu div", function() {
    var numberIndex = $(this).index();

    if (!$(this).is("active")) {
        $(".naccs .menu div").removeClass("active");
        $(".naccs ul li").removeClass("active");

        $(this).addClass("active");
        $(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");

        var listItemHeight = $(".naccs ul")
          .find("li:eq(" + numberIndex + ")")
          .innerHeight();
        $(".naccs ul").height(listItemHeight + "px");
      }
  });


	// Page loading animation
	 $(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });

	

	// Window Resize Mobile Menu Fix
  function mobileNav() {
    var width = $(window).width();
    $('.submenu').on('click', function() {
      if(width < 767) {
        $('.submenu ul').removeClass('active');
        $(this).find('ul').toggleClass('active');
      }
    });
  }




})(window.jQuery);