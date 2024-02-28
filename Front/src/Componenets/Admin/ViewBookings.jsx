import { useEffect, useState } from "react";
import LoadingScreen from "../Common/LoadingScreen.jsx/LoadingScreen";
import BookingElement from "../Common/BookingElement";
import BookingFilter from "./BookingFilter";
const ViewBookings = () => {
    const [Bookinglist, setBookinglist] = useState(null);
    const [filters, setFilters] = useState(`0/00:00:00/x`)
   
    useEffect(() => {
        console.log("fetching all Booking")
        fetch(`https://iavnishyadav07.pythonanywhere.com/api/allbookedlist/${filters}`, {
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

                    setBookinglist(data['data'])
                }

                else {
                    throw new Error(`HTTP error! Status: ${data['statusText']}`);

                }

            }).catch((e) => {
                alert(e)
            })
    }, [filters])

    return (
        Bookinglist ? (
            <> <BookingFilter setFilters = {setFilters}/>
                <div> {Bookinglist.map((booking) =>

                    <BookingElement key={booking.id} obj={booking} />
                )}</div></>
        )



            : (<LoadingScreen />)
    )
}

export default ViewBookings;