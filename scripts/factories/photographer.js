function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const divPresentation = document.createElement('div');
        divPresentation.className = "presentation";
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const divInformation = document.createElement('div');
        divInformation.className = "informations";
        const pCity = document.createElement('p');
        pCity.className = "location";
        pCity.textContent = city + ", " + country;
        const pTagline = document.createElement('p');
        pTagline.className = "tagline";
        pTagline.textContent = tagline;
        const pPrice = document.createElement('p');
        pPrice.className = "price"
        pPrice.textContent = price + "€/jour";

        article.appendChild(divPresentation);
        divPresentation.appendChild(img);
        divPresentation.appendChild(h2);
        article.appendChild(divInformation);
        divInformation.appendChild(pCity);
        divInformation.appendChild(pTagline);
        divInformation.appendChild(pPrice);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}