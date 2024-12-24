import propTypes from 'prop-types'

function HomeCards(props){


    return(
        <div className={`bg-zinc-100 relative overflow-hidden ${props.class}`}>
        <img
            className="w-full h-full object-cover object-center transform transition-transform duration-300 hover:scale-110"
            src={props.image}
            alt={props.name}
        />
        <h1 className="absolute bottom-0 left-0 text-black font-bold text-base md:text-xl p-2 w-full text-left hover:text-orange-500">
            {props.name}
        </h1>
    </div>
    );
}

HomeCards.propTypes = {
    class: propTypes.string,
    image: propTypes.string,
    name: propTypes.string,
}

export default HomeCards