//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographerProfil() {
    // les données récupérées dans le fichier json
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function () {
      const data = JSON.parse(this.responseText);
      displayData(data.photographers);
    };
    xmlhttp.open("GET", "/data/photographers.json");
    xmlhttp.send();
}

async function displayData(photographers){
    const photographHeader = document.getElementById("photograph-header");
    const search = window.location.search;
    const adressId = Number(search.split('').splice(4,search.length).join(''));
    
    photographers.forEach(function(photographer){
        if(photographer.id === adressId){
            const photographerModel = PhotographerProfil(photographer);
            const userProfilDOM = photographerModel.getUserProfilDOM();
            console.log("photographer", photographer);
            console.log("userProfilDOM", userProfilDOM)
            photographHeader.appendChild(userProfilDOM);
        }
    });
}

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographerProfil();
}
  
init();