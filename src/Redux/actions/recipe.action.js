import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
export const addNewRecipe = () => {
    return {
        type: "ADD_NEW_RECIPE",
    }
}

export const addRecipeRej = (msg) => {
    return {
        type: "ADD_NEW_RECIPE_REJ",
        payload: msg
    }
}

export const getAllRecipes = (data) => {
    return {
        type: "GET_ALL_RECIPES",
        payload: data
    }
}


export const singleRecipe = (data) => {
    return {
        type: "SINGLE_RECIPE",
        payload: data
    }
}

export const updateRecipe = () => {
    return {
        type: "UPDATE_RECIPE",
    }
}

export const loading = () => {
    return {
        type: "LOADING"
    }
}


export const getAllRecipesAsync = () => {
    return async (dispatch) => {
        dispatch(loading())
        try {
            let recipes = await getDocs(collection(db, "recipe"))

            let result = recipes.docs.map((recipes) => {
                return {
                    id: recipes.id,
                    ...recipes.data()
                }
            })
            dispatch(getAllRecipes(result))
        } catch (err) {
            console.log(err);
        }
    }
}


export const addRecipeAsync = (data) => {
    return async (dispatch) => {
        try {
            await setDoc(doc(db, 'recipe', `${data.id}`), data)
            dispatch(addNewRecipe())
        } catch (err) {
            console.log(err)
        }
    }
}

export const singleRecipeAsync = (id) => {
    return async (dispatch) => {
        try {
            let res = await getDoc(doc(db, 'recipe', `${id}`))
            let result = res.data();
            result.id = res.id;
            console.log(result)
            dispatch(singleRecipe(result))
        } catch (err) {
            console.log(err);
        }
    }
}


export const deleteRecipeAsync = (id) => {
    return async (dispatch) => {
        try {
            await deleteDoc(doc(db, "recipe", `${id}`))
            dispatch(getAllRecipesAsync())
        } catch (err) {
            console.log(err);
        }
    }
}


export const updateRecipeAsync = (data) => {
    return async (dispatch) => {

        try {
            await updateDoc(doc(db, 'recipe', `${data.id}`), data);
            dispatch(updateRecipe())
        } catch (error) {
            console.log(error);
        }

    }
}