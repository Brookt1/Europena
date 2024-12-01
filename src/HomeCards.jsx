import propTypes from 'prop-types'

function HomeCards(props){


    return(
        <div className={props.class}>
                {/* Image of item here */}
                <img className="w-full h-full object-cover object-center" src={props.image} />
        </div>
    );
}

HomeCards.propTypes = {
    class: propTypes.string,
    image: propTypes.string
}

export default HomeCards