# car-rent-app-mp


## JWT szyfrowanie 
Wyciąganie klucza do API
```js 
    console.log('secret', secret);
    console.log('parsedToken', parsedToken);
    console.log('moja zaszyfrowana wartość' , jwt.sign(parsedToken, secret))
```
Zaszyfrowana wartość = to co jest przekazywane w Token Bearer

## Ścieżka połączenia z DB Postgres, zdefiniowana w pliku env.

`DATABASE_URL="postgresql://postgres:1234@localhost:5433/carrentapp"`
`DATABASE_URL="postgresql://{nazwa_uzytkownika}:{hasło}@{nazwa_serwera}:{port}/{nazwa_bazy_danych}`

## Uruchomeienie aplikacji
-OTWORZYC /new-front i wpisać komendę 'npm run start'

## Uruchomienie back-end
-Otworzyć /car-app i wpisać komende 'npm run be-dev'