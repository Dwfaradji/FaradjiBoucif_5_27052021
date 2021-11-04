async function chargementProduit() {
  try {
    //Récuperation de la chaine de requete dans l'url
    const url_id = window.location.search;

    //Extraction de l'Id
    const urlSearchParams = new URLSearchParams(url_id);
    console.log(urlSearchParams);
    const id = urlSearchParams.get("id");

    //Appel API grace a l'Id du produits
    const response = await fetch(
      "http://localhost:3000/api/products/" + `${id}`
    );

    //Reponse de l'Api` ``
    let arrayProduct = await response.json();
    console.log(arrayProduct);

    // integration des blocs Html et de leur valeur Api
    function api_blockHtml() {
      const selectClassItem_img = document.querySelector(".item__img");

      selectClassItem_img.innerHTML =
        "<img src=" +
        `${arrayProduct.imageUrl}` +
        " alt=" +
        `${arrayProduct.altTxt}` +
        ">";

      document.querySelector("#title").innerHTML = arrayProduct.name;
      document.querySelector("#price").innerHTML = arrayProduct.price;
      document.querySelector("#description").innerHTML =
        arrayProduct.description;
    }
    api_blockHtml();
    //---------------couleurs Disponible ---------------------
    function addColorie() {
      const colorie = arrayProduct.colors;

      //boucles pour afficher les nombre de bloc par rapport au couleur disponible

      colorie.forEach((couleurs) => {
        const selectColors = document.querySelector("#colors");
        const optionColors = document.createElement("option");
        selectColors.appendChild(optionColors);
        const colors = (optionColors.value = couleurs);
        optionColors.innerHTML = colors;
        console.log(colors);
      });
    }
    addColorie();
    //-------------boutton Ajout au panier------------------
    function btn_ajoutAuPanier() {
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
        } else {
          alert("Choisir une couleur et une quantité svp");
        }
      });
    }
    btn_ajoutAuPanier();
  } catch (e) {}
}
chargementProduit();
