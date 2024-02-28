import './header.css';
import { Link } from "react-router-dom";
import { AppContext } from "../AuthContext";

const Header = () => {

    const { user, logoutUser, isAdmin } = AppContext()

    return (
        <header>

            {user ?
                (<>
                    <Link id='home' to="/"><button>Home</button></Link>

                    <div><Link to="/bookings"><button>
                        {isAdmin ? ('All Bookings') : ('My Bookings')}
                    </button>
                    </Link>
                    {isAdmin && <Link to="/addflight"><button>Add Flight</button></Link>}</div>
                    <button id='logoutbtn' onClick={logoutUser}>Logout</button>

                </>)
                :
                (<>

                    <div><Link to="/login"><button>Login</button></Link>
                    <Link to="/signup"><button>Signup</button></Link></div>
                    <Link to="/adminlogin"><button>AdminLogin</button></Link>

                </>)}

        </header>
    )
}

export default Header;