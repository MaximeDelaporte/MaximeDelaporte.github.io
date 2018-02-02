$(document).ready(function()
{

  var baseURL = "http://api.tvmaze.com/";

  $('body').on('click', '#search', function(){
    var search = $('[data-use="searchbox"]').val();
    var htmlRender = "";
    url = baseURL + "search/shows?q=" +search;
    $.ajax({
      url: url
    }).done(function(data){
      $('[data-use="searchbox"]').val("");
      htmlRender += "<ul class=result>";
      $.each(data, function(index, value){
        htmlRender += "<li data-id='" + value.show.id + "'>" + value.show.name + "</li>";
      })
      htmlRender += "</li>";
      $('[data-use="list"]').html(htmlRender);
    });
  })
  $('body').on('click', '[data-use="list"] li', function()
  {
      var id = $(this).data('id');
      $.ajax({
        url: baseURL + "shows/" + id
      }).done(function(data){
        localStorage.setItem('lastViewed', data.name);
        var htmlRender = "";
        var name = data.name;
        var status = data.status;
        if (data.image["medium"] !="")
        {
          var img = data.image["medium"];
        }
        else {
          var img = "";
        }
        var summary = data.summary;
        var premiered = data.premiered;
        var officialWebsite = data.officialSite;
        htmlRender += "<h2 class='name'>" + name + "</h2>";
        htmlRender += "<div class='serie-info'>";
        htmlRender += "<img src='" + img + "' alt='" + name + "'>";
        htmlRender += "<ul class='genre'>";
        htmlRender += "<p>Genres :</p>"
        $.each(data.genres, function(index, value){
          htmlRender +="<li>" + value + "</li>"
        });
        htmlRender +="</ul>";
        htmlRender += "<p class='summary'>" + summary + "</p>";
        htmlRender +="</div>";
        htmlRender +="<div class='serie-details'>"
        htmlRender += "<span class='status'>Status : <span class='small'>" + status + "</span></span>";
        htmlRender +="<p class='premiered'>" + premiered + "</p>";
        htmlRender +="<a href='" + officialWebsite + "'> Official Website</a>";
        htmlRender +="</div>";

        $('[data-use="detail"]').html(htmlRender);
      });
  });
});
