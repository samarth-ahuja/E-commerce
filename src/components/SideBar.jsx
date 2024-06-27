import './SideBar.css';
import ProductList from './ProductList';

export default function SideBar(){
    
    return(
        <div className="sidebar">
            <ProductList></ProductList>
        </div>
    );
}