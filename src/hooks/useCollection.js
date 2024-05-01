
import { useEffect, useRef, useState } from 'react';
import { projectFirestore } from '../firebase/config';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';

export const useCollection = (c, _q, _ob) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null)

    const q = useRef(_q).current
    const ob = useRef(_ob).current

    useEffect(() => {
        let ref = collection(projectFirestore, c)

        if(q) {
            ref = query(ref, where(...q))
            console.log(ref)
        }

        if(ob) {
            ref = query(ref, orderBy(...ob))
        }

        const unsubscribe = onSnapshot(ref, (spanshot) => {
            let results = []
            spanshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('could not fetch the data')
        })

        return () => unsubscribe()

    }, [c, q, ob])
    return { documents, error }
}