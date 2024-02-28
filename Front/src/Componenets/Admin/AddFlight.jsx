import { useNavigate } from "react-router-dom";
import '../Common/Login.css'
import { AppContext } from "../Common/AuthContext";

const AddFlight = () => {
    const { setNotificationMessage } = AppContext()

    const navigate = useNavigate();
    const addflight = (e) => {
        e.preventDefault()
        fetch('https://iavnishyadav07.pythonanywhere.com/api/addflight', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`

            },
            body: JSON.stringify({
                'flight_name': e.target.flight_name.value,
                'flight_number': e.target.flight_number.value,
                'departure_date': e.target.departure_date.value,
                'departure_time': e.target.departure_time.value
            })
        }).then(async response => {
            const data = await response.json();
            return { status: response.status, data, statusText: response.statusText };
        })
            .then((data) => {

                if (data['status'] === 200) {
                    setNotificationMessage(data['data']['message'])
                    navigate('/')
                    

                }
                else {
                    throw new Error(`HTTP error! Status: ${data['statusText']}`);

                }

            }).catch((e) => {

                alert(e);
            })


    }
    return (
        <div id='form-cont'>
        <form onSubmit={addflight} id='form-login'>
        <div>Add Flights</div>

      
                <input type="text" id="flightName" name="flight_name" placeholder="Flight Name" maxLength={30} required />

          
                <input type="number" id="flightNumber" placeholder="Flight Number (4-digit integer)" name="flight_number" max={9999999999} required />

                <input type="text" id="departureDate" name="departure_date" pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" required />

          
                <input type="text" id="departureTime" name="departure_time" pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]" placeholder="HH:MM:SS" required />

                <input style={{width:'max-content',backgroundColor:'greenyellow',border:'none',borderRadius:"4px"}} type="submit" value="Submit"/>



        </form>
        </div>

    );
}

export default AddFlight;