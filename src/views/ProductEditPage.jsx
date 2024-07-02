import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { fetchProductData } from "../redux/actions/ProductActions";
import { useEffect, useState } from "react";
import { FormControl, TextField, Box, Button } from '@mui/material';
import './ProductEditPage.css';
import Loading from "../components/Loading";
import { updateProductData } from "../redux/actions/ProductActions";

export default function ProductEditPage() {
    const [productInputState,setProductInputState] = useState({
        id:'',
        title:'',
        price:'',
        description:'',
        category:'',
        image:'',
    }); 
    const { id } = useParams();
    const ctx = useSelector(state=>state.ProductOperations);
    const dispatch = useDispatch();
    function submitHandler(event) {
        event.preventDefault();
        dispatch(updateProductData({...productInputState}));
    }
    useEffect(()=>{
        setProductInputState(ctx.edittingProductItem);
    },[ctx.edittingProductItem])
    useEffect(() => {
        dispatch(fetchProductData(id))
    }, [dispatch])
    function handleChange(event){
        setProductInputState((prev)=>({
            ...prev,
            [event.target.name]:event.target.value
        }))
    }

    return (
        <Box>
            <h2>Product Details</h2>
            {ctx.loadingEdittingProductItem && <Loading/>}
            <form className='ProductUpdateForm' onSubmit={submitHandler}>
                <FormControl sx={{ margin: 2 }}>
                    <TextField label="Id" name="id" value={productInputState?.id || 'ID'} onChange={handleChange}/>
                </FormControl>
                <FormControl sx={{ margin: 2 }}>
                    <TextField label="Title" name="title" value={productInputState?.title || 'title'} onChange={handleChange}/>
                </FormControl>
                <FormControl sx={{ margin: 2 }}>
                    <TextField label="Price" name="price" value={productInputState?.price || 'price'} onChange={handleChange}/>
                </FormControl>
                <FormControl sx={{ margin: 2 }}>
                    <TextField label="Description" name="description" value={productInputState?.description || 'description'} onChange={handleChange}/>
                </FormControl>
                <FormControl sx={{ margin: 2 }}>
                    <TextField label="Category" name="category" value={productInputState?.category || 'category'} onChange={handleChange}/>
                </FormControl>
                <FormControl sx={{ margin: 2 }}>
                    <TextField label="Image URL" name="image" value={productInputState?.image || 'image'} onChange={handleChange}/>
                </FormControl>
                <Button type="submit">Submit</Button>
            </form>
        </Box>
    );
}