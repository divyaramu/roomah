import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext/index'
import { doCreateUserWithEmailAndPassword } from '../../../auth'

const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth();

    const getErrorMessage = (error) => {
        switch (error.code) {
            case 'auth/email-already-in-use':
                return 'This email is already in use.';
            case 'auth/invalid-email':
                return 'Invalid email address.';
            case 'auth/operation-not-allowed':
                return 'Operation not allowed. Please contact support.';
            case 'auth/weak-password':
                return 'Password is too weak.';
            default:
                return 'An error occurred. Please try again.';
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.')
            return
        }

        if (!isRegistering) {
            setIsRegistering(true)
            setErrorMessage('')  // Clear previous errors
            try {
                await doCreateUserWithEmailAndPassword(email, password)
                navigate('/home')
            } catch (error) {
                setErrorMessage(getErrorMessage(error))
                setIsRegistering(false)
            }
        }
    }

    return (
        <div className="relative w-full h-screen">
            <video
                src="../images/EchoSysVid.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main className="relative z-10 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <div className="text-center mb-6">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Create a New Account</h3>
                        </div>

                    </div>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-4"
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
                                disabled={isRegistering}
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Confirm Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border border-black focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="text-sm text-center">
                            Already have an account? {'   '}
                            <Link to={'/login'} className="text-center text-sm hover:underline font-bold">Continue</Link>
                            <p className="text-center text-sm"> <Link to={'/'} className="hover:underline font-bold">Back to home</Link></p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Register