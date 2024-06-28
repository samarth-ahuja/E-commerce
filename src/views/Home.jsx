import './Home.css';
import ListingTable from '../components/ListingTable';
import Loading from '../components/Loading';
import {useSelector,useDispatch} from 'react-redux';
import {fetchData} from '../redux/actions/DataRequestActions';
import { useEffect } from 'react';

export default function Home() {
    const { data, loading, error } = useSelector(state=>state.DataRequest);
    // console.log(data)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchData());
    },[dispatch])
    return (
        <>
            <h1>E Commerce App</h1>
            <div className='app'>
                {loading && <Loading/>}
                {/* {data&&<ListingTable/>} */}
                {/* {error&&<Error/>} */}
            </div>
        </>
    );
}