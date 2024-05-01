import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// styles
import styles from './signup.module.css'

export const Signup = () => {

    const [personInfo, setPersonInfo] = useState({
        email: '',
        password: '',
        displayName: '',
    })
    const { error, isPending, signup } = useSignup()

    const handlePersonInfo = (event) => {
        const { name, value } = event.target
        setPersonInfo({
            ...personInfo,
            [name]: value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        signup(personInfo.email, personInfo.password, personInfo.displayName)
    }

    return (
        <form
            className={styles['signup-form']}
            onSubmit={handleSubmit}
        >
            <h2>Sign Up</h2>
            <label>
                <span>name:</span>
                <input
                    type='text'
                    name='displayName'
                    value={personInfo.displayName}  
                    onChange={(event) => handlePersonInfo(event)}
                />
            </label>
            <label>
                <span>email:</span>
                <input
                    type='email'
                    name='email'
                    value={personInfo.email}       
                    onChange={(event) => handlePersonInfo(event)}
                />
            </label>
            <label>
                <span>password:</span>
                <input
                    type='password'
                    name='password'
                    value={personInfo.password}        
                    onChange={(event) => handlePersonInfo(event)}
                />
            </label>
            {isPending
                ? <button className='btn' disabled>Loading</button>
                : <button className='btn'>Sing Up</button>
            }
            {error && <p>{error}</p>}
        </form>
    )
}
