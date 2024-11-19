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

// Guardar datos en el archivo JSON  
function saveData(data) {  
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));  
}  

// Crear un nuevo anime  
app.post('/anime', (req, res) => {  
    const { id, anime } = req.body;  
    const data = readData();  
    if (data[id]) {  
        return res.status(400).send(`El anime con ID ${id} ya existe.`);  
    }  
    data[id] = anime;  
    saveData(data);  
    res.send(`Anime con ID ${id} creado.`);  
});  

// Leer un anime por ID  
app.get('/anime/:id', (req, res) => {  
    const { id } = req.params;  
    const data = readData();  
    if (!data[id]) {  
        return res.status(404).send(`El anime con ID ${id} no existe.`);  
    }  
    res.json(data[id]);  
});  

// Leer un anime por nombre  
app.get('/anime/name/:name', (req, res) => {  
    const { name } = req.params;  
    const data = readData();  
    const anime = Object.values(data).find(anime => anime.nombre.toLowerCase() === name.toLowerCase());  
    if (!anime) {  
        return res.status(404).send(`El anime con nombre "${name}" no existe.`);  
    }  
    res.json(anime);  
});  

// Listar todos los animes  
app.get('/animes', (req, res) => {  
    const data = readData();  
    res.json(data);  
});  

// Actualizar un anime por ID  
app.put('/anime/:id', (req, res) => {  
    const { id } = req.params;  
    const updatedAnime = req.body;  
    const data = readData();  
    if (!data[id]) {  
        return res.status(404).send(`El anime con ID ${id} no existe.`);  
    }  
    data[id] = { ...data[id], ...updatedAnime };  
    saveData(data);  
    res.send(`Anime con ID ${id} actualizado.`);  
});  

// Eliminar un anime por ID  
app.delete('/anime/:id', (req, res) => {  
    const { id } = req.params;  
    const data = readData();  
    if (!data[id]) {  
        return res.status(404).send(`El anime con ID ${id} no existe.`);  
    }  
    delete data[id];  
    saveData(data);  
    res.send(`Anime con ID ${id} eliminado.`);  
});  

app.listen(port, () => {  
    console.log(`Servidor escuchando en http://localhost:${port}`);  
});