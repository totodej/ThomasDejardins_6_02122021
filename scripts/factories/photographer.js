function photographerFactory(data) {
  const {
    name,
    portrait,
    city,
    country,
    tagline,
    price,
    tag,
    id,
    title,
    image,
    likes,
    date,
    medias,
  } = data;
  const profilPicture = `assets/photographers/Photographers_ID_Photos/${portrait}`;
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
    const altProfilPicture = name + " profil picture"

    divPresentation.className = "presentation";
    divInformation.className = "informations";
    pCity.className = "location";
    pTagline.className = "tagline";
    pPrice.className = "price";

    h2.textContent = name;
    pCity.textContent = city + ", " + country;
    pTagline.textContent = tagline;
    pPrice.textContent = price + "€/jour";

    divPresentation.setAttribute("href", adress);
    divPresentation.setAttribute("aria-label", name)
    img.setAttribute("src", profilPicture);
    img.setAttribute("alt", altProfilPicture);

    article.appendChild(divPresentation);
    divPresentation.appendChild(img);
    divPresentation.appendChild(h2);
    article.appendChild(divInformation);
    divInformation.appendChild(pCity);
    divInformation.appendChild(pTagline);
    divInformation.appendChild(pPrice);

    return article;
  }

  function getUserProfilDOM() {
    const article = document.createElement("article");
    const divProfilInformations = document.createElement("div");
    const h1 = document.createElement("h1");
    const pCity = document.createElement("p");
    const pTagline = document.createElement("p");
    const button = document.createElement("button");
    const img = document.createElement("img");

    divProfilInformations.className = "profil-informations";
    pCity.className = "location-profil";
    pTagline.className = "tagline-profil";
    button.className = "contact_button";

    h1.textContent = name;
    pCity.textContent = city + ", " + country;
    pTagline.textContent = tagline;
    button.textContent = "Contactez-moi";

    button.setAttribute("id", "contact-me");
    button.setAttribute("aria-label", "contactez-moi");
    img.setAttribute("src", profilPicture);
    img.setAttribute("alt", name);

    article.appendChild(divProfilInformations);
    divProfilInformations.appendChild(h1);
    divProfilInformations.appendChild(pCity);
    divProfilInformations.appendChild(pTagline);
    article.appendChild(button);
    article.appendChild(img);

    return article;
  }

  return {
    name,
    profilPicture,
    city,
    country,
    tagline,
    price,
    tag,
    id,
    title,
    image,
    likes,
    date,
    medias,
    getUserCardDOM,
    getUserProfilDOM
  };
}
