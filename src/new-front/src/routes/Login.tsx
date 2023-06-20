import { useState } from 'react'
import Alert from '../components/Alert'
import { useNavigate } from "react-router-dom"

const register = async (email: string, password: string): Promise<{
    error: boolean,
    message: string
}> => {
    if (!email || !password) {
        console.log('zle haslo itp')
        return {
            error: true,
            message: 'Złe dane rejestracji'
        }
    }
    const odpowiedzZBackendu = await fetch('http://localhost:3000/api/user', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
    }).then((resp) => resp.json())

    if (odpowiedzZBackendu.data) {
        return {
            error: false,
            message: "Rejestracja przebiegła pomyślnie. Zaloguj się."
        }
    }

    return {
        error: true,
        message: "Nie udało się zarejestrować"
    }
}

const login = async (email: string, password: string): Promise<{
    error: boolean,
    message: string,
    isAdmin?: boolean
}> => {
    if (!email || !password) {
        console.log('Złe dane logowania')
        return {
            error: true,
            message: 'Złe dane logowania'
        }
    }

    const odpowiedzZBackendu = await fetch('http://localhost:3000/api/login', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
    }).then((resp) => resp.json())

    if (odpowiedzZBackendu.data) {
        console.log(odpowiedzZBackendu.data.token)
        return {
            error: false,
            message: odpowiedzZBackendu.data.token,
            isAdmin: odpowiedzZBackendu.data.isAdmin
        }
    }

    return {
        error: true,
        message: "Nie udało się zalogować"
    }
}

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleRegistration = async () => {
        const registration = await register(email, password)

        if (registration.error) {
            setSuccess('')
            setError(registration.message)
        } else {
            setError('')
            setSuccess(registration.message)
        }
    }

    const handleLogin = async () => {
        const logging = await login(email, password)

        if (logging.error) {
            setError(logging.message)
        } else {
            localStorage.setItem("token", logging.message)
            localStorage.setItem("isAdmin", logging.isAdmin ? logging.isAdmin.toString() : 'false')
            setError('')
            navigate("/")
        }
    }

    return (
        <div className="relative flex flex-col justify-center h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-purple-700">
                    CarRentApp
                </h1>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Email</span>
                    </label>
                    <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        type="text"
                        placeholder="Email Address"
                        className="w-full input input-bordered input-primary bg-slate-50"
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        placeholder="Enter Password"
                        className="bg-slate-50  w-full input input-bordered input-primary"
                    />
                </div>
                <a
                    href="/asd"
                    className="text-xs text-gray-600 hover:underline hover:text-blue-600"
                >
                    Forget Password?
                </a>

                {error.length > 0 && <Alert type="error" text={error} />}

                {success.length > 0 && <Alert type="success" text={success} />}

                <div className="flex gap-2">
                    <button
                        onClick={() => handleLogin()}
                        className="btn btn-primary"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => handleRegistration()}
                        className="btn btn-secondary"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}
