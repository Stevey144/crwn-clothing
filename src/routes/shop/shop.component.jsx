import { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import './shop.styles.scss';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.util';
import setCategoriesMap from '../../store/categories/category.action';

const Shop = () => {
  const dispatch = useDispatch();

    useEffect(() =>{
        const getCategoriesMap = async () =>{
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            dispatch(setCategoriesMap(categoryMap));
        }
        getCategoriesMap();
    }, []);


    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element ={<Category />} />
        </Routes>
         );
     

};

export default Shop;

