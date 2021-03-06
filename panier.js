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
                `
                    <tr class="fiche" >
                        <td><button class="btnSupprimer" id=${ficheProduit.name}-${ficheProduit.colors}>X</button></td>
                        <td>
                        <img class="produit" src=${ficheProduit.picture}>
                        <span class="nom" id ="${ficheProduit.id}">${ficheProduit.name}</span></td>
                        <td>${ficheProduit.colors}</td>
                        
                        <td class="prix">${ficheProduit.price}</td>
                        <td class="qty" >
                            <button class="btnQtyDown" id=${ficheProduit.id}-${ficheProduit.colors} ><i class="fas fa-arrow-down"></i></button>
                            <span class="qty">${ficheProduit.qty}</span>
                            <button class="btnQtyUp" id=${ficheProduit.colors}-${ficheProduit.id} ><i class="fas fa-arrow-up"></i></button>
                        </td>
                        <td class="total">${ficheProduit.price * ficheProduit.qty}</td>
                    </tr>
                    
                `
            
            
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
    window.location.href = "panier.html";
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

// ---------------------------- BOUTON COMMANDER ----------------------------

var btnCommander = document.querySelector('.btnCommander')
var containerForm = document.querySelector('.containerForm')
console.log(containerForm)

btnCommander.addEventListener("click", afficherFormulaire);

function afficherFormulaire (){
   containerForm.innerHTML += `
   <form method="POST" id="form">
                        <h2 class="headerFormItem">Informations personnelles</h2>
                        <div class="formItem">
                            <label>Nom</label> : 
                            <input type="text" name="nom" id="nom" />
                            <i class="fas fa-check-circle"></i>
                            <i class="fas fa-exclamation-circle"></i>
                            <small>Message erreur</small>
                        </div>
                        
                        <div class="formItem" >
                            <label>Prénom</label> : 
                            <input type="text" name="prenom" id="prenom"   />
                            <i class="fas fa-check-circle"></i>
                            <i class="fas fa-exclamation-circle"></i>
                            <small>Message erreur</small>
                        </div>
                        
                        <div class="formItem">
                            <label>E-mail</label> : 
                            <input type="text" name="email" id="email" />
                            <i class="fas fa-check-circle"></i>
                            <i class="fas fa-exclamation-circle"></i>
                            <small>Message erreur</small>
                        </div>
                            
                        <h2 class="headerFormItem">Adresse</h2>
                        <div class="formItem">
                            <label>Adresse</label> : 
                            <input type="text" name="adresse" id="adresse" />
                            <i class="fas fa-check-circle"></i>
                            <i class="fas fa-exclamation-circle"></i>
                            <small>Message erreur</small>
                        </div>

                        <div class="formItem" >
                            <label>Code Postal</label> : 
                            <input type="text" name="codePostal" id="codePostal" />
                            <i class="fas fa-check-circle"></i>
                            <i class="fas fa-exclamation-circle"></i>
                            <small>Message erreur</small>
                        </div>

                        <div class="formItem">
                            <label>Ville</label> : 
                            <input type="text" name="ville" id="ville" />
                            <i class="fas fa-check-circle"></i>
                            <i class="fas fa-exclamation-circle"></i>
                            <small>Message erreur</small>
                        </div>

                        <div class="formItem">
                            <label>Pays</label> : 
                            <input type="text" name="pays"  id="pays"/>
                            <i class="fas fa-check-circle"></i>
                            <i class="fas fa-exclamation-circle"></i>
                            <small>Message erreur</small>
                        
                        <div class="formItem">
                            <label>Téléphone</label> : 
                            <input type="tel" name="telephone" id="telephone" />
                            <i class="fas fa-check-circle"></i>
                            <i class="fas fa-exclamation-circle"></i>
                            <small>Message erreur</small>
                        </div>
    

                            <div class = "containerBtnCommanderForm">
                            <input class = "btnCommanderForm" type="submit" name="valider" value="Commander">
                        </div> 
                    </form>
   `

// ---------------------------- FORMULAIRE COMMANDE ----------------------------

   var form = document.getElementById("form")
   form.addEventListener("submit", function(e){
    e.preventDefault();
    if(inputValide()){
       sendBackEnd()
    }
    
});

//var form = document.getElementById("form")
var nom = document.getElementById('nom')
var prenom = document.getElementById('prenom')
var adresse = document.getElementById('adresse')
var ville = document.getElementById('ville')
var pays = document.getElementById('pays')
var telephone = document.getElementById('telephone')
var codePostal = document.getElementById('codePostal')
var email = document.getElementById('email')

/*----- RegExp ----- */
var regexpNomPrenomPaysVille = /^[a-zA-z-\s]+$/;
var regexpTelephone = /^[0-9]{10}$/;
var regexpcodePostal = /^[0-9]{5}$/
/*E-mail : 
    Contenir une @ et un .;
    Avant @ : nous pouvons trouver, lettres, chiffres ainsi que "-" "_" ".";
    Contenir 1 @
    Après @ : vérification similaire au avant @;
    Contenir 1 "." puis 2 ou 3 caractères alpha;
    */
var regexpEmail = new RegExp (/^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-zA-Z]{2,3}$/)

/*form.addEventListener("submit", function(e){
    e.preventDefault();
    if(inputValide()){
       sendBackEnd()
    }
    
});*/

function inputValide(){
    //Mettre dans une variable la valeur des inputs
    var nomValue = nom.value.trim(); 
    var prenomValue = prenom.value.trim();
    var adresseValue = adresse.value.trim();
    var villeValue = ville.value.trim();
    var paysValue = pays.value.trim();
    var telephoneValue = telephone.value.trim();
    var codePostalValue = codePostal.value.trim();
    var emailValue = email.value.trim();

    /* ----- Validation Nom ----- */

    if(nomValue === '' ){
        //Afficher un message d'erreur
        messageErreur(nom, 'Le champ doit être complété')
        return 
    }
    else if(regexpNomPrenomPaysVille.test(nomValue) == false){
        messageErreur(nom, 'Le nom doit comporter des lettres et des tirets uniquements')
        return 
    }
    else{
        //Afficher un message de validation
        messageValide(nom)
    }
    
    
    /* ----- Validation Prénom ----- */

    if(prenomValue === '' ){
        messageErreur(prenom, 'Le champ doit être complété')
        return

    }
    else if(regexpNomPrenomPaysVille.test(prenomValue) == false){
        messageErreur(prenom, 'Le nom doit comporter des lettres et des tirets uniquements')
        return
    }
    else{
        messageValide(prenom)
    }
  

      /* ----- Validation email ----- */
    
      if(emailValue === '' ){
        messageErreur(email, 'Le champ doit être complété')
        return
    }
    else if(regexpEmail.test(emailValue) == false){
        messageErreur(email, 'email invalide')
        return
    }
    else{
        messageValide(email)
    }

    /* ----- Validation adresse ----- */
    
    if(adresseValue === '' ){
        messageErreur(adresse, 'Le champ doit être complété')
        return
    }
    else if(regexpNomPrenomPaysVille.test(adresseValue) == false){
        messageErreur(adresse, 'Le nom doit comporter des lettres et des tirets uniquements')
        return
    }

    else{
        messageValide(adresse)
    }

    /* ----- Validation Code postal ----- */
    
    if(codePostalValue === '' ){
        messageErreur(codePostal, 'Le champ doit être complété')
        return

    }
    else if(regexpcodePostal.test(codePostalValue) == false){
        messageErreur(codePostal, 'Code postal invalide')
        return
    }
    else{
        messageValide(codePostal)
    }

    /* ----- Validation ville ----- */
    
    if(villeValue === '' ){
        messageErreur(ville, 'Le champ doit être complété')
        return

    }
    else if(regexpNomPrenomPaysVille.test(villeValue) == false){
        messageErreur(ville, 'Le nom doit comporter des lettres et des tirets uniquements')
        return
    }
    else{
        messageValide(ville)
    }
    
    /* ----- Validation pays ----- */
    
    if(paysValue === '' ){
        messageErreur(pays, 'Le champ doit être complété')
        return false
    }
    else if(regexpNomPrenomPaysVille.test(paysValue) == false){
        messageErreur(pays, 'Le nom doit comporter des lettres et des tirets uniquements')
        return
    }
    else{
        messageValide(pays)
    }

    /* ----- Validation téléphone ----- */
    
     if(telephoneValue === '' ){
        messageErreur(telephone, 'Le champ doit être complété')
        return
    }
    else if(regexpTelephone.test(telephoneValue) == false){
        messageErreur(telephone, 'Numéro invalide')
        return
    }
    else{
        messageValide(telephone)
    }
    return true
}

function messageErreur(input, message){
    var formItem = input.parentElement; // .formItem
    var small = formItem.querySelector('small')

    //Ajouter un message d'erreur à la balise <small>
    small.innerText = message

    //Mettre en rouge la bordure en ajoutant "invalide" à la classe .formItem
    formItem.className = 'formItem invalide'
}

function messageValide(input){
    var formItem = input.parentElement; // .formItem
    var small = formItem.querySelector('small')

    //Mettre en vert la bordure en ajoutant "valide" à la classe .formItem
    formItem.className = 'formItem valide'

}
console.log(produits)


function sendBackEnd (){

    //Récupérer les ID des produits
    var products = [];
    for(i = 0; i < tableauProduits.length; i = i + 1){
        tableauProduits[i].id
        products.push(tableauProduits[i].id)
        //console.log(typeof tableauProduits[i].id)
    }
    console.log(products)

    //Récupérer les valeurs du formulaire
    var contact = {
        firstName : nom.value,
        lastName : prenom.value,
        address : adresse.value,
        city : ville.value,
        email : email.value
    
    }
    //console.log(typeof contact.email)

    //Envoyer les données au serveur
    fetch('http://localhost:3000/api/teddies/order', {
        method : 'POST',
        headers : {
            'Content-Type' :'application/json',
        },
        body : JSON.stringify({contact,products}),
    })

    //Accéder à la requête et convertir en format json
    .then(function(response){
      return response.json()
    //Récupérer les données du body de la requête
    })
    .then(function(data){
        localStorage.setItem('order',JSON.stringify(data.orderId))
        document.location ='file:///C:/Users/konat/Documents/Openclassrooms/P5/front-end/confirm.html'
    })

}

}






//sendBackEnd ()


