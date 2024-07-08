import './Home.css';
import ListingTable from '../components/ListingTable';
import Loading from '../components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductList } from '../redux/actions/ProductActions';
import { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import { Search, FilterAlt } from '@mui/icons-material';
import { TextField, InputAdornment, ToggleButton, Box } from '@mui/material';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/base/Snackbar';

let firstTime = true;

export default function Home() {
    const ctx = useSelector(state => state.ProductOperations);
    const [productSearchList, setProductSearchList] = useState([]);
    if (ctx.productList?.length > 0 && productSearchList?.length <= 0) {
        setProductSearchList(ctx?.productList);
    }
    const [isSelectedFilter, setIsSelectedFilter] = useState(false);
    const [rangeValues, setRangeValues] = useState({ minPrice: '', maxPrice: '' })
    const popRef = useRef();
    const [noItemFoundState, setNoItemFoundState] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (firstTime) {
            dispatch(fetchProductList());
            firstTime = false;
        }
    }, [dispatch])
    function priceRangeChanger(event) {
        setRangeValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }
    function noItemFoundCloseHandler() {
        setNoItemFoundState(false);
    }
    function searchListChanger(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const valueFilter = fd.get('search-box');
        setProductSearchList(prev => {
            const searchedList = ctx.productList.filter((item) => {
                let takenIntoList = false;
                for (const key in item) {
                    takenIntoList = takenIntoList | item[key].toString().includes(valueFilter);
                }
                return takenIntoList;
            })
            .filter((item)=>{
                let priceFilter = true;
                if(!rangeValues.maxPrice && !rangeValues.minPrice){
                    return true;
                }
                if(rangeValues.maxPrice){
                    priceFilter &= item.price<rangeValues.maxPrice;
                }
                if(rangeValues.minPrice){
                    priceFilter &= item.price>=rangeValues.minPrice;
                }
                return priceFilter;
            })
            if (!searchedList?.length) {
                setNoItemFoundState(true);
            }
            return searchedList;
        })
    }
    return (
        <>
            <h1>E Commerce App</h1>
            <div className='header'>
                <form className='searchbar-form' onSubmit={searchListChanger}>
                    <TextField size='small' InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }} name="search-box"></TextField>
                    <div className='home-page-header-buttons'>
                        <ToggleButton size='small' value="check" selected={isSelectedFilter}
                            onChange={() => {
                                setIsSelectedFilter(prev => !prev)
                            }}
                            ref={popRef}
                        >
                            <FilterAlt />
                        </ToggleButton>
                        <BasePopup open={isSelectedFilter} anchor={popRef.current}>
                            <Box sx={{ marginTop: "6px" }}>
                                <form>
                                    <TextField placeholder="Minimum Price" size="small" name="minPrice" value={rangeValues.minPrice} onChange={priceRangeChanger}></TextField>
                                    <TextField placeholder="Maximum Price" size="small" name="maxPrice" value={rangeValues.maxPrice} onChange={priceRangeChanger}></TextField>
                                </form>
                            </Box>
                        </BasePopup>
                        <Button variant="contained" type="submit">Search</Button>
                        <Button type="button" variant="contained" onClick={() => navigate("/product/new")}>Add Product</Button>
                    </div>
                </form>
            </div>
            <Snackbar autoHideDuration={5000} open={noItemFoundState} onClose={noItemFoundCloseHandler}>No Item Found</Snackbar>
            <div className='app'>
                {ctx.loadingProductList && <Loading />}
                {ctx.productList && <ListingTable productSearchList={productSearchList} setProductSearchList={setProductSearchList}/>}
                {/* {error&&<Error/>} */}
            </div>
        </>
    );
}