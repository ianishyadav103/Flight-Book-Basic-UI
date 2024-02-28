import './SearchFlight.css';
import { useEffect, useState } from "react";
import LoadingScreen from "../Common/LoadingScreen.jsx/LoadingScreen";
import FlightElement from "../Common/FlightElement";
import { AppContext } from "../Common/AuthContext";
import { removeflight } from "../Admin/RemoveFlight";
import BookFlight from "./BookFlight";
const SearchFlights = () => {
 
    const [flightlist, setflightlist] = useState(null);
    const { isAdmin, setNotificationMessage } = AppContext();
   

    const [filters, setFilters] = useState(`1900-01-01/a/00:00:00/a`)

  


    useEffect(() => {
        console.log("fetching all flights")
        fetch(`https://iavnishyadav07.pythonanywhere.com/api/allflights/${filters}`, {
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

                    setflightlist(data['data'])
                }

                else {
                    throw new Error(`HTTP error! Status: ${data['statusText']}`);

                }

            }).catch((e) => {
                alert(e)
            })
    }, [filters])

    const handlesubmit = (e) => {
        e.preventDefault()

        setFilters(`${e.target.departureDate.value}/${e.target.date_r.value}/${e.target.departure_time.value}/${e.target.time_r.value}`)

    }

    return (
        flightlist ? (
            <>

                <form onSubmit={handlesubmit} id='filter_form'>
                    Date<input type="text" id="departureDate" name="departureDate" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" required />
                    <span><input type="radio" name="date_r" id="" value='b' required />Before
                        <input type="radio" name="date_r" id="" value='a' required />After</span>

                    <br />
                    Time<input type="text" id="departureTime" name="departure_time" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]" placeholder="HH:MM:SS" required />
                    <span><input type="radio" value='b' name="time_r" id="" required />Before<input value='a' type="radio" name="time_r" id="" />After</span>


                    <input type="submit" id='submitbtn' value="Filter" />



                </form>
                <div id="flightbox"> {flightlist.map((flight) =>
                    <div className="flightelementbox" key={flight.id}><FlightElement
                        flight_name={flight.flight_name}
                        flight_number={flight.flight_number}
                        departure_date={flight.departure_date}
                        departure_time={flight.departure_time}
                        seats_available={flight.seats_available}
                    />
                        {isAdmin ? (<div className="bookbtn" style={{ backgroundColor: 'red' }} onClick={() => { removeflight(flight.id, setflightlist, setNotificationMessage) }}>
                            <span>Remove Flight</span>
                        </div>) : (<BookFlight id={flight.id} setflightlist={setflightlist}  seat={flight.seats_available} />)}
                    </div>





                )}</div></>
        )



            : (<LoadingScreen />)
    )
}

export default SearchFlights;

// onClick={(e) => {bookflight(flight.id) }}