import { useNavigate } from "react-router-dom";
import '../Common/Login.css'
import { AppContext } from "../Common/AuthContext";
const SignupPage = () => {
    const { setNotificationMessage } = AppContext()
    const navigate = useNavigate();
    const SingnupUser = async (e) => {
        e.preventDefault()

        fetch('https://iavnishyadav07.pythonanywhere.com/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'password1': e.target.password1.value,
                'password2': e.target.password2.value
            })
        }).then(async response => {
            const data = await response.json();
            return { status: response.status, data, statusText: response.statusText };
        })
            .then((data) => {

                if (data['status'] === 201) {
                    navigate('/login')
                    setNotificationMessage("Registered!")
                }
                else if (data['status'] === 409) {
               
                    setNotificationMessage(data['data']['message'][Object.keys(data['data']['message'])[0]][0])
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
            <form onSubmit={SingnupUser} id='form-login'>
                <div>User Signup</div>
                <input type="text" name="username" placeholder="Enter username" required />
                <input type="password" name="password1" placeholder="Enter password" required />
                <input type="password" name="password2" placeholder="Enter password" required />
                <input style={{ width: 'max-content', backgroundColor: 'greenyellow', border: 'none', borderRadius: "4px" }} type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default SignupPage;