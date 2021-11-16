"use strict";
import { setProductLocalStorage } from "/front/js/fonction.js";
import { getProductLocalStorage } from "/front/js/fonction.js";

//Récuperation de la chaine de requete dans l'url
const url_id = window.location.search;
console.log(url_id);
//Extraction de l'Id
const urlSearchParams = new URLSearchParams(url_id);
console.log(urlSearchParams);
const idParams = urlSearchParams.get("id");
const quantityValue = document.getElementById("quantity");
let productsStoreInLocalStorage = getProductLocalStorage();
const urlApi = "http://localhost:3000/api/";
const addProductApi = await loadingDataApi();

listenerAddToCart();
displayProductPage(addProductApi);
displayColors(addProductApi);

async function loadingDataApi() {
  try {
    //Appel API grace a l'Id du produits
    const response = await fetch(`${urlApi}products/${idParams}`);
    console.log(response);
    //Reponse de l'Api
    const arrayProduct = await response.json();
    console.log(arrayProduct);
    return arrayProduct;
  } catch (e) {
    alert("erreur un probléme est survenue");
  }
}

// integration des blocs Html et de leur valeur Api
function displayProductPage(selectedProduct) {
  const selectedImage = document.querySelector(".item__img");
  selectedImage.innerHTML = `<img src="${selectedProduct.imageUrl}" alt="${selectedProduct.altTxt}">`;
  document.querySelector("#title").innerHTML = selectedProduct.name;
  document.querySelector("#price").innerHTML = selectedProduct.price;
  document.querySelector("#description").innerHTML =
    selectedProduct.description;
}

//---------------couleurs Disponible ---------------------
//boucles pour afficher les nombre de bloc par rapport au couleur disponible
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

//s'il y a des produits enregistre dans le local storage
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

//------------------------LOCAL STORAGE---------------
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
    // s'il n'y a pas de produit enregistré dans le local storage
    else {
      productsStoreInLocalStorage = [];
      productsStoreInLocalStorage.push(userChoice);
      setProductLocalStorage(productsStoreInLocalStorage);
    }
  } else {
    alert("Merci de choisir une couleur et une quantité");
  }
}

function listenerAddToCart() {
  const selectBtnAddToCart = document.getElementById("addToCart");
  selectBtnAddToCart.addEventListener("click", (event) => {
    event.preventDefault();
    conditonPanierQuantity();
  });
}
