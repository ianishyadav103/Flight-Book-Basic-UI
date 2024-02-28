import { useState } from 'react';
import './BookingFilter.css';
const BookingFilter = ({ setFilters }) => {
    const [useflightNumber, setuseFlightNumber] = useState(true);
    const [usedepartureTime, setuseDepartureTime] = useState(false);
    const toggleuseflight = () => {
        setuseFlightNumber(!useflightNumber)
    };
    const toggleusedepartureTime = () => {
        setuseDepartureTime(!usedepartureTime)
    };


    const handleSubmit = (e) => {
        e.preventDefault();
 
        
        let flight_number = e.target.flight_number?.value;
        let departureTime = e.target.departure_time?.value;
        let time_r = e.target.time_r?.value;

        if(!flight_number){
            flight_number = 0;
        }
        if(!departureTime){
            time_r = 'x'
            departureTime = '00:00:00'
        }


        setFilters(`${flight_number}/${departureTime}/${time_r}`)
    };

    return (
        <form onSubmit={handleSubmit} id='filter_form'>
            <span><input type="checkbox" checked={useflightNumber} readOnly onClick={toggleuseflight} />Use Flight Number</span>
            {useflightNumber && <input
                type="number"
                id="flightNumber"
                placeholder="Flight Number (4-digit integer)"
                name="flight_number"
                max={9999999999}
                autoComplete="off" 
                required
            />}


            <br />
            <span><input type="checkbox" checked={usedepartureTime} readOnly onClick={toggleusedepartureTime} />Use Departure Time</span>

            {usedepartureTime && <><input
                type="text"
                id="departureTime"
                name="departure_time"
                pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]"
                placeholder="HH:MM:SS"
                autoComplete="off" 
                required

            />

                <span>
                    <input type="radio" value="b" name="time_r" id="beforeRadio"  required/>
                    Before
                    <input type="radio" value="a" name="time_r" id="afterRadio" />
                    After
                </span></>}

            <input
                id='submitbtn'
                type="submit"
                value="Filter"
            />
        </form>
    );
};

export default BookingFilter;
