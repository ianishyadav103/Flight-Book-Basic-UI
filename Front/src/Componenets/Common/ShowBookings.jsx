import ViewBookings from "../Admin/ViewBookings";
import MyBooking from "../User/MyBooking";
import { AppContext } from "./AuthContext";

const ShowBooking = ()=>{
    const {isAdmin} = AppContext()
    return(
        isAdmin?(<ViewBookings/>):(<MyBooking/>)
    );
}

export default ShowBooking;