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
  getPictures(medias);
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
