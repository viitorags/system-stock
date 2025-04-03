/* const express = require('express');
const path = require('path');

const app = express();
const port = 5000;

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Servidor: http://localhost:${port}/`);
}); */