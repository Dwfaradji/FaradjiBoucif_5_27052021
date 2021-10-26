async function chargementDonneePageAcceuil() {
  try {
    // appel de l'Api
    const response = await fetch("http://localhost:3000/api/products");
    console.log(response);

    //reponse de l'Api
    let arrayProduct = await response.json();
    console.log(arrayProduct);

    //selection de l'Id pour integrer le bloc article et ses enfants
    function addBloc_article(produit) {
      const selectId = document.getElementById("items");

      const addHref = document.createElement("a");
      addHref.href = "product.html?id=" + produit._id;

      selectId.appendChild(addHref);

      const addBalise = document.createElement("article");
      addHref.appendChild(addBalise);

      //-------------image----------
      const addImg = document.createElement("img");
      addImg.src = produit.imageUrl;
      addImg.alt = produit.altTxt;
      addBalise.appendChild(addImg);

      //------Balise-------
      const addHn = document.createElement("h3");
      addBalise.appendChild(addHn);
      addHn.innerHTML = produit.name;
      addHn.classList.add("productName");

      const addP = document.createElement("p");
      addBalise.appendChild(addP);
      addP.innerHTML = produit.description;
      addP.classList.add("productDescription");
    }

    // Boucle Ajout des bloc article
    arrayProduct.forEach((produit) => {
      addBloc_article(produit);
    });
  } catch (e) {}
}
chargementDonneePageAcceuil();
