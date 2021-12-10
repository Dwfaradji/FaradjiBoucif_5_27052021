"use strict";
import { setProductLocalStorage } from "/front/js/fonction.js";
import { getProductsInLocalStorage } from "/front/js/fonction.js";
import { urlApi } from "/front/js/urlApi.js";

//- Récupération de la chaine de requète dans l'url
const urlId = window.location.search;
//- Extraction de l'Id
const urlSearchParams = new URLSearchParams(urlId);
//- Récupère l'id du produit
const idProduct = urlSearchParams.get("id");

const quantityValue = document.getElementById("quantity");
let productsStoreInLocalStorage = getProductsInLocalStorage();

const productToDisplay = await loadingDataApi();

listenerAddToCart();
displayProductPage(productToDisplay);
displayColors(productToDisplay);

//=== Récupère l'id du produit à afficher ===//
async function loadingDataApi() {
  try {
    //- Appel API grâce a l'Id du produits
    const response = await fetch(`${urlApi}products/${idProduct}`);
    //- Réponse de l'Api
    const arrayProduct = await response.json();
    return arrayProduct;
  } catch (e) {
    alert("Erreur un probléme est survenue");
  }
}

//=== Intégration des blocs Html et les valeurs du produit récupérer dans l'Api ===//
function displayProductPage(selectedProduct) {
  const selectedImage = document.querySelector(".item__img");
  selectedImage.innerHTML = `<img src="${selectedProduct.imageUrl}" alt="${selectedProduct.altTxt}">`;
  document.querySelector("#title").innerHTML = selectedProduct.name;
  document.querySelector("#price").innerHTML = selectedProduct.price;
  document.querySelector("#description").innerHTML =
    selectedProduct.description;
}

//=== Afficher les couleurs disponible du produit ===//
function displayColors(product) {
  const colorsOfTheProduct = product.colors;
  colorsOfTheProduct.forEach((colorsProduct) => {
    const selectColors = document.querySelector("#colors");
    const choiceColors = document.createElement("option");
    selectColors.appendChild(choiceColors);
    const displayColorsProducts = (choiceColors.value = colorsProduct);
    choiceColors.innerHTML = displayColorsProducts;
  });
}

//=== Récupère les information du produits saisie par l'utilisateur ===//
function usersProductChoice() {
  const userChoice = {
    name: document.getElementById("title").innerHTML,
    image: document.querySelector(".item__img img").getAttribute("src"),
    altTxt: document.querySelector(".item__img img").getAttribute("alt"),
    price: document.querySelector("#price").textContent,
    idProduit: idProduct,
    color: document.querySelector("#colors").value,
    quantity: parseInt(quantityValue.value),
  };
  return userChoice;
}

//=== Analyse la quantité du produit et va les enregistrer dans le local storage selon la couleur du produit ===//
function quantityConditionAddToCard() {
  const userChoice = usersProductChoice();
  if (
    quantityValue.value > 0 &&
    quantityValue.value <= 100 &&
    colors.value != 0
  ) {
    window.location.href = "cart.html";
    if (productsStoreInLocalStorage) {
      const productFind = productsStoreInLocalStorage.find(
        (product) =>
          product.idProduit === userChoice.idProduit &&
          product.color === colors.value
      );
      if (productFind) {
        productFind.quantity += userChoice.quantity;
        setProductLocalStorage(productsStoreInLocalStorage);
      } else {
        productsStoreInLocalStorage.push(userChoice);
        setProductLocalStorage(productsStoreInLocalStorage);
      }
    }
    else {
      productsStoreInLocalStorage = [];
      productsStoreInLocalStorage.push(userChoice);
      setProductLocalStorage(productsStoreInLocalStorage);
    }
  } else {
    alert("Merci de choisir une couleur et une quantité");
  }
}
//=== Envoi le produit dans le panier ===//
function listenerAddToCart() {
  const selectBtnAddToCart = document.getElementById("addToCart");
  selectBtnAddToCart.addEventListener("click", (event) => {
    event.preventDefault();
    quantityConditionAddToCard();
  });
}
