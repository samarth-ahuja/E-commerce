import { Table, TableContainer,TableHead,TableCell,TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';

export default function ListingTable(){
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
            </Table>
        </TableContainer>
    );
}