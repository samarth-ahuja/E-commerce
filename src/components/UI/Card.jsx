import './Card.css';
export default function Card({title,img,id}){
    return (
        <div className="product-card">
            <img src={img} alt={title} />
            <a href={`/product/${id}`}><h3>{title}</h3></a>
        </div>
    );
}