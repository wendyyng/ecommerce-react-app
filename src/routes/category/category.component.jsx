import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import './category.styles.scss'
// import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap } from '../../store/categories/categories.selector';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    // const products = categoriesMap[category];
    //categoriesMap is an empty object by default
    const [products, setProducts] = useState(categoriesMap[category]);
    console.log('reder/re-rendring component')
    useEffect(() => {
        console.log('effect fired calling setProducts')
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <>
            <h2 className="category-title ">{category.toUpperCase()}</h2>
            <div className='category-page-container'>
            {
            products && products.map((product) => <ProductCard key={product.id} product={product} />)
            }
        </div>
        </>
    )
}



export default Category