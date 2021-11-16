"use strict";
import { setProductLocalStorage } from "/front/js/fonction.js";
import { getProductLocalStorage } from "/front/js/fonction.js";

//- Récuperation de la chaine de requete dans l'url
const url_id = window.location.search;
//- Extraction de l'Id
const urlSearchParams = new URLSearchParams(url_id);
//- Récupere l'id du produit
const idParams = urlSearchParams.get("id");

const quantityValue = document.getElementById("quantity");
let productsStoreInLocalStorage = getProductLocalStorage();

const urlApi = "http://localhost:3000/api/";
const addProductApi = await loadingDataApi();

listenerAddToCart();
displayProductPage(addProductApi);
displayColors(addProductApi);

//=== Recupere l'id du produit a afficher ===//
async function loadingDataApi() {
  try {
    //- Appel API grace a l'Id du produits
    const response = await fetch(`${urlApi}products/${idParams}`);
    console.log(response);
    //- Reponse de l'Api
    const arrayProduct = await response.json();
    console.log(arrayProduct);
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

//=== Afficher les couleur disponible du produit ===//
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

//=== Récupere les information du produits saisie par l'utilisateur ===//
function usersProductChoice() {
  const userChoice = {
    name: document.getElementById("title").innerHTML,
    image: document.querySelector(".item__img img").getAttribute("src"),
    altTxt: document.querySelector(".item__img img").getAttribute("alt"),
    price: document.querySelector("#price").textContent,
    idProduit: idParams,
    color: document.querySelector("#colors").value,
    quantity: parseInt(quantityValue.value),
  };
  console.log(userChoice);
  return userChoice;
}

//=== Analyse la quantité du produit et va les enregistrer dans le local storage selon la couleur du produit ===//
function conditonPanierQuantity() {
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
    conditonPanierQuantity();
  });
}
