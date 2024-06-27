import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Card from "./UI/Card";

export default function ProductPage(){
    let {id} = useParams();
    const data = useSelector(state=>state.products);
    let itemDetails = data.filter((item)=>item.id==id)[0];
    console.log(itemDetails);
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
        <>
            {itemDetails && <Card title={itemDetails.title} img={itemDetails.image} id={itemDetails.id} key={itemDetails.id}></Card>}
        </>
    );
}