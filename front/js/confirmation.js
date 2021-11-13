"use strict";
const url_id = window.location.search;
console.log(url_id);
//Extraction de l'Id
const urlSearchParams = new URLSearchParams(url_id);
console.log(urlSearchParams);
const id = urlSearchParams.get("id");
console.log(id);
document.getElementById("orderId").innerHTML = id;
