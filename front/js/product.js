"use strict";
async function loadingProduct() {
  try {
    //Récuperation de la chaine de requete dans l'url
    const url_id = window.location.search;
    console.log(url_id);

    //Extraction de l'Id
    const urlSearchParams = new URLSearchParams(url_id);
    console.log(urlSearchParams);
    const idParams = urlSearchParams.get("id");

    //Appel API grace a l'Id du produits
    const response = await fetch(
      "http://localhost:3000/api/products/" + `${idParams}`
    );

    //Reponse de l'Api
    const arrayProduct = await response.json();
    console.log(arrayProduct);

    api_blockHtml();

    addColorie();
    //-------------boutton Ajout au panier------------------

    btn_ajoutAuPanier();
    return arrayProduct;
  } catch (e) {}
}
const arrayProduct = loadingProduct();
console.log(arrayProduct);

const nombreArticle = document.getElementById("quantity");
// integration des blocs Html et de leur valeur Api

function api_blockHtml() {
  const selectClassItem_img = document.querySelector(".item__img");

  selectClassItem_img.innerHTML = `<img src="${arrayProduct.imageUrl}" alt="${arrayProduct.altTxt}">`;

  document.querySelector("#title").innerHTML = arrayProduct.name;
  document.querySelector("#price").innerHTML = arrayProduct.price;
  document.querySelector("#description").innerHTML = arrayProduct.description;
}
//---------------couleurs Disponible ---------------------
function addColorie() {
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
  choixDeUtilisateur = {
    name: arrayProduct.name,
    image: arrayProduct.imageUrl,
    altTxt: arrayProduct.altTxt,
    price: arrayProduct.price,
    idProduit: arrayProduct._id,
    color: colors.value,
    quantity: parseInt(nombreArticle.value),
  };
  console.log(choixDeUtilisateur);
}

function getProductLocalStorage() {
  return JSON.parse(localStorage.getItem("produits"));
}
function conditonPanierQuantity(params) {
  if (
    nombreArticle.value > 0 &&
    nombreArticle.value <= 100 &&
    colors.value != 0
  ) {
    window.location.href = "cart.html";
    usersChoice();
    //------------------------LOCAL STORAGE---------------

    //--- JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JS
    let produitStockerLocalStorage = getProductLocalStorage();
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

// function setProductsInCart() {
//   const produitStockerLocalStorage = [];
//   localStorage.setItem("produits", JSON.stringify(produitStockerLocalStorage));
//   return produitStockerLocalStorage;
// }
// console.log(setProductsInCart());
