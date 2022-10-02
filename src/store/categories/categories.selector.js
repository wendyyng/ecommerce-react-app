import { createSelector } from 'reselect'
import Category from '../../routes/category/category.component';
import { selectCurrentUser } from '../user/user.selector';

//if input is not changes, so as output
const selectCategoryReducer = (state) => state.categories;

//create memoize selector
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories 
)

//As long as the categories array does not change, do not rerun this method
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => 
  categories.reduce((acc, category) => {
    const { title, items } = category;  
    acc[title.toLowerCase()] = items;
      return acc;
    }, {})
    )