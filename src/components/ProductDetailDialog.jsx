import { Dialog,DialogTitle,DialogContent, CardContent,Card, Typography,CardMedia } from "@mui/material";
import { Star,StarHalf } from "@mui/icons-material";

export default function ProductDetailDialog({open,productDetailsDialogCloser,item}){    
    function ratingDisplayer(){
        let content = [];
        for(let i=1;i<=(item?.rating?.rate);i++){
            content.push(<Star key={i}/>);
        }
        if(item?.rating?.rate - Math.floor(item?.rating?.rate)!=0){
            content.push(<StarHalf key={6}/>);
        }
        return content;
    }
    return (
        <Dialog open={open} onClose={productDetailsDialogCloser}>
            <DialogTitle>
                Product Details
            </DialogTitle>
            <DialogContent>
                <Card sx={{display:"flex"}}>
                <CardMedia component="img" image={item?.image} sx={{width:"40%"}}/>
                <CardContent sx={{width:"50%"}}>
                        <Typography variant="subtitle1">{item?.title}</Typography>
                        <Typography variant="body2">{item?.description}</Typography>
                        <Typography variant="body2">$ {item?.price}</Typography>
                        {ratingDisplayer()}
                </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}