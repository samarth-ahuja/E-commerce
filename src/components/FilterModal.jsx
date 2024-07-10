import { Button,Box,Typography,Select,FormControl,TextField,Dialog,InputLabel,MenuItem } from "@mui/material"
import { useSelector } from "react-redux";

export default function FilterModal({isSelectedFilter, filterCloseHandler,applyFilter}) {
    const ctx = useSelector(state => state.ProductOperations);
    return (
        <Dialog open={isSelectedFilter} onClose={filterCloseHandler} fullWidth className='filter-dialog'>
            <Typography variant='h5' sx={{ margin: '12px' }}>Filters</Typography>
            <Box>
                <form className='filterForm' onSubmit={applyFilter}>
                    <FormControl className="filter-input-field">
                        <TextField placeholder="Minimum Price" size="medium" name="minPrice" type="number"></TextField>
                    </FormControl>
                    <FormControl className="filter-input-field">
                        <TextField placeholder="Maximum Price" size="medium" name="maxPrice" type="number"></TextField>
                    </FormControl>
                    <FormControl className="filter-input-field">
                        <InputLabel>Category</InputLabel>
                        <Select
                            label="Category"
                            name="category"
                            fullWidth
                            size="medium"
                            defaultValue=""
                        >
                            {ctx.categoryList?.map((item) => {
                                return <MenuItem key={item} value={item}>{item}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className="filter-input-field">
                        <TextField placeholder="Minimum Rating" size="medium" name="minRating" type="number"></TextField>
                    </FormControl>
                    <Button className="filter-input-field" type="submit">Apply</Button>
                </form>
            </Box>
        </Dialog>
    )
}