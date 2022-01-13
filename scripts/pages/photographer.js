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

async function getPictures(photographer, medias) {
  const newMedias = [...medias];

  refreshView(newMedias);

  function refreshView(medias) {
    const newMedias = [...medias];
    const mediasPhotograph = document.getElementById("medias-photograph");

    mediasPhotograph.textContent = "";
    newMedias.forEach(function (media) {
      addTitleForVideo(media);
      displayPicture(media);
    });

    sortMedias(newMedias);
    clickHeart(photographer, newMedias);
    lightBox(newMedias);
    
    return newMedias;
  }

  function clickHeart(photographer, medias) {
    const newMedias = [...medias];  
    const hearts = document.getElementsByClassName("heart-click");
    const likes = document.querySelectorAll(".likes p");
    let totalLikesDOM = document.querySelector(".total-likes p");
    let totalLikes = Number(totalLikesDOM.textContent);

    photographer.totalLikes = totalLikes;

    if (localStorage.getItem(photographer.name) === null) {
      localStorage.setItem(photographer.name, JSON.stringify(photographer));
    }


    let storage = JSON.parse(localStorage.getItem(photographer.name));

    photographer.totalLikes = storage.totalLikes;
    totalLikesDOM.textContent = storage.totalLikes;

    for (let i = 0; i < hearts.length; i++) {
      const heart = hearts[i];
      
      if (storage.medias[i].isLiked === undefined) {
        storage.medias[i].isLiked = false;
      } else if (storage.medias[i].isLiked === true) {
        heart.classList.replace("far", "fas");
        //likes[i].textContent = storage.medias[i].likes;
      }
      
      //newMedias[i].likes = storage.medias[i].likes;

      heart.addEventListener("click", function () {
        if (heart.matches(".far")) {
          newMedias[i].isLiked = true;
          newMedias[i].likes = ++newMedias[i].likes;
          heart.classList.replace("far", "fas");
          likes[i].textContent = newMedias[i].likes;
          totalLikesDOM.textContent = ++photographer.totalLikes;
        } else if (heart.matches(".fas")) {
          newMedias[i].isLiked = false;
          newMedias[i].likes = --newMedias[i].likes;
          heart.classList.replace("fas", "far");
          likes[i].textContent = newMedias[i].likes;
          totalLikesDOM.textContent = --photographer.totalLikes;  
        }
        localStorage.setItem(photographer.name, JSON.stringify(photographer));
      });
      
    }
    return newMedias;
  }

  function lightBox(medias) {
    const newMedias = [...medias];
    const mediaModal = document.getElementById("media-modal");
    const elementsMedia = document.getElementsByClassName("media");

    for(let i = 0; i < elementsMedia.length; i++){
        let elementMedia = elementsMedia[i];
        let element = elementMedia.firstChild;
        element.addEventListener("click", function(){
            clickMedia(newMedias, i);
        })
    }

    function clickMedia(newMedias, i) {
      let indexMedia = i;
      displayModalLightBox(newMedias[i]);
      mediaModal.style.display = "block";
      closeLighBox(mediaModal);

      const nextMedia = document.getElementById("next-slide");
      nextMedia.addEventListener("click", nextSlide);
      const prevMedia = document.getElementById("prev-slide");
      prevMedia.addEventListener("click", prevSlide);

      function nextSlide() {
        const divSlide = document.getElementById("slide");
        const pMedia = document.querySelector("#slide p");
        let currentIndex = (indexMedia += 1);

        if (currentIndex === newMedias.length) {
          mediaModal.style.display = "none";
          mediaModal.innerHTML = "";
        } else {
          if (medias[currentIndex].image === undefined) {
            const videoMedia = document.createElement("video");
            const sourceMedia = document.createElement("source");
            const pathVideo = `/assets/photographers/${newMedias[currentIndex].photographerId}/${newMedias[currentIndex].video}`;

            divSlide.textContent = "";
            pMedia.textContent = newMedias[currentIndex].title;

            sourceMedia.setAttribute("src", pathVideo);
            videoMedia.controls = "controls";
            divSlide.appendChild(videoMedia);
            videoMedia.appendChild(sourceMedia);
            divSlide.appendChild(pMedia);
          } else {
            const imgMedia = document.createElement("img");
            const pathImage = `/assets/photographers/${newMedias[currentIndex].photographerId}/${newMedias[currentIndex].image}`;

            divSlide.textContent = "";
            pMedia.textContent = newMedias[currentIndex].title;

            imgMedia.setAttribute("src", pathImage);
            divSlide.appendChild(imgMedia);
            divSlide.appendChild(pMedia);
          }

          closeLighBox(mediaModal);
        }
      }

      function prevSlide() {
        const divSlide = document.getElementById("slide");
        const pMedia = document.querySelector("#slide p");
        let currentIndex = (indexMedia -= 1);

        if (currentIndex === -1) {
          mediaModal.style.display = "none";
          mediaModal.innerHTML = "";
        } else {
          if (newMedias[currentIndex].image === undefined) {
            const videoMedia = document.createElement("video");
            const sourceMedia = document.createElement("source");
            const pathVideo = `/assets/photographers/${newMedias[currentIndex].photographerId}/${newMedias[currentIndex].video}`;

            divSlide.textContent = "";
            pMedia.textContent = newMedias[currentIndex].title;

            sourceMedia.setAttribute("src", pathVideo);
            videoMedia.controls = "controls";
            divSlide.appendChild(videoMedia);
            videoMedia.appendChild(sourceMedia);
            divSlide.appendChild(pMedia);
          } else {
            const imgMedia = document.createElement("img");
            const pathImage = `/assets/photographers/${newMedias[currentIndex].photographerId}/${newMedias[currentIndex].image}`;

            divSlide.textContent = "";
            pMedia.textContent = newMedias[currentIndex].title;

            imgMedia.setAttribute("src", pathImage);
            divSlide.appendChild(imgMedia);
            divSlide.appendChild(pMedia);
          }

          closeLighBox(mediaModal);
        }
      }
      return newMedias;
    }

    function closeLighBox(mediaModal) {
      const closeSlide = document.getElementById("close-slide");
      closeSlide.addEventListener("click", function () {
        mediaModal.style.display = "none";
        mediaModal.innerHTML = "";
      });
    }

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

      divLightbox.setAttribute("id", "lightboxe");
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
  }

  function sortMedias(medias) {
    const newMedias = [...medias]; 
    console.log(newMedias) 
    const sort = document.getElementById("sort");
    sort.addEventListener("change", function () {
      switch (sort.value) {
        case "popularity":
          refreshView(sortByLike(newMedias));
          break;
        case "date":
          refreshView(sortByDate(newMedias));
          break;
        case "title":
          refreshView(sortByTitle(newMedias));
          break;

        default:
          break;
      }
    });

    function sortByLike(medias) {
      const newMedias = [...medias];
      newMedias.sort((itemMax, itemMin) => itemMin.likes - itemMax.likes);
      console.log(newMedias);
      return newMedias;
    }

    function sortByDate(medias) {
      const newMedias = [...medias];
      newMedias.sort((itemMax, itemMin) => new Date(itemMin.date) - new Date(itemMax.date));
      console.log(newMedias);
      return newMedias;
    }

    function sortByTitle(medias) {
      const newMedias = [...medias];

      function compare(itemA, itemB) {
        if (itemA.title < itemB.title) {
          return -1;
        }
        if (itemA.title > itemB.title) {
          return 1;
        }
        return 0;
      }
      newMedias.sort(compare);
      console.log(newMedias);
      return newMedias;
    }
  }

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
  async function displayPicture(media) {
    const mediasPhotograph = document.getElementById("medias-photograph");
    //const mediaModal = document.getElementById("media-modal");
    const userGaleryDOM = getUserGalleryDOM(
      media.title,
      media.photographerId,
      media.likes,
      media.image,
      media.video
    );

    mediasPhotograph.appendChild(userGaleryDOM);

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
  getPictures(photographer, medias);

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
