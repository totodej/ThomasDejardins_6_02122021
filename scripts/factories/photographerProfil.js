function PhotographerProfil(data){
    const { name, portrait, city, country, tagline } = data;
    const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;

    function getUserProfilDOM(){
        const article = document.createElement("article");
        const divProfilInformations = document.createElement("div");
        const h1 = document.createElement("h1");
        const pCity = document.createElement("p");
        const pTagline = document.createElement("p");
        const button = document.createElement("button");
        const img = document.createElement("img");
        
        divProfilInformations.className = "profilInformations";
        pCity.className = "locationProfil";
        pTagline.className = "taglineProfil";
        button.className = "contact_button";

        h1.textContent = name;
        pCity.textContent = city + ", " + country;
        pTagline.textContent = tagline;
        button.textContent = "Contactez-moi";

        button.setAttribute("onclick", displayModal);
        img.setAttribute("src", picture);

        article.appendChild(divProfilInformations);
        divProfilInformations.appendChild(h1);
        divProfilInformations.appendChild(pCity);
        divProfilInformations.appendChild(pTagline);
        article.appendChild(button);
        article.appendChild(img);

        return article;
    }

    return { name, portrait, city, country, tagline, getUserProfilDOM };
}