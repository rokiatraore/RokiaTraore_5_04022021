var order = localStorage.getItem('order')
order = JSON.parse(order)

var prix = localStorage.getItem('totalPrix')
prix = JSON.parse(prix)

var orderId = document.querySelector('.orderId')
console.log(orderId)

var prixTotal = document.querySelector('.prixTotal')

orderId.innerHTML = "Votre commande numéro :" + order;
prixTotal.innerHTML = "D'un montant de :" + prix + "€";
