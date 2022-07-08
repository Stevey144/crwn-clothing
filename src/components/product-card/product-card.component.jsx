import { useContext } from 'react';
import './product-card.styles.scss';
import { useState } from "react";
import  './modalstyles.css';
import Modal from 'react-modal';
import Button from '../button/button.component';
import { CartContext } from '../../contexts/cart.context';
Modal.setAppElement("#root");

const ProductCard = ({product}) =>{
    
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () =>{
        setIsOpen(!isOpen);
    }

const {name,price,imageUrl} = product;

const {addItemToCart} = useContext(CartContext);

const addProductToCart = () => addItemToCart(product);

return(<div className='product-card-container'>
    <img src={imageUrl} alt={`${name}`}></img>
    <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
    </div>

    <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        <div><b>Item Added To Cart Successfully</b></div>
        <button onClick={toggleModal} className='close-modal'>Close modal</button>
      </Modal>

    <Button buttonType='inverted' onClick={()=>{addProductToCart();toggleModal();}}>Add To Cart</Button>
    
</div>);

}
export default ProductCard;