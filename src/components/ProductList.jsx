import {useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import ProductItem from './ProductItem';

export default function ProductList() {
    const data = useSelector(state => state.products);
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {
            try {
                let res = await fetch('https://fakestoreapi.com/products/')
                res = await res.json();
                res = JSON.parse(JSON.stringify(res));
                return res;
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData().then(
            data => {
                dispatch({
                    type: "SET_DATA",
                    payload: {
                        response: data
                    }
                })   
            }
        );
    }, [])
    return (
        <div>
            <h2>Products</h2>
            <ol>
                {data.map( (item) =>  <ProductItem key={item.id} item={item}/>)}
            </ol>
        </div>
    );
}