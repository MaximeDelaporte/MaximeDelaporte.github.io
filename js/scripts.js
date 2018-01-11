(function($) {
  $(function() {
    $('nav ul li > a:not(:only-child)').click(function(e) {
      $(this).siblings('.nav-dropdown').toggle();
      $('.nav-dropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });
    $('html').click(function()
    {
      $('.nav-dropdown').hide();
    });
    $('#nav-toggle').on('click', function(){
      this.classList.toggle('active');
    });
    $('#nav-toggle').click(function(){
      $('nav ul').toggle();
    });
  });

})(jQuery);
var parallaxElements = $('.parallax'),
parallaxQuantity = parallaxElements.length;

$(window).on('scroll', function() {
  window.requestAnimationFrame(function(){
    for (var i = 0; i < parallaxQuantity; i ++) {
      var currentElement = parallaxElements.eq(i);
      var scrolled = $(window).scrollTop();

      currentElement.css({
        'transform': 'translate3d(0,' + scrolled * -0.3 + 'px, 0)'
      });
    }
  });
});
