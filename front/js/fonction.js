//=== Envoi les information dans le local storage ===//
export function setProductLocalStorage(productsStoreInLocalStorage) {
  return localStorage.setItem(
    "produits",
    JSON.stringify(productsStoreInLocalStorage)
  );
}

//=== Récupere les informations dans le local storage ===//
export function getProductLocalStorage() {
  return JSON.parse(localStorage.getItem("produits"));
}
