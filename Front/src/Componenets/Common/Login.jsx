import './Login.css'
import { AppContext } from "./AuthContext";

const LoginPage = ({ user_t }) => {

    const { loginUser } = AppContext()
    return (
        <div id='form-cont'>
            <form onSubmit={loginUser} id='form-login'>
                <div>{user_t} Login</div>
                <input type="text" value={user_t} readOnly name='user_t' style={{ display: 'none' }} />
                <input type="text" name="username" placeholder="Enter username" required />
                <input type="password" name="password" placeholder="Enter password" required />
                <input style={{ width: 'max-content', backgroundColor: 'greenyellow', border: 'none', borderRadius: "4px" }} type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default LoginPage;