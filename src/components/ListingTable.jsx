import { Table, TableContainer, TableHead, TableCell, TableRow, TableBody } from "@mui/material";
import Paper from '@mui/material/Paper';
import { useSelector } from "react-redux";

export default function ListingTable() {
    const { productList } = useSelector(state => state.ProductOperations);
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Category</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productList.map((item) => {
                        return <TableRow key={item.id}>
                            <TableCell><a href={`/product/${item.id}`}>{item.id}</a></TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.category}</TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}