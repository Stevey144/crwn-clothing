import createAction from "../../utils/reducer/reducer.utils";
import CATEGORY_ACTION_TYPE from "./category.types";

export const setCategories = (categoriesArray) => createAction(CATEGORY_ACTION_TYPE.SET_CATEGORIES,categoriesArray);
