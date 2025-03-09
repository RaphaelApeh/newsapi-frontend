import { useEffect } from "react";
import { handleLogout } from "../helpers/utils";
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate()

    useEffect(()=> {
        handleLogout()
        navigate("/login")
    }, [])
    
    return (
        <div>Logout</div>
    )
}

export default Logout;