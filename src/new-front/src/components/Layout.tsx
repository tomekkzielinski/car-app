import { Link } from 'react-router-dom'

export default function Layout({ children }: { children: JSX.Element }) {
    const token = localStorage.getItem('token')

    return (
        <div className="bg-slate-600 w-full h-[100vh]">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">CarRentApp</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                        <Link to={`/add-car`}>Dodaj auto jako administrator</Link>
                        </li>
                        <li>
                            <Link to={`/`}>Wynajmij auto</Link>
                        </li>
                        <li>
                            <Link to={token ? `/my-cars` : '/login'}>
                                Moje wynajęte auta
                            </Link>
                        </li>
                        <li>
                            <Link to={token ? `/tu-zrobic-funkcje-do-czyszczenia-localstorage` : '/zaloguj'}>
                                {token ? `Wyloguj` : 'Zaloguj'}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto p-10">
              {children}
            </div>
        </div>
    )
}
