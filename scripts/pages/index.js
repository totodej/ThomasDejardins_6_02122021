let photographerData;

// Get datas from json file
async function getPhotographers() {
  return fetch("data/photographers.json").then((response) => {
    if (!response.ok) {
      console.log("erreur");
    }
    return response.json();
  });
}

// Filter the photographers on click
async function filter(photographers) {
  const portrait = document.getElementById("portrait");
  const art = document.getElementById("art");
  const fashion = document.getElementById("fashion");
  const architecture = document.getElementById("architecture");
  const travel = document.getElementById("travel");
  const sports = document.getElementById("sports");
  const animals = document.getElementById("animals");
  const events = document.getElementById("events");
  let filterPhotographers = [];
  const selectedTags = [];

  function addOnClick(photographers, element) {
    const selectedPhotographers = [];
    selectedTags.push(element.textContent.toLowerCase());

    photographers.forEach(function (photographer) {
      const photographerTag = photographer.tag;
      if (photographerTag.includes(element.textContent.toLowerCase())) {
        if (!filterPhotographers.includes(photographer)) {
          selectedPhotographers.push(photographer);
        }
      }
    });

    selectedPhotographers.forEach(function (photographer) {
      filterPhotographers.push(photographer);
    });

    displayData(filterPhotographers);
  }

  function removeOnClick(photographers, element) {
    filterPhotographers = [];
    const selecterIndex = selectedTags.indexOf(
      element.textContent.toLowerCase()
    );
    if (selecterIndex !== -1) {
      selectedTags.splice(selecterIndex, 1);
    }
    //console.log("selectedTags", selectedTags);

    photographers.forEach(function (photographer) {
      const test = selectedTags.filter((tag) => photographer.tag.includes(tag));
      //console.log("photographer.tag", photographer.tag);
      //console.log("test", test);
      if (test.length !== 0 && !filterPhotographers.includes(photographer)) {
        filterPhotographers.push(photographer);
      }
    });
    //console.log("selectedTag", selectedTags);
    //console.log("filterPhoto", filterPhotographers);
    if (filterPhotographers.length === 0) {
      displayData(photographers);
    } else {
      displayData(filterPhotographers);
    }
  }

  function isActive(element) {
    element.style.backgroundColor = "#901C1C";
    element.style.color = "white";
  }

  function isNotActive(element) {
    element.style.backgroundColor = "white";
    element.style.color = "#901C1C";
  }

  portrait.addEventListener("click", function () {
    if (portrait.style.color === "white") {
      isNotActive(portrait);
      removeOnClick(photographers, portrait);
    } else {
      isActive(portrait);
      addOnClick(photographers, portrait);
    }
  });
  art.addEventListener("click", function () {
    if (art.style.color === "white") {
      isNotActive(art);
      removeOnClick(photographers, art);
    } else {
      isActive(art);
      addOnClick(photographers, art);
    }
  });
  fashion.addEventListener("click", function () {
    if (fashion.style.color === "white") {
      isNotActive(fashion);
      removeOnClick(photographers, fashion);
    } else {
      isActive(fashion);
      addOnClick(photographers, fashion);
    }
  });
  architecture.addEventListener("click", function () {
    if (architecture.style.color === "white") {
      isNotActive(architecture);
      removeOnClick(photographers, architecture);
    } else {
      isActive(architecture);
      addOnClick(photographers, architecture);
    }
  });
  travel.addEventListener("click", function () {
    if (travel.style.color === "white") {
      isNotActive(travel);
      removeOnClick(photographers, travel);
    } else {
      isActive(travel);
      addOnClick(photographers, travel);
    }
  });
  sports.addEventListener("click", function () {
    if (sports.style.color === "white") {
      isNotActive(sports);
      removeOnClick(photographers, sports);
    } else {
      isActive(sports);
      addOnClick(photographers, sports);
    }
  });
  animals.addEventListener("click", function () {
    if (animals.style.color === "white") {
      isNotActive(animals);
      removeOnClick(photographers, animals);
    } else {
      isActive(animals);
      addOnClick(photographers, animals);
    }
  });
  events.addEventListener("click", function () {
    if (events.style.color === "white") {
      isNotActive(events);
      removeOnClick(photographers, events);
    } else {
      isActive(events);
      addOnClick(photographers, events);
    }
  });
}

// Display the photographers
async function displayData(photographers) {
  const photographersSection = document.getElementById("photographer_section");
  photographersSection.innerHTML = "";
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  photographerData = await getPhotographers();
  displayData(photographerData.photographers);
  filter(photographerData.photographers);
  
}

init();
