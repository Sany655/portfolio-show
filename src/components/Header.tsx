import React from 'react'
import { Link, NavLink, Outlet, redirect } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Header() {
    const authUser = useAuth();
    return (
        <>
            <div className='flex md:flex-row flex-col bg-orange-500 text-white justify-between py-6 px-12'>
                <h1><Link to={'/'}>SP</Link></h1>
                <ul className='flex md:flex-row gap-4 flex-col'>
                    {authUser.currentUser ? (
                        <>
                            <li><NavLink to="/my-portfolio" >Home</NavLink></li>
                            <li><button onClick={() => {
                                signOut(auth)
                                redirect("signin")
                            }}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><NavLink to="/signin">Signin</NavLink></li>
                            <li><NavLink to="/signup">Signup</NavLink></li>
                        </>
                    )}
                </ul>
            </div>
            <Outlet />
        </>
    )
}

export default Header