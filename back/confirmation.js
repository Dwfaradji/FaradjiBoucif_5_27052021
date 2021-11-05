async function numero_commande() {
  const responseOrder = await fetch("http://localhost:3000/api/products/order");
  console.log(responseOrder);
  //reponse de l'Api
  let commandeId = await responseOrder.json();
  console.log(commandeId);
}
numero_commande();
