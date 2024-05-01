import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";

export const useLogin = () => {
    const [isCanceled, setIsCanceled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        // sign user out

        try {
            const res = await signInWithEmailAndPassword(projectAuth, email, password)

            //dispatch logout action

            dispatch({type: 'LOGIN', payload: res.user})
            
            //update state
            if(!isCanceled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch(err) {
            if(!isCanceled) {
                console.log(err.message)  
                setError ('invalid login credentials')
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCanceled(true)
    }, [])

    return { login, error, isPending }
}