export interface CarItemProps {
    brand: string
    model: string
    rented: boolean
}

export default function CarItem({ brand, model, rented }: CarItemProps) {
    return (
        <div className="car-item">
            <img src="photos/background.png" alt="bmw yellow" className="car-image" />
            <h3 className="text-2xl font-bold">{brand} {model}</h3>
            <p className="car-description">3.0 Twin Power Turbo 431 KM</p>
            <p className="car-description">3199 PLN / DZIEŃ</p>

            {rented ? <p>Auto wynaete</p> : <div>Wynajmij</div>}
        </div>
    )
}
