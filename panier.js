// ---------------------------- AFFICHER LES ARTICLES SUR LA PAGE PANIER ----------------------------
var produits = localStorage.getItem("produitDansLePanier");
produits = JSON.parse(produits);
            
var totalProduits = localStorage.getItem("totalPrix");
totalProduits = JSON.parse(totalProduits);

var containerproduits = document.querySelector('.produitAjouter');
var containerTotalProduits = document.querySelector('.totalProduits');

function affichageProduitPanier (){
    if(produits && containerproduits ){
        Object.values(produits).forEach(ficheProduit => {
            containerproduits.innerHTML += 
                `<div class="fiche" >
                    <button class="btnSupprimer" id=${ficheProduit.name}-${ficheProduit.colors}><i class="fas fa-times" ></i></button>
                    <img class="produit" src=${ficheProduit.picture}>
                    <span class="produit" id ="${ficheProduit.id}">${ficheProduit.name}</span>
                    <span class="couleur">${ficheProduit.colors}</span>
                    <div class="prix">${ficheProduit.price}</div>
                    <div class="qty" >
                        <button class="btnQtyDown" id=${ficheProduit.id}-${ficheProduit.colors} ><i class="fas fa-arrow-alt-circle-down " ></i></button>
                        <span class="qty">${ficheProduit.qty}</span>
                        <button class="btnQtyUp" id=${ficheProduit.colors}-${ficheProduit.id} ><i class="fas fa-arrow-circle-up"></i></button>
                    </div>

                    <div class="total">${ficheProduit.price * ficheProduit.qty}</div>
                </div>`
            
            
        if (totalProduits && containerTotalProduits){
            containerTotalProduits.innerHTML = totalProduits;
        }
                    
        })


    }
}
affichageProduitPanier ()



// ---------------------------- SUPPRIMER ARTICLE PANIER ----------------------------

//Récupérer le bouton de suppression dans le code HTML
var boutonSuppression = document.querySelectorAll(".btnSupprimer");
console.log(boutonSuppression);

//Récupérer un tableau contenant les valeurs des propriétés
var tableauProduits = Object.values(produits)
console.log(tableauProduits)


for (i = 0; i<boutonSuppression.length; i++){
    boutonSuppression[i].addEventListener("click", suppression);

    function suppression(){
        supprimerArticle(this)
    }

    function supprimerArticle(that){

        for(i = 0; i < tableauProduits.length; i++){
            if(`${tableauProduits[i].name}-${tableauProduits[i].colors}` == that.id){

                //Faire appel au parent du bouton : <div class="fiche"></div>
                var div_parentBoutonSupp = that.parentNode
                console.log(div_parentBoutonSupp)

                //Faire appel au parent de la fiche produit : <div class="produitAjouter"></div>
                var parentFicheProduit = div_parentBoutonSupp.parentNode
                console.log(parentFicheProduit)

                //Supprimer la fiche produit
                parentFicheProduit.removeChild(div_parentBoutonSupp)
            }
        }
        
    }
}

// ---------------------------- BOUTON DOWN QTY ----------------------------

//Sélectionner le bouton dans le code HTML
var btnQtyDown = document.querySelectorAll(".btnQtyDown")
console.log(btnQtyDown)


for(i = 0; i < btnQtyDown.length; i++){
    btnQtyDown[i].addEventListener("click", qtyDown);
 
}

function qtyDown(){
    diminuerQty(this);
    modifierNombreArticlePanierDown()
}

//Fonction pour diminuer la qty au clic de l'utilisateur
function diminuerQty(that){
    for(i = 0; i < tableauProduits.length; i++){
        /* Si la qty est >=0 et si la valeur de la propriété id du tableau est égal à id="" de la balise, 
        alors soustraire de -1 la qty du produit selectionné */
        if(tableauProduits[i].qty > 0 && `${tableauProduits[i].id}-${tableauProduits[i].colors}` == that.id){
            var qtyDown = tableauProduits[i].qty -= 1;
            console.log(qtyDown + "1")
            console.log(`${tableauProduits[i].id}-${tableauProduits[i].colors}`)
            localStorage.setItem("produitDansLePanier", JSON.stringify(produits))

        }
        

        //Sinon si la qty est = 0, supprimer le produit
        else if (tableauProduits[i].qty == 0 && `${tableauProduits[i].id}-${tableauProduits[i].colors}`  == that.id){
            tableauProduits[i].qty = 0
            var supprimerLigne = tableauProduits.filter(function(supprimer){
                console.log(supprimer)
                return supprimer.qty > 0
            })
            console.log(supprimerLigne)

            localStorage.setItem("produitDansLePanier", JSON.stringify(supprimerLigne))
        }

        //Modifier la prix total au clique
        var prix = localStorage.getItem("totalPrix");
        if(prix != null){
            prix = parseInt(prix);
            localStorage.setItem("totalPrix", prix - tableauProduits[i].price)
         }
        else{
            localStorage.setItem("totalPrix", tableauProduits[i].price);
        }      
    } 
    
        window.location.href = "panier.html"; 
}

//Fonction pour modifier le nombre d'article dans le localStorage et sur la page panier(icône panier)
function modifierNombreArticlePanierDown(){
    var modifierNombreProduitDown = localStorage.getItem('nombreArticlePanier');
 
    //Convertion string > number
    modifierNombreProduitDown = parseInt(modifierNombreProduitDown);

if(modifierNombreProduitDown){
        localStorage.setItem('nombreArticlePanier',modifierNombreProduitDown - 1);
        document.getElementById('compteurPanier2').textContent =modifierNombreProduitDown - 1;
    } 
    else {
        localStorage.setItem('nombreArticlePanier',1);
        document.getElementById('compteurPanier2').textContent = 1;
    }
};

// ---------------------------- BOUTON UP QTY ----------------------------

//Sélectionner le bouton dans le code HTML

var btnQtyUp = document.querySelectorAll(".btnQtyUp")
console.log(btnQtyUp)

for(i = 0; i < btnQtyUp.length; i++){
    btnQtyUp[i].addEventListener("click", qtyUp);
} 

function qtyUp(){
    augmenterQty(this);
    modifierNombreArticlePanierUp();
   }

//Fonction pour augmenter la qty au clique
function augmenterQty(that){
    for(i = 0; i < tableauProduits.length; i++){
        /* Si la qty est >=0 et si la valeur de la propriété name du tableau est égal à id="" de la balise, 
        alors additionner de -1 la qty du produit selectionné */
        if(tableauProduits[i].qty >= 0 && `${tableauProduits[i].colors}-${tableauProduits[i].id}` == that.id){
            var qtyUp = tableauProduits[i].qty += 1;
            console.log(qtyUp)
        }
           
        //Modifier la prix total au clique
        var prix = localStorage.getItem("totalPrix");
        if(prix != null){
            prix = parseInt(prix);
            localStorage.setItem("totalPrix", prix + tableauProduits[i].price)
        }
        else{
            localStorage.setItem("totalPrix", tableauProduits[i].price);
        } 
            
    }
    localStorage.setItem("produitDansLePanier", JSON.stringify(produits))

    //Actualiser la page automatiquement
    //window.location.href = "panier.html";
}

//Fonction pour modifier le nombre d'article dans le localStorage et sur la page panier(icône panier)
function modifierNombreArticlePanierUp(){
    var modifierNombreProduit = localStorage.getItem('nombreArticlePanier');
 
    //Convertion string > number
    modifierNombreProduit = parseInt(modifierNombreProduit);

    if(modifierNombreProduit){
            localStorage.setItem('nombreArticlePanier',modifierNombreProduit + 1);
            document.getElementById('compteurPanier2').textContent =modifierNombreProduit + 1;
        } 
   
    else {
        localStorage.setItem('nombreArticlePanier',1);
        document.getElementById('compteurPanier2').textContent = 1;
    }
};

//Garder la même valeur du panier en cas d'actualisation de la page
function actualisePage(){
    let nombreProduit = localStorage.getItem('nombreArticlePanier');

    if(nombreProduit){
        document.getElementById('compteurPanier2').textContent =nombreProduit;
    }
}
actualisePage();

// ---------------------------- FORMULAIRE COMMANDE ----------------------------

var formulaire = document.getElementById("formulaire")
//Selectionner que les input du formulaire ayant l'id : formulaire
var inputs = document.getElementById("formulaire").getElementsByTagName("input")
var nom = document.getElementById('nom')
var prenom = document.getElementById('prenom')
var adresse = document.getElementById('adresse')
var ville = document.getElementById('ville')
var pays = document.getElementById('pays')
var telephone = document.getElementById('telephone')
var codePostal = document.getElementById('codePostal')
var email = document.getElementById('email')



formulaire.addEventListener("submit", function(e){

    var erreur;

    //Afficher un message d'erreur en cas de champs non renseigné.
    for (var i = 0; i < inputs.length; i++){
        if(inputs[i].value == ''){
            erreur = "Veuillez renseigner tous les champs"
        }
    }

    //Gérer les expressions régulières

    //Nom - Prénom - Ville - Adresse - Pays
    var regexNomPrenomPaysVille = /^[a-zA-z-\s]+$/
    if(regexNomPrenomPaysVille.test(nom.value) == false || regexNomPrenomPaysVille.test(ville.value) == false || 
    regexNomPrenomPaysVille.test(prenom.value) == false || regexNomPrenomPaysVille.test(pays.value)==false || regexNomPrenomPaysVille.test(adresse.value)==false){
        erreur = "Le champs doit comporter des lettres et des tirets uniquements \n"
    }

    //Code postal - Téléphone
    var regexNumero = /^[0-9]+$/
    if(regexNumero.test(telephone.value) == false || regexNumero.test(codePostal.value) == false){
        erreur = erreur + "Saisir uniquement des caractères numériques \n "
    }

    /*E-mail, regex : 
    Contenir une @ et .;
    Avant @ : nous pouvons trouver, lettres, chiffres ainsi que "-" "_";
    Après @ : vérification similaire, excepté "_". Il faut qu'il y ai au moins 2 caractères après;
    Après . : 2 ou 3 caractères alpha*/
    var regexEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a.zA-Z]{2,3}+$/
    if(regexEmail.test(email.value) == false){
        erreur = erreur + "Saisir une adresse mail valide "
    }

    if(erreur){
        e.preventDefault();
        document.getElementById("erreurForm").innerHTML = erreur;
    }
    else {
        alert("Formulaire envoyé !")
    }

    
});



//Afficher un message d'erreur en cas de champs non renseigné.
/*function inputVide(e){
    var erreur;
    for (var i = 0; i < inputs.length; i++){
        if(inputs[i].value == ''){
            erreur = "Veuillez renseigner tous les champs"
        }
    }
    if(erreur){
        e.preventDefault();
        document.getElementById("erreurForm").innerHTML = erreur;
    }
    else {
        alert("Formulaire envoyé !")
    }
}
var email = document.getElementById('adresse')
console.log(adresse)
function regex(e){
    
    var regexEmail = /[a-zA-z][@][.]$/

    if(regexEmail.test(adresse.value) == false){
        e.preventDefault();
        alert ("fff")
    }
}*/