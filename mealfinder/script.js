const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_MealEl = document.getElementById("single-meal");

//   search Meal
function searchMeal(e) {
  e.preventDefault();

  //   Clear Single Meal
  single_MealEl.innerHTML = "";

  //   get search term
  const term = search.value;

  //   chack for rmpty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search results for '${term}':`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search result. Try again!`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                `
                <div class='meal'>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal} </h3>
                    </div>
                </div>
                `
            )
            .join("");
        }
      });
    //   clear search text
    search.value = "";
  } else {
    alert("Please enter search term");
  }
}

function addMealToDom(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_MealEl.innerHTML = `
  <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info">
        
        </div>
  </div>
  `;
}

// Fetch meal by id
function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}
    `)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDom(meal);
    });
}

//   Event Listeners
submit.addEventListener("submit", searchMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealID");
    getMealById(mealId);
  }
});
