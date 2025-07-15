const snackName = document.querySelector(".snack_name");
const snackIngredients = document.querySelector(".snack_ingredients");

const snackList = document.querySelector(".snack_list");

const URL = "http://localhost:3000/api/lanches";

const lanchesAPI = async () => {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Failed to fetch snacks");
    }

    const data = await response.json();
    console.log(data);
    displaySnack(data);
    return;
  } catch (error) {
    console.error(error);
  }
};

const displaySnack = (data) => {
  data.forEach((element) => {
    const snackImg = document.createElement("img");
    const snackName = document.createElement("p");
    const snackIngredients = document.createElement("p");

    snackImg.src = element.imgUrl;
    snackName.textContent = element.nome;
    snackIngredients.textContent = element.ingredientes;

    snackList.appendChild(snackImg);
    snackList.appendChild(snackName);
    snackList.appendChild(snackIngredients);

    snackImg.classList.add("snack_img");
    snackName.classList.add("snack_name");
    snackIngredients.classList.add("snack_ingredients");
  });
};

lanchesAPI();
