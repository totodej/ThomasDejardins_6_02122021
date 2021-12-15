async function getPhotographers() {
  // les données récupérées dans le fichier json
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function () {
    const data = JSON.parse(this.responseText);
    displayData(data.photographers);
  };
  xmlhttp.open("GET", "/data/photographers.json");
  xmlhttp.send();
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    const photographerTags = photographer.tag;
    const portrait = document.getElementById("portrait");
    const art = document.getElementById("art");
    const fashion = document.getElementById("fashion");
    const architecture = document.getElementById("architecture");
    const travel = document.getElementById("travel");
    const sports = document.getElementById("sports");
    const animals = document.getElementById("animals");
    const events = document.getElementById("events");
    
    photographersSection.appendChild(userCardDOM);

    portrait.addEventListener("click", function(){
        userCardDOM.remove();
        for (var i = 0; i < photographerTags.length; i++) {
            if (photographerTags[i] === portrait.textContent.toLowerCase()) {
                console.log(userCardDOM)
                photographersSection.appendChild(userCardDOM);
            }
        }
    })

    art.addEventListener("click", function(){
        userCardDOM.remove();
        for (var i = 0; i < photographerTags.length; i++) {
            if (photographerTags[i] === art.textContent.toLowerCase()) {
                photographersSection.appendChild(userCardDOM);
            }
        }
    })

    fashion.addEventListener("click", function(){
        userCardDOM.remove();
        for (var i = 0; i < photographerTags.length; i++) {
            if (photographerTags[i] === fashion.textContent.toLowerCase()) {
                photographersSection.appendChild(userCardDOM);
            }
        }
    })

    architecture.addEventListener("click", function(){
        userCardDOM.remove();
        for (var i = 0; i < photographerTags.length; i++) {
            if (photographerTags[i] === architecture.textContent.toLowerCase()) {
                photographersSection.appendChild(userCardDOM);
            }
        }
    })

    travel.addEventListener("click", function(){
        userCardDOM.remove();
        for (var i = 0; i < photographerTags.length; i++) {
            if (photographerTags[i] === travel.textContent.toLowerCase()) {
                photographersSection.appendChild(userCardDOM);
            }
        }
    })

    sports.addEventListener("click", function(){
        userCardDOM.remove();
        for (var i = 0; i < photographerTags.length; i++) {
            if (photographerTags[i] === sports.textContent.toLowerCase()) {
                photographersSection.appendChild(userCardDOM);
            }
        }
    })

    animals.addEventListener("click", function(){
        userCardDOM.remove();
        for (var i = 0; i < photographerTags.length; i++) {
            if (photographerTags[i] === animals.textContent.toLowerCase()) {
                photographersSection.appendChild(userCardDOM);
            }
        }
    })

    events.addEventListener("click", function(){
        userCardDOM.remove();
        for (var i = 0; i < photographerTags.length; i++) {
            if (photographerTags[i] === events.textContent.toLowerCase()) {
                photographersSection.appendChild(userCardDOM);
            }
        }
    })
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
}

init();
