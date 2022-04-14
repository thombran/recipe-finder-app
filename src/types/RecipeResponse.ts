type RecipeResponse = {
    recipes: Array<Recipe>,
    results: Array<Recipe>
    length: number
};

type Recipe = {
    cuisines: Array<string>,
    diets: Array<string>,
    dishTypes: Array<string>,
    extendedIngredients: Array<Ingredient>,
    image: string,
    instructions: string,
    readyInMinutes: number,
    servings: number,
    sourceUrl: string,
    title: string,
};

type Ingredient = {
    amount: number,
    measures: { us: { amount: number, unitShort: string, unitLong: string } },
    name: string,
    unit: string,
    original: string
};

export { RecipeResponse, Recipe };