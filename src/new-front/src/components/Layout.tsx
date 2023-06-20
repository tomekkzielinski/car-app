import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Layout({ children }: { children: JSX.Element }) {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    console.log(isAdmin)
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('isAdmin')
        navigate('/')
    }

    return (
        <div className="bg-slate-600 w-full h-[100vh]">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">
                        CarRentApp
                    </a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        {isAdmin && (
                            <li>
                                <Link to={`/add-car`}>
                                    Dodaj auto jako administrator
                                </Link>
                            </li>
                        )}

                        <li>
                            <Link to={`/`}>Wynajmij auto</Link>
                        </li>
                        <li>
                            <Link to={token ? `/my-cars` : '/login'}>
                                Moje wynajęte auta
                            </Link>
                        </li>

                        <li>
                            {!token ? (
                                <Link to={`/login`}>Zaloguj się</Link>
                            ) : (
                                <span onClick={handleLogout}>Wyloguj</span>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto p-10">{children}</div>
        </div>
    )
}
