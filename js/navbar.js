$(document).ready(function(){
    $(".dropdown").mouseenter(function(){
        $('.dropdown-menu').slideDown(300);
    });
     $(".dropdown-wrapper").mouseleave(function(){
        $('.dropdown-menu').slideUp(300);
    });
  });