import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const ProtectedRoute = ({ children }) => {
    const { username } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [userExists, setUserExists] = useState(false);

    useEffect(() => {
        const checkUserExists = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/server/user/check-user/${username}`);
                if (response.data.exists) {
                    setUserExists(true);
                }
            } catch (error) {
                console.error("Error checking username:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkUserExists();
    }, [username]);

   if (isLoading) {
           return (
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1 -translate-y-1/2">
                   <Loader />
                   <p className='relative right-1/2'>Wait upto minute, it needs some time...!</p>
               </div>
           );
       }

    return userExists ? children : <Navigate to="/notfound" />;
};

export default ProtectedRoute;
