import { useEffect, useState } from 'react'
import CarItem from '../components/CarItem'

export interface CarItemApi {
    brand: string
    model: string
    id: string
    rented: boolean
    photo: string
    description: string
}
const fetchCars = async (token: string) =>
    await fetch('http://localhost:3000/api/cars/available', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((resp) => resp.json())

export default function Index() {
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
    }, [])

    const reloadCars = async (token: string) => {
        try {
            const cars: { data: CarItemApi[] } = await fetchCars(token)

            setAvailableCars(cars.data)
        } catch (err) {
            console.log(
                'Nie udało się pobrać danych o samochodach z backendu',
            )
        }
    }

    return (
        <div className="App">
            {availableCars.length > 0 ? (
                <div className="container grid grid-cols-3">
                    {availableCars.map((car) => {
                        return <CarItem {...car} token={token} reloadCars={(t: string) => reloadCars(t)} isAdmin={isAdmin}/>
                    })}
                </div>
            ) : (
                <h1>Brak samochodów dostępnych na wynajem</h1>
            )}
        </div>
    )
}
