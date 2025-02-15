const initalState = {
    recipes: JSON.parse(localStorage.getItem('recipes')) || [],
    recipe: null,
    isLoading: false,
    isCreated: false,
    error: null,
    isUpdated: false
}

export const recipeReducer = (state = initalState, action) => {
    switch (action.type) {
        case "LOADING" : 
        return{
            ...state,
            isLoading: true
        }
        case "ADD_NEW_RECIPE":
        return{
            ...state,
            isCreated: true
        }

        case "ADD_NEW_RECIPE_REJ": 
        return {
            ...state,
            error: action.payload
        }

        case "GET_ALL_RECIPES":
            return {
                ...state,
                recipes: action.payload,
                isLoading: false,
                isCreated: false,
                isUpdated: false
            }
        

        case "SINGLE_RECIPE":
            return {
                ...state,
                recipe: action.payload
            }

        case "UPDATE_RECIPE": 
            return {
                ...state,
                isUpdated: true,
                recipe: null
            }
        default:
            return state;
    }
}