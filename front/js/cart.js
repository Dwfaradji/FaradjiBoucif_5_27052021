"use strict";

import { setProductLocalStorage } from "/front/js/fonction.js";
import { getProductLocalStorage } from "/front/js/fonction.js";

displayProducts(); // c'est l'appel à cette fonction qui va tout déclencher
displaysTotalPriceOfTheItems();
displaysTotalArticle();

//=== Intégration du bloc html et les valeurs du produits récupérer dans le local storage ===//
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

  //- Listeners liens de suppression (on les met seulement apres construction de l'html)
  const deleteLinks = document.querySelectorAll(".deleteItem");
  deleteLinks.forEach((deleteLink) => {
    deleteLink.addEventListener("click", deleteItem);
  });

  //- Listeners modif quantité (on les met seulement apres construction de l'html)
  const quantityLinks = document.querySelectorAll(".itemQuantity");
  quantityLinks.forEach((quantityLink) => {
    quantityLink.addEventListener("change", changeTheQuantityOfTheProduct);
  });
}

//=== Calcul le prix total de tout les articles présent dans le panier===//
function displaysTotalPriceOfTheItems() {
  let productsStoreInLocalStorage = getProductLocalStorage();
  let totalPriceProducts = productsStoreInLocalStorage.reduce(
    (totalPrice, products) => {
      return totalPrice + products.quantity * products.price;
    },
    0
  );
  //- Affiche le prix total de tout les articles
  document.querySelector("#totalPrice").innerHTML = totalPriceProducts;
}
//=== Calcul le nombre total de tout les articles présent dans le panier ===//
function displaysTotalArticle() {
  let productsStoreInLocalStorage = getProductLocalStorage();
  let totalItemProducts = productsStoreInLocalStorage.reduce(
    (totalItems, items) => {
      return totalItems + items.quantity;
    },
    0
  );
  //- Affiche le nombre total des articles
  document.querySelector("#totalQuantity").innerHTML = totalItemProducts;
}

//=== Afficher les produits enregistrer sur le local storage dans le panier ===//
function displayProducts() {
  let productsInCart = getProductLocalStorage();
  if (productsInCart != null) {
    //- Va trier les produit par leur id
    productsInCart = productsInCart.sort(function (a, b) {
      return a.idProduit.localeCompare(b.idProduit);
    });
    productsInCart.forEach((integreElement) => {
      displayProduct(integreElement);
    });
  }
}

//=== Permet de supprimer un produit individuelement dans la page panier et le supprime aussi du local storage ===//
function deleteItem(event) {
  event.preventDefault();
  //- Suppression de l'élément dans le dom
  const productToDelete = event.target.closest(".cart__item");
  const idProductToDelete = productToDelete.dataset.id;
  const colorProductTodelete = productToDelete.dataset.color;
  productToDelete.remove();
  //- Suppression de l'élément dans le local storage : tableau filtré sans l'élément supprimé
  let productsInCart = getProductLocalStorage();
  productsInCart = productsInCart.filter(
    (productLocalStorage) =>
      productLocalStorage.idProduit !== idProductToDelete ||
      productLocalStorage.color !== colorProductTodelete
  );
  //- Sauvegarde dans le local storage
  setProductLocalStorage(productsInCart);
  //- Mise à jour du prix et du nombre d'article
  displaysTotalPriceOfTheItems();
  displaysTotalArticle();
}

//=== Permet de modifie la quantité du produit et enregistre la modification dans le local storage ===//
function changeTheQuantityOfTheProduct(event) {
  event.preventDefault();
  //- Récupèrer l'id et la couleur du produit à modifier
  const productToModifQuantity = event.target.closest(".cart__item");
  console.log(productToModifQuantity);
  const productToModifId = productToModifQuantity.dataset.id;
  const productToModifColor = productToModifQuantity.dataset.color;
  //- Modifie la quantité dans le local storage
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
  //- Mise à jour du prix et du nombre d'article
  displaysTotalArticle();
  displaysTotalPriceOfTheItems();
}

//******************************************-- FORMULAIRE --******************************************//

//=== Efface le message d'erreur si des valeurs on était saisie ===//
function deleteSendError() {
  let deleteSendErrorLinks = document.querySelectorAll(
    ".cart__order__form__question p"
  );
  deleteSendErrorLinks.forEach((deleteSendErrorLink) => {
    //- Condition qui va tester si le champs a été remplie
    if (order !== "") {
      deleteSendErrorLink.innerHTML = null;
    }
  });
}
//=== Condition de saisie du formulaire ===//
function checkFormValidity() {
  deleteSendError();
  //- Erreur de saisie dans le formulaire
  const myRegex_letter = /^[a-zA-Z-\s]{3,20}$/;
  const myRegex_adress = /^[a-zA-Z0-9\s]+$/;
  const myRegex_city = /^[0-9]+$/;
  const myRegex_email =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //- Erreur dans le formaulaire
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
//== Analyse le formulaire ===//
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

//=== Récupère tout les id des produits stocker dans le  local storage ===//
function productIdUsers() {
  let produitStockerLocalStorage = getProductLocalStorage();
  //- Variables qui stocker les id récupérer dans le local storage
  const productOrderId = [];
  //- Boucle qui va récupérer tous les id dans le local storage
  produitStockerLocalStorage.forEach((productOrder) => {
    productOrderId.push(productOrder.idProduit);
  });
  return productOrderId;
}
console.log(productIdUsers());

//=== Récupère les informations de l'utilisateur ainsi que son panier et va les stocker dans le local storage ===//
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

//=== Listener qui va permettre d'envoyer le formulaire ===//
function listenerCart() {
  const selectBtnOrder = document.getElementById("order");
  selectBtnOrder.addEventListener("click", (e) => {
    e.preventDefault();
    checkFormValidity();
  });
}
listenerCart();

//=== Envoie les information a l'api et récupere l'id de la commande ===//
async function makeAndOrder() {
  //- Récupere les information saisi par l'utilisateur formulaire et son panier
  const order = infoUser();
  //- Envoi les donnée de type post  recuperer par l'utilisateur àgit add l'API
  const post = {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "Content-Type": "application/json" },
  };
  console.log(post);
  //- Appel de l'api
  const response = await fetch(
    "http://localhost:3000/api/products/order",
    post
  );
  console.log(response);
  //- Récupere la réponse avec le numéro de la commande 
  var commandeOrderId = await response.json();

  confirmationOfOrder(commandeOrderId);
}

//=== Envoi la confirmation de la commande ===//
function confirmationOfOrder(commandeOrderId) {
  window.location.href = "confirmation.html?id=" + `${commandeOrderId.orderId}`;
}
