async function chargementDesProduits() {
  try {
    //Récuperation de la chaine de requete dans l'url
    const url_id = window.location.search;

    //Extraction de l'Id
    const urlSearchParams = new URLSearchParams(url_id);
    console.log(urlSearchParams);
    const id = urlSearchParams.get("id");

    //Appel API grace a l'Id du produits
    const response = await fetch("http://localhost:3000/api/products/" + id);

    //Reponse de l'Api
    let arrayProduct = await response.json();
    console.log(arrayProduct);

    // integration des blocs Html et de leur valeur Api
    const selectClassItem_img = document.querySelector(".item__img");
    const addBalise_img = document.createElement("img");
    selectClassItem_img.appendChild(addBalise_img);
    addBalise_img.src = arrayProduct.imageUrl;
    addBalise_img.alt = arrayProduct.altTxt;

    const title = document.querySelector("#title");
    title.innerHTML = arrayProduct.name;

    const price = document.querySelector("#price");
    price.innerHTML = arrayProduct.price;

    const description = document.querySelector("#description");
    description.innerHTML = arrayProduct.description;

    //---------------couleurs Disponible ---------------------
    const colorie = arrayProduct.colors;

    //boucles pour afficher les nombre de bloc par rapport au couleur disponible
    for (let i = 0; i < colorie.length; i++) {
      const selectColors = document.querySelector("#colors");
      const optionColors = document.createElement("option");
      selectColors.appendChild(optionColors);
      const colors = (optionColors.value = arrayProduct.colors[i]);
      optionColors.innerHTML = colors;
    }
    const btn_add = document.querySelector("#addToCart");
    const nombreArticle = document.querySelector("#quantity");

    //-------------boutton Ajout au panier------------------

    btn_add.addEventListener("click", (event) => {
      event.preventDefault();
      const url = "cart.html?id=" + arrayProduct._id;
      window.open(url, "commande");
      console.log(url);

      let choixDeUtilisateur = {
        nom: arrayProduct.name,
        image: arrayProduct.imageUrl,
        altTxt: arrayProduct.altTxt,
        price: arrayProduct.price,
        id_produit: arrayProduct._id,
        couleurs: colors.value,
        quantite: parseInt(nombreArticle.value),
      };
      console.log(choixDeUtilisateur);

      //------------------------LOCAL STORAGE---------------

      let produitStockerLocalStorage = JSON.parse(
        localStorage.getItem("produits")
      );
      //--- JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JS
      console.log(produitStockerLocalStorage);

      //s'il y a des produits enregistre dans le local storage

      if (produitStockerLocalStorage) {
        produitStockerLocalStorage.push(choixDeUtilisateur);
        localStorage.setItem(
          "produits",
          JSON.stringify(produitStockerLocalStorage)
        );
      }
      // s'il n'y a pas de produit enregistré dans le local storage
      else {
        produitStockerLocalStorage = [];
        produitStockerLocalStorage.push(choixDeUtilisateur);
        localStorage.setItem(
          "produits",
          JSON.stringify(produitStockerLocalStorage)
        );
        console.log(produitStockerLocalStorage);
      }

      // }

      // else {
      //   produitStockerLocalStorage = [];
      //   produitStockerLocalStorage.push(choixDeUtilisateur);
      //   localStorage.setItem(
      //     "produits",
      //     JSON.stringify(produitStockerLocalStorage)
      //   );
      //   console.log(produitStockerLocalStorage);
      // }

      //---------------test-----------

      //-------------fin test--------------

      // Envoie les informations choisie par l'utilisateur dans le LocalStorage__
      // if (produitStockerLocalStorage) {
      //   const produitTrouve = produitStockerLocalStorage.find(
      //     (produit) => (produit.id_produit = choixDeUtilisateur.id_produit)
      //   );
      //   console.log(produitTrouve);

      //   if (produitTrouve) {
      //     produitTrouve.quantite += choixDeUtilisateur.quantite;
      //   } else {
      //     produitStockerLocalStorage.push(choixDeUtilisateur);
      //   }
      //   localStorage.setItem(
      //     "produits",
      //     JSON.stringify(produitStockerLocalStorage)
      //   );
      // } else {
      //   produitStockerLocalStorage = [];
      //   produitStockerLocalStorage.push(choixDeUtilisateur);
      //   localStorage.setItem(
      //     "produits",
      //     JSON.stringify(produitStockerLocalStorage)
      //   );
      // }
    });
  } catch (e) {}
}
chargementDesProduits();
