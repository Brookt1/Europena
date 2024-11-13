import PropTypes from 'prop-types'

function HomeCards(props){


    return(
        <div className={props.class}>
                {/* Image of item here */}
                <img className="w-full h-full object-cover object-center" src={props.image} />
        </div>
    );
}

HomeCards.PropTypes = {
    class: PropTypes.string,
    image: PropTypes.string
}

export default HomeCards