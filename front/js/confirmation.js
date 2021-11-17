"use strict";
//- Récupération de la chaine de requète dans l'url
const url_id = window.location.search;
//- Extraction de l'Id
const urlSearchParams = new URLSearchParams(url_id);
//- Récupere le numero de la commande 
const orderNumber = urlSearchParams.get("id");
//- Affiche le numéro de la commande 
document.getElementById("orderId").innerHTML = orderNumber;
