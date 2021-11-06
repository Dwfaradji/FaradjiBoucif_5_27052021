function getProductsInCart() {
  return JSON.parse(localStorage.getItem("produits"));
}

function displayProduct(integreElement) {
  const id_cart_items = document.getElementById("cart__items");
  const article_items = document.createElement("article");
  id_cart_items.appendChild(article_items);
  article_items.classList.add("cart__item");
  article_items.dataset.id = integreElement.id_produit;
  article_items.dataset.color = integreElement.couleurs; // @todo mettre couleur au singulier
  // --------------------Class cart__item__img--------------------//
  article_items.innerHTML =
    '<div class="cart__item__img">' +
    "<img src=" +
    integreElement.image +
    " alt=" +
    integreElement.altTxt +
    "> </div>" +
    //--------------------Class cart__item__content__titlePrice--------------------//
    '<div class="cart__item__content">' +
    '<div class="cart__item__content__titlePrice">' +
    "<h2>" +
    integreElement.nom +
    ` ${integreElement.couleurs}` +
    "</h2>" +
    "<p>" +
    integreElement.price +
    "€" +
    "</p>" +
    "</div>" +
    //--------------------Class cart__item__content__settings__quantity--------------------//
    '<div class="cart__item__content__settings">' +
    '<div class="cart__item__content__settings__quantity">' +
    "<p>Qté : </p>" +
    '<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=' +
    integreElement.quantite +
    " data-id=" +
    integreElement.id_produit +
    ">" +
    "</div>" +
    //--------------------Class cart__item__content__settings__delete--------------------//
    '<div class="cart__item__content__settings__delete">' +
    '<p class="deleteItem">Supprimer</p>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</article>";

  // listeners liens de suppression (on les met seulement apres construction de l'html)
  const deleteLinks = document.querySelectorAll(".deleteItem");
  deleteLinks.forEach((deleteLink) => {
    deleteLink.addEventListener("click", deleteItem);
  });

  // listeners modif quantité (on les met seulement apres construction de l'html)
  const qtyModif = document.querySelectorAll(".itemQuantity");
  qtyModif.forEach((qty) => {
    qty.addEventListener("change", modif_quantiter);
  });

  affichePrixArticleAndNbProducts();
}

// @todo decouper cette fonction en deux petites fonctions
function affichePrixArticleAndNbProducts() {
  //----Affiche le prix total de tout les articles ----//
  let produitStockerLocalStorage = getProductsInCart();
  let prixTotalProduits = produitStockerLocalStorage.reduce(
    (totalPrix, produit) => {
      return totalPrix + produit.quantite * produit.price;
    },
    0
  );
  document.querySelector("#totalPrice").innerHTML = prixTotalProduits;

  //----Affiche le nombre total des articles----//
  let totalArticle = produitStockerLocalStorage.reduce(
    (totalArticle, article) => {
      return totalArticle + article.quantite;
    },
    0
  );
  document.querySelector("#totalQuantity").innerHTML = totalArticle;
}

function displayProducts() {
  const productsInCart = getProductsInCart();
  if (productsInCart != null) {
    productsInCart.forEach((integreElement) => {
      displayProduct(integreElement);
    });
  }
}
displayProducts(); // c'est l'appel à cette fonction qui va tout déclencher

function deleteItem(event) {
  event.preventDefault();

  // suppression de l'élément dans le dom
  const productToDelete = event.target.closest(".cart__item");

  const id = productToDelete.dataset.id;
  const couleur = productToDelete.dataset.color;
  productToDelete.remove();

  // suppression de l'élément dans le local storage : tableau filtré sans l'élément supprimé

  let productsInCart = getProductsInCart();
  productsInCart = productsInCart.filter(
    (product) => product.id_produit !== id || product.couleurs !== couleur
  );
  // sauvegarde dans le local storage
  localStorage.setItem("produits", JSON.stringify(productsInCart));
  // mise à du prix et du nb d'article
  affichePrixArticleAndNbProducts();
}

function modif_quantiter(even) {
  even.preventDefault();

  const productToModif = even.target.closest(".cart__item");
  console.log(productToModif);
  const id = productToModif.dataset.id;
  const couleur = productToModif.dataset.color;

  const productsInCart = getProductsInCart();
  const productTuUpdate = productsInCart.find(
    (product) => product.id_produit === id && product.couleurs === couleur
  );

  productTuUpdate.quantite = even.target.valueAsNumber;
  localStorage.setItem("produits", JSON.stringify(productsInCart));
  affichePrixArticleAndNbProducts();
}

//============********** terminer de refactoriser les lignes suivantes

//***************************--Formulaire--***************************//

//Boutton qui va permettre d'envoyer le formulaire
const btn_commander = document.getElementById("order");
btn_commander.addEventListener("click", (e) => {
  e.preventDefault();
  formulaire();
});

//---------Les REGEX---------//
// permette d'avoir les parametre necessaire pour la validation du formulaire
function regex() {
  myRegex_letter = /^[a-zA-Z-\s]{3,20}$/;
  myRegex_letter_number = /^[a-zA-Z0-9\s]+$/;
  myRegex_number = /^[0-9]+$/;
  myRegex_email =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
}

//cible l'emplacement du message d'erreur
function deleteSendError() {
  let infoFormOk = document.querySelectorAll(".cart__order__form__question p");
  //---Boucle qui va permettre d'enlever le message d'erreur--//
  infoFormOk.forEach((infoForm) => {
    if (order !== "") {
      infoForm.innerHTML = null;
    }
  });
}

//---------------Prénon du Formulaire------------------//
function formulaire() {
  selectInput();
  regex();
  deleteSendError();

  const sendError = "Ceci est un message d'erreur";
  //Condition qui va analyser si le formulaire et vide
  if (firstName.value == "") {
    document.getElementById("firstNameErrorMsg").innerHTML = sendError;

    //Condition qui va analyser si le formulaire comporte des erreurs
  } else if (myRegex_letter.test(firstName.value) == false) {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "Le prénon doit comporter des lettres uniquements";
  }

  //-----------------Nom du formulaire--------------------//

  //Condition qui va analyser si le formulaire et vide
  else if (lastName.value == "") {
    document.getElementById("lastNameErrorMsg").innerHTML = sendError;
    //Condition qui va analyser si le formulaire comporte des erreurs
  } else if (myRegex_letter.test(lastName.value) == false) {
    document.getElementById("lastNameErrorMsg").innerHTML =
      "Le nom doit comporter des lettres uniquements";
  }

  //----------------Adresse formulaire----------------//

  //Condition qui va analyser si le formulaire et vide
  else if (address.value == "") {
    document.getElementById("addressErrorMsg").innerHTML = sendError;
    //Condition qui va analyser si le formulaire comporte des erreurs
  } else if (myRegex_letter_number.test(address.value) == false) {
    document.getElementById("addressErrorMsg").innerHTML =
      "Veuillez indiquer une adresse correct";
  }

  //----------------Ville formulaire----------------//

  //Condition qui va analyser si le formulaire et vide
  else if (city.value == "") {
    document.getElementById("cityErrorMsg").innerHTML = sendError;
    //Condition qui va analyser si le formulaire comporte des erreurs
  } else if (myRegex_number.test(city.value) == false) {
    document.getElementById("cityErrorMsg").innerHTML =
      "La ville doit comporter des chiffres uniquements";
  }

  //----------------Email Formulaire----------------//

  //Condition qui va analyser si le formulaire et vide
  else if (email.value == "") {
    document.getElementById("emailErrorMsg").innerHTML = sendError;
    //Condition qui va analyser si le formulaire comporte des erreurs
  } else if (myRegex_email.test(email.value) == false) {
    document.getElementById("emailErrorMsg").innerHTML =
      "Veuillez indiquer un email valide";
    //Si le formulaire est completer sans erreur
  } else {
    postInfoUser();
  }
}

//Selectionne l'input du Dom  formulaire
function selectInput() {
  firstName = document.getElementById("firstName");
  lastName = document.getElementById("lastName");
  address = document.getElementById("address");
  city = document.getElementById("city");
  email = document.getElementById("email");
}
//envoi les id de tout les produits du panier dans la variables productOder
function productIdUsers() {
  const produitStockerLocalStorage = getProductsInCart();
  productOrder = [];
  produitStockerLocalStorage.forEach((produitCommander) => {
    productOrder.push(produitCommander.id_produit);
  });
}

// recupere les informations de l'utilisateur ainsi que son panier
function infoUser() {
  selectInput();
  productIdUsers();
  order = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
    products: productOrder,
  };
}

async function postInfoUser() {
  //recupere les information saisi par l'utilisateur formulaire
  infoUser();

  //envoi les donnée de recuperer par l'utilisateur a l'API
  const post = {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "Content-Type": "application/json" },
  };
  //appel de l'api
  const response = await fetch(
    "http://localhost:3000/api/products/order",
    post
  );
  console.log(response);

  //reponse de l'Api
  commandeOrderId = await response.json();
  console.log(commandeOrderId);
  confirmCommandeUser();
}
//envoi la confirmation de la commande et son numero
function confirmCommandeUser() {
  window.location.href = "confirmation.html?id=" + commandeOrderId.orderId;
}
