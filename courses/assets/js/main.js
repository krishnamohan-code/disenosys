
$(document).ready(function() {
  /* Navbar specifics */
    $('.better-nav').each(function(){
      /* Set max width of fixed navbar equal to parent element (ignore this it's project specific) */
      $parentMaxWidth = $('dummy').css('max-width');
      $('.container', this).css('max-width', $parentMaxWidth);
      /* Add body padding if navbar is fixed on top or bottom */
      if($('.better-nav').hasClass('fixed-top')) {
        var $navHeight = $(this).height();
        $('body').css('padding-top', $navHeight+'px');
      } else if($('.better-nav').hasClass('fixed-bottom')) {
        var $navHeight = $(this).height();
        $('body').css('padding-bottom', $navHeight+'px');
      }
    });
  /* Clone main navbar for mobile */
    $('.better-nav .toggle').on('click touchstart', function(){
      $('#navbar-slide').empty();
      $(this).siblings('.body').clone().appendTo("#navbar-slide");
      betterNavPillsInit('#navbar-slide li.dropdown .selector');
    });
  /* Navbar pills dropdown trigger */
    function betterNavPillsInit($action) {
      $($action).on('click tap', function(){
        if($(this).parent('li.dropdown').hasClass('opened')) {
          $(this).parent('li.dropdown').removeClass('opened');
        } else {
          $(this).parent('li.dropdown').addClass('opened');
        }
      });
    }
    betterNavPillsInit('li.dropdown .selector');
  /* Initialize bigSlide */
    $('.better-nav .toggle').bigSlide({
      'menu':	'#navbar-slide',
      'push':	'body',
      'side':	'left',
      'menuWidth':	'80%',
      'speed':	300,
      'easyClose':	true,
      afterOpen: function() {
        $('body').css('overflow', 'hidden');
        $('#underlay').addClass('active');
      },
      afterClose: function() {
        setTimeout(function() {
          $('body').css('overflow', 'visible');
        }, 300);
        $('#underlay').removeClass('active');
      }
    });
    /* Dummy Content */
    var $dummyCount = 0;
    while ($dummyCount < 5 ) {
      $('<article><content><h3>DUMMY ARTICLE</h3></content></article>').appendTo('dummy');
      $dummyCount++;
    }
});
!(function($) {
  "use strict";

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 1;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      900: {
        items: 2
      }
    }
  });

  // Init AOS
  $(window).on('load', function() {
    AOS.init({
      duration: 1000,
      once: true
    });
  });

})(jQuery);