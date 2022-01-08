async function getPhotographerProfil() {
  // les données récupérées dans le fichier json
  return fetch("/data/photographers.json").then((response) => {
    if (!response.ok) {
      console.log("erreur");
    }
    return response.json();
  });
}

// display the photographer
async function displayPhotographer(photographer) {
  const photographHeader = document.getElementById("photograph-header");
  const userProfilDOM = photographer.getUserProfilDOM();

  photographHeader.appendChild(userProfilDOM);
}

async function getPictures(medias) {
  medias.forEach(function (media, index) {
    addTitleForVideo(media);
    displayPicture(media, index);
  });

  clickHeart();

  // add title for videos without title
  function addTitleForVideo(media) {
    if (media.title === undefined) {
      let title = media.video;
      title = title.split("_").join(" ").split(".");
      title.pop();
      media.title = title.join(" ");
    }

    return media;
  }
  // display medias
  async function displayPicture(media, index) {
    const mediasPhotograph = document.getElementById("medias-photograph");
    const mediaModal = document.getElementById("media-modal");
    const userGaleryDOM = getUserGalleryDOM(
      media.title,
      media.photographerId,
      media.likes,
      media.image,
      media.video
    );

    mediasPhotograph.appendChild(userGaleryDOM);

    // display the lightbox    
    userGaleryDOM.addEventListener("click", function(){
        let indexMedia = index;
        displayModalLightBox(media);
        mediaModal.style.display = "block";
        closeLighBox(mediaModal); 

        const nextMedia = document.getElementById("next-slide");
        nextMedia.addEventListener("click", nextSlide);
        const prevMedia = document.getElementById("prev-slide");
        prevMedia.addEventListener("click", prevSlide); 
        
        function nextSlide(){
            const divSlide = document.getElementById("slide");
            const pMedia = document.querySelector("#slide p");
            let currentIndex = indexMedia += 1;

            if(currentIndex === medias.length){
                mediaModal.style.display = "none";
                mediaModal.innerHTML = "";
            } else {
                if(medias[currentIndex].image === undefined){
                    const videoMedia = document.createElement("video");
                    const sourceMedia = document.createElement("source");
                    const pathVideo = `/assets/photographers/${medias[currentIndex].photographerId}/${medias[currentIndex].video}`;
                    
                    divSlide.textContent = "";
                    pMedia.textContent = medias[currentIndex].title;
    
                    sourceMedia.setAttribute("src", pathVideo);
                    videoMedia.controls = "controls";
                    divSlide.appendChild(videoMedia);
                    videoMedia.appendChild(sourceMedia);
                    divSlide.appendChild(pMedia);
                    
                } else {
                    const imgMedia = document.createElement("img");
                    const pathImage = `/assets/photographers/${medias[currentIndex].photographerId}/${medias[currentIndex].image}`;
                    
                    divSlide.textContent = "";
                    pMedia.textContent = medias[currentIndex].title;
    
                    imgMedia.setAttribute("src", pathImage);
                    divSlide.appendChild(imgMedia);
                    divSlide.appendChild(pMedia);
                } 
    
                closeLighBox(mediaModal);
            }
        }

        function prevSlide(){
            const divSlide = document.getElementById("slide");
            const pMedia = document.querySelector("#slide p");
            let currentIndex = indexMedia -= 1;

            if(currentIndex === -1){
                mediaModal.style.display = "none";
                mediaModal.innerHTML = "";
            } else {
                if(medias[currentIndex].image === undefined){
                    const videoMedia = document.createElement("video");
                    const sourceMedia = document.createElement("source");
                    const pathVideo = `/assets/photographers/${medias[currentIndex].photographerId}/${medias[currentIndex].video}`;
                    
                    divSlide.textContent = "";
                    pMedia.textContent = medias[currentIndex].title;
    
                    sourceMedia.setAttribute("src", pathVideo);
                    videoMedia.controls = "controls";
                    divSlide.appendChild(videoMedia);
                    videoMedia.appendChild(sourceMedia);
                    divSlide.appendChild(pMedia);
                    
                } else {
                    const imgMedia = document.createElement("img");
                    const pathImage = `/assets/photographers/${medias[currentIndex].photographerId}/${medias[currentIndex].image}`;
                    
                    divSlide.textContent = "";
                    pMedia.textContent = medias[currentIndex].title;
    
                    imgMedia.setAttribute("src", pathImage);
                    divSlide.appendChild(imgMedia);
                    divSlide.appendChild(pMedia);
                } 
    
                closeLighBox(mediaModal)
            }   
        }
    })
    
    function displayModalLightBox(media) {
        const mediaModal = document.getElementById("media-modal");
        const lightBoxDOM = getLightBoxDOM(
          media.image,
          media.video,
          media.photographerId,
          media.title
        );
  
        mediaModal.appendChild(lightBoxDOM);
    }

    function closeLighBox(mediaModal) {
        const closeSlide = document.getElementById("close-slide");
        closeSlide.addEventListener("click", function () {
          mediaModal.style.display = "none";
          mediaModal.innerHTML = "";
        });
    }

    function getLightBoxDOM(image, video, id, title) {
        const divLightbox = document.createElement("div");
        const divSlide = document.createElement("div");
        const iClose = document.createElement("i");
        const iLeft = document.createElement("i");
        const iRight = document.createElement("i");
        const p = document.createElement("p");
          
        iClose.className = "fas fa-times";
        iLeft.className = "fas fa-chevron-left";
        iRight.className = "fas fa-chevron-right";
        
        divLightbox.setAttribute("id", "lightboxe")
        divSlide.setAttribute("id", "slide");
        iLeft.setAttribute("id", "prev-slide");
        iRight.setAttribute("id", "next-slide");
        iClose.setAttribute("id", "close-slide");
  
        if (image === undefined) {
            const videoPic = document.createElement("video");
            const source = document.createElement("source");
            const pathVideo = `/assets/photographers/${id}/${video}`;

            source.setAttribute("src", pathVideo);
            videoPic.controls = "controls";

            divSlide.appendChild(videoPic);
            videoPic.appendChild(source);
        } else {
            const img = document.createElement("img");
            const pathImage = `/assets/photographers/${id}/${image}`;
  
            img.setAttribute("src", pathImage);
            divSlide.appendChild(img);
        }
        
        p.textContent = title;

        divLightbox.appendChild(divSlide);
        divLightbox.appendChild(iClose);
        divLightbox.appendChild(iLeft);
        divLightbox.appendChild(iRight);
        divSlide.appendChild(p);
  
        return divLightbox;
    }  

    function getUserGalleryDOM(title, id, likes, image, video) {
        const divMedia = document.createElement("div");
        const divInformationsMedia = document.createElement("div");
        const pTitle = document.createElement("p");
        const divLikes = document.createElement("div");
        const pLikes = document.createElement("p");
        const heart = document.createElement("i");
        
        pTitle.textContent = title;
        pLikes.textContent = likes;
      
        divMedia.className = "media";
        divInformationsMedia.className = "informations-media";
        pTitle.className = "titleMedia";
        divLikes.className = "likes";
        heart.className = "far fa-heart heart-click";
        
        if (image === undefined) {
            const videoPic = document.createElement("video");
            const source = document.createElement("source");
            const pathVideo = `/assets/photographers/${id}/${video}`;

            source.setAttribute("src", pathVideo);
            source.setAttribute("type", "video/mp4");

            divMedia.appendChild(videoPic);
            videoPic.appendChild(source);
        } else {
            const img = document.createElement("img");
            const pathImage = `/assets/photographers/${id}/${image}`;

            img.setAttribute("src", pathImage);
            divMedia.appendChild(img);
        }
      
        divMedia.appendChild(divInformationsMedia);
        divInformationsMedia.appendChild(pTitle);
        divInformationsMedia.appendChild(divLikes);
        divLikes.appendChild(pLikes);
        divLikes.appendChild(heart);
      
        return divMedia;
    }
  }

  // add heart to each media
  async function clickHeart() {
    let heartClick = document.getElementsByClassName("heart-click");
    let totalLikes = Number(
      document.querySelector(".total-likes p").textContent
    );

    heartClick = [].slice.call(heartClick);
    heartClick.forEach(function (element) {
      element.addEventListener("click", function (e) {
        let likes = Number(e.target.parentNode.firstElementChild.textContent);
        if (element.matches(".far")) {
          element.classList.replace("far", "fas");
          likes = ++likes;
          totalLikes = ++totalLikes;
          e.target.parentNode.firstElementChild.textContent = likes;
          document.querySelector(".total-likes p").textContent = totalLikes;
        } else if (element.matches(".fas")) {
          element.classList.replace("fas", "far");
          likes = --likes;
          totalLikes = --totalLikes;
          e.target.parentNode.firstElementChild.textContent = likes;
          document.querySelector(".total-likes p").textContent = totalLikes;
        }
      });
    });
  }
}

// display total hearts and the price per day
function displayMoreInfos(price, medias) {
  const photographHeader = document.getElementById("photograph-header");
  const divInfo = document.createElement("div");
  const divHeart = document.createElement("div");
  const pHeart = document.createElement("p");
  const heart = document.createElement("i");
  const pPrice = document.createElement("p");

  let likes = 0;

  divInfo.className = "more-informations";
  divHeart.className = "total-likes";
  pPrice.className = "price-photographer";
  heart.className = "fas fa-heart";

  medias.forEach(function (media) {
    likes += media.likes;
  });

  pPrice.textContent = price + "€ / jour";

  photographHeader.appendChild(divInfo);
  divInfo.appendChild(divHeart);
  divInfo.appendChild(pPrice);
  divHeart.appendChild(pHeart);
  divHeart.appendChild(heart);

  pHeart.textContent = likes;
}

function getPhotographersInfoById(photographerData, id) {
  const photographer = photographerData.photographers.find(
    (photographer) => photographer.id === id
  );
  const medias = photographerData.media.filter(
    (media) => media.photographerId === id
  );

  return { ...photographer, medias };
}

function getURLID() {
  const search = window.location.search;
  const urlID = Number(search.split("").splice(4, search.length).join(""));

  return urlID;
}

function displayPhotographerInfo(photographer) {
  const { price, medias } = photographer;

  displayPhotographer(photographer);
  displayMoreInfos(price, medias);
  getPictures(medias);

  const contactMe = document.getElementById("contact-me");
  contactMe.addEventListener("click", displayModal);
  const profilName = document.getElementById("profil-name");
  profilName.textContent = photographer.name;
}

async function init() {
  // Récupère les datas des photographes
  const photographerData = await getPhotographerProfil();
  const photographerIds = photographerData.photographers.map(
    (photographer) => photographer.id
  );
  const photographersAggregated = photographerIds.map((id) =>
    getPhotographersInfoById(photographerData, id)
  );
  const photographerId = getURLID();
  const photographerTargeted = photographersAggregated.find(
    (photographer) => photographer.id === photographerId
  );
  const photographer = photographerFactory(photographerTargeted);

  displayPhotographerInfo(photographer);
}

init();
