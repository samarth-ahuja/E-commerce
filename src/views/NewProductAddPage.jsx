import { FormControl,TextField,Box,Button } from '@mui/material';
import './NewProductAddPage.css';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../redux/actions/ProductActions';

export default function NewProductAddPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function submitProduct(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        let newProductData = {};
        for(const [key,value] of fd){
            newProductData[key]=value;
        }
        dispatch(addProduct(newProductData));
        navigate('/products')
    }
    return (
        <Box>
            <h2>New Product Item</h2>
            <form className='NewProductForm' onSubmit={submitProduct}>
                <FormControl sx={{margin:2}}>
                    <TextField label="Id" name="id"/>
                </FormControl>
                <FormControl sx={{margin:2}}>
                    <TextField label="Title" name="title"/>
                </FormControl>
                <FormControl sx={{margin:2}}>
                    <TextField label="Price" name="price"/>
                </FormControl>
                <FormControl sx={{margin:2}}>
                    <TextField label="Description" name="description"/>
                </FormControl>
                <FormControl sx={{margin:2}}>
                    <TextField label="Category" name="category"/>
                </FormControl>
                <FormControl sx={{margin:2}}>
                    <TextField label="Image URL" name="image"/>
                </FormControl>
                <Button type="submit">Submit</Button>
            </form>
        </Box>
    );
}