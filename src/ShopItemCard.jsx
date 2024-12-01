import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function ShopItemCard({ image, name, price, loading }) {
  return (
    <div>
      <div className="h-[15rem] bg-orange-100">
        {loading ? (
          <Skeleton height="100%" />
        ) : (
          <img src={image} alt="Product Image" className="w-full h-full object-cover object-center" />
        )}
      </div>
      <div className="p-2">
        {loading ? (
          <>
            <Skeleton height={20} width="80%" className="mx-auto" />
            <Skeleton height={20} width="60%" className="mx-auto mt-2" />
          </>
        ) : (
          <>
            <h1 className="font-semibold text-center">{name}</h1>
            <p className="text-center text-gray-500">{price} ETB</p>
          </>
        )}
      </div>
    </div>
  );
}

ShopItemCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  loading: PropTypes.bool,
};

export default ShopItemCard;