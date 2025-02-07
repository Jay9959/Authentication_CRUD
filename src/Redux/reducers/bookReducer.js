const initalState = {
    books: JSON.parse(localStorage.getItem('books')) || [],
    book: null,
    isLoading: false,
    isCreated: false,
    error: null,
    isUpdated: false
}

export const bookReducer = (state = initalState, action) => {
    switch (action.type) {
        case "LOADING" : 
        return{
            ...state,
            isLoading: true
        }
        case "ADD_NEW_BOOK":
        return{
            ...state,
            isCreated: true
        }

        case "ADD_NEW_BOOK_REJ": 
        return {
            ...state,
            error: action.payload
        }

        case "GET_ALL_BOOKS":
            return {
                ...state,
                books: action.payload,
                isLoading: false,
                isCreated: false,
                isUpdated: false
            }
        

        case "SINGLE_BOOK":
            return {
                ...state,
                book: action.payload
            }

        case "UPDATE_BOOK": 
            return {
                ...state,
                isUpdated: true,
                book: null
            }
        default:
            return state;
    }
}