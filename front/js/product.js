"use strict";
//Récuperation de la chaine de requete dans l'url
const url_id = window.location.search;
console.log(url_id);
//Extraction de l'Id
const urlSearchParams = new URLSearchParams(url_id);
console.log(urlSearchParams);
const idParams = urlSearchParams.get("id");
const nombreArticle = document.getElementById("quantity");

addProductsApi();
btn_ajoutAuPanier();


async function loadingProduct() {
  try {
    //Appel API grace a l'Id du produits
    const response = await fetch(
      `http://localhost:3000/api/products/${idParams}`
    );
    console.log(response);
    //Reponse de l'Api
    const arrayProduct = await response.json();
    console.log(arrayProduct);
    return arrayProduct;
  } catch (e) {}
}

// var arrayProduct = (async ()=> (await loadingProduct()))();
// console.log(arrayProduct);
// // const arrayProduct = loadingProduct()
// // console.log(arrayProduct);


// integration des blocs Html et de leur valeur Api
function api_blockHtml(arrayProduct) {
  const selectClassItem_img = document.querySelector(".item__img");
  selectClassItem_img.innerHTML = `<img src="${arrayProduct.imageUrl}" alt="${arrayProduct.altTxt}">`;
  document.querySelector("#title").innerHTML = arrayProduct.name;
  document.querySelector("#price").innerHTML = arrayProduct.price;
  document.querySelector("#description").innerHTML = arrayProduct.description;
}
async function addProductsApi() {
  const addProductApi = await loadingProduct();
  console.log(addProductApi);
  api_blockHtml(addProductApi);
  addColorie(addProductApi);
}

//addProductsApi();
//---------------couleurs Disponible ---------------------
function addColorie(arrayProduct,) {
  const displaysColors = arrayProduct.colors;
  //boucles pour afficher les nombre de bloc par rapport au couleur disponible
  displaysColors.forEach((colorsProduct) => {
    const selectColors = document.querySelector("#colors");
    const choiceColors = document.createElement("option");
    selectColors.appendChild(choiceColors);
    const displayColorsProducts = (choiceColors.value = colorsProduct);
    choiceColors.innerHTML = displayColorsProducts;
  });
}

//s'il y a des produits enregistre dans le local storage
function usersChoice() {
  const choixDeUtilisateur = {
    name: document.getElementById("title").innerHTML,
    image: document.querySelector(".item__img img").getAttribute("src"),
    altTxt: document.querySelector(".item__img img").getAttribute("alt"),
    price: document.querySelector("#price").textContent,
    idProduit: idParams,
    color: document.querySelector("#colors").value,
    quantity: parseInt(nombreArticle.value),
  };
  console.log(choixDeUtilisateur);
  return choixDeUtilisateur;
}
 //--- JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JS
function getProductLocalStorage() {
  return JSON.parse(localStorage.getItem("produits"));
}

function conditonPanierQuantity() {
  const choixDeUtilisateur = usersChoice();
  let produitStockerLocalStorage = getProductLocalStorage();
  if (
    nombreArticle.value > 0 &&
    nombreArticle.value <= 100 &&
    colors.value != 0
  ) {
    window.location.href = "cart.html";
    //------------------------LOCAL STORAGE---------------
       
    if (produitStockerLocalStorage) {
      const productFind = produitStockerLocalStorage.find(
        (product) =>
          product.idProduit === choixDeUtilisateur.idProduit &&
          product.color === colors.value
      );
      if (productFind) {
        productFind.quantity += choixDeUtilisateur.quantity;
        localStorage.setItem(
          "produits",
          JSON.stringify(produitStockerLocalStorage)
        );
      } else {
        produitStockerLocalStorage.push(choixDeUtilisateur);
        localStorage.setItem(
          "produits",
          JSON.stringify(produitStockerLocalStorage)
        );
      }
    }
    // s'il n'y a pas de produit enregistré dans le local storage
    else {
      produitStockerLocalStorage = [];
      produitStockerLocalStorage.push(choixDeUtilisateur);
      localStorage.setItem(
        "produits",
        JSON.stringify(produitStockerLocalStorage)
      );
    }
  } else {
    alert("Merci de choisir une couleur et une quantité");
  }
}
function btn_ajoutAuPanier() {
  const btn_addToCart = document.getElementById("addToCart");
  btn_addToCart.addEventListener("click", (event) => {
    event.preventDefault();
    conditonPanierQuantity();
  });
}
