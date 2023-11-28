const axios = require("axios");
const { admin, db } = require("../src/firebase");

async function fetchDataFromMealDBByLetter(letter) {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    return response.data.meals;
  } catch (error) {
    console.error(
      `Error fetching data from MealDB for letter ${letter}:`,
      error.message
    );
    return null;
  }
}

async function saveDataToFirestore(data) {
  try {
    const collectionRef = db.collection("meals"); // Replace with your desired collection name

    for (const meal of data) {
      const mealDocument = {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strCategory: meal.strCategory,
        strArea: meal.strArea,
        strInstructions: meal.strInstructions,
        strMealThumb: meal.strMealThumb,
        strTags: meal.strTags,
        strYoutube: meal.strYoutube,
        strIngredient1: meal.strIngredient1,
        strIngredient2: meal.strIngredient2,
        strIngredient3: meal.strIngredient3,
        strIngredient4: meal.strIngredient4,
        strIngredient5: meal.strIngredient5,
        strIngredient6: meal.strIngredient6,
        strIngredient7: meal.strIngredient7,
        strIngredient8: meal.strIngredient8,
        strIngredient9: meal.strIngredient9,
        strIngredient10: meal.strIngredient10,
        strIngredient11: meal.strIngredient11,
        strIngredient12: meal.strIngredient12,
        strIngredient13: meal.strIngredient13,
        strIngredient14: meal.strIngredient14,
        strIngredient15: meal.strIngredient15,
        strMeasure1: meal.strMeasure1,
        strMeasure2: meal.strMeasure2,
        strMeasure3: meal.strMeasure3,
        strMeasure4: meal.strMeasure4,
        strMeasure5: meal.strMeasure5,
        strMeasure6: meal.strMeasure6,
        strMeasure7: meal.strMeasure7,
        strMeasure8: meal.strMeasure8,
        strMeasure9: meal.strMeasure9,
        strMeasure10: meal.strMeasure10,
        strMeasure11: meal.strMeasure11,
        strMeasure12: meal.strMeasure12,
        strMeasure13: meal.strMeasure13,
        strMeasure14: meal.strMeasure14,
        strMeasure15: meal.strMeasure15,
        strSource: meal.strSource,
      };

      await collectionRef.add(mealDocument);
    }

    console.log("Data successfully saved to Firestore.");
  } catch (error) {
    console.error("Error saving data to Firestore:", error.message);
  }
}

async function importDataForAlphabets() {
  // Loop through the alphabets from 'a' to 'z'
  for (let letterCode = 97; letterCode <= 122; letterCode++) {
    const letter = String.fromCharCode(letterCode);
    const mealData = await fetchDataFromMealDBByLetter(letter);

    if (mealData) {
      await saveDataToFirestore(mealData);
    }
  }
}

importDataForAlphabets();

//meal data
// idMeal: meal.idMeal,
//         strMeal: meal.strMeal,
//         strCategory: meal.strCategory,
//         strArea: meal.strArea,
//         strInstructions: meal.strInstructions,
//         strMealThumb: meal.strMealThumb,
//         strTags: meal.strTags,
//         strYoutube: meal.strYoutube,
//         strIngredient1: meal.strIngredient1,
//         strIngredient2: meal.strIngredient2,
//         strIngredient3: meal.strIngredient3,
//         strIngredient4: meal.strIngredient4,
//         strIngredient5: meal.strIngredient5,
//         strIngredient6: meal.strIngredient6,
//         strIngredient7: meal.strIngredient7,
//         strIngredient8: meal.strIngredient8,
//         strIngredient9: meal.strIngredient9,
//         strIngredient10: meal.strIngredient10,
//         strIngredient11: meal.strIngredient11,
//         strIngredient12: meal.strIngredient12,
//         strIngredient13: meal.strIngredient13,
//         strIngredient14: meal.strIngredient14,
//         strIngredient15: meal.strIngredient15,
//         strMeasure1: meal.strMeasure1,
//         strMeasure2: meal.strMeasure2,
//         strMeasure3: meal.strMeasure3,
//         strMeasure4: meal.strMeasure4,
//         strMeasure5: meal.strMeasure5,
//         strMeasure6: meal.strMeasure6,
//         strMeasure7: meal.strMeasure7,
//         strMeasure8: meal.strMeasure8,
//         strMeasure9: meal.strMeasure9,
//         strMeasure10: meal.strMeasure10,
//         strMeasure11: meal.strMeasure11,
//         strMeasure12: meal.strMeasure12,
//         strMeasure13: meal.strMeasure13,
//         strMeasure14: meal.strMeasure14,
//         strMeasure15: meal.strMeasure15,
//         strSource: meal.strSource,
