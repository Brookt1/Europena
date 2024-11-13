

function ReviewCard (){
    return (
        <>
            <hr />
            <div className=" w-fit p-4 gap-2">
                <h1 className="font-bold py-1">User</h1>
                <p className="text-gray-500 text-sm">November {new Date().getDate()}, {new Date().getFullYear()}</p>
                <div><div className="text-xl text-amber-400">&#9733;&#9733;&#9733;&#9733;&#9733;</div></div>
                <p className="text-gray-800">"Amazing sound quality and build!"</p>
            </div>   
        </>
    )
}

export default ReviewCard