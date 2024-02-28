import { AppContext } from "../Common/AuthContext";
import { useState } from "react";
function bookflight(id, seats, available_seat, setflightlist, setNotificationMessage) {
    if (available_seat < seats) {
        setNotificationMessage("Not enough seats available")
        return
    }
    else if (seats <1) {
        setNotificationMessage("Minimum 1 seat must be booked")

        return
    }
    fetch(`https://iavnishyadav07.pythonanywhere.com/api/bookflight/${id}/${seats}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`

        },
    }).then(async response => {
        const data = await response.json();
        return { status: response.status, data, statusText: response.statusText };
    })
        .then((data) => {

            if (data['status'] === 201) {
                setNotificationMessage(data['data']['message'])


                setflightlist((prevFlightList) =>
                    prevFlightList.map((flight) =>
                        flight.id === id ? { ...flight, seats_available: flight.seats_available - seats } : flight
                    )
                );

            }
            else if(data['status'] === 200){
                setNotificationMessage(data['data']['message'])

            }
  
            else {
      
                throw new Error(`HTTP error! Status: ${data['statusText']}`);

            }

        }).catch((e) => {

            alert(e);
        })
}



const BookFlight = ({ id, seat, setflightlist }) => {
    const { setNotificationMessage } = AppContext()

    const [showinput, setshowinput] = useState(false);
    const [inputValue, setInputValue] = useState(0);

    function bookf() {
        bookflight(id, inputValue, seat, setflightlist, setNotificationMessage);
        setshowinput(false);
    }
    function cancel() {

        setshowinput(false);
    }

    return (
        showinput ? (<span>
            <input type="text" max={seat} value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} />
            <span onClick={bookf} className="confirm">Confirm</span><span className="cancel" onClick={cancel}>Cancel</span></span>)
            :

            (<span className="bookbtn" onClick={() => {
                setshowinput(true);
            }}>Book</span>)

    );

}

export default BookFlight;
