jQuery(document).ready(function($){
  //cache DOM elements
  var projectsContainer = $('.projects-container'),
  projectsPreviewWrapper = projectsContainer.find('.projects-previews'),
  projectPreviews = projectsPreviewWrapper.children('li'),
  projects = projectsContainer.find('.projects'),
  navigationTrigger = $('.close-trigger'),
  navigation = $('.close'),
  //if browser doesn't support CSS transitions...
  transitionsNotSupported = ( $('.no-csstransitions').length > 0);

  var $overlay = $('<div id="overlay"></div>');
  var $image = $("<img>");

  //An image to overlay
  $overlay.append($image);

  //Add overlay
  $("body").append($overlay);

  //click the image and a scaled version of the full size image will appear
  $("#photo-gallery a").on("click", function(event) {
    event.preventDefault();
    var imageLocation = $(this).attr("href");

    //update overlay with the image linked in the link
    $image.attr("src", imageLocation);

    //show the overlay
    $overlay.show();
  } );

  $("#overlay").click(function() {
    $( "#overlay" ).hide();
  });





  var animating = false,
  //will be used to extract random numbers for projects slide up/slide down effect
  numRandoms = projects.find('li').length,
  uniqueRandoms = [];

  //open project
  projectsPreviewWrapper.on('click', 'a', function(event){
    event.preventDefault();
    if( animating == false ) {
      animating = true;
      navigationTrigger.add(projectsContainer).addClass('project-open');
      openProject($(this).parent('li'));
    }
  });
  if ($('#back-to-top').length) {
    var scrollTrigger = 100, // px
    backToTop = function () {
      var scrollTop = $(window).scrollTop();
      if (scrollTop > scrollTrigger) {
        $('#back-to-top').addClass('show');
      } else {
        $('#back-to-top').removeClass('show');
      }
    };
    backToTop();
    $(window).on('scroll', function () {
      backToTop();
    });
    $('.back-to-top').on('click', function (event) {
      event.preventDefault();
      $('html,body').animate({
        scrollTop: 0
      }, 700);
    });
  }

  navigationTrigger.on('click', function(event){
    event.preventDefault();

    if( animating == false ) {
      animating = true;
      if( navigationTrigger.hasClass('project-open') ) {
        //close visible project
        navigationTrigger.add(projectsContainer).removeClass('project-open');
        closeProject();
      }
    }
    if(transitionsNotSupported) animating = false;
  });
  $('.project-info, .preview-image').on('click', function(event){

    event.preventDefault();
    if( navigationTrigger.hasClass('project-open') ) {
      //close visible project
      navigationTrigger.add(projectsContainer).removeClass('project-open');
      closeProject();
    }});

    //scroll down to project info
    projectsContainer.on('click', '.scroll', function(){
      projectsContainer.animate({'scrollTop':$('.project-info')}, 500);
    });

    //check if background-images have been loaded and show project previews
    projectPreviews.children('a').bgLoaded({
      afterLoaded : function(){
        showPreview(projectPreviews.eq(0));
      }
    });

    function showPreview(projectPreview) {
      if(projectPreview.length > 0 ) {
        setTimeout(function(){
          projectPreview.addClass('bg-loaded');
          showPreview(projectPreview.next());
        }, 150);
      }
    }

    function openProject(projectPreview) {
      var projectIndex = projectPreview.index();
      projects.children('li').eq(projectIndex).add(projectPreview).addClass('selected');

      if( transitionsNotSupported ) {
        projectPreviews.addClass('slide-out').removeClass('selected');
        projects.children('li').eq(projectIndex).addClass('content-visible');
        animating = false;
      } else {
        slideToggleProjects(projectPreviews, projectIndex, 0, true);
      }
    }

    function closeProject() {
      projects.find('.selected').removeClass('selected').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
        $(this).removeClass('content-visible').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
        slideToggleProjects(projectsPreviewWrapper.children('li'), -1, 0, false);
      });

      //if browser doesn't support CSS transitions...
      if( transitionsNotSupported ) {
        projectPreviews.removeClass('slide-out');
        projects.find('.content-visible').removeClass('content-visible');
        animating = false;
      }
    }
    function slideToggleProjects(projectsPreviewWrapper, projectIndex, index, bool) {
      if(index == 0 ) createArrayRandom();
      if( projectIndex != -1 && index == 0 ) index = 1;

      var randomProjectIndex = makeUniqueRandom();
      if( randomProjectIndex == projectIndex ) randomProjectIndex = makeUniqueRandom();

      if( index < numRandoms - 1 ) {
        projectsPreviewWrapper.eq(randomProjectIndex).toggleClass('slide-out', bool);
        setTimeout( function(){
          //animate next preview project
          slideToggleProjects(projectsPreviewWrapper, projectIndex, index + 1, bool);
        }, 150);
      } else if ( index == numRandoms - 1 ) {
        //this is the last project preview to be animated
        projectsPreviewWrapper.eq(randomProjectIndex).toggleClass('slide-out', bool).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
          if( projectIndex != -1) {
            projects.children('li.selected').addClass('content-visible');
            projectsPreviewWrapper.eq(projectIndex).addClass('slide-out').removeClass('selected');
          } else if( navigation.hasClass('nav-visible') && bool ) {
            navigation.addClass('nav-clickable');
          }
          projectsPreviewWrapper.eq(randomProjectIndex).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
          animating = false;
        });
      }
    }

    //http://stackoverflow.com/questions/19351759/javascript-random-number-out-of-5-no-repeat-until-all-have-been-used
    function makeUniqueRandom() {
      var index = Math.floor(Math.random() * uniqueRandoms.length);
      var val = uniqueRandoms[index];
      // now remove that value from the array
      uniqueRandoms.splice(index, 1);
      return val;
    }

    function createArrayRandom() {
      //reset array
      uniqueRandoms.length = 0;
      for (var i = 0; i < numRandoms; i++) {
        uniqueRandoms.push(i);
      }
    }
  });

  /*
  * BG Loaded
  * Copyright (c) 2014 Jonathan Catmull
  * Licensed under the MIT license.
  */
  (function($){
    $.fn.bgLoaded = function(custom) {
      var self = this;

      // Default plugin settings
      var defaults = {
        afterLoaded : function(){
          this.addClass('bg-loaded');
        }
      };

      // Merge default and user settings
      var settings = $.extend({}, defaults, custom);

      // Loop through element
      self.each(function(){
        var $this = $(this),
        bgImgs = $this.css('background-image').split(', ');
        $this.data('loaded-count',0);
        $.each( bgImgs, function(key, value){
          var img = value.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
          $('<img/>').attr('src', img).on("load",function() {
            $(this).remove(); // prevent memory leaks
            $this.data('loaded-count',$this.data('loaded-count')+1);
            if ($this.data('loaded-count') >= bgImgs.length) {
              settings.afterLoaded.call($this);
            }
          });
        });

      });
    };
  })(jQuery);
