// Actions et interactions pour la page menu.html

import { deleteIngredient, getAllIngredients, updateQuantite } from "./actions.js";

export async function get_ingredients() {
  const orderGroup = document.getElementById("orders_ing_group");

  orderGroup.innerHTML = "chargement...";

  try {
    const ingredients = await getAllIngredients();
    orderGroup.innerHTML = "";

      ingredients.forEach((ingredient) => {

        const order = document.createElement("div");
        order.classList.add("order");

        order.innerHTML = `
            <div class="order_presentation">
                <img class="presentation_plat" src="${
                  ingredient.photo_url ? ingredient.photo_url : ""
                }" alt="ingredient">
                <div class="presentation_details">
                    <div class="details_name">${ingredient.nom}</div>
                    <div class="detail_description">${
                      ingredient.description
                    }</div>
                    <div class="details_infos">
                        <div class="details_qte">${
                          ingredient.quantite
                        } kg</div> 
                    </div>
                </div>
            </div>
            <div class="separator"></div>
           
            `;
        /**
             * <div class="order_legende">
                <div class="ingredient">
                    <div>Quantite :</div>
                    <input type="number" min="0" class="upd_input">
                    <button class="upd_ing" id="upd_ing ">MAJ</button>
                    <div>
                    |
                    </div>
                    <button class="del_ing" id="del_ing ">Supprimer tout</button>
                </div>
         
              </div>
             */
        const order_legende = createDivWithClass("div", "order_legende");

        const div_ingredient = createDivWithClass("div", "ingredient");

        const input = createDivWithClass("input", "upd_input");
        input.setAttribute("type", "number");
        input.setAttribute("min", "0");

        const button = createDivWithClass("button", "upd_ing");
        button.setAttribute("id", "upd_ing");
        button.innerText = "MAJ";

        const separator = createDivWithClass("div", "");
        separator.innerText = "|";

        const button2 = createDivWithClass("button", "del_ing");
        button2.setAttribute("id", "del_ing");
        button2.innerText = "Supprimer tout";
        const btn_qte = createDivWithClass("div", "");
        btn_qte.innerText = "Quantite : ";

        button.addEventListener("click", (e) => {
          updateQuantite(ingredient.$id, input.value).then((e) => {
            console.log(e);
            window.location.reload();
          });
        });
        button2.addEventListener("click", (e) => {
            deleteIngredient(ingredient.$id).then((e) => {
                console.log(e);
                window.location.reload();
            })

        });
        div_ingredient.appendChild(btn_qte);
        div_ingredient.appendChild(input);
        div_ingredient.appendChild(button);
        
        div_ingredient.appendChild(separator);

        div_ingredient.appendChild(button2);
        order_legende.appendChild(div_ingredient);
        order.appendChild(order_legende);
        orderGroup.appendChild(order);
      });
    } catch (e) {
        console.log(e);
        
        orderGroup.innerHTML =
        "Impossible de charger les elements; verifiez votre connection internet.";
    };

  function createDivWithClass(type, classname) {
    const div = document.createElement(type);
    div.setAttribute("class", classname);
    return div;
  }
}
