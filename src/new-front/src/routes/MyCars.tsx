import { useEffect, useState } from 'react'
import CarItem from '../components/CarItem'
import { CarItemApi } from './Index'

const fetchCars = async (token: string) =>
    await fetch('http://localhost:3000/api/cars/rented', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((resp) => resp.json())

export default function MyCars() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    const [availableCars, setAvailableCars] = useState<CarItemApi[]>([])

    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const cars: { data: CarItemApi[] } = await fetchCars(token)

                    setAvailableCars(cars.data)
                }
            } catch (err) {
                console.log(
                    'Nie udało się pobrać danych o samochodach z backendu',
                )
            }
        }

        fetchData()
    }, [token])

    const reloadCars = async () => {
        try {
            if (token) {
                const cars: { data: CarItemApi[] } = await fetchCars(token)

                setAvailableCars(cars.data)
            }
        } catch (err) {
            console.log('Nie udało się pobrać danych o samochodach z backendu')
        }
    }
    return (
        <div className="App">
            {availableCars.length > 0 ? (
                <div className="container grid grid-cols-3">
                    {availableCars.map((car) => {
                        return (
                            <CarItem
                                {...car}
                                token={token}
                                reloadCars={reloadCars}
                                isAdmin={isAdmin}
                            />
                        )
                    })}
                </div>
            ) : (
                <h1>Brak wynajętych samochodów</h1>
            )}
        </div>
    )
}
