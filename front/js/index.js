"use strict";
import { urlApi } from "/front/js/urlApi.js";
const productsToLoad = await loadingProductApi();

displayProductsHome();

//=== Construction html et intégration des produits ===//
function displayProductHome(product) {
  const selectIdItem = document.getElementById("items");
  const createHref = document.createElement("a");
  createHref.href = `product.html?id=${product._id}`;
  selectIdItem.appendChild(createHref);
  createHref.innerHTML = `<article> 
      <img src="${product.imageUrl}" alt="${product.altTxt}"> 
      <h3 class="productName"> ${product.name}</h3> 
      <p class="productDescription">${product.description}</p> 
    </article> 
  </a>`;
}
//=== Chargement des poduits de l'Api ===//
async function loadingProductApi() {
  try {
    //- Appel de l'Api
    const response = await fetch(`${urlApi}products`);
    //- Reponse de l'Api
    const promiseApi = await response.json();
    return promiseApi;
  } catch (e) {
    alert("Un problème est survenue");
  }
}

//=== Récupère les produits à afficher et va les intégrer dans le html ===//
function displayProductsHome() {
  productsToLoad.forEach((product) => {
    displayProductHome(product);
  });
}
