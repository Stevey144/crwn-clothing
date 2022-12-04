import CATEGORY_ACTION_TYPE from "./category.types";

const CATEGORIES_INITIAL_STATE = {
    categories:[],
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE,action = {}) =>{
    const { type, payload } = action;

    switch(type){
    case CATEGORY_ACTION_TYPE.SET_CATEGORIES:
      return {...state, categories:payload};
    default:
        return state;

    }
}

export default CATEGORIES_INITIAL_STATE;