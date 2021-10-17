async function chargementDesProduits() {
  try {
    //récuperation de la chaine de requete dans l'url
    const url_id = window.location.search;
    console.log(url_id);
    //extraction de l'Id
    const urlSearchParams = new URLSearchParams(url_id);
    console.log(urlSearchParams);
    const id = urlSearchParams.get("id");
    console.log(id);
    //Appel API
    const response = await fetch("http://localhost:3000/api/products/" + id);
    console.log(response);

    //reponse de l'Api
    let arrayProduct = await response.json();
    console.log(arrayProduct);
    // integration des blocs Html et de leur valeur Api
    const image = document.querySelector(".item__img");

    const addIm0 = document.createElement("img");
    image.appendChild(addIm0);
    addIm0.src = arrayProduct.imageUrl;
    addIm0.alt = arrayProduct.altTxt;

    const title = document.querySelector("#title");
    title.innerHTML = arrayProduct.name;

    const price = document.querySelector("#price");
    price.innerHTML = arrayProduct.price;

    const description = document.querySelector("#description");
    description.innerHTML = arrayProduct.description;

    //---------------couleurs---------------------
    const colorie = arrayProduct.colors;
    console.log(colorie);
    //boucles pour afficher les nombre de bloc par rapport au couleur disponible

    for (let i = 0; i < colorie.length; i++) {
      const selectColors = document.querySelector("#colors");
      const option = document.createElement("option");
      selectColors.appendChild(option);
      const colors = (option.value = arrayProduct.colors[i]);
      option.innerHTML = colors;
      console.log(colors);
    }
  } catch (e) {}
}
chargementDesProduits();
