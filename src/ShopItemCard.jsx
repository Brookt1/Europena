
import PropTypes from 'prop-types' 

function ItemCard(props) {

  return (
    <div>
      <div className="h-[15rem] bg-orange-100">
        {/* Image of item here */}
        <img src={props.image} alt="Product Image" className="w-full h-full object-cover object-center" />
        </div>
      <div className="p-2">
        
          <h1 className="font-semibold text-center">{props.name}</h1>
          <p className="text-center text-gray-500">{props.price} ETB</p>
        
      </div>
    </div>
  );
}

ItemCard.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number
}

export default ItemCard