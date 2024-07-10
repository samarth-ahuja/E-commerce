import './Home.css';
import ListingTable from '../components/ListingTable';
import Loading from '../components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductList, fetchCategoryList } from '../redux/actions/ProductActions';
import { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import { Search, FilterAlt } from '@mui/icons-material';
import { TextField, InputAdornment, ToggleButton, Box, Dialog, InputLabel, Select, MenuItem, FormControl, Typography } from '@mui/material';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/base/Snackbar';
import FilterModal from '../components/FilterModal';

let firstTime = true;

export default function Home() {
    const ctx = useSelector(state => state.ProductOperations);
    const [productSearchList, setProductSearchList] = useState([]);
    if (ctx.productList?.length > 0 && productSearchList?.length <= 0) {
        setProductSearchList(ctx?.productList);
    }
    const [isSelectedFilter, setIsSelectedFilter] = useState(false);
    const [modalFilterValues, setmodalFilterValues] = useState({ minPrice: '', maxPrice: '', category: '', minRating: '' })
    const popRef = useRef();
    const [noItemFoundState, setNoItemFoundState] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (firstTime) {
            dispatch(fetchProductList());
            dispatch(fetchCategoryList());
            firstTime = false;
        }
    }, [dispatch])
    function applyFilter(event){
        event.preventDefault();
        console.log(event.target);
        const fd = new FormData(event.target);
        let newFilterObject = {};
        for(const[key,value] of fd){
            newFilterObject = {
                ...newFilterObject,[key]:value
            }
        }
        setmodalFilterValues(()=>{
            setIsSelectedFilter(false);
            return newFilterObject;
        });
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
            }).filter((item) => {
                let priceFilter = true;
                if (!modalFilterValues.maxPrice && !modalFilterValues.minPrice) {
                    return true;
                }
                if (modalFilterValues.maxPrice) {
                    priceFilter &= item.price < modalFilterValues.maxPrice;
                }
                if (modalFilterValues.minPrice) {
                    priceFilter &= item.price >= modalFilterValues.minPrice;
                }
                return priceFilter;
            }).filter((item) => item.rating.rate >= modalFilterValues.minRating)
                .filter((item) => item.category == modalFilterValues.category)
            // if (!searchedList?.length) {
            //     setNoItemFoundState(true);
            // }
            return searchedList;
        })
    }
    function filterCloseHandler() {
        setIsSelectedFilter(false);
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
                        <FilterModal isSelectedFilter={isSelectedFilter} modalFilterValues={modalFilterValues} applyFilter={applyFilter} filterCloseHandler={filterCloseHandler}></FilterModal>
                        <Button variant="contained" type="submit">Search</Button>
                        <Button type="button" variant="contained" onClick={() => navigate("/product/new")}>Add Product</Button>
                    </div>
                </form>
            </div>
            <Snackbar autoHideDuration={5000} open={noItemFoundState} onClose={noItemFoundCloseHandler}>No Item Found</Snackbar>
            <div className='app'>
                {ctx.loadingProductList && <Loading />}
                {ctx.productList && <ListingTable productSearchList={productSearchList} setProductSearchList={setProductSearchList} />}
                {/* {error&&<Error/>} */}
            </div>
        </>
    );
}