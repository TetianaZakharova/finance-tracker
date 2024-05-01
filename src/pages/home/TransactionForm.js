import { useState, useEffect, Fragment } from 'react'
import { useFirestore } from '../../hooks/useFirestore'


export const TransactionForm = ({ uid }) => {

    const [transactionData, setTransactionData] = useState({
        name: '',
        amount: '',
    })

    const { addDocument, response } = useFirestore('transactions')

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, amount } = transactionData
        addDocument({ name, amount, uid }) 
    }

    // reset the form fields
    useEffect(() => {
        if (response.success) {
            setTransactionData({
                name: '',
                amount: '',
            })

        }
    }, [response.success])

    const handleTransaction = (e) => {
        const { name, value } = e.target
        setTransactionData({
            ...transactionData,
            [name]: value,
        })
    }

    return (
        <Fragment>
            <h3>Add a Transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction name:</span>
                    <input
                        type='text'
                        name='name'
                        required
                        onChange={handleTransaction}
                        value={transactionData.name}
                    />
                </label>
                <label>
                    <span>Amount:</span>
                    <input
                        type='number'
                        name='amount'
                        required
                        onChange={handleTransaction}
                        value={transactionData.amount}
                    />
                </label>
                <button className='btn'>
                    Add Transaction
                </button>
            </form>
        </Fragment>
    )
}
