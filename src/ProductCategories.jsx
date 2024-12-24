import PropTypes from 'prop-types';

function ProductCategories({ categories, selectedCategory, handleCategorySelect }) {
    return (
        <div className="w-full lg:w-[40vh] mb-6 lg:mb-0">
            <h1 className="p-2 text-xl text-zinc-800">Product Categories</h1>
            <hr />
            <ul className="p-2">
                <li 
                    className={`flex space-x-2 items-center pb-4 text-gray-700 cursor-pointer ${selectedCategory === 0 ? "font-bold bg-blue-100" : ""}`}
                    onClick={() => handleCategorySelect(0)}
                >
                    <div className={`h-[14px] w-[14px] border-solid border-2 rounded-full ${selectedCategory === 0 ? "border-blue-500" : "border-zinc-600"} hover:border-green-400`}></div>
                    <span>All</span>
                </li>
                {categories.map((category) => (
                    <li 
                        key={category.id} 
                        className={`flex space-x-2 items-center pb-4 text-gray-700 cursor-pointer ${selectedCategory === category.id ? "font-bold bg-blue-100" : ""}`}
                        onClick={() => handleCategorySelect(category.id)}
                    >
                        <div className={`h-[14px] w-[14px] border-solid border-2 rounded-full ${selectedCategory === category.id ? "border-blue-500" : "border-zinc-600"} hover:border-green-400`}></div>
                        <span>{category.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
ProductCategories.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedCategory: PropTypes.number.isRequired,
    handleCategorySelect: PropTypes.func.isRequired,
};

export default ProductCategories;