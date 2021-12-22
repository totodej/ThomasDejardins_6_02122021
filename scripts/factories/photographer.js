function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, tag, id } = data;
  const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;
  const adress = `photographer.html?id=${id}`;

  function getUserCardDOM() {
    // show informations for each photographers
    const article = document.createElement("article");
    const divPresentation = document.createElement("a");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const divInformation = document.createElement("div");
    const pCity = document.createElement("p");
    const pTagline = document.createElement("p");
    const pPrice = document.createElement("p");
    const divTags = document.createElement("div");
    const ul = document.createElement("ul");

    divPresentation.className = "presentation";
    divInformation.className = "informations";
    pCity.className = "location";
    pTagline.className = "tagline";
    pPrice.className = "price";
    divTags.className = "photographer-tags";

    h2.textContent = name;
    pCity.textContent = city + ", " + country;
    pTagline.textContent = tagline;
    pPrice.textContent = price + "€/jour";

    divPresentation.setAttribute("href", adress);
    img.setAttribute("src", picture);

    function renderTagsList(element, index, array) {
      const li = document.createElement("li");
        
      ul.appendChild(li);
      li.innerHTML += array[index];
    }

    tag.forEach(renderTagsList);

    article.appendChild(divPresentation);
    divPresentation.appendChild(img);
    divPresentation.appendChild(h2);
    article.appendChild(divInformation);
    divInformation.appendChild(pCity);
    divInformation.appendChild(pTagline);
    divInformation.appendChild(pPrice);
    article.appendChild(divTags);
    divTags.appendChild(ul);

    return article;
  }

   return { name, picture, city, country, tagline, price, tag, id, getUserCardDOM };
}
