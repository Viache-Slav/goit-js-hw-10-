import './style.css';
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

function showElement(element) {
    if (element.hasAttribute('data-display')) {
      element.style.display = element.getAttribute('data-display');
    } else {
      element.style.display = 'block';
    }
  }
  
  function hideElement(element) {
    if (!element.hasAttribute('data-display')) {
      element.setAttribute('data-display', element.style.display);
    }
    element.style.display = 'none';
  }

  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const catInfo = document.querySelector('.cat-info');
  
  hideElement(breedSelect);
  showElement(loader);
  hideElement(catInfo);
  
  fetchBreeds()
  .then((breeds) => {
    hideElement(loader);
    hideError(); 
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    showElement(breedSelect);
  })
  .catch((error) => {
    hideElement(loader);
    showError(error.message); 
  });
  
  breedSelect.addEventListener("change", (event) => {
    const breedId = event.target.value;
    if (breedId === "") {
      hideElement(catInfo);
      return;
    }
    hideElement(catInfo);
    showElement(loader);

    fetchCatByBreed(breedId)
      .then((data) => {
        hideElement(loader);
        if (data.length > 0) {
          const cat = data[0];
          catInfo.innerHTML = "";
          const img = document.createElement("img");
          img.src = cat.url;
          img.alt = cat.breeds[0].name;
          catInfo.appendChild(img);
          const h2 = document.createElement("h2");
          h2.textContent = cat.breeds[0].name;
          catInfo.appendChild(h2);
          const p = document.createElement("p");
          p.textContent = cat.breeds[0].description;
          catInfo.appendChild(p);
          const p2 = document.createElement("p");
          p2.className = "temperament";
          const temperaments = cat.breeds[0].temperament.split(",");
          p2.innerHTML = "<strong>Temperament:</strong> " + temperaments.join(", ");
          catInfo.appendChild(p2);
        } 
        else {
          showError("Sorry, no cat found for this breed.");
        } 
      showElement(catInfo); 
      })
      .catch((error) => {
        hideElement(loader);
        showError(error.message); 
      });
  });

function showError(message) {
  const error = document.querySelector(".error");
  error.textContent = message;
  error.classList.remove("hidden");
  error.classList.add("visible");
  error.style.display = "block";
}

function hideError() {
  const error = document.querySelector(".error");
  error.classList.remove("visible");
  error.classList.add("hidden");
}