function openModal()
{
  document.getElementById('modalView').style.display = "block";
}
function closeModal()
{
  document.getElementById('modalView').style.display ="none";
}
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n)
{
  showSlides(slideIndex += n);
}
function currentSlide(n)
{
  showSlides(slideIndex = n);
}
function showSlides(n)
{
  var i;
  var slides = document.getElementsByClassName("photo-slides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.lenght)
    slideIndex = 1;
  if(n < 1)
    slideIndex = slides.lenght;
  for(i=0; i< slides.lenght; i++)
  {
    slides[i].style.display = "none";
  }
  for(i=0; i < dots.lenght; i++)
  {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}
