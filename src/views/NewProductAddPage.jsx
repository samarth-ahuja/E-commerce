import { FormControl, TextField, Box, Button, Typography, InputLabel, Select, MenuItem } from '@mui/material';
import { red } from '@mui/material/colors';
import './NewProductAddPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct, fetchCategoryList } from '../redux/actions/ProductActions';
import { useEffect, useState } from 'react';

export default function NewProductAddPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ctx = useSelector(state => state.ProductOperations)
    const [errInput, setErrInput] = useState({
        errPrice: '',
        errCategory: ''
    })
    useEffect(() => {
        dispatch(fetchCategoryList())
    }, [dispatch])
    function submitProduct(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        let newProductData = {};
        for (const [key, value] of fd) {
            newProductData[key] = value;
        }
        if (newProductData.price < 0) {
            setErrInput((prev) => ({
                ...prev,
                errPrice: "Price can't be negative"
            }))
            return;
        }
        if (!ctx.categoryList?.find((item) => item.category == newProductData.category)) {
            console.log('hi')
            setErrInput((prev) => ({
                ...prev,
                errCategory: "Category isn't available."
            }))
            return;
        }
        setErrInput({ errPrice: '', errCategory: '' })
        dispatch(addProduct(newProductData));
        navigate('/products')
    }
    return (
        <Box sx={{padding:3}}>
            <h2>New Product Item</h2>
            <form className='NewProductForm' onSubmit={submitProduct}>
                <FormControl sx={{ margin: 2 }} className="input-add-product">
                    <TextField label="Id" name="id" type="number" required/>
                </FormControl>
                <FormControl sx={{ margin: 2 }} className="input-add-product">
                    <TextField label="Title" name="title" required/>
                </FormControl>
                <FormControl sx={{ margin: 2 }} className="input-add-product">
                    <TextField label="Price" name="price" type="number" required/>
                    {errInput.errPrice ? <Typography color={red[500]}>{errInput.errPrice}</Typography> : null}
                </FormControl>
                <FormControl sx={{ margin: 2 }} className="input-add-product">
                    <TextField label="Description" name="description" required/>
                </FormControl>
                <FormControl sx={{ margin: 2 }} className="input-add-product">
                    <InputLabel required>Category</InputLabel>
                    <Select
                        label="Category"
                        defaultValue=''
                        name="category"
                        required
                    >
                        {ctx.categoryList?.map((item) => {
                            return <MenuItem key={item} value={item}>{item}</MenuItem>
                        })}
                    </Select>
                    {errInput.errCategory ? <Typography color={red[500]}>{errInput.errCategory}</Typography> : null}
                </FormControl>
                <FormControl sx={{ margin: 2 }} className="input-add-product">
                    <TextField label="Image URL" name="image" required/>
                </FormControl>
                <Button type="submit" sx={{margin:2,display:"block"}}>Submit</Button>
            </form>
        </Box>
    );
}