async function chargementDonnee() {
  try {
    // appel de l'Api
    const response = await fetch("http://localhost:3000/api/products");
    console.log(response);

    //reponse de l'Api
    let arrayProduct = await response.json();
    console.log(arrayProduct);
  } catch (e) {}
}
chargementDonnee();
