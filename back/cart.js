async function page_Cart() {
  try {
    //***************************--LOCAL STORAGE--***************************//
    let produitStockerLocalStorage = JSON.parse(
      localStorage.getItem("produits")
    );

    //***************************--Integration des blocs Html--***************************//

    function Produit_panier(integreElement) {
      const id_cart_items = document.getElementById("cart__items");
      const article_items = document.createElement("article");
      id_cart_items.appendChild(article_items);
      article_items.classList.add("cart__item");
      article_items.dataset.id = integreElement.id_produit;
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
    }
    //***************************--Fin de l'integration des block html--***************************//
    //Condition pour affficher les produits dans le panier
    if (produitStockerLocalStorage === null) {
      //Boucle qui affiche les elements choisi par l'utilisateur dans le panier
    } else {
      produitStockerLocalStorage.forEach((integreElement) => {
        Produit_panier(integreElement);
      });
    }

    //***************************--Boutton supprimer--***************************//
    function btn_supprimer() {
      const deleteItem = document.querySelectorAll(".deleteItem");

      for (let l = 0; l < deleteItem.length; l++) {
        deleteItem[l].addEventListener("click", (event) => {
          const deleteItem = event.target.closest(".cart__item");
          const id = deleteItem.dataset.id;
          deleteItem.remove();
          console.log(deleteItem);
          console.log(id);
          event.preventDefault();

          let idDelete = produitStockerLocalStorage[l].id_produit;
          let colorsDelete = produitStockerLocalStorage[l].couleurs;

          const test2 = (produitStockerLocalStorage =
            produitStockerLocalStorage.filter(
              (el) => el.id_produit !== idDelete || el.couleurs !== colorsDelete
            ));
          console.log(test2);
          localStorage.setItem(
            "produits",
            JSON.stringify(produitStockerLocalStorage)
          );
          //Rechargement de la page pour actualiser la suppression
          // location.reload();
          affichePrixArticle();
        });
      }
    }

    btn_supprimer();
    //***************************--Résumé total du panier--***************************//

    function affichePrixArticle() {
      //----Affiche le prix total de tout les articles ----//
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
    affichePrixArticle();
    //***************************--Modifier le nombre d'article dans le panier--***************************//
    function modif_quantiter() {
      const qtyModif = document.getElementsByClassName("itemQuantity");

      for (let k = 0; k < qtyModif.length; k++) {
        //Boutton qui va modifier la quantité du produit

        qtyModif[k].addEventListener("change", (event) => {
          event.preventDefault();

          produitStockerLocalStorage[k].quantite = qtyModif[k].valueAsNumber;

          //affiche la nouvel valeur de l'input et va la stocker dans le local storage

          localStorage.setItem(
            "produits",
            JSON.stringify(produitStockerLocalStorage)
          );
          affichePrixArticle();
        });
      }
    }
    modif_quantiter();
    //***************************--Formulaire--***************************//
    function formulaire() {
      const btn_commander = document.getElementById("order");

      //Boutton qui va permettre d'envoyer le formulaire

      btn_commander.addEventListener("click", (e) => {
        e.preventDefault();
        let productOrder = [];

        produitStockerLocalStorage.forEach((produitCommander) => {
          productOrder.push(produitCommander.id_produit);
        });

        //Selectionne le Dom du formulaire

        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const address = document.getElementById("address");
        const city = document.getElementById("city");
        const email = document.getElementById("email");

        // enregistre les informations de l'utilisateur ainsi que son panier
        let order = {
          contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
          },
          products: productOrder,
        };
        //affiche le message d'erreur
        const sendError = "Ceci est un message d'erreur";
        //---------Les REGEX---------//

        let myRegex_letter = /^[a-zA-Z-\s]{3,20}$/;
        let myRegex_letter_number = /^[a-zA-Z0-9\s]+$/;
        let myRegex_number = /^[0-9]+$/;
        let myRegex_email =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //---Boucle qui va permettre d'enlever le message d'erreur--//
        let infoFormOk = document.querySelectorAll(
          ".cart__order__form__question p"
        );

        infoFormOk.forEach((infoForm) => {
          if (order !== "") {
            infoForm.innerHTML = null;
          }
        });
        //---------------Prénon du Formulaire------------------//

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
          // Envoi les bonnes informations de l'utilisateur et son panier a l'Api

          async function post() {
            const post = {
              method: "POST",
              body: JSON.stringify(order),
              headers: { "Content-Type": "application/json" },
            };

            const response = await fetch(
              "http://localhost:3000/api/products/order",
              post
            );
            console.log(response);

            //reponse de l'Api
            let commandeId = await response.json();
            console.log(commandeId);
            document.location.href = "/front/html/confirmation.html";
          }
          post();
        }
      });
    }
    formulaire();
  } catch (e) {}
}

page_Cart();
