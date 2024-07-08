import { Table, TableContainer, TableHead, TableCell, TableRow, TableBody, Button } from "@mui/material";
import Paper from '@mui/material/Paper';
import { useSelector,useDispatch } from "react-redux";
import { Visibility,Edit,Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteProduct } from "../redux/actions/ProductActions";
import ProductDetailDialog from "./ProductDetailDialog";

export default function ListingTable({productSearchList,setProductSearchList}) {
    const navigate = useNavigate();
    const [selectedProduct,setSelectedProduct] = useState(null);
    const open = (selectedProduct!=null);
    const dispatch = useDispatch();
    const { productList } = useSelector(state => state.ProductOperations);
    function changeSelectedProduct(item){
        setSelectedProduct(item);
    }
    function productDetailsDialogCloser(){
        setSelectedProduct(null);
    }
    function deleteProductItem(id){
        dispatch(deleteProduct(id));
        setProductSearchList(prev=>prev.filter(item=>item.id!=id))
    }
    const listingItems = productSearchList?.length>0?productSearchList:productList;
    return (
        <>
        <ProductDetailDialog open={open} productDetailsDialogCloser={productDetailsDialogCloser} item={selectedProduct}></ProductDetailDialog>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listingItems.map((item) => {
                        return <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>
                                <Button onClick={()=>{changeSelectedProduct(item)}}><Visibility/></Button>
                                <Button onClick={()=>{ navigate(`/product/${item.id}`)} }><Edit/></Button>
                                <Button onClick={()=>{deleteProductItem(item.id)}}><Delete/></Button>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}