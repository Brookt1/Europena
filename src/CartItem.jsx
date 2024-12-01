import PropTypes from 'prop-types';

function CartItem(props) {
  return (
    <>
      <div className="m-4 flex flex-wrap items-center p-4 space-x-4 border-solid border-t-2 border-gray-300">
        {/* Product Image */}
        <div className="w-[200px]">
          <img
            src={props.image}
            alt={props.name}
            className="w-full h-auto"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-2 min-w-[200px]">
          <h1 className="text-2xl">{props.name}</h1>
          <p>{props.description}</p>
          <p className="text-2xl text-green-950">{props.price} ETB</p>
        </div>

        {/* Quantity */}
        <div className="min-w-[120px]">
          <input type="number" min={1} defaultValue={props.quantity} className='border max-w-10 sm:max-w-20 px-1 py-1'></input>
        </div>

        {/* Delete Button */}
        <div className="ml-auto">
          <button className="rounded-md p-2 text-white hover:bg-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill=""
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
