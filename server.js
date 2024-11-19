import express from 'express';  
import fs from 'fs';  

const app = express();  
const port = 3000;  
const filePath = './data.json';  

app.use(express.json());  

// Leer datos del archivo JSON  
function readData() {  
    const data = fs.readFileSync(filePath);  
    return JSON.parse(data);  
}  

// Ruta para listar todos los animes  
app.get('/animes', (req, res) => {  
    const data = readData();  
    res.json(data);  
});  

// Ruta para obtener un anime por ID  
app.get('/anime/id/:id', (req, res) => {  
    const data = readData();  
    const anime = data[req.params.id];  
    if (!anime) {  
        return res.status(404).send(`El anime con ID ${req.params.id} no existe.`);  
    }  
    res.json(anime);  
});  

// Ruta para obtener un anime por nombre  
app.get('/anime/nombre/:nombre', (req, res) => {  
    const data = readData();  
    const anime = Object.values(data).find(anime => anime.nombre.toLowerCase() === req.params.nombre.toLowerCase());  
    if (!anime) {  
        return res.status(404).send(`El anime con nombre ${req.params.nombre} no existe.`);  
    }  
    res.json(anime);  
});  

app.listen(port, () => {  
    console.log(`Servidor escuchando en http://localhost:${port}`);  
});