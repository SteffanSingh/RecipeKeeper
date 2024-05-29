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
  const addForm = document.querySelector(".add-form");
  
  
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
    showMessage(`Recipe ${newRecipe.name} has been added succefully!`, "success");
    //removing the  update form on submission !
    addForm.classList.remove("open");
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
  recipeDiv.innerHTML += `<p style="margin:0;padding:0; 
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
    let confirmation = confirm("Are you sure, you want to delete this recipe?");
    if (confirmation) {
      deleteRecipe(index);
    } else {
      console.log("Deletion is canceled! ");
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

  let editRecipes = document.querySelectorAll(".edit-recipe");
  let editForm = document.querySelector(".edit-recipe-form");
  
  editButton.onclick = function() {
    editForm.classList.add("open");
    showEditForm(index);
  };
   

  divButtons.append(deleteButton);
  divButtons.append(editButton);

  recipeDiv.appendChild(divButtons);

  displayArea.appendChild(recipeDiv);
}



function showEditForm(index) {
  let recipe = recipes[index];
  let editForm = document.querySelector(".edit-form");
   
  document.getElementById("recipeName").setAttribute("placeholder",`${recipe.name}`);
  document.getElementById("ingredient").setAttribute("placeholder",`${recipe.ingredients}`);
  document.getElementById("step").setAttribute("placeholder",`${recipe.steps}`);
  document.getElementById("imageURL").setAttribute("placeholder",`${recipe.image}`);

  editForm.onsubmit = function(event) {
    event.preventDefault();
    updateRecipe(index);
  };

  editForm.classList.remove("open");
}

function updateRecipe(index) {
  let recipe = recipes[index];
  let newRecipeName = document.getElementById("recipeName").value;
  let newRecipeIngredients = document.getElementById("ingredient").value;
  let newRecipeSteps = document.getElementById("step").value;
  let newRecipeImage = document.getElementById("imageURL").value;
  
  

  recipe.name = newRecipeName || recipe.name;
  recipe.ingredients = newRecipeIngredients || recipe.ingredients;
  recipe.steps = newRecipeSteps || recipe.steps;
  recipe.image = newRecipeImage || recipe.image;
  console.log(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
  let displayArea = document.getElementById("display-area");
  displayArea.innerHTML = "";
  recipes.forEach((item, i) => {
    displayRecipe(item, i);
  });
  showMessage(`Recipe ${recipe.name} has been updated successfully!` , "success");

  document.querySelector(".edit-form").reset();
  document.querySelector(".edit-recipe-form").classList.remove("open");
}



function deleteRecipe(index) {
  // Remove recipe from the array recipes
  let displayArea = document.getElementById("display-area");
  let recipe = recipes[index];
  showMessage(`Recipe ${recipe.name} has been deleted successfully!` , "success");

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

  addRecipe.addEventListener("click", function() {
    console.log("add-recipe form is  opened!");
    
    addForm.classList.add("open");
  });

  }


function showMessage(message, type) {
  const messageDiv = document.getElementById('message-div');
  messageDiv.textContent = message;
  messageDiv.className = `alert alert-${type}`;
  messageDiv.classList.remove('d-none');

}


function hideMessage() {
  const messageDiv = document.getElementById('message-div');
  messageDiv.classList.add('d-none');
}

function home() {
  const homeButtons = document.querySelectorAll(".home");
  homeButtons.forEach(button => {
    button.addEventListener("click", function(event) {
      event.preventDefault();
      document.querySelector(".add-form").classList.remove("open");
      document.querySelector(".edit-recipe-form").classList.remove("open");
    });
  });
}

// Call the home function to add the event listeners
home();

 
 