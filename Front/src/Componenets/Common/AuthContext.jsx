import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen.jsx/LoadingScreen";
import React from 'react';
const AuthContext = createContext();


export const AppContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {



    console.log("Auth component rerendered");
    const [notification_message, set_notification_message] = useState('');
    const [isclose, setIsClose] = useState(true);
    
    const setNotificationMessage = (message) => {
            set_notification_message(message);
            setIsClose(!message);
        };



   


    const [user, setUser] = useState(false);
    const [isAdmin, setisAdmin] = useState(false);
    const [isLoading, setisLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (!(localStorage.getItem('token'))) {
            setisLoading(false)
            navigate('/login')
            setNotificationMessage("Please Login")



        }
        else {
            fetch('https://iavnishyadav07.pythonanywhere.com/api/getusergroup/', {
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

                    if (data['status'] === 200) {
                        setUser(true)
                        setisAdmin(data['data']['isadmin'])
                        navigate('/')
                    }
                    else if (data['status'] === 401) {

                        navigate('/login')
                        setNotificationMessage("Please Login")
                    }
                    else {
                        throw new Error(`HTTP error! Status: ${data['statusText']}`);

                    }
                    setisLoading(false)

                }).catch((e) => {

                    alert(e);
                    
                })
        }

    }, [])


    const loginUser = async (e) => {
        e.preventDefault()

        fetch(`https://iavnishyadav07.pythonanywhere.com/api/api-token-auth/${e.target.user_t.value}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'password': e.target.password.value
            })
        }).then(async response => {
            const data = await response.json();
            return { status: response.status, data, statusText: response.statusText };
        })
            .then((data) => {

                if (data['status'] === 200) {
                    localStorage.setItem('token', data['data']['token'])
                    setUser(true)
                    setisAdmin(data['data']['isadmin'])
                    navigate('/')
                }
                else if (data['status'] === 400) {
         
                    setNotificationMessage(data['data'][Object.keys(data['data'])[0]][0])
         
                }
                else if (data['status'] === 401) {
                    setNotificationMessage(data['data']['message']+'!!')
         
                }
                else {
                    throw new Error(`HTTP error! Status: ${data['statusText']}`);

                }

            }).catch((e) => {

                alert(e);
            })


    }

    function logoutUser() {
        setUser(false)
        localStorage.removeItem("token")
        navigate("/login")
    }

    const contextData ={
        user,
        isAdmin,
        loginUser,
        logoutUser,
        setUser,
        setNotificationMessage,
        isclose,
        notification_message
    };



    return (
        <AuthContext.Provider value={contextData} >
            {isLoading ? (<LoadingScreen />) : (children)}


        </AuthContext.Provider>


    );

}