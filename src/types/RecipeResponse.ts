type RecipeResponse = {
    recipes: Array<Recipe>,
    results: Array<Recipe>
    length: number
};

type Recipe = {
    cuisines: Array<string>,
    diets: Array<string>,
    dishTypes: Array<string>,
    extendedIngredients: Array<ExtendedIngredient>,
    image: string,
    instructions: string,
    analyzedInstructions: Array<InstructionSet>
    nutrition: NutritionInfo,
    readyInMinutes: number,
    servings: number,
    sourceUrl: string,
    title: string,
    id: number
};

type ExtendedIngredient = {
    amount: number,
    measures: { us: { amount: number, unitShort: string, unitLong: string } },
    name: string,
    unit: string,
    original: string
};

type InstructionSet = {
    name: string,
    steps: Array<Instruction>
};

type Instruction = {
    equipment: Array<Equipment>,
    ingredients: Array<Ingredient>,
    number: number,
    step: string
};

type Equipment = {
    name: string,
    localizedName: string
};

type Ingredient = {
    name: string,
    localizedName: string
};

type NutritionInfo = {
    ingredients: Array<NutritionItem>
};

type NutritionItem = {
    amount: number,
    name: string,
    unit: string
};

export { RecipeResponse, Recipe, InstructionSet, ExtendedIngredient, NutritionInfo };