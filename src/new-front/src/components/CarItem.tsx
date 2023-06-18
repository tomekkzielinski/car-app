import { useNavigate } from 'react-router-dom'
import Button from './Button'

export interface CarItemProps {
    id: string
    brand: string
    model: string
    rented: boolean
    photo: string
    description: string
    token: string | null
}

const rentCar = async (carId: string, token: string) => {
    const rentCarCall = await fetch('http://localhost:3000/api/car/rent', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        method: 'PUT',
        body: JSON.stringify({ carId }),
    }).then((resp) => resp.json())

    console.log(rentCarCall)
}

const returnCar = async (carId: string, token: string) => {
    const rentCarCall = await fetch('http://localhost:3000/api/car/return', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        method: 'PUT',
        body: JSON.stringify({ carId }),
    }).then((resp) => resp.json())

    console.log(rentCarCall)
}

export default function CarItem({
    id,
    brand,
    model,
    rented,
    photo,
    description,
    token,
}: CarItemProps) {
    const navigate = useNavigate()

    const handleRentCar = () => {
        rentCar(id, token!)
    }

    const handleReturnCar = () => {
        returnCar(id, token!)
    }

    const rentButton = <Button onClick={handleRentCar} text="Wynajmij" />
    const returnButton = <Button onClick={handleReturnCar} text="Zwróć auto" />
    const loginButton = (
        <Button onClick={() => navigate('/login')} text="Zaloguj się" />
    )

    // Jeśli jesteś zalogowany to wynajmij/zwroc w przeciwnym razie przekierowanie do logowania
    const button = !token ? loginButton : rented ? returnButton : rentButton

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img src={photo} alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {brand} {model}
                </h2>
                <p>{description}</p>
                <div className="card-actions justify-end">{button}</div>
            </div>
        </div>
    )
}
