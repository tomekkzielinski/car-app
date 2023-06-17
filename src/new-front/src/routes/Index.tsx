import { useEffect, useState } from 'react'
import CarItem from '../components/CarItem'

interface CarItemApi {
    brand: string
    model: string
    id: string
    rented: boolean
}

export default function Index() {
    const [availableCars, setAvailableCars] = useState<CarItemApi[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const cars: { data: CarItemApi[] } = await fetch(
                'http://localhost:3000/api/cars/available',
                {
                    headers: {
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiJ9.WFla.rXQr4IFyUHeqNGPyqUXWzMIYPLcvjREQuXM7g_1ifFU',
                    },
                },
            ).then((resp) => resp.json())

            setAvailableCars(cars.data)
        }

        fetchData()
    }, [])

    return (
        <div className="App">

            {availableCars.length > 0 && (
                <div className='container grid grid-cols-3'>
                    {availableCars.map((car) => {
                        return <CarItem brand={car.brand} model={car.model} rented={car.rented} />
                    })}
                </div>
            )}
        </div>
    )
}
