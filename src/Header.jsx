import { Link } from "react-router-dom";

function Header() {


    const showSidebar = () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'unset';
    }
    
    const hideSidebar = () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'none';
    }


    return (
        <>
        <div className="flex items-center justify-between px-6">
            {/* Logo */}
            <div className="flex">
                <img className="h-[90px] w-[140px]" src="./src/assets/logo.jpg" alt="logo" />
            </div>

            {/* Text */}
            <h1 className="font-bold md:ml-[-40px] text-2xl md:text-3xl text-center flex-1">european</h1>

            {/* Icons */}
            <div className="flex items-center space-x-4">
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                    </svg>
                </a>
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                        <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                    </svg>
                </a>
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                        <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                    </svg>
                </a>

                {/* Menu icon on smaller devices */}
                <div onClick={showSidebar} className="block md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                        <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                    </svg>
                </div>
            </div>
        </div>

        {/* navbar */}
        <nav className="mt-[-25px]">
            <ul className="sidebar fixed hidden top-0 right-0 h-screen w-[250px] z-[999] bg-white shadow-[-10px_0_10px_rgba(0,0,0,0.1)]">
                
                {/* Hidden side bar nav menu */}
                <li onClick={hideSidebar} className="h-[50px]">
                    <a className="h-full py-0 px-[30px] flex no-underline items-center hover:bg-slate-200">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                        </svg>
                    </a>
                </li>
                <li className="h-[50px]">
                    <Link to="/" className="h-full py-0 px-[30px] flex no-underline items-center hover:bg-slate-200 cursor-pointer">Home</Link>
                </li>
                <li className="h-[50px]">
                    <Link to="/shop" className="h-full py-0 px-[30px] flex no-underline items-center hover:bg-slate-200">Shop</Link>
                </li>
                <li className="h-[50px]">
                    <Link to="/about" className="h-full py-0 px-[30px] flex no-underline items-center hover:bg-slate-200 cursor-pointer">About</Link>
                </li>
            </ul>

            {/* nav bar links */}
            <ul className="w-full list-none hidden justify-center items-center md:flex">
                <li className="h-[50px]">
                    <Link to="/" className="h-full py-0 px-[30px] flex no-underline items-center hover:bg-slate-200">Home</Link>
                </li>
                <li className="h-[50px]">
                    <Link to="/shop" className="h-full py-0 px-[30px] flex no-underline items-center hover:bg-slate-200">Shop</Link>
                </li>
                <li className="h-[50px]">
                    <Link to="/about" className="h-full py-0 px-[30px] flex no-underline items-center hover:bg-slate-200">About</Link>
                </li>
            </ul>
        </nav>
        </>
    );
}

export default Header;
