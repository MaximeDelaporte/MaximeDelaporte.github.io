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
jQuery(document).ready(function($){
	var timelineBlocks = $('.timeline-block'),
		offset = 0.8;

	//hide timeline blocks which are outside the viewport
	hideBlocks(timelineBlocks, offset);

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		(!window.requestAnimationFrame)
			? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
			: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
	});

	function hideBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.timeline-img, .timeline-content').addClass('is-hidden');
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.timeline-img').hasClass('is-hidden') ) && $(this).find('.timeline-img, .timeline-content').removeClass('is-hidden').addClass('bounce-in');
		});
	}
});
