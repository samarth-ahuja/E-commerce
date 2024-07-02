import './Home.css';
import ListingTable from '../components/ListingTable';
import Loading from '../components/Loading';
import {useSelector,useDispatch} from 'react-redux';
import {fetchProductList} from '../redux/actions/ProductActions';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const ctx = useSelector(state=>state.ProductOperations);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(fetchProductList());
    },[dispatch])
    return (
        <>
            <h1>E Commerce App</h1>
            <Button variant="contained" onClick={()=>navigate("/product/new")}>Add Product</Button>
            <div className='app'>
                {ctx.loadingProductList && <Loading/>}
                {ctx.productList&&<ListingTable/>}
                {/* {error&&<Error/>} */}
            </div>
        </>
    );
}