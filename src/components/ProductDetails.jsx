import './ProductDetails.css';
import { useSelector,useDispatch } from 'react-redux';
import Card from './UI/Card';

export default function ProductDetails(){
    const data = useSelector(state => state.products);
    const dispatch = useDispatch();
    return (
        <div className="product-details">
            {data.map((item)=>{
                return <Card title={item.title} img={item.image} id={item.id} key={item.id}></Card>
            })}
        </div>
    )
}