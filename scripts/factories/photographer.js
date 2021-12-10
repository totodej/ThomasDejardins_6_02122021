function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, tag } = data;

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

        // show each tag for each photographer
        const divTags = document.createElement('div');
        divTags.className = 'photographer-tags';
        const ul = document.createElement('ul');

        tag.forEach(renderTagsList);

        function renderTagsList(element, index, array){
            var li = document.createElement('li');
            ul.appendChild(li);
            li.innerHTML += array[index];
            
        }
        
        article.appendChild(divPresentation);
        divPresentation.appendChild(img);
        divPresentation.appendChild(h2);
        article.appendChild(divInformation);
        divInformation.appendChild(pCity);
        divInformation.appendChild(pTagline);
        divInformation.appendChild(pPrice);
        article.appendChild(divTags);
        divTags.appendChild(ul);
        return (article);
    }
    return { name, picture, city, country, tagline, price, tag, getUserCardDOM }
}