async function page_Cart() {
  try {
    //--------------LOCAL STORAGE-------------
    let produitStockerLocalStorage = JSON.parse(
      localStorage.getItem("produits")
    );
    console.log(produitStockerLocalStorage);

    // Integration des blocs Html
    function Produit_panier(product) {
      const id_cart_items = document.getElementById("cart__items");

      const article_items = document.createElement("article");
      id_cart_items.appendChild(article_items);
      article_items.classList.add("cart__item");
      article_items.dataset.id = product.id_produit;
      //--------------Class cart__item__img-----------
      const addDiv_img = document.createElement("div");
      addDiv_img.classList.add("cart__item__img");
      article_items.appendChild(addDiv_img);

      const addBaliseImg = document.createElement("img");

      addBaliseImg.src = product.image;
      addBaliseImg.alt = product.altTxt;
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
      addTitre.innerHTML = product.nom;
      const addPrice = document.createElement("p");

      addPrice.innerHTML = product.price + "€";
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
      addInput.value = product.quantite;
      //--------------Class cart__item__content__settings__delete-----------
      const addDiv_settings_delete = document.createElement("div");
      addDiv_settings.appendChild(addDiv_settings_delete);
      addDiv_settings_delete.classList.add(
        "cart__item__content__settings__delete"
      );
      addDiv_settings_delete.innerHTML = '<p class="deleteItem">Supprimer</p>';
    }
    //----Boucle qui affiche les element choisi par l'utilisateur dans le panier---------

    if (produitStockerLocalStorage === null) {
      console.log("pas de produit");
    } else {
      produitStockerLocalStorage.forEach((product) => {
        Produit_panier(product);
        console.log("il ya des produit dans le panier");
      });
    } //-------------- supprimer --------------------------------
    const deleteItem = document.querySelectorAll(".deleteItem");
    console.log(deleteItem);
    for (let l = 0; l < deleteItem.length; l++) {
      deleteItem[l].addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e);
        let idProduitSelectionner_supprimer =
          produitStockerLocalStorage[l].id_produit;
        console.log(idProduitSelectionner_supprimer);

        //-----methode filter---------
        produitStockerLocalStorage = produitStockerLocalStorage.filter(
          (el) => el.id_produit !== idProduitSelectionner_supprimer
        );
        console.log(produitStockerLocalStorage);

        localStorage.setItem(
          "produits",
          JSON.stringify(produitStockerLocalStorage)
        );
        //-----------Recharge la page -------------------
        window.location.href = "cart.html";
      });
    }
    //----------prix total----
    let prixTotal = [];
    for (let c = 0; c < produitStockerLocalStorage.length; c++) {
      let prixProduitPanier = produitStockerLocalStorage[c].price;
      let quantiteProduits = produitStockerLocalStorage[c].quantite;
      let calcule = prixProduitPanier * quantiteProduits;
      prixTotal.push(calcule);
      console.log(calcule);
    }

    const reduceur = (accumulateur, currentValue) =>
      accumulateur + currentValue;

    const prixTotalProduits = prixTotal.reduce(reduceur, 0);
    console.log(prixTotal);

    const affPrixTotal = document.querySelector("#totalPrice");
    affPrixTotal.innerHTML = prixTotalProduits;

    //-----------total articles----------
    let totalArticle = [];
    for (let q = 0; q < produitStockerLocalStorage.length; q++) {
      let totalQuantite = produitStockerLocalStorage[q].quantite;
      console.log(totalQuantite);
      totalArticle.push(totalQuantite);
    }
    const reducteur = (nom, valeur) => nom + valeur;
    const calculeArticle = totalArticle.reduce(reducteur, 0);

    const affTotalArticles = document.querySelector("#totalQuantity");
    affTotalArticles.innerHTML = calculeArticle;
    ////------------------changer le nombre d'article-------
    const changerLeNombreArticle = document.querySelector(".itemQuantity");
    console.log(changerLeNombreArticle);

    let quantite0 = changerLeNombreArticle.value;
    console.log(quantite0);
    let test = [];
    test = produitStockerLocalStorage[0].quantite;
    test.push(quantite0);
    console.log(test);
  } catch (e) {}
}
page_Cart();
