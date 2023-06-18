import { useState, ChangeEvent } from 'react'
import Alert from '../components/Alert'

export default function AddCarForm() {
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [alert, setAlert] = useState({ error: false, message: '' })

  const handleBrandChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBrand(event.target.value)
  }

  const handleModelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setModel(event.target.value)
  }

  const handleAddCar = async () => {
    const response = await addCar(brand, model)

    if (response.error) {
      setAlert({ error: true, message: response.message })
    } else {
      setAlert({ error: false, message: response.message })
      // W tym miejscu możesz dodać dodatkową logikę po pomyślnym dodaniu samochodu
      // np. wyczyszczenie pól formularza, odświeżenie listy samochodów itp.
    }
  }

  return (
    <div>
      {alert.error && <Alert text={alert.message} />}
      <label>
        Brand:
        <input type="text" value={brand} onChange={handleBrandChange} />
      </label>
      <br />
      <label>
        Model:
        <input type="text" value={model} onChange={handleModelChange} />
      </label>
      <br />
      <button onClick={handleAddCar}>Add Car</button>
    </div>
  )
}

async function addCar(brand: string, model: string) {
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
    body: JSON.stringify({ brand: brand, model: model }),
  }).then((resp) => resp.json())

  return {
    error: false,
    message: registerCall.data.password,
  }
}
