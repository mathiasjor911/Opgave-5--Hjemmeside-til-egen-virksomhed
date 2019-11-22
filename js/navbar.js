$(document).ready(function(){
    $(".dropdown").mouseover(function(){
        $('.dropdown-menu').slideDown(100);
    });
    $(".dropdown , .dropdown-menu").mouseleave(function(){
        $('dropdown-menu').slideUp(100);
    });
  });