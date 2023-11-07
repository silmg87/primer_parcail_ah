import express from 'express';

const app = express();
app.use(express.json())

app.listen(2023, function () {
    console.log("El servidor está corriendo correctamente... http://localhost:2023")
});