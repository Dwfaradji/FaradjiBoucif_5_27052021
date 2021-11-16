"use strict";
const urlApi = "http://localhost:3000/api/";

const productsToLoad = await loadingProductApi();
displayProductsHome();

//Construction html et integration des produits
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

async function loadingProductApi() {
  try {
    // Appel de l'Api
    const response = await fetch(`${urlApi}products`);
    console.log(response);
    //Reponse de l'Api
    const promiseApi = await response.json();
    console.log(promiseApi);
    return promiseApi;
  } catch (e) {
    alert("Un probleme est survenue");
  }
}

//Récupère les produit à afficher et va les intégrer dans le html
function displayProductsHome() {
  productsToLoad.forEach((product) => {
    displayProductHome(product);
  });
  console.log(productsToLoad);
}
