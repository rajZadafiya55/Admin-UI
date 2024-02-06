import { Navigate } from "react-router-dom";

export default function RequiredAuth({children}){
    const currentAdmin = JSON.parse(localStorage.getItem('AdminData'));
    console.log(currentAdmin);
    return currentAdmin ? children : <Navigate to='/login' replace />
}