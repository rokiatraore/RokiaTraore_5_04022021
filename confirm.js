//Récupérer orderId dans le localStorage
let order = localStorage.getItem('order')
order = JSON.parse(order)
//Séléctionner la balise et afficher orderId sur la page HTML
const orderId = document.querySelector('.orderId')
orderId.innerHTML = "Numéro de commande :" + " " + order;
console.log(orderId)
 

//Récupérer le total du prix dans le localstorage
let prix = localStorage.getItem('totalPrix')
prix = JSON.parse(prix)
//Séléctionner la balise et afficher le prix sur la page HTML
const prixTotal = document.querySelector('.prixTotal')
prixTotal.innerHTML = "Prix Total :" + " " + prix + "€";
