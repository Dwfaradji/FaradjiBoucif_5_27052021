async function chargementProduit() {
  try {
    //Récuperation de la chaine de requete dans l'url
    const url_id = window.location.search;

    //Extraction de l'Id
    const urlSearchParams = new URLSearchParams(url_id);
    console.log(urlSearchParams);
    const id = urlSearchParams.get("id");

    //Appel API grace a l'Id du produits
    const response = await fetch("http://localhost:3000/api/products/" + id);

    //Reponse de l'Api` ``
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

    //-------------boutton Ajout au panier------------------
    const btn_add = document.getElementById("addToCart");
    const nombreArticle = document.getElementById("quantity");

    btn_add.addEventListener("click", (event) => {
      if (
        nombreArticle.value > 0 &&
        nombreArticle.value <= 100 &&
        colors.value != 0
      ) {
        //------------------------LOCAL STORAGE---------------
        //--- JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet JS
        let produitStockerLocalStorage = JSON.parse(
          localStorage.getItem("produits")
        );
        console.log(produitStockerLocalStorage);
        event.preventDefault();
        window.location.href = "cart.html";

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

        //s'il y a des produits enregistre dans le local storage

        if (produitStockerLocalStorage) {
          const produitTrouve = produitStockerLocalStorage.find(
            (produit) =>
              produit.id_produit === choixDeUtilisateur.id_produit &&
              produit.couleurs === colors.value
          );
          if (produitTrouve) {
            produitTrouve.quantite += choixDeUtilisateur.quantite;
            localStorage.setItem(
              "produits",
              JSON.stringify(produitStockerLocalStorage)
            );
          } else {
            produitStockerLocalStorage.push(choixDeUtilisateur);
            localStorage.setItem(
              "produits",
              JSON.stringify(produitStockerLocalStorage)
            );
            console.log(produitStockerLocalStorage);
          }
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
      }
    });
  } catch (e) {}
}
chargementProduit();
