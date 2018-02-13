$(function() {

    var $meters = $(".progressbar");
    var $section = $('.skills');
    var $queue = $({});

    function loadDaBars() {
 				$meters.each(function() {
 					$(this)
 						.data("origWidth", $(this).width())
 						.width(0)
 						.animate({
 							width: $(this).data("origWidth")
 						}, 1200);
 				});
     }

     $(document).bind('scroll', function(ev) {
         var scrollOffset = $(document).scrollTop();
         var containerOffset = $section.offset().top - window.innerHeight;
         if (scrollOffset > containerOffset) {
             loadDaBars();
             // unbind event not to load scrolsl again
             $(document).unbind('scroll');
         }
     });

 });
