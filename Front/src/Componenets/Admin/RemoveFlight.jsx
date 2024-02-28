import { AppContext } from "../Common/AuthContext";

export function removeflight(id,setflightlist, setNotificationMessage){
   
    fetch(`https://iavnishyadav07.pythonanywhere.com/api/removeflight/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`

        },
    }).then(async response => {
        const data = await response.json();
        return { status: response.status, data, statusText: response.statusText };
    })
        .then((data) => {

            if (data['status'] === 200) {
                setNotificationMessage(data['data']['message'])
                    setflightlist((prev) => prev.filter((flight) => flight.id !== id));
        
            }
         
            else {
                console.log(data['data'])

                throw new Error(`HTTP error! Status: ${data['statusText']}`);

            }

        }).catch((e) => {

            alert(e);
        })
}
