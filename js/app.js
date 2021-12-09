const KEY = "a4bf0529756780f1b6b25832be068431";

const btn = document.getElementById("search");
btn.addEventListener("click", function(){
  removeImages();
  setMessage("Searching...");

const input = getInputValues();


const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${input.term}&format=json&nojsoncallback=1&per_page=${input.number}&page=1`;

  
   fetch(url)
    .then( function(response) {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        throw "Something went wrong. :( Try again!";
      }
    })
    .then(function (data) {
      console.log(data);
      const arrayOfPhotos = data.photos.photo;
      const h2 = document.querySelector("#message");
      h2.style.display = "none";

    
      for (let i = 0; i < input.number; i++) {
        const imgUrl = getImageUrl(arrayOfPhotos[i], input.size);
        displayImg(imgUrl, input.size);
      }
    })
    .catch(function (error) {
        console.log(error);
        setMessage("Something went wrong. :( Try again!");
    }); 
}); 

function getInputValues() {
  const inputValues = {};
  inputValues.term = document.getElementById("search_term").value;
  inputValues.number = document.getElementById("search_number").value;

  const radio = document.querySelectorAll("input[type=radio]");
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked === true) {
      inputValues.size = radio[i].value;
      break;
    }
  }
  return inputValues;
} 

function removeImages() {
  const imgs = document.querySelectorAll(".flex-wrapper img");
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].remove();
  }
}

function getImageUrl(photoObject, size) {
  const imgUrl = `https://live.staticflickr.com/${photoObject.server}/${photoObject.id}_${photoObject.secret}_${size}.jpg`;
  return imgUrl;
}

function displayImg(url, size) {
  const img = document.createElement("img");
  img.src = url;

  const flexWrapper = document.querySelector(".flex-wrapper");
  if (size === "m") {
    flexWrapper.style.width = "52rem";
  } else if (size === "z") {
    flexWrapper.style.width = "88rem";
  } else {
    flexWrapper.style.width = "100%";
  }
    flexWrapper.appendChild(img);
}

function setMessage(message) {
  const h2 = document.querySelector("#message");
  h2.style.display = "block";
  h2.innerText = message;
}


//Bootstrap default
var myDefaultAllowList = bootstrap.Tooltip.Default.allowList
myDefaultAllowList.table = []
myDefaultAllowList.td = ['data-bs-option']
var myCustomRegex = /^data-my-app-[\w-]+/
myDefaultAllowList['*'].push(myCustomRegex)

//Bootstrap Carousel data
var myCarousel = document.querySelector('#myCarousel')
var carousel = new bootstrap.Carousel(myCarousel)

//Animation
let myAnimation = anime({
  targets: 'div', 
  translateX: 100,
  borderRadius: 50,
  duration: 2000,
  easing: 'linear',
  direction: 'alternate'
});
