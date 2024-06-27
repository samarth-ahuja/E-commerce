import './Home.css';
import SideBar from './SideBar';
import ProductDetails from './ProductDetails';
export default function Home() {
    return (
        <>
            <h1>E Commerce App</h1>
            <div className='app'>
                <SideBar />
                <ProductDetails />
            </div>
        </>
    );
}