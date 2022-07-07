import CATEGORY_ACTION_TYPE from "./category.types";

const CATEGORIES_INITIAL_STATE = {
    categoriesMap:{}
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE,action = {}) =>{
    const { type, payload } = action;

    switch(type){
    case CATEGORY_ACTION_TYPE.SET_CATEGORIES_MAP:
      return {...state, categoriesMap:payload};
    default:
        return state;

    }
}

export default CATEGORIES_INITIAL_STATE;