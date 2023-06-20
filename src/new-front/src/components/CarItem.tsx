import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Index from '../routes/Index';

export interface AlertProps {
  type: 'success' | 'error';
  text: string;
}

const Alert: React.FC<AlertProps> = ({ type, text }) => {
  return (
    <div className={clsx('alert my-4', type === 'error' ? 'alert-error' : 'alert-success')}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{text}</span>
    </div>
  );
};

export interface CarItemProps {
  id: string;
  brand: string;
  model: string;
  rented: boolean;
  photo: string;
  description: string;
  token: string | null;
  isAdmin: boolean;
  reloadCars: () => void
}

const rentCar = async (carId: string, token: string) => {
  const rentCarCall = await fetch('http://localhost:3000/api/car/rent', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'PUT',
    body: JSON.stringify({ carId }),
  }).then((resp) => resp.json());

  console.log(rentCarCall);
};

const returnCar = async (carId: string, token: string) => {
  const rentCarCall = await fetch('http://localhost:3000/api/car/return', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: 'PUT',
    body: JSON.stringify({ carId }),
  }).then((resp) => resp.json());

  console.log(rentCarCall);
};

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
    rentCar(id, token!);
    reloadCars()
  };

  const handleReturnCar = () => {
    returnCar(id, token!);
    reloadCars()
  };

  const handleDeleteCar = () => {
    deleteCar(id, token!);
    reloadCars()
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
