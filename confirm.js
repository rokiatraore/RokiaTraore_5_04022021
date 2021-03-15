//Récupérer orderId dans le localStorage
var order = localStorage.getItem('order')
order = JSON.parse(order)
//Séléctionner la balise et afficher orderId sur la page HTML
var orderId = document.querySelector('.orderId')
orderId.innerHTML = "Votre commande numéro :" + order;
console.log(orderId)
 

//Récupérer le total du prix dans le localstorage
var prix = localStorage.getItem('totalPrix')
prix = JSON.parse(prix)
//Séléctionner la balise et afficher le prix sur la page HTML
var prixTotal = document.querySelector('.prixTotal')
prixTotal.innerHTML = "D'un montant de :" + prix + "€";
