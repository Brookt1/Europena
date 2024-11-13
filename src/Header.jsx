import { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from "./assets/logo.jpg";
function Header() {


    const [visible, setVisible] = useState(false);


    return (
        <>
        <div className="flex flex-row items-center justify-between px-6 md:flex-row">
            {/* Logo */}
            <Link to='/'><img className="h-[90px] w-[140px]" src={logo} alt="logo" /></Link>
            {/* Text */}
            
            <h1 className="font-bold md:ml-[-40px] text-2xl md:text-3xl text-center flex-1 hidden min-[600px]:inline">european</h1>
            {/* Icons */}
            <div className="flex items-center space-x-4">
            
                {/* Search Icon */}
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                    </svg>
                </a>
                {/* Cart Icon */}
                <div className="relative">
                    <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                            <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                        </svg>
                    </a>
                    <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">10</p>
                </div>
                {/* User Icon */}
                <div className="group relative">
                    <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                        </svg>
                    </a>
                    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10">
                        <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                            <p className="cursor-pointer hover:text-black">My Profile</p>
                            <p className="cursor-pointer hover:text-black">Orders</p>
                            <p className="cursor-pointer hover:text-black">Logout</p>
                        </div>
                    </div>
                </div>
                
                

                {/* Menu icon on smaller devices */}
                <svg onClick={()=>setVisible(true)} className="block md:hidden" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                </svg>
                
            </div>
        </div>

        {/* navbar */}
        <nav className="mt-[-25px]">
            {/* Hidden side bar nav menu */}
            <div className={`fixed top-0 right-0 h-screen z-[999] bg-white shadow-[-10px_0_10px_rgba(0,0,0,0.1)] ${visible ? 'w-full' : 'w-0'}`}>
                <div className="flex flex-col text-gray-600">
                    <div onClick={()=>setVisible(false)} className="flex items-center gap-4 p-3">
                        <svg className="h-4 rotate-180" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/>
                        </svg>
                        <p>Back</p>
                    </div>
                    <NavLink className="py-2 pl-6 border" to='/'>Home</NavLink>
                    <NavLink className="py-2 pl-6 border" to='/shop'>Shop</NavLink>
                    <NavLink className="py-2 pl-6 border" to='/about'>About</NavLink>
                </div>
            </div>
            

            {/* nav bar links */}
            

            <ul className="w-full list-none hidden justify-center items-center md:flex">
            <li className="h-[50px]">
                <NavLink
                to="/"
                className={({ isActive }) =>
                    `h-full py-0 px-[30px] flex no-underline items-center hover:bg-slate-200 ${
                    isActive ? "font-bold border-solid border-gray-950 border-b-2" : ""
                    }`
                }
                >
                Home
                </NavLink>
            </li>
            <li className="h-[50px]">
                <NavLink
                to="/shop"
                className={({ isActive }) =>
                    `h-full py-0 px-[30px] flex no-underline items-center hover:bg-slate-200 ${
                    isActive ? "font-bold border-solid border-gray-950 border-b-2" : ""
                    }`
                }
                >
                Shop
                </NavLink>
            </li>
            <li className="h-[50px]">
                <NavLink
                to="/about"
                className={({ isActive }) =>
                    `h-full py-0 px-[30px] flex no-underline items-center hover:bg-slate-200 ${
                    isActive ? "font-bold border-solid border-gray-950 border-b-2" : ""
                    }`
                }
                >
                About
                </NavLink>
            </li>
            </ul>

        </nav>
        </>
    );
}

export default Header;
