// Actions et interactions pour la page home.html

import { getAllIngredients, getAllPlats  } from "./actions.js";



export async function get_plats() {
  const orderGroup = document.getElementById("orders_group");

  orderGroup.innerHTML = "chargement...";
  const all_ingredients = await getAllIngredients();

  const plats = getAllPlats()
    .then((plats) => {
      orderGroup.innerHTML = "";

      plats.forEach((plat) => {
        var nom_ingredient = [];
        var quantite_ingredient = [];
        var qte_total = 0;
        const plat_ingredients = JSON.parse(plat.ingredients);
        Object.keys(plat_ingredients).forEach((key) => {
          all_ingredients.forEach((ingredient) => {
            if (ingredient.$id === key) {
              nom_ingredient = [...nom_ingredient, ingredient.nom];
              quantite_ingredient = [
                ...quantite_ingredient,
                plat_ingredients[key],
              ];
            
              var t = parseInt(ingredient.quantite / plat_ingredients[key]);

              if (qte_total < t) {
                qte_total = t;
              }
            }
          });
        });

        const order = document.createElement("div");
        order.classList.add("order");
        qte_total < 1
          ? (order.style.borderColor = "red")
          : (order.style.borderColor = "green");

        order.innerHTML = `
            <div class="order_presentation">
                <img class="presentation_plat" src="${
                  plat.photo_url ? plat.photo_url : ""
                }" alt="plat">
                <div class="presentation_details">
                    <div class="details_name">${plat.nom}</div>
                    <div class="detail_description">${plat.description}</div>
                    <div class="details_infos">
                        <div class="details_price">${plat.prix} </div>
                        <div class="details_qte">${qte_total} </div> 
                    </div>
                </div>
            </div>
            <div class="separator"></div>
            
            `;

        const order_legende = createDivWithClass("div", "order_legende");

        nom_ingredient.forEach((nom, index) => {
          const div_ingredient = createDivWithClass("div", "ingredient");
          const div_ingredient_name = createDivWithClass(
            "div",
            "ingredient_name"
          );
          const div_ingredient_qte = createDivWithClass(
            "div",
            "ingredient_qte"
          );
          div_ingredient_name.innerText = nom;
          div_ingredient_qte.innerText = quantite_ingredient[index];
          div_ingredient.appendChild(div_ingredient_name);
          div_ingredient.appendChild(div_ingredient_qte);
          order_legende.appendChild(div_ingredient);
        });

        order.appendChild(order_legende);
        orderGroup.appendChild(order);
      });
    })
    .catch((e) => {
      orderGroup.innerHTML =
        "Impossible de charger les elements; verifiez votre connection internet.";
    });

  // Gestion de la recherche
  document
    .querySelector(".search_item")
    .addEventListener("input", function (event) {
      const searchValue = event.target.value.toLowerCase(); // Valeur saisie par l'utilisateur
      filterPlats(searchValue); // Appel de la fonction de filtrage
    });

  // Fonction pour filtrer et afficher les plats
  function filterPlats(query) {
    const orderGroup = document.getElementById("orders_group");
    const allOrders = Array.from(orderGroup.querySelectorAll(".order")); // Tous les plats actuellement affichés

    // Cacher tous les plats initialement
    allOrders.forEach((order) => {
      order.style.display = "none";
    });

    // Afficher uniquement les plats correspondants à la recherche
    allOrders.forEach((order) => {
      const platName = order
        .querySelector(".details_name")
        .textContent.toLowerCase();
      if (platName.startsWith(query)) {
        order.style.display = "block"; // Affiche le plat si son nom commence par la recherche
      }
    });
  }
  function createDivWithClass(type, classname) {
    const div = document.createElement(type);
    div.setAttribute("class", classname);
    return div;
  }
}
