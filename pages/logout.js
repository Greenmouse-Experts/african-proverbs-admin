import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store/actions/authActions'

export default function Logout() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(logout());
    })
    
    return (
        <>
        
        </>
    )
}
