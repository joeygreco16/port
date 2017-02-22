$(document).ready(function($){

// Defining a function to set size for #hero
   function fullscreen(){
       $('#hero').css({
           width: $(window).width(),
           height: $(window).height()
       });
   }
   fullscreen();
   // Run the function in case of window resize
       $(window).resize(function() {
            fullscreen();
       });


//Navbar style transition on scroll
    $(window).scroll(function(){

      var range = $(this).scrollTop();
      var limit = 450;

      var calc = range / limit;


      //Bg Opacity Control
      if (range === 0) {
        $('.navBg').css({
          opacity: 0
        });

      }else if(range < limit){
        $('.navBg').css({
          opacity: calc
        });


      }else if(range > limit){
        $('.navBg').css({
          opacity: 1
        });
      }

    //Font Color Palette

      //Blue to White for main font
    var fontScale =   ["#00ADEF",
                      "#1CB6F0",
                      "#38BFF2",
                      "#55C8F4",
                      "#71D1F6",
                      "#8DDAF7",
                      "#AAE3F9",
                      "#C6ECFB",
                      "#E2F5FD",
                      "#FFFFFF"
                      ];

      //White to Gray hover and active states
      var hoverScale = [
                       "#FFFFFF",
                       "#E8E8E8",
                       "#D1D1D1",
                       "#BABABA",
                       "#A3A3A3",
                       "#8D8C8C",
                       "#767575",
                       "#5F5E5E",
                       "#484747",
                       "#323031"
                      ];

      //Calculate font & hover array index relative to users scroll position
      var currentFontIndex = range * fontScale.length / limit;
      var currentHoverIndex = range * hoverScale.length / limit;

      //Round index values
      currentFontIndex = Math.round(currentFontIndex);
      currentHoverIndex = Math.round(currentHoverIndex);

      //Check if calculated index exists in each array, then apply styles
      if(currentFontIndex <= fontScale.length && currentHoverIndex <= hoverScale.length){

        $('.navbar .navbar-header .navbar-brand').css(
          'color', fontScale[currentFontIndex]
        );
        $('.navbar #navbar ul li a').css(
          'color', fontScale[currentFontIndex]
        );
        $('.navbar .navbar-header button span ').css(
          'background', fontScale[currentFontIndex]
        );

        //Hover links to use hoverScale array
        $('.navbar #navbar ul li a').mouseover(function(){
          $(this).css(
            'color', hoverScale[currentHoverIndex]
          );
        }).mouseout(function() {
          $(this).css(
            'color', fontScale[currentFontIndex]
          );
        });
      }

    });

  //Smooth scroll

    /*$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });*/


  $("a[href^='#'], button[href^='#']").click(function() {
    $('html, body').animate({
        scrollTop: $($(this).attr("href")).offset().top
    }, 1500);
});


//Ajax

  $(".contact-form").submit(function(e) {
      e.preventDefault();

    var url = $(this).attr("action");
    var data = $(this).serialize();

    $.getJSON(url, data, function(response){

      var msg = "<h2 class='"+response.status.status+"'>" + response.status.message + "</h2>";

       $(".outputMsg").replaceWith(msg);

        $.each(response.errors,function(i,val){
         var elm = $("#"+val.field);
         elm.css('border','2px solid #FF5D5D');
         var elm2 = elm.parent().find('.help-block');
         elm2.html(val.message);
         elm2.show();

       });

       console.log(response);

     });
     return false;
  });


});
