$(document).ready(function(){
    $(".dropdown").hover(function(){
      $(".dropdown-menu", this).slideDown(100);
    }, function(){
      $(".dropdown-menu", this).stop().slideUp(100);
    });
  });