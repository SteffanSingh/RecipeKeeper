window.onload = function() {
  //add and update form implementation.
  if (localStorage.getItem("recipes")) {
    recipes = JSON.parse(localStorage.getItem("recipes"));
    recipes.forEach((recipe, index) => {
      displayRecipe(recipe, index);
    });
  } else {
    recipes = [];
  }

  addUpdateForm();
  addRecipeFunction(recipes);
};

function addRecipeFunction(recipes) {
  // Add recipes logics implementations.
  let recipeForm = document.getElementById("recipe-form");
  let recipeName = document.getElementById("recipe-name");
  let recipeIngredients = document.getElementById("ingredients");
  let recipeSteps = document.getElementById("steps");
  let recipeImage = document.getElementById("image-url");

  recipeForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let enteredRecipeName = recipeName.value;
    let enteredRecipeIngredients = recipeIngredients.value;
    let enteredRecipeSteps = recipeSteps.value;
    let enteredRecipeImage = recipeImage.value;

    //create a new recipe
    let newRecipe = {
      name: enteredRecipeName,
      ingredients: enteredRecipeIngredients,
      steps: enteredRecipeSteps,
      image: enteredRecipeImage,
      likes: 0
    };

    recipes.push(newRecipe);

    localStorage.setItem("recipes", JSON.stringify(recipes));

    displayRecipe(newRecipe, recipes.length - 1);
    //clearing the input values.
    recipeForm.reset();
  });
}

function displayRecipe(recipe, index) {
  let displayArea = document.getElementById("display-area");
  let recipeDiv = document.createElement("div");
  recipeDiv.style.width = "210px";
  recipeDiv.style.paddingLeft = "5px";
  recipeDiv.style.paddingRight = "5px";
  recipeDiv.setAttribute("class", "card bg-light");

  recipeDiv.innerHTML += `<div style="padding:5px;">
                <h5 class="card-title" style="font-weight:600;width:200px;margin:0;padding:0;
                 color:green; line-height:1;">${recipe.name}</h5>
                <p class="card-text" style="margin:0;padding:0; line-height:1;
                  font-size:.7rem; line-height:1;">${recipe.ingredients}.</p>
                
            
                </div>`;

  recipeDiv.innerHTML += `<img src=${recipe.image} class="card-img-top" alt="Recipe image"
                                 style="margin-top:5px;padding:0;"
                                height="150px" width="150px" >`;
  recipeDiv.innerHTML +=    `<p style="margin:0;padding:0; line-height:1;
                                 font-size:.8rem; line-height:1;" class="card-text">${recipe.steps}.</p>`;

  let divButtons = document.createElement("div");
  divButtons.setAttribute(
    "style",
    "display:flex;justify-content:space-around;margin-bottom:5px;"
  );

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "DEL";
  deleteButton.style.width = "70px";
  deleteButton.style.color = "yellow";
  deleteButton.style.borderRadius = "5px";
  deleteButton.setAttribute("class", "bg-danger");
  deleteButton.style.fontSize = ".8rem";

  deleteButton.onclick = function() {
    let confirmation= confirm("Are you sure, you want to delete this recipe?")
    if (confirmation){
    deleteRecipe(index);
    }
    else{
        console.log("Deletion is canceled! ")
    }
  };


  let editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.style.width = "70px";
  editButton.style.color = "yellow";
  editButton.style.borderRadius = "5px";
  editButton.setAttribute("class", "bg-info");
  editButton.style.fontSize = ".8rem";
  editButton.classList.add("edit-recipe");

  editButton.onclick = function() {
    editForm.classList.remove("open");
    editRecipe(index);
  };

  divButtons.append(deleteButton);
  divButtons.append(editButton);

  recipeDiv.appendChild(divButtons);

  displayArea.appendChild(recipeDiv);
}


function editRecipe(index) {
    


}


function deleteRecipe(index) {
  // Remove recipe from the array recipes
  let displayArea = document.getElementById("display-area");
  recipes.splice(index, 1);
  localStorage.setItem("recipes", JSON.stringify(recipes));
  // Refresh the Display
  displayArea.innerHTML = "";
  recipes.forEach((item, i) => {
    displayRecipe(item, i);
  });
}

function addUpdateForm() {
  const addRecipe = document.querySelector("#add-recipe");
  const buttonAddRecipe = document.querySelector("#btn-add-recipe");
  const addForm = document.querySelector(".add-form");

  buttonAddRecipe.addEventListener("click", function() {
    console.log("add-recipe button is fired!");
    // Open the form by adding the open class
    addForm.classList.remove("open");
  });

  addRecipe.addEventListener("click", function() {
    console.log("add-recipe form is closed!");
    // Close the form by removing the open class
    addForm.classList.add("open");
  });

  // Edit recipe form Implemetation
  const editRecipes = document.querySelectorAll(".edit-recipe");
  const buttonEditRecpie = document.querySelector("#btn-edit-recipe");
  const editForm = document.querySelector(".edit-recipe-form");

  buttonEditRecpie.addEventListener("click", function() {
    console.log("add-recipe button is fired!");
    // Open the form by adding the open class
    editForm.classList.remove("open");
  });

  editRecipes.forEach(function(form) {
    form.addEventListener("click", function() {
        console.log("add-recipe form is closed!");
        // Close the form by removing the open class
        editForm.classList.add("open");
      });
  })
  
}
