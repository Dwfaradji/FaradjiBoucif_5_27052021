async function page_Cart() {
  try {
    //--------------LOCAL STORAGE-------------
    let produitStockerLocalStorage = JSON.parse(
      localStorage.getItem("produits")
    );
    console.log(produitStockerLocalStorage);

    // ----------------Integration des blocs Html--------------------
    function Produit_panier(integreElement) {
      const id_cart_items = document.getElementById("cart__items");
      const article_items = document.createElement("article");
      id_cart_items.appendChild(article_items);
      article_items.classList.add("cart__item");
      article_items.dataset.id = integreElement.id_produit;

      //--------------Class cart__item__img-----------
      const addDiv_img = document.createElement("div");
      addDiv_img.classList.add("cart__item__img");
      article_items.appendChild(addDiv_img);
      const addBaliseImg = document.createElement("img");
      addBaliseImg.src = integreElement.image;
      addBaliseImg.alt = integreElement.altTxt;
      addDiv_img.appendChild(addBaliseImg);

      //--------------Class cart__item__content-----------
      const addDiv_content = document.createElement("div");
      addDiv_content.classList.add("cart__item__content");
      article_items.appendChild(addDiv_content);

      //--------------Class cart__item__content__titlePrice-----------
      const addDiv_title_price = document.createElement("div");
      addDiv_content.appendChild(addDiv_title_price);
      addDiv_title_price.classList.add("cart__item__content__titlePrice");
      const addTitre = document.createElement("h2");
      addDiv_title_price.appendChild(addTitre);
      addTitre.innerHTML = integreElement.nom;
      const addPrice = document.createElement("p");
      addPrice.innerHTML = integreElement.price + "€";
      addDiv_title_price.appendChild(addPrice);

      //--------------Class cart__item__content__settings-----------
      const addDiv_settings = document.createElement("div");
      addDiv_content.appendChild(addDiv_settings);
      addDiv_settings.classList.add("cart__item__content__settings");

      //--------------Class cart__item__content__settings__quantity-----------
      const addDiv_settings_quantity = document.createElement("div");
      addDiv_settings.appendChild(addDiv_settings_quantity);
      addDiv_settings_quantity.classList.add(
        "cart__item__content__settings__quantity"
      );

      const addQuantity = document.createElement("p");
      addQuantity.innerHTML = "Qté :";
      addDiv_settings_quantity.appendChild(addQuantity);

      const addInput = document.createElement("input");
      addInput.type = "number";
      addInput.classList.add("itemQuantity");
      addDiv_settings_quantity.appendChild(addInput);
      addInput.name = "itemQuantity";
      addInput.min = "1";
      addInput.max = "100";
      addInput.value = integreElement.quantite;

      //--------------Class cart__item__content__settings__delete-----------
      const addDiv_settings_delete = document.createElement("div");
      addDiv_settings.appendChild(addDiv_settings_delete);
      addDiv_settings_delete.classList.add(
        "cart__item__content__settings__delete"
      );
      addDiv_settings_delete.innerHTML = '<p class="deleteItem">Supprimer</p>';
    }
    //----------------Fin de l'integration des block html-----------------

    //----Boucle qui affiche les elements choisi par l'utilisateur dans le panier---------

    if (produitStockerLocalStorage === null) {
      console.log("pas de produit");
    } else {
      produitStockerLocalStorage.forEach((integreElement) => {
        Produit_panier(integreElement);
        console.log("il ya des produit dans le panier");
      });
    } //--------------Boutton supprimer --------------------------------
    const deleteItem = document.querySelectorAll(".deleteItem");
    console.log(deleteItem);

    for (let l = 0; l < deleteItem.length; l++) {
      deleteItem[l].addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e);
        let idProduitSelectionner_supprimer =
          produitStockerLocalStorage[l].id_produit;
        let colorsDelete = produitStockerLocalStorage[l].couleurs;
        console.log(idProduitSelectionner_supprimer);

        //-----Utilisation de la methode filter pour supprimer un article ---------
        produitStockerLocalStorage = produitStockerLocalStorage.filter(
          (el) =>
            el.id_produit !== idProduitSelectionner_supprimer ||
            el.couleurs !== colorsDelete
        );
        console.log(produitStockerLocalStorage);

        localStorage.setItem(
          "produits",
          JSON.stringify(produitStockerLocalStorage)
        );
        //-----------Rechargement de la page pur actualiser la suppression -------------------
        location.reload();
      });
    }
    //---------- Affiche le prix total de tout les articles ----
    let prixTotalProduits = [];
    produitStockerLocalStorage.forEach((totalPrix) => {
      let prixProduitPanier = totalPrix.price;
      let quantiteProduitsPanier = totalPrix.quantite;
      let calculePrixQuantite = prixProduitPanier * quantiteProduitsPanier;
      prixTotalProduits.push(calculePrixQuantite);
      console.log(calculePrixQuantite);
    });

    //------------utilisation de la methode reduce ------------------
    const reduceurPrix = (accumulateur, currentValue) =>
      accumulateur + currentValue;

    const prixTotalPanier = prixTotalProduits.reduce(reduceurPrix, 0);
    console.log(prixTotalProduits);

    const affPrixTotal = document.querySelector("#totalPrice");
    affPrixTotal.innerHTML = prixTotalPanier;

    //-----------Affiche le nombre total des articles----------
    let totalArticle = [];
    produitStockerLocalStorage.forEach((totalProduits) => {
      let totalQuantite = totalProduits.quantite;
      console.log(totalQuantite);
      totalArticle.push(totalQuantite);
    });

    const reduceurArticle = (nom, valeur) => nom + valeur;
    const calculeArticle = totalArticle.reduce(reduceurArticle, 0);

    const affTotalArticles = document.querySelector("#totalQuantity");
    affTotalArticles.innerHTML = calculeArticle;
    //------------------changer le nombre d'article-------
    // const changerLeNombreArticle = document.querySelector(".itemQuantity");
    // console.log(changerLeNombreArticle);

    // let quantite0 = changerLeNombreArticle.value;
    // console.log(quantite0);
    // let test = [];
    // test = produitStockerLocalStorage[0].quantite;
    // test.push(quantite0);
    // console.log(test);

    //------------------Formulaire------------
    const btn_commander = document.getElementById("order");

    btn_commander.addEventListener("click", (e) => {
      e.preventDefault();
      //********************SELECTIONNE LES VALEUR DU FORMULAIRE *******/
      const selectForm = {
        firstname: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      };
      console.log(selectForm);
      // //*******************--SELECTIONNE LE MESAAGE D'ERREUR--****************/
      // const messageErreur = {
      //   firstNameErrorMsg: document.getElementById("firstNameErrorMsg"),
      //   lastNameErrorMsg: document.getElementById("lastNameErrorMsg"),
      //   addressErrorMsg: document.getElementById("addressErrorMsg"),
      //   cityErrorMsg: document.getElementById("cityErrorMsg"),
      //   emailErrorMsg: document.getElementById("emailErrorMsg"),
      // };
      // console.log(messageErreur);

      //---------REGEX---------
      let myRegex_letter = /^[a-zA-Z-\s]{3,20}$/;
      let myRegex_letter_number = /^[a-zA-Z0-9\s]+$/;
      let myRegex_number = /^[0-9]+$/;
      let myRegex_email =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      //---------------Prénon Formulaire------------------

      if (selectForm.firstname == "") {
        let myError = document.getElementById("firstNameErrorMsg");
        myError.innerHTML = "ceci est un message d'erreur";
        console.log("ceci est un message d'erreur");
      } else if (myRegex_letter.test(selectForm.firstname) == false) {
        let myError = document.getElementById("firstNameErrorMsg");
        myError.innerHTML = "le nom doit comporter des lettres uniquements";
        console.log("le prénon doit comporter des lettres uniquements");
      }

      //-----------------NOM formulaire--------------------
      else if (selectForm.lastName == "") {
        let myError = document.getElementById("lastNameErrorMsg");
        myError.innerHTML = "ceci est un message d'erreur";
        console.log("ceci est un message d'erreur");
      } else if (myRegex_letter.test(selectForm.lastName) == false) {
        let myError = document.getElementById("lastNameErrorMsg");
        myError.innerHTML = "le nom doit comporter des lettres uniquements";
      }

      //------------adresse formulaire
      else if (selectForm.address == "") {
        let myError = document.getElementById("addressErrorMsg");
        myError.innerHTML = "ceci est un message d'erreur";
        console.log("ceci est un message d'erreur");
      } else if (myRegex_letter_number.test(selectForm.address) == false) {
        let myError = document.getElementById("addressErrorMsg");
        myError.innerHTML = "veuillez indiquer une adresse correct";
      }

      //------------Ville formulaire-------------
      else if (selectForm.city == "") {
        let myError = document.getElementById("cityErrorMsg");
        myError.innerHTML = "ceci est un message d'erreur";
        console.log("ceci est un message d'erreur");
      } else if (myRegex_number.test(selectForm.city) == false) {
        let myError = document.getElementById("cityErrorMsg");
        myError.innerHTML = "la ville doit comporter des chiffres uniquements";
      }

      //------------Email Formulaire------------
      else if (selectForm.email == "") {
        let myError = document.getElementById("emailErrorMsg");
        myError.innerHTML = "ceci est un message d'erreur";
        console.log("ceci est un message d'erreur");
      } else if (myRegex_email.test(selectForm.email) == false) {
        let myError = document.getElementById("emailErrorMsg");
        myError.innerHTML = "Veuillez indiquer un email valide";
      } else {
        window.location.href = "/front/html/confirmation.html";
        //---envoi les bonne information dans le local storage-----
        const product = {
          method: "POST",
          body: JSON.stringify(selectForm),
          headers: { "Content-Type": "application/json" },
        };
        console.log(product);
      }

      //**********---local Storage----***************** */
      let contactStockerLocalStorage = JSON.parse(
        localStorage.getItem("contact")
      );
      console.log(contactStockerLocalStorage);
      contactStockerLocalStorage = [];
      contactStockerLocalStorage.push(selectForm);
      localStorage.setItem(
        "contact",
        JSON.stringify(contactStockerLocalStorage)
      );
    });
  } catch (e) {}
}
page_Cart();
