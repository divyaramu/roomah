import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext/index'
import { doSignInWithEmailAndPassword } from '../../../auth'

const Login = () => {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const getErrorMessage = (error) => {
        switch (error.code) {
            case 'auth/invalid-email':
                return 'Invalid email address.';
            case 'auth/user-disabled':
                return 'User account has been disabled.';
            case 'auth/user-not-found':
                return 'No user found with this email.';
            case 'auth/wrong-password':
                return 'Invalid password.';
            case 'auth/invalid-credential':
                return 'Invalid credentials.';
            default:
                return 'An error occurred. Please try again.';
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isSigningIn) {
            setIsSigningIn(true)
            setErrorMessage('')
            try {
                await doSignInWithEmailAndPassword(email, password)
            } catch (error) {
                setErrorMessage(getErrorMessage(error))
                setIsSigningIn(false)
            }
            
            // doSendEmailVerification()
        }
    }

    // const onGoogleSignIn = async (e) => {
    //     e.preventDefault()
    //     if (!isSigningIn) {
    //         setIsSigningIn(true)
    //         setErrorMessage('')  // Clear previous errors
    //         try {
    //             await doSignInWithGoogle()
    //         } catch (error) {
    //             setErrorMessage(getErrorMessage(error))
    //             setIsSigningIn(false)
    //         }
    //     }
    // }

    return (
        <div className="relative w-full h-screen">
            {/* <video
                src="../images/EchoSysVid.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            /> */}
            {/* Change the to=XXX if need to change when user is logged in */}
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main className="relative z-10 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <div className="text-center">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Welcome Back</h3>
                        </div>
                    </div>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-5"
                    >
                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>


                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Password
                            </label>
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <p className="text-center text-sm">Don't have an account? <Link to={'/register'} className="hover:underline font-bold">Sign up</Link></p>
                    <p className="text-center text-sm"> <Link to={'/'} className="hover:underline font-bold">Back to home</Link></p>
                    {/* <div className='flex flex-row text-center w-full'>
                        <div className='border-b-2 border-gray-500 mb-2.5 mr-2 w-full'></div><div className='text-sm font-bold w-fit'>OR</div><div className='border-b-2 border-gray-500 mb-2.5 ml-2 w-full'></div>
                    </div> */}
                    {/* <button
                        disabled={isSigningIn}
                        onClick={(e) => { onGoogleSignIn(e) }}
                        className={`w-full flex items-center justify-center gap-x-3 py-2.5 border border-gray-300 shadow-lg rounded-lg text-sm font-medium  ${isSigningIn ? 'cursor-not-allowed' : 'hover:bg-gray-100 transition duration-300 active:bg-gray-100'}`}
                        style={{ borderColor: '#9E9E9E' }}>
                        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_17_40)">
                                <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                            </g>
                            <defs>
                                <clipPath id="clip0_17_40">
                                    <rect width="48" height="48" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                    </button> */}
                </div>
            </main>
        </div>
    )
}

export default Login