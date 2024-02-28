import './style.css'
import imgUrl from '../../../Images/favi_icon.png'
const LoadingScreen = () => {

    return (
        <div id="main-loading-screen">
            <div id='loading-views-content-box'>
                <img id='loading_logo' src={imgUrl} alt="Whatsapplogo" />
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                <h2>Loading...</h2>
                <p>Note: This is <b>BASIC</b> UI</p>

               
            </div>
        </div>
    );
}


export default LoadingScreen;