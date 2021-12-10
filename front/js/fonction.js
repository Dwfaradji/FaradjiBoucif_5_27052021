//=== Envoi les information dans le local storage ===//
export function setProductLocalStorage(productsStoreInLocalStorage) {
  return localStorage.setItem(
    "products",
    JSON.stringify(productsStoreInLocalStorage)
  );
}

//=== Récupere les informations dans le local storage ===//
export function getProductsInLocalStorage() {
  return JSON.parse(localStorage.getItem("products"));
}
