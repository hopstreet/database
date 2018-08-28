$(document).ready(function() {

  $('.header-nav__item').hover(function() {
    $(this).removeClass('fade').addClass('active')
    $(this).siblings().removeClass('active').addClass('fade')
  },function() {
    $('.header-nav__item').removeClass('fade').removeClass('active');
  });

});
