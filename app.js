const express = require('express');
const path = require('path');
const { getExchangeRates } = require('./currencyApi');

const app = express();

// Serwowanie plików statycznych z folderu 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint do strony głównej, wysyłający plik 'index.html' do użytkownika
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Endpoint do pobierania kursów walut
app.get('/rates/:base', async (req, res) => {
    const baseCurrency = req.params.base.toUpperCase();
    try {
        const rates = await getExchangeRates(baseCurrency);
        if (!rates) {
            return res.status(500).send('Nie udało się pobrać kursów walut.');
        }
        res.json(rates);
    } catch (error) {
        res.status(500).send('Wystąpił błąd podczas pobierania danych z API.');
    }
});

// Ustawienie portu serwera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
