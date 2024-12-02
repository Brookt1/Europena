import Header from "./Header";
import CartItem from "./CartItem";
import Footer from "./Footer";
import { Link } from "react-router-dom";


function OrderPage(){
    return(
        <>
        <Header />
        <div className="sm:flex md:grid md:grid-cols-2 p-4 mt-16">
            <div className="font-medium grid grid-cols-1">
                <h1 className="text-2xl font-extralight"><span className="text-green-950 font-semibold">YOUR</span> INFORMATION</h1>
                <div className="p-4">
                <input placeholder="First Name" className="border m-2 p-1 rounded-md" type='text'></input>
                <input placeholder="Last Name" className="border m-2 p-1 rounded-md" type='text'></input>
                </div>
                <div className="p-4">
                    <input placeholder="Email address" className="border m-2 p-1 rounded-md" type='email'></input>
                    <input placeholder="City" className="border m-2 p-1 rounded-md" type='text'></input>
                </div>
                <div className="p-4">
                    <input placeholder="Phone Number" className="border m-2 p-1 rounded-md" type='tel'></input>
                </div>
            </div>
            <div className="mt-4">
                <CartItem />
                <div className="w-full text-end">
                    <Link to='/orders'><button className="bg-green-800 p-2 mt-8 "><span className="font-semibold">ORDER NOW</span></button></Link>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}
    


export default OrderPage;