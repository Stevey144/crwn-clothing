import createAction from "../../utils/reducer/reducer.utils";
import CATEGORY_ACTION_TYPE from "./category.types";

const setCategoriesMap = (categoriesMap) => createAction(CATEGORY_ACTION_TYPE.SET_CATEGORIES_MAP,categoriesMap);

export default setCategoriesMap;