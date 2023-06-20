import { useState, ChangeEvent, useEffect } from 'react'
import Alert from '../components/Alert'
import Button from '../components/Button'

export default function AddCar() {
    const [showAlert, setShowAlert] = useState(false)
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [photo, setPhoto] = useState('')
    const [description, setDescription] = useState('')
    const [alert, setAlert] = useState<{
        error: boolean
        message: string
        type: 'success' | 'error'
    }>({
        error: false,
        message: '',
        type: 'success',
    })

    const handleBrandChange = (event: ChangeEvent<HTMLInputElement>) => {
        setBrand(event.target.value)
    }

    const handleModelChange = (event: ChangeEvent<HTMLInputElement>) => {
        setModel(event.target.value)
    }
    const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPhoto(event.target.value)
    }
    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const handleAddCar = async () => {
        const response = await addCar(brand, model, photo, description)

        if (response.error) {
            setAlert({ error: true, message: response.message, type: 'error' })
        } else {
            setAlert({
                error: false,
                message: response.message,
                type: 'success',
            })
            setShowAlert(true)
            // W tym miejscu możesz dodać dodatkową logikę po pomyślnym dodaniu samochodu
            // np. wyczyszczenie pól formularza, odświeżenie listy samochodów itp.
        }
    }
    // useEffect(() => {
    //   if (showAlert) {
    //     window.location.reload();
    //   }
    // }, [showAlert]);

    return (
        <div className="flex flex-col gap-2 p-7 rounded-xl mx-auto max-w-fit  bg-base-100">
           
            <div>
                <label>Brand:</label>
                <input
                    className="mt-2 ml-2 input input-bordered input-primary w-full max-w-xs"
                    type="text"
                    value={brand}
                    onChange={handleBrandChange}
                />
            </div>
            <div>
                <label>Model:</label>
                <input
                    className="mt-2 ml-2 input input-bordered input-primary w-full max-w-xs"
                    type="text"
                    value={model}
                    onChange={handleModelChange}
                />
            </div>

            <div>
                <label>Zdjęcie:</label>
                <input
                    className="ml-2 file-input file-input-bordered file-input-accent w-full max-w-xs"
                    type="text"
                    onChange={handlePhotoChange}
                />
            </div>
            <div>
                <label>Opis:</label>
                <input
                    className="mt-2 ml-2 input input-bordered input-primary w-full max-w-xs"
                    type="text"
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </div>
            {alert.error && <Alert type={alert.type} text={alert.message} />}
            {showAlert && (
                <Alert
                    type="success"
                    text="Auto zostało dodane do bazy danych!"
                />
            )}
            <button className="mt-2 btn btn-secondary" onClick={handleAddCar}>
                Dodaj auto
            </button>

        </div>
    )
}

async function addCar(
    brand: string,
    model: string,
    photo: string,
    description: string,
) {
    if (!brand || !model) {
        console.log('nieprawidłowe dane samochodu')
        return {
            error: true,
            message: 'Złe dane samochodu',
        }
    }
    const registerCall = await fetch('http://localhost:3000/api/car', {
        headers: {
            'Content-Type': 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.WFla.rXQr4IFyUHeqNGPyqUXWzMIYPLcvjREQuXM7g_1ifFU',
        },
        method: 'POST',
        body: JSON.stringify({
            brand: brand,
            model: model,
            photo: photo,
            description: description,
        }),
    }).then((resp) => resp.json())

    return {
        error: false,
        message: registerCall.data.password,
    }
}
