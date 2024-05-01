import { useReducer, useState, useEffect } from "react";
import { projectFirestore, timestamp } from "../firebase/config";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null,
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PANDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

export const useFirestore = (collect) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)


    // collection ref
    let ref = collection(projectFirestore, collect)

    //only dispatch is not canselled
    const dispatchIsNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    // add collection
    const addDocument = async (d) => {
        dispatch({ type: 'IS_PANDING' })

        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await addDoc(ref, { ...d, createdAt: createdAt })
            dispatchIsNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
        }
        catch (err) {
            dispatchIsNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    //delete collection
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PANDING' })
        let refDoc = doc(projectFirestore, collect, id)
        try {
            await deleteDoc(refDoc)
            dispatchIsNotCancelled({ type: 'DELETED_DOCUMENT'})
        }
        catch (err) {
            dispatchIsNotCancelled({ type: 'ERROR', payload: err.message})
        }       
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response }
}