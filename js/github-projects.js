$(document).ready(function(){
  var sliderFinalWidth = 400;
  maxQuickWidth = 900;

  $('.trigger').on('click', function(){
    var selectedImage = $('this').parent('.github-item').children('img');
    var selectedImageURL = selectedImage.attr('src');

    $('body').addClass('overlay-layer');
    animateQuickView(selectedImage, sliderFinalWidth, maxQuickWidth, 'open');

    updateQuickView(selectedImageURL);
  });
  $('body').on('click', function(event){
    if($(event.target).is('.close') || $(event.target).is('body.overlay-layer')){
      closeQuickView(sliderFinalWidth, maxQuickWidth);
    }
  });
  $(document).on('keyup', function(event){
    if(event.keyCode=='27')
    {
      closeQuickView(sliderFinalWidth, maxQuickWidth);
    }
  });
  $('.quick-view').on('click', '.slider-navigation a', function(){
    updateSlider($(this));
  });
  $(window).on('resize', function(){
    if($('.quick-view').hasClass('is-visible'))
    {
      window.requestAnimationFrame(resizeQuickView);
    }
  });
  function updateSlider(navigation)
  {
    var sliderContainer = navigation.parents('.slider-wrapper').find('.slider');
    var activeSlider = sliderContainer.children('.selected').removeClass('selected');
    if(navigation.hasClass('next'))
    {
      (!activeSlider.is(':last-child')) ? activeSlider.next().addClass('selected') : sliderContainer.children('li').eq(0).addClass('selected');
    }
    else {
      ( !activeSlider.is(':first-child')) ? activeSlider.prev().addClass('selected') : sliderContainer.children('li').last().addClass('selected');
    }
  }
  function updateQuickView(url)
  {
    $('.quick-view .slider li').removeClass('selected').find('img[src="' + url +'"]').parent('li').addClass('selected');
  }
  function resizeQuickView()
  {
    var quickViewLeft = ($(window).width() - $('.quick-view').width())/2;
    var quickViewTop = ($(window).height() - $('.quick-view').height())/2;
    $('.quick-view').css({
      "top": quickViewTop,"left":quickViewLeft,
      "left":quickViewLeft,
    });
  }
  function closeQuickView(finalWidth, maxQuickWidth)
  {
    var close = $('.close');
    var activeSliderURL = close.siblings('.slider-wrapper').find('.selected img').attr('src');
    var selectedImage = $('.empty-box').find('img');
    if (!$('.quick-view').hasClass('animated') && $('.quick-view').hasClass('add-content'))
    {
      selectedImage.attr('src', activeSliderURL);
      animateQuickView(selectedImage, finalWidth, maxQuickWidth, 'close');
    }
    else {
      closeNoAnimation(selectedImage, finalWidth, maxQuickWidth);
    }
  }
  function animateQuickView(image, finalWidth, maxQuickWidth, animationType)
  {
    var parentListItem = image.parent('.github-item');
    var topSelected = image.offset().top - $(window).scrollTop();
    var leftSelected = image.offset().left;
    var widthSelected = image.width();
    var heightSelected = image.height();
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var finalLeft =  (windowWidth - finalWidth)/2;
    var finalHeight = finalWidth * heightSelected/widthSelected;
    var finalTop = (windowHeight - finalHeight)/2;
    var quickViewWidth = (windowWidth * .8 < maxQuickWidth) ? windowWidth * .8 : maxQuickWidth;
    var quickViewLeft = (windowWidth - quickViewWidth)/2
    if (animationType == 'open')
    {
      parentListItem.addClass('empty-box');
      $('.quick-view').css({
        "top":topSelected,
        "left":leftSelected,
        "width":widthSelected,
      });
    }
  }
});
