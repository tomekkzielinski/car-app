import Button from './Button'

export interface CarItemProps {
    brand: string
    model: string
    rented: boolean
    photo: string
    description: string
}

export default function CarItem({
    brand,
    model,
    rented,
    photo,
    description,
}: CarItemProps) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img
                    src={photo}
                    alt="Shoes"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{brand} {model}</h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    {rented ? <p>Auto wynaete</p> : <Button text="Wynajmij" />}
                </div>
            </div>
        </div>
    )
}
