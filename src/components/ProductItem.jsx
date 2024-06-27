import './ProductItem.css';
export default function ProductItem({item}){
    return (
        <li className="productListItem" key={item.id}>
            <a href={`/product/${item.id}`}>{item.title}</a>
        </li>
    );
}