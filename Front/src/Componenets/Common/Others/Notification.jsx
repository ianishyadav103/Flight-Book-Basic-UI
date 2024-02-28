import { AppContext } from '../AuthContext';
import './style.css';


const TopNotification = () => {
    const { setNotificationMessage, isclose, notification_message } = AppContext();
    return (
        <>
            {isclose ? (<></>) : (<div id="notification">{notification_message}<svg onClick={() => { setNotificationMessage('') }}
                viewBox="0 0 24 24"
                height="24"
                width="24">


                <path
                    fill="white"
                    d="M19,6.41L17.59,5,12,10.59,6.41,5,5,6.41L10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59L13.41,12Z" />



            </svg></div>)
            }</>
    );
}

export default TopNotification;