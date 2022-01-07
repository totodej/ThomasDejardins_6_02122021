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
  medias.forEach(function (media) {
    addTitleForVideo(media);
    displayPicture(media);
  });

  sortMedias(medias);
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
  async function displayPicture(media) {
    const mediasPhotograph = document.getElementById("medias-photograph");
    const userGaleryDOM = getUserGalleryDOM(
      media.title,
      media.photographerId,
      media.likes,
      media.image,
      media.video
    );

    mediasPhotograph.appendChild(userGaleryDOM);
  }

  // sort medias
  function sortMedias(medias) {
    const sort = document.getElementById("sort");
    sort.addEventListener("change", function () {
      if (sort.value === "popularity") {
        sortByLikes(medias);
      }
      if (sort.value === "date") {
        sortByDate(medias);
      }
      if (sort.value === "title") {
        sortByTitle(medias);
      }
    });

    // sort all medias by Likes
    async function sortByLikes(medias) {
      const mediasPhotograph = document.getElementById("medias-photograph");

      medias.sort((itemMax, itemMin) => itemMin.likes - itemMax.likes);
      mediasPhotograph.textContent = "";
      medias.forEach(function (media) {
        displayPicture(media);
      });
    }

    // sort all medias by date
    async function sortByDate(medias) {
      const mediasPhotograph = document.getElementById("medias-photograph");

      medias.sort(
        (itemMax, itemMin) => new Date(itemMin.date) - new Date(itemMax.date)
      );
      mediasPhotograph.textContent = "";
      medias.forEach(function (media) {
        displayPicture(media);
      });
    }

    // sort all medias by title
    async function sortByTitle(medias) {
      const mediasPhotograph = document.getElementById("medias-photograph");

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
      mediasPhotograph.textContent = "";
      medias.forEach(function (media) {
        displayPicture(media);
      });
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

function getUserGalleryDOM(title, id, likes, image, video) {
  const divMedia = document.createElement("div");
  const img = document.createElement("img");
  const videoPic = document.createElement("video");
  const source = document.createElement("source");
  const divInformationsMedia = document.createElement("div");
  const pTitle = document.createElement("p");
  const divLikes = document.createElement("div");
  const pLikes = document.createElement("p");
  const heart = document.createElement("i");
  const pathImage = `/assets/photographers/${id}/${image}`;
  const pathVideo = `/assets/photographers/${id}/${video}`;

  img.setAttribute("src", pathImage);
  videoPic.controls = "controls";
  source.setAttribute("src", pathVideo);
  source.setAttribute("type", "video/mp4");

  pTitle.textContent = title;
  pLikes.textContent = likes;

  divMedia.className = "media";
  divInformationsMedia.className = "informations-media";
  pTitle.className = "titleMedia";
  divLikes.className = "likes";
  heart.className = "far fa-heart heart-click";

  if (image === undefined) {
    divMedia.appendChild(videoPic);
    videoPic.appendChild(source);
  } else {
    divMedia.appendChild(img);
  }

  divMedia.appendChild(divInformationsMedia);
  divInformationsMedia.appendChild(pTitle);
  divInformationsMedia.appendChild(divLikes);
  divLikes.appendChild(pLikes);
  divLikes.appendChild(heart);

  return divMedia;
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
