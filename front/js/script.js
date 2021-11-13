"use strict";
//debugger;
//Construction html et integration des produits
function displayProduct_home(product) {
  const selectId = document.getElementById("items");
  const addHref = document.createElement("a");
  addHref.href = `product.html?id=${product._id}`;
  selectId.appendChild(addHref);
  addHref.innerHTML = `<article> 
    <img src= 
   "${product.imageUrl}"
     alt= 
   "${product.altTxt}"
    > 
    <h3 class=productName> 
   ${product.name}
    </h3> 
    <p class=productDescription>
   ${product.description}
    </p> 
    </article> 
    </a>`;
}

async function loadingDataHomePage() {
  try {
    // Appel de l'Api
    const response = await fetch("http://localhost:3000/api/products");
    console.log(response);
    //Reponse de l'Api

    const productsArray = await response.json();
    console.log(productsArray);

    productsArray.forEach((product) => {
      displayProduct_home(product);
    });

    // Ajout des bloc article

    return productsArray;
  } catch (e) {}
}
console.log(loadingDataHomePage());
// const response =loadingDataHomePage().then( response =>response.json())
// console.log(response);
//Récupère les produit à afficher et va les intégrer dans le html
// function addProducts() {

//     const productsArray = loadingDataHomePage();

//     productsArray.forEach((product) => {
//       displayProduct_home(product);
//     })

// }
// addProducts()
//  console.log(addProducts());
