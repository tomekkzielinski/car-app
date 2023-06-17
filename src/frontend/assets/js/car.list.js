window.addEventListener('load', async () => {
    const cars = await fetch('http://localhost:3000/api/cars/available', {
        headers: {
            Authentication:
                'Bearer eyJhbGciOiJIUzI1NiJ9.WFla.rXQr4IFyUHeqNGPyqUXWzMIYPLcvjREQuXM7g_1ifFU',
        },
    }).then((resp) => resp.json())

    if (cars.data && cars.data.length > 0) {
        for (const car of cars.data) {
            // console.log(car)

            // Utworzenie diva carItem
            const carItem = document.createElement('div')
            // Nadanie mu klasy
            carItem.classList.add('car-item')

            // Utworzenie H3
            const title = document.createElement("h3")
            // Utworzenie tekstu
            const titleText = document.createTextNode(`${car.brand} ${car.model}`);
            // Dodanie tekstu do H3
            title.appendChild(titleText)

            // Dodanie H3 do carItem
            carItem.append(title);

            // Dodanie carItem do listy
            document.getElementById('car-list').appendChild(carItem)
        }
    }
})
