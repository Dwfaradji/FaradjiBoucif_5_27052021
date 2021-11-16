export function setProductLocalStorage(productsStoreInLocalStorage) {
  return localStorage.setItem(
    "produits",
    JSON.stringify(productsStoreInLocalStorage)
  );
}

export function getProductLocalStorage() {
  return JSON.parse(localStorage.getItem("produits"));
}
