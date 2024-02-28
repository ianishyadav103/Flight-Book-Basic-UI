import './BookingElement.css'
const BookingElement = ({ obj: { flight: { flight_name,
    flight_number,
    departure_date,
    departure_time,
    seats_available }, seats } }) => {
    return (
        <div className="bookingelement">
           <span className="bookflightname">{flight_name}</span>
    
           <div> <span>No. {flight_number}</span>
            <span>Date: {departure_date}</span>
            <span>Time: {departure_time}</span>
            <span>Avaialbe: {seats_available}</span>
            <span>Booked: {seats}</span></div>
            
        </div>
    )
}

export default BookingElement;