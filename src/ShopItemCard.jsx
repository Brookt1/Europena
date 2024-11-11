import { Link } from "react-router-dom";
import PropTypes from 'prop-types' 

function ItemCard(props) {

  return (
    <div>
      <div className="h-[15rem] bg-orange-100">
        {/* Image of item here */}
        <img src={props.image} alt="Product Image" className="" />
        </div>
      <div className="p-2">
        <Link to="item.html">
          <h1 className="font-semibold text-center">{props.name}</h1>
          <p className="text-center text-gray-500">${props.price}</p>
        </Link>
      </div>
    </div>
  );
}

ItemCard.PropTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string
}

export default ItemCard