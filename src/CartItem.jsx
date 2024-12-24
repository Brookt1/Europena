import PropTypes from 'prop-types';
import { useState, useContext, useEffect } from 'react';
import { ShopContext } from './context/ShopContext';

function CartItem(props) {

  const {cart, deliveryFee} = useContext(ShopContext);
  const [subTotal, setSubTotal] = useState(0);
  
  const calculateTotal = () => {
    const total = cart.reduce((sum, item) => sum + (item.furniture.price * item.quantity), 0);
    setSubTotal(total);
    }
    

  useEffect(() => {
    calculateTotal();
  },[cart])

  return (
    <>

<div className='w-full'>
  <div className="text-3xl">
    <h1 className="font-extralight">CART <span className="text-green-950 font-bold">TOTALS</span></h1>
  </div>

  <div className="flex flex-col gap-4 mt-4 text-sm">
    {/* Subtotal */}
    <div className="flex justify-between">
      <p>Subtotal</p>
      <p>{subTotal} ETB</p>
    </div>
    <hr />
    
    {/* Shipping */}
    <div className="flex justify-between">
      <p>Shipping</p>
      <p>{deliveryFee} ETB</p>
    </div>
    <hr />

    {/* Total */}
    <div className="flex justify-between">
      <b>Total</b>
      <b>{subTotal + deliveryFee} ETB</b>
    </div>
  </div>
</div>



    </>
  );
}

export default CartItem;
