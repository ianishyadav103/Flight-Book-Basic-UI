import { useEffect, useState } from "react";
import LoadingScreen from "../Common/LoadingScreen.jsx/LoadingScreen";
import BookingElement from "../Common/BookingElement";
const MyBooking = () => {
    const [MyBookinglist, setMyBookinglist] = useState(null);
    
    useEffect(() => {
        console.log("fetching all Booking")
        fetch('https://iavnishyadav07.pythonanywhere.com/api/bookedlist', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
        })
            .then(async response => {
                const data = await response.json();

                return { status: response.status, data, statusText: response.statusText };
            })
            .then((data) => {

                if (data['status'] === 200) {
                    console.log(data['data'])
       
                    setMyBookinglist(data['data'])
                }

                else {
                    throw new Error(`HTTP error! Status: ${data['statusText']}`);

                }

            }).catch((e) => {
                alert(e)
            })
    }, [])

    return (
        MyBookinglist ? (
        <div id="bookingbox"> {MyBookinglist.map((booking) => 
            
            <BookingElement key={booking.id} obj={booking}/>
        )}</div>
        )



        : (<LoadingScreen />)
    )
}

export default MyBooking;