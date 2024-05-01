import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'

//firebase imports
import { projectAuth } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export const useSignup = () => {
    const [isCanceled, setIsCanceled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            //signup user
            const res = await createUserWithEmailAndPassword(projectAuth, email, password)
            console.log('user signed up:', res.user)

            if (!res) {
                throw new Error('Could not complete signup')
            }

            // add displayName to user}
            await updateProfile(res.user, { displayName }) 

            //dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user })

            //update state
            if (!isCanceled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch (err) {
            if (!isCanceled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }    }

    useEffect(() => {
        return () => setIsCanceled(true)
    }, [])

    return { error, isPending, signup }
}
