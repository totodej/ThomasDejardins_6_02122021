// Get datas from json file
async function getPhotographerProfil() {

    return fetch("data/photographers.json").then((response) => {
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
  
  async function getPictures(photographer) {
    photographer = JSON.parse(localStorage.getItem(photographer.name));
    const medias = photographer.medias;
    document.querySelector(".total-likes p").textContent = photographer.totalLikes;

    refreshView(medias);
    lightBox(medias);
    addLike(photographer);
    sortMedias(photographer);
  
    function refreshView(medias) {
      const mediasPhotograph = document.getElementById("medias-photograph");
  
      mediasPhotograph.innerHTML = "";
      
      medias.forEach(function (media) {
        addTitleForVideo(media);
        displayCard(media);
      });
    }
  
    function addLike(photographer){
      const buttonsHeart = document.getElementsByClassName("heart-click");
      const hearts = document.getElementsByClassName("heart");
      const likes = document.querySelectorAll(".likes p");
      let totalLikesDOM = document.querySelector(".total-likes p");
      let totalLikes = Number(totalLikesDOM.textContent); 

      for (let i = 0; i < hearts.length; i++) {
          const buttonHeart = buttonsHeart[i];
          const heart = hearts[i];
      
          buttonHeart.addEventListener("click", function () {
            if (heart.matches(".far")) {
              medias[i].isLiked = true;
              medias[i].likes = ++medias[i].likes;
              totalLikes = ++totalLikes;
              heart.classList.replace("far", "fas");
            } else if (heart.matches(".fas")) {
              medias[i].isLiked = false;
              medias[i].likes = --medias[i].likes;
              totalLikes = --totalLikes;
              heart.classList.replace("fas", "far");
            }
            likes[i].textContent = medias[i].likes;
            totalLikesDOM.textContent = totalLikes;
            photographer.totalLikes = totalLikes;
            localStorage.setItem(photographer.name, JSON.stringify(photographer));
          });
        }
    }
  
    function sortMedias(photographer){
      const buttonSort = document.getElementById("button-sort");
      const blocSort = document.getElementById("bloc-sort");
      const popularity = document.getElementById("popularity");
      const date = document.getElementById("date");
      const title = document.getElementById("title");
      const medias = photographer.medias;
  
      buttonSort.addEventListener("click", function () {
          if ((blocSort.style.display = "none")) {
            blocSort.style.display = "block";
          } else if ((blocSort.style.display = "block")) {
            blocSort.style.display = "none";
          }
      });
  
      popularity.addEventListener("click", function () {
          buttonSort.textContent = popularity.textContent;
          blocSort.style.display = "none";
          const byLike = sortByLike(medias);
          console.log(byLike);
          refreshView(byLike);
          lightBox(medias);
          addLike(photographer, medias);
      });
  
      date.addEventListener("click", function () {
          buttonSort.textContent = date.textContent;
          blocSort.style.display = "none";
          const byDate = sortByDate(medias);
          console.log(byDate);
          refreshView(byDate);
          lightBox(medias);
          addLike(photographer, medias);
      });

      title.addEventListener("click", function () {
        buttonSort.textContent = title.textContent;
        blocSort.style.display = "none";
        const byTitle = sortByTitle(medias);
          console.log(byTitle);
          refreshView(byTitle);
          lightBox(medias);
          addLike(photographer, medias);
      });
  
      function sortByLike(medias) {
          medias.sort((itemMax, itemMin) => itemMin.likes - itemMax.likes);
          return medias;
      }
  
      function sortByDate(medias) {
          medias.sort(
            (itemMax, itemMin) => new Date(itemMin.date) - new Date(itemMax.date)
          );
          return medias;
      }

      function sortByTitle(medias) {
  
        function compare(itemA, itemB) {
          if (itemA.title < itemB.title) {
            return -1;
          }
          if (itemA.title > itemB.title) {
            return 1;
          }
          return 0;
        }
        medias.sort(compare);
        return medias;
      }
      
    }
  
    function lightBox(medias) {
      const newMedias = [...medias];
      const mediaModal = document.getElementById("media-modal");
      const elementsMedia = document.getElementsByClassName("media");
      const header = document.querySelector("header");
      const main = document.querySelector("main");
  
      for (let i = 0; i < elementsMedia.length; i++) {
        let elementMedia = elementsMedia[i];
        let element = elementMedia.firstChild;
        element.addEventListener("click", function () {
          header.style.display = "none";
          main.style.display = "none";
          clickMedia(newMedias, i);
        });
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
            header.style.display = "block";
            main.style.display = "block";
            mediaModal.innerHTML = "";
          } else {
            if (medias[currentIndex].image === undefined) {
              const videoMedia = document.createElement("video");
              const sourceMedia = document.createElement("source");
              const pathVideo = `assets/photographers/${newMedias[currentIndex].photographerId}/${newMedias[currentIndex].video}`;
  
              divSlide.textContent = "";
              pMedia.textContent = newMedias[currentIndex].title;
  
              sourceMedia.setAttribute("src", pathVideo);
              sourceMedia.setAttribute("alt", newMedias[currentIndex].title)
              videoMedia.controls = "controls";
              divSlide.appendChild(videoMedia);
              videoMedia.appendChild(sourceMedia);
              divSlide.appendChild(pMedia);
            } else {
              const imgMedia = document.createElement("img");
              const pathImage = `assets/photographers/${newMedias[currentIndex].photographerId}/${newMedias[currentIndex].image}`;
  
              divSlide.textContent = "";
              pMedia.textContent = newMedias[currentIndex].title;
  
              imgMedia.setAttribute("src", pathImage);
              imgMedia.setAttribute("alt", newMedias[currentIndex].title);
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
            header.style.display = "block";
            main.style.display = "block";
            mediaModal.innerHTML = "";
          } else {
            if (newMedias[currentIndex].image === undefined) {
              const videoMedia = document.createElement("video");
              const sourceMedia = document.createElement("source");
              const pathVideo = `assets/photographers/${newMedias[currentIndex].photographerId}/${newMedias[currentIndex].video}`;
  
              divSlide.textContent = "";
              pMedia.textContent = newMedias[currentIndex].title;
  
              sourceMedia.setAttribute("src", pathVideo);
              sourceMedia.setAttribute("alt", newMedias[currentIndex].title);
              videoMedia.controls = "controls";
              divSlide.appendChild(videoMedia);
              videoMedia.appendChild(sourceMedia);
              divSlide.appendChild(pMedia);
            } else {
              const imgMedia = document.createElement("img");
              const pathImage = `assets/photographers/${newMedias[currentIndex].photographerId}/${newMedias[currentIndex].image}`;
  
              divSlide.textContent = "";
              pMedia.textContent = newMedias[currentIndex].title;
  
              imgMedia.setAttribute("src", pathImage);
              imgMedia.setAttribute("alt", newMedias[currentIndex].title);
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
          header.style.display = "block";
          main.style.display = "block";
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
        const buttonClose = document.createElement("button");
        const iClose = document.createElement("i");
        const buttonLeft = document.createElement("button");
        const iLeft = document.createElement("i");
        const buttonRight = document.createElement("button");
        const iRight = document.createElement("i");
        const p = document.createElement("p");
  
        iClose.className = "fas fa-times";
        iLeft.className = "fas fa-chevron-left";
        iRight.className = "fas fa-chevron-right";
  
        divLightbox.setAttribute("id", "lightboxe");
        divSlide.setAttribute("id", "slide");
        buttonLeft.setAttribute("id", "prev-slide");
        buttonLeft.setAttribute("aria-label", "précédente image");
        buttonRight.setAttribute("id", "next-slide");
        buttonRight.setAttribute("aria-label", "prochaine image");
        buttonClose.setAttribute("id", "close-slide");
        buttonClose.setAttribute("aria-label", "fermeture de la modal");
  
        if (image === undefined) {
          const videoPic = document.createElement("video");
          const source = document.createElement("source");
          const pathVideo = `assets/photographers/${id}/${video}`;
  
          source.setAttribute("src", pathVideo);
          source.setAttribute("alt", title);
          videoPic.setAttribute("aria-label", title);
          videoPic.controls = "controls";
  
          divSlide.appendChild(videoPic);
          videoPic.appendChild(source);
        } else {
          const img = document.createElement("img");
          const pathImage = `assets/photographers/${id}/${image}`;
  
          img.setAttribute("src", pathImage);
          img.setAttribute("alt", title);
          divSlide.appendChild(img);
        }
  
        p.textContent = title;
  
        divLightbox.appendChild(divSlide);
        divLightbox.appendChild(buttonClose);
        divLightbox.appendChild(buttonLeft);
        divLightbox.appendChild(buttonRight);
        buttonClose.appendChild(iClose);
        buttonLeft.appendChild(iLeft);
        buttonRight.appendChild(iRight);
        divSlide.appendChild(p);
  
        return divLightbox;
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
    async function displayCard(media) {
      const mediasPhotograph = document.getElementById("medias-photograph");
      const userGaleryDOM = getUserGalleryDOM(
        media.title,
        media.photographerId,
        media.likes,
        media.image,
        media.video,
        media.isLiked
      );
  
      mediasPhotograph.appendChild(userGaleryDOM);
  
      function getUserGalleryDOM(title, id, likes, image, video, isLiked) {
        const articleMedia = document.createElement("article");
        const aMedia = document.createElement("a");
        const divInformationsMedia = document.createElement("div");
        const pTitle = document.createElement("p");
        const divLikes = document.createElement("div");
        const pLikes = document.createElement("p");
        const buttonHeart = document.createElement("button");
        const heart = document.createElement("i");
        const altMedia = title + ", vue rapprochée";
  
        pTitle.textContent = title;
        pLikes.textContent = likes;
  
        articleMedia.className = "media";
        divInformationsMedia.className = "informations-media";
        pTitle.className = "title-media";
        divLikes.className = "likes";
  
        if(isLiked === true){
          heart.className = "fas fa-heart heart";
        }else {
          heart.className = "far fa-heart heart";
        }
        
        buttonHeart.className = "heart-click";
  
        if (image === undefined) {
          const videoPic = document.createElement("video");
          const source = document.createElement("source");
          const pathVideo = `assets/photographers/${id}/${video}`;
  
          aMedia.setAttribute("href", "#");
          videoPic.setAttribute("aria-label", altMedia);
          source.setAttribute("src", pathVideo);
          source.setAttribute("type", "video/mp4");
          source.setAttribute("alt", altMedia)
  
          aMedia.appendChild(videoPic);
          videoPic.appendChild(source);
        } else {
          const img = document.createElement("img");
          const pathImage = `assets/photographers/${id}/${image}`;
  
          aMedia.setAttribute("href", "#");
          img.setAttribute("src", pathImage);
          img.setAttribute("alt", altMedia);
  
          aMedia.appendChild(img);
        }
  
        buttonHeart.setAttribute("aria-label", "likes");
  
        articleMedia.appendChild(aMedia);
        articleMedia.appendChild(divInformationsMedia);
        divInformationsMedia.appendChild(pTitle);
        divInformationsMedia.appendChild(divLikes);
        divLikes.appendChild(pLikes);
        divLikes.appendChild(buttonHeart);
        buttonHeart.appendChild(heart);
  
        return articleMedia;
      }
    }
  }
  
  // Display total hearts and the price per day
  function displayMoreInfos(photographer, price, medias) {
    const pHeart = document.querySelector(".total-likes p");
    const pPrice = document.querySelector(".price-photographer");
    let likes = 0;
  
    medias.forEach(function (media) {
      likes += media.likes;
    });
    photographer.totalLikes = likes;
    pHeart.textContent = likes;
    pPrice.textContent = price + "€ / jour";
  }
  
  // Add medias to each photographers by id
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
  
  // Display the medias to the gallery
  function displayPhotographerInfo(photographer) {
    const { price, medias } = photographer;

    displayPhotographer(photographer);
    displayMoreInfos(photographer, price, medias);

    if (localStorage.getItem(photographer.name) === null) {
        localStorage.setItem(photographer.name, JSON.stringify(photographer));
      }

    getPictures(photographer, medias);

    const contactMe = document.getElementById("contact-me");
    contactMe.addEventListener("click", displayModal);
    const profilName = document.getElementById("profil-name");
    profilName.textContent = photographer.name;
  }
  
  async function init() {
    // Get photographer datas with the id in the URL
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
  