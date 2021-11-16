"use strict";
import { setProductLocalStorage } from "/front/js/fonction.js";
import { getProductLocalStorage } from "/front/js/fonction.js";

displayProducts(); // c'est l'appel à cette fonction qui va tout déclencher
displaysTotalPriceOfTheItems();
displaysTotalArticle();

// integration du bloc html
function displayProduct(integrateProduct) {
  const selectedId = document.getElementById("cart__items");
  const createArticle = document.createElement("article");
  selectedId.appendChild(createArticle);
  createArticle.classList.add("cart__item");
  createArticle.dataset.id = integrateProduct.idProduit;
  createArticle.dataset.color = integrateProduct.color;
  createArticle.innerHTML = `<div class="cart__item__img"> 
    <img src="${integrateProduct.image}"alt="${integrateProduct.altTxt}"> 
    </div>   
    <div class="cart__item__content"> 
    <div class="cart__item__content__titlePrice"> 
    <h2>${integrateProduct.name}</h2>
    <span><strong>${integrateProduct.color}</strong></span> 
    <p>${integrateProduct.price} € </p> 
    </div>
    <div class="cart__item__content__settings"> 
    <div class="cart__item__content__settings__quantity"> 
    <p>Qté : </p> 
    <input type="number" class="itemQuantity" name="itemQuantity" min=1 max=100 value= 
    "${integrateProduct.quantity}" data-id="${integrateProduct.idProduit}"> 
    </div> 
    <div class="cart__item__content__settings__delete"> 
    <p class="deleteItem">Supprimer</p> </div> 
    </div> 
    </article>`;

  // listeners liens de suppression (on les met seulement apres construction de l'html)
  const deleteLinks = document.querySelectorAll(".deleteItem");
  deleteLinks.forEach((deleteLink) => {
    deleteLink.addEventListener("click", deleteItem);
  });

  // listeners modif quantité (on les met seulement apres construction de l'html)
  const quantityLinks = document.querySelectorAll(".itemQuantity");
  quantityLinks.forEach((quantityLink) => {
    quantityLink.addEventListener("change", changeTheQuantityOfTheProduct);
  });
}

function displaysTotalPriceOfTheItems() {
  let productsStoreInLocalStorage = getProductLocalStorage();
  //----Calcul le prix total de tout les articles ----//
  let totalPriceProducts = productsStoreInLocalStorage.reduce(
    (totalPrice, products) => {
      return totalPrice + products.quantity * products.price;
    },
    0
  );
  //affiche le prix total de tout les articles
  document.querySelector("#totalPrice").innerHTML = totalPriceProducts;
}

function displaysTotalArticle() {
  let productsStoreInLocalStorage = getProductLocalStorage();
  //----Calcul le nombre total des articles----//
  let totalItemProducts = productsStoreInLocalStorage.reduce(
    (totalItems, items) => {
      return totalItems + items.quantity;
    },
    0
  );
  //affiche le nombre total des articles
  document.querySelector("#totalQuantity").innerHTML = totalItemProducts;
}

// Va afficher le bloc html
function displayProducts() {
  let productsInCart = getProductLocalStorage();
  console.log(productsInCart);
  if (productsInCart != null) {
    productsInCart = productsInCart.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
    productsInCart.forEach((integreElement) => {
      displayProduct(integreElement);
    });
  }
}

//Supprime un produit
function deleteItem(event) {
  event.preventDefault();
  // suppression de l'élément dans le dom
  const productToDelete = event.target.closest(".cart__item");
  const idProductToDelete = productToDelete.dataset.id;
  const colorProductTodelete = productToDelete.dataset.color;
  productToDelete.remove();
  // suppression de l'élément dans le local storage : tableau filtré sans l'élément supprimé
  let productsInCart = getProductLocalStorage();
  productsInCart = productsInCart.filter(
    (productLocalStorage) =>
      productLocalStorage.idProduit !== idProductToDelete ||
      productLocalStorage.color !== colorProductTodelete
  );
  // sauvegarde dans le local storage
  setProductLocalStorage(productsInCart);
  // mise à jour du prix et du nb d'article
  displaysTotalPriceOfTheItems();
  displaysTotalArticle();
}

// Modifie la quantité
function changeTheQuantityOfTheProduct(event) {
  event.preventDefault();
  //recuperer l'id et la couleur du produit
  const productToModifQuantity = event.target.closest(".cart__item");
  console.log(productToModifQuantity);
  const productToModifId = productToModifQuantity.dataset.id;
  const productToModifColor = productToModifQuantity.dataset.color;
  //modifie la quantité dans le local storage
  const productsInCart = getProductLocalStorage();
  const productTuUpdate = productsInCart.find(
    (product) =>
      product.idProduit === productToModifId &&
      product.color === productToModifColor
  );

  const quantityMin = event.target.closest(".itemQuantity");
  if (quantityMin.value < 1) {
    alert("Veuillez indiquer une valeur positive");
    return (quantityMin.value = 1);
  } else {
    productTuUpdate.quantity = event.target.valueAsNumber;
    setProductLocalStorage(productsInCart);
  }
  displaysTotalPriceOfTheItems();
  displaysTotalArticle();
}

//***************************--Formulaire--***************************//
//Efface le message d'erreur si les valeurs sont remplie
function deleteSendError() {
  //cible l'emplacement du message d'erreur
  let deleteSendErrorLinks = document.querySelectorAll(
    ".cart__order__form__question p"
  );
  //---Boucle qui va permettre d'enlever le message d'erreur--//
  deleteSendErrorLinks.forEach((deleteSendErrorLink) => {
    //condition qui va tester si le champs a été remplie
    if (order !== "") {
      deleteSendErrorLink.innerHTML = null;
    }
  });
}

function checkFormValidity() {
  deleteSendError();
  //---------Les REGEX---------//
  // parametre necessaire pour la validation du formulaire
  const myRegex_letter = /^[a-zA-Z-\s]{3,20}$/;
  const myRegex_adress = /^[a-zA-Z0-9\s]+$/;
  const myRegex_city = /^[0-9]+$/;
  const myRegex_email =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const hasErrorForFirstname = checkInputValidityAndDisplayErrorIfNeeded(
    myRegex_letter,
    firstName,
    "firstNameErrorMsg",
    "Le prénon doit comporter des lettres uniquements"
  );

  const hasErrorForLastname = checkInputValidityAndDisplayErrorIfNeeded(
    myRegex_letter,
    lastName,
    "lastNameErrorMsg",
    "Le nom doit comporter des lettres uniquements"
  );

  const hasErrorForAddress = checkInputValidityAndDisplayErrorIfNeeded(
    myRegex_adress,
    address,
    "addressErrorMsg",
    "Veuillez indiquer une adresse correct"
  );

  const hasErrorForCity = checkInputValidityAndDisplayErrorIfNeeded(
    myRegex_city,
    city,
    "cityErrorMsg",
    "La ville doit comporter des chiffres uniquements"
  );

  const hasErrorForEmail = checkInputValidityAndDisplayErrorIfNeeded(
    myRegex_email,
    email,
    "emailErrorMsg",
    "Veuillez indiquer un email valide"
  );

  if (
    !hasErrorForFirstname &&
    !hasErrorForLastname &&
    !hasErrorForAddress &&
    !hasErrorForCity &&
    !hasErrorForEmail
  ) {
    const productIdUsers = getProductLocalStorage();
    console.log(productIdUsers);
    if (productIdUsers.length != 0) {
      makeAndOrder();
    } else {
      alert("Vous n'avez pas de produit dans votre panier");
    }
  }
}

function checkInputValidityAndDisplayErrorIfNeeded(
  myRegex,
  inputToCheck,
  selectorForErrorMessage,
  errorMessage
) {
  const sendError = "Ceci est un message d'erreur";
  if (inputToCheck.value.trim() == "") {
    document.getElementById(selectorForErrorMessage).innerHTML = sendError;
    return true;
  } else if (myRegex.test(inputToCheck.value.trim()) == false) {
    document.getElementById(selectorForErrorMessage).innerHTML = errorMessage;
    return true;
  }
  return false;
}

//récupere tout les id des produits dans le  local storage
function productIdUsers() {
  let produitStockerLocalStorage = getProductLocalStorage();
  //variables qui stocker les id recuperer dans le local storage
  const productOrderId = [];
  //boucle qui va recuperer tous les id dans le local storage
  produitStockerLocalStorage.forEach((productOrder) => {
    productOrderId.push(productOrder.idProduit);
  });
  return productOrderId;
}
console.log(productIdUsers());
// recupere les informations de l'utilisateur ainsi que son panier

function infoUser() {
  const productOrderId = productIdUsers();
  var order = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
    products: productOrderId,
  };
  localStorage.setItem("userInfoCart", JSON.stringify(order));
  return order;
}

//Listener qui va permettre d'envoyer le formulaire
function listenerCart() {
  const selectBtnOrder = document.getElementById("order");
  selectBtnOrder.addEventListener("click", (e) => {
    e.preventDefault();
    checkFormValidity();
  });
}
listenerCart();

//Envoie les information a l'api et récupere l'id de la commande
async function makeAndOrder() {
  //recupere les information saisi par l'utilisateur formulaire et son panier
  const order = infoUser();
  //envoi les donnée  recuperer par l'utilisateur a l'API
  const post = {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "Content-Type": "application/json" },
  };
  console.log(post);
  //appel de l'api
  const response = await fetch(
    "http://localhost:3000/api/products/order",
    post
  );
  console.log(response);
  //reponse de l'Api
  var commandeOrderId = await response.json();
  console.log(commandeOrderId);
  confirmationOfOrder(commandeOrderId);
}

//envoi la confirmation de la commande et son numero
function confirmationOfOrder(commandeOrderId) {
  window.location.href = "confirmation.html?id=" + `${commandeOrderId.orderId}`;
}
