"use strict";
//Va chercher les éléments dans le local storage
function getProductsInCart() {
  return JSON.parse(localStorage.getItem("produits"));
}

// integration du bloc html
function displayProduct(integreElement) {
  const id_cart_items = document.getElementById("cart__items");
  const article_items = document.createElement("article");
  id_cart_items.appendChild(article_items);
  article_items.classList.add("cart__item");
  article_items.dataset.id = integreElement.idProduit;
  article_items.dataset.color = integreElement.color;
  // --------------------Class cart__item__img--------------------//
  article_items.innerHTML = `<div class=cart__item__img> 
    <img src= 
    "${integreElement.image}"
     alt= 
    "${integreElement.altTxt}"
    > </div> 
    <div class=cart__item__content> 
    <div class=cart__item__content__titlePrice> 
    <h2> 
    ${integreElement.name}
    </h2>
    <span><strong>${integreElement.color}</strong></span> 
    <p> 
    ${integreElement.price} 
    € 
    </p> 
    </div>
    <div class=cart__item__content__settings> 
    <div class=cart__item__content__settings__quantity> 
    <p>Qté : </p> 
    <input type=number class=itemQuantity name=itemQuantity min=1 max=100 value= 
    ${integreElement.quantity}
     data-id= 
    ${integreElement.idProduit}
    > 
    </div> 
    <div class=cart__item__content__settings__delete> 
    <p class=deleteItem>Supprimer</p> 
    </div> 
    </div> 
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
    quantityLink.addEventListener("change", modif_quantiter);
  });
}

// @todo decouper cette fonction en deux petites fonctions
function affichePrixArticleAndNbProducts() {
  let produitStockerLocalStorage = getProductsInCart();
  //----Calcul le prix total de tout les articles ----//
  let totalPriceProducts = produitStockerLocalStorage.reduce(
    (totalPrice, products) => {
      return totalPrice + products.quantity * products.price;
    },
    0
  );
  //affiche le prix total de tout les articles
  document.querySelector("#totalPrice").innerHTML = totalPriceProducts;
  //----Calcul le nombre total des articles----//
  let totalItemProducts = produitStockerLocalStorage.reduce(
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
  let productsInCart = getProductsInCart();
  console.log(productsInCart);
  //Regroupe les produits en fonction de leur id
  productsInCart = productsInCart.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  //integre le bloc html en fonction du nombre de produits stocker dans le local storage
  if (productsInCart != null) {
    productsInCart.forEach((integreElement) => {
      displayProduct(integreElement);
    });
  }
}
displayProducts(); // c'est l'appel à cette fonction qui va tout déclencher

affichePrixArticleAndNbProducts();

//Supprime un produit
function deleteItem(event) {
  event.preventDefault();
  // suppression de l'élément dans le dom
  const productToDelete = event.target.closest(".cart__item");
  const id = productToDelete.dataset.id;
  const productColors = productToDelete.dataset.color;
  productToDelete.remove();
  // suppression de l'élément dans le local storage : tableau filtré sans l'élément supprimé
  let productsInCart = getProductsInCart();
  productsInCart = productsInCart.filter(
    (product) => product.idProduit !== id || product.color !== productColors
  );
  // sauvegarde dans le local storage
  localStorage.setItem("produits", JSON.stringify(productsInCart));
  // mise à jour du prix et du nb d'article
  affichePrixArticleAndNbProducts();
}

// Modifie la quantité
function modif_quantiter(event) {
  event.preventDefault();
  //recuperer l'id et la couleur du produit
  const productToModif = event.target.closest(".cart__item");
  console.log(productToModif);
  const productToModif_id = productToModif.dataset.id;
  const productToModif_color = productToModif.dataset.color;
  //modifie la quantité dans le local storage
  const productsInCart = getProductsInCart();
  const productTuUpdate = productsInCart.find(
    (product) =>
      product.idProduit === productToModif_id &&
      product.color === productToModif_color
  );
  //sauvegarde dans le local storage
  productTuUpdate.quantity = event.target.valueAsNumber;
  localStorage.setItem("produits", JSON.stringify(productsInCart));
  //mise a jour du prix et du nbre d'article
  affichePrixArticleAndNbProducts();
}

//***************************--Formulaire--***************************//
//Selectionne l'input du Dom  formulaire
function selectInput() {
  let inputForm = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };
  localStorage.setItem("contact", JSON.stringify(inputForm));
  console.log(inputForm);
}

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
    const productIdUsers = getProductsInCart();
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
  if (inputToCheck.value == "") {
    document.getElementById(selectorForErrorMessage).innerHTML = sendError;
    return true;
  } else if (myRegex.test(inputToCheck.value) == false) {
    document.getElementById(selectorForErrorMessage).innerHTML = errorMessage;
    return true;
  }
  return false;
}

//récupere tout les id des produits dans le  local storage
function productIdUsers() {
  let produitStockerLocalStorage = getProductsInCart();
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
  return order;
}
console.log(infoUser());

//Listener qui va permettre d'envoyer le formulaire
function listenerCart() {
  const btn_Order = document.getElementById("order");
  btn_Order.addEventListener("click", (e) => {
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
  // confirmationOfOrder(commandeOrderId);
}
//envoi la confirmation de la commande et son numero
function confirmationOfOrder(commandeOrderId) {
  window.location.href = "confirmation.html?id=" + `${commandeOrderId.orderId}`;
}
/* ******************************LOCAL STORAGE ET FORMULAIRE DEBUT****************************** */

/* Contenu du localstorage dans les champs du formulaire pour que les champs restent remplis si on retourne a index.html */
// function getInfoUserInForm() {
//   return JSON.parse(localStorage.getItem("contact"));
// }

// /* remplir les champs avec les infos du localstorage si elles existent */
// function fillInputLocalStorage(input) {
//   const objetSauvegardeLocalStorage = getInfoUserInForm();
//   document.querySelector(`#${input}`).value =
//     objetSauvegardeLocalStorage[input];
//   /* fonction pour trouver automatiquement la valeur de l'input dans le local storage puis le reassigner dans le champ */
// }
// function createFieldList() {
//   let listeChamps = [
//     "firstName",
//     "lastName",
//     "address",
//     "city",
//     "email",
//   ]; /* on crée un une liste de champs */

//   /* ici on utilise une boucle forEach pour ne pas avoir a répéter l'appel de la fonction 5 fois */
//   listeChamps.forEach((champ) => {
//     /* appliquer la fonction à la liste */
//     fillInputLocalStorage(champ);
//   }); /* fin du forEach */
// }

// createFieldList();
