    async function getPhotographers() {
        // les données récupérées dans le fichier json
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = function() {
            const data = JSON.parse(this.responseText);
            displayData(data.photographers);
        }
        xmlhttp.open("GET", "/data/photographers.json");
        xmlhttp.send();
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
    };
    
    init();
    
    