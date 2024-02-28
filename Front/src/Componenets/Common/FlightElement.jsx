

const FlightElement = ({ flight_name,
    flight_number,
    departure_date,
    departure_time,
    seats_available }) => {
    return (
        <div className="flightelement">
            <span className="flightname">{flight_name}</span>
            <span>No. {flight_number}</span>
            <span>Date: {departure_date}</span>
            <span>Time: {departure_time}</span>
            <span>Seats: {seats_available}</span>
        </div>
    )
}

export default FlightElement;