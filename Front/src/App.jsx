
import './App.css'

import {
  BrowserRouter as Router, Route, Routes

} from "react-router-dom";
import Header from './Componenets/Common/Header/Header';
import { AuthProvider } from './Componenets/Common/AuthContext';
import LoginPage from './Componenets/Common/Login';
import SignupPage from './Componenets/User/Singnup';

import SearchFlights from './Componenets/User/SearchFlight';
import ShowBooking from './Componenets/Common/ShowBookings';
import AddFlight from './Componenets/Admin/AddFlight';
import TopNotification from './Componenets/Common/Others/Notification';
function App() {



  return (
    <Router>

      <AuthProvider>
        <TopNotification />
        <Header />
        <Routes>
          <Route path="/" element={<SearchFlights />} />
          <Route path="/login" element={<LoginPage user_t={"User"} />} />
          <Route path="/adminlogin" element={<LoginPage user_t={"Admin"} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/bookings" element={<ShowBooking />} />
          <Route path="/addflight" element={<AddFlight />} />
        </Routes>

      </AuthProvider>



    </Router>

  )
}

export default App;
