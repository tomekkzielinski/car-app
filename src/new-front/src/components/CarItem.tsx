import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

export interface AlertProps {
  type: 'success' | 'error';
  text: string;
}

export interface CarItemProps {
  id: string;
  brand: string;
  model: string;
  rented: boolean;
  photo: string;
  description: string;
  token: string | null;
  isAdmin: boolean;
  reloadCars: (token: string) => void
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

const deleteCar = async (carId: string, token: string) => {
  const rentCarCall = await fetch(`http://localhost:3000/api/car/${carId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'DELETE',
    body: JSON.stringify({ carId }),
  }).then((resp) => resp.json());

  console.log(rentCarCall);
};

const CarItem: React.FC<CarItemProps> = ({
  id,
  brand,
  model,
  rented,
  photo,
  description,
  token,
  isAdmin,
  reloadCars
}) => {

  const navigate = useNavigate();

  const handleRentCar = () => {
    rentCar(id, token!).then(() => {
      reloadCars(token!)
    })
  };


  const handleReturnCar = () => {
    returnCar(id, token!).then(() => {
      reloadCars(token!)
    })
  };

  const handleDeleteCar = () => {
    deleteCar(id, token!).then(() => {
      reloadCars(token!)
    })
  };



  const rentButton = <Button onClick={handleRentCar} text="Wynajmij" />;
  const deleteButton = <Button onClick={handleDeleteCar} text="Usuń auto" />;
  const returnButton = <Button onClick={handleReturnCar} text="Zwróć auto" />;
  const loginButton = <Button onClick={() => navigate('/login')} text="Zaloguj się" />;

  // Jeśli jesteś zalogowany to wynajmij/zwroc w przeciwnym razie przekierowanie do logowania
  const button = !token ? loginButton : rented ? returnButton : rentButton;

  return (
    <div className="card w-96 bg-base-100 shadow-xl mt-6">
      <figure>
        <img src={photo} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {brand} {model}
        </h2>
        <p>{description}</p>
        <div className="card-actions justify-end">{button}</div>
        <button className="card-actions justify-end" onClick={handleDeleteCar}>
          Usuń auto
        </button>
      </div>
    </div>
  );
};

export default CarItem;
