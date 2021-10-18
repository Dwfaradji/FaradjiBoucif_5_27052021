async function page_Cart() {
  try {
    const url_id = window.location.search;
    console.log(url_id);

    //Extraction de l'Id
    const urlSearchParams = new URLSearchParams(url_id);
    console.log(urlSearchParams);
    const id = urlSearchParams.get("id");
    console.log(id);

    //Appel API
    const response = await fetch("http://localhost:3000/api/products/" + id);
    console.log(response);

    //Reponse de l'Api
    let arrayProduct = await response.json();
    console.log(arrayProduct);

    //--------------LOCAL STORAGE-------------
    let produitStockerLocalStorage = JSON.parse(
      localStorage.getItem("produit")
    );
    console.log(produitStockerLocalStorage);

    // integration des blocs Html
    const cart_items = document.querySelector("#cart__items");
    const article_items = document.createElement("article");
    cart_items.appendChild(article_items);
    console.log(cart_items);
    article_items.classList.add("cart__item");
    article_items.dataset.id = " {product-ID} ";

    article_items.innerHTML = '<div class="cart__item__img">';
    const item_img = document.querySelector(".cart__item__img");
    const img_cart = document.createElement("img");
    img_cart.src = arrayProduct.imageUrl;
    img_cart.alt = arrayProduct.altTxt;
    item_img.appendChild(img_cart);

    const selectDiv = document.querySelector(".cart__item");
    const addDiv = document.createElement("div");
    selectDiv.appendChild(addDiv);
    addDiv.classList.add("cart__item__content");

    const selectDiv1 = document.querySelector(".cart__item");
    const addDiv1 = document.createElement("div");
    selectDiv1.appendChild(addDiv1);
    addDiv1.classList.add("cart__item__content__titlePrice");
    const addTitre = document.createElement("h2");
    addDiv1.appendChild(addTitre);
    addTitre.innerHTML = arrayProduct.name;
    const addParagraphe = document.createElement("p");

    addParagraphe.innerHTML = arrayProduct.price + "€";
    addDiv1.appendChild(addParagraphe);

    const selectDiv2 = document.querySelector(".cart__item");
    const addDiv2 = document.createElement("div");
    selectDiv2.appendChild(addDiv2);
    addDiv2.classList.add("cart__item__content__settings");

    const selectDiv3 = document.querySelector(".cart__item__content__settings");
    const addDiv3 = document.createElement("div");
    selectDiv3.appendChild(addDiv3);
    addDiv3.classList.add("cart__item__content__settings__quantity");

    const addParagraphe2 = document.createElement("p");
    addParagraphe2.innerHTML = "Qté :";
    addDiv3.appendChild(addParagraphe2);

    const addInput = document.createElement("input");
    addInput.type = "number";
    addInput.classList.add("itemQuantity");
    addDiv3.appendChild(addInput);
    addInput.name = "itemQuantity";
    addInput.min = "1";
    addInput.max = "100";

    addInput.value = produitStockerLocalStorage[0].quantite;

    const selectDiv4 = document.querySelector(".cart__item__content__settings");
    const addDiv4 = document.createElement("div");
    selectDiv4.appendChild(addDiv4);
    addDiv4.classList.add("cart__item__content__settings__delete");
    addDiv4.innerHTML = ' <p class="deleteItem">Supprimer</p>';
    console.log(selectDiv);
  } catch (e) {}
}
page_Cart();
