import { useParams,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../redux/actions/ProductActions";
import { useEffect, useState } from "react";
import { FormControl, TextField, Box, Button } from '@mui/material';
import './ProductEditPage.css';
import Loading from "../components/Loading";
import { updateProductData } from "../redux/actions/ProductActions";

export default function ProductEditPage() {
    const [productInputState, setProductInputState] = useState({
        id: '',
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const ctx = useSelector(state => state.ProductOperations);
    const dispatch = useDispatch();
    function updateProduct(event) {
        event.preventDefault();
        dispatch(updateProductData({ ...productInputState }));
        navigate('/products')
    }
    useEffect(() => {
        setProductInputState(ctx.edittingProductItem);
    }, [ctx.edittingProductItem])
    useEffect(() => {
        dispatch(fetchProductData(id))
    }, [dispatch])
    function updateProductInputField(event) {
        setProductInputState((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <Box>
            <h2>Product Details</h2>
            {ctx.loadingEdittingProductItem && <Loading />}
            <form className='ProductUpdateForm' onSubmit={updateProduct}>
                <FormControl sx={{ margin: 2 }}>
                    <TextField label="Id" name="id" value={productInputState?.id || 'ID'} onChange={updateProductInputField} disabled />
                </FormControl>
                <FormControl sx={{ margin: 2 }}>
                    <TextField label="Title" name="title" value={productInputState?.title || 'title'} onChange={updateProductInputField} />
                </FormControl>
                <FormControl sx={{ margin: 2 }}>
                    <TextField label="Price" name="price" value={productInputState?.price || 'price'} onChange={updateProductInputField} />
                </FormControl>
                <FormControl sx={{ margin: 2 }}>
                    <TextField label="Description" name="description" value={productInputState?.description || 'description'} onChange={updateProductInputField} />
                </FormControl>
                <FormControl sx={{ margin: 2 }}>
                    <TextField label="Category" name="category" value={productInputState?.category || 'category'} onChange={updateProductInputField} />
                </FormControl>
                <FormControl sx={{ margin: 2 }}>
                    <TextField label="Image URL" name="image" value={productInputState?.image || 'image'} onChange={updateProductInputField} />
                </FormControl>
                <Button type="submit">Submit</Button>
            </form>
        </Box>
    );
}