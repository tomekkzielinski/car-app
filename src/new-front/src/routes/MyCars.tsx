import { useEffect, useState } from 'react'
import CarItem from '../components/CarItem'

interface CarItemApi {
    brand: string
    model: string
    id: string
    rented: boolean
    photo: string
    description: string
}

export default function MyCars() {
    const [availableCars, setAvailableCars] = useState<CarItemApi[]>([])

    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cars: { data: CarItemApi[] } = await fetch(
                    'http://localhost:3000/api/cars/rented',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                ).then((resp) => resp.json())

                setAvailableCars(cars.data)
            } catch (err) {
                console.log(
                    'Nie udało się pobrać danych o samochodach z backendu',
                )
            }
        }

        fetchData()
    }, [token])

    return (
        <div className="App">
            {availableCars.length > 0 ? (
                <div className="container grid grid-cols-3">
                    {availableCars.map((car) => {
                        return <CarItem {...car} token={token} />
                    })}
                </div>
            ) : (
                <h1>Brak wynajętych samochodów</h1>
            )}
        </div>
    )
}
