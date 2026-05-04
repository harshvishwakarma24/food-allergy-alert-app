export const checkAllergens = (ingredientsText, userAllergens) => {
  if (!ingredientsText) return [];

  const ingredientsLower = ingredientsText.toLowerCase();

  return userAllergens.filter((allergen) =>
    ingredientsLower.includes(allergen.toLowerCase())
  );
};


