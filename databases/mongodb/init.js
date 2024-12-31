const { MongoClient } = require('mongodb');

// Configuracion de MongoDB
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

//
const initialData = [
    { nombre: "Arroz largo", calorias: 364, proteinas: 7, carbohidratos: 80, grasas: 0.9 },
    { nombre: "Pechuga pollo", calorias: 120, proteinas: 22, carbohidratos: 0, grasas: 2.6 },
    { nombre: "Leche", calorias: 61, proteinas: 3.2, carbohidratos: 4.8, grasas: 3.4 },
    { nombre: "Huevo", calorias: 143, proteinas: 12.6, carbohidratos: 0.7, grasas: 9.5 },
    { nombre: "Aceite de oliva", calorias: 884, proteinas: 0, carbohidratos: 0, grasas: 100 },
    { nombre: "Pan blanco", calorias: 265, proteinas: 9, carbohidratos: 49, grasas: 3.2 },
    { nombre: "Zanahoria", calorias: 41, proteinas: 0.9, carbohidratos: 9.6, grasas: 0.2 },
    { nombre: "Tomate", calorias: 18, proteinas: 0.9, carbohidratos: 3.9, grasas: 0.2 },
    { nombre: "Manzana", calorias: 52, proteinas: 0.3, carbohidratos: 14, grasas: 0.2 },
    { nombre: "Patata", calorias: 77, proteinas: 2, carbohidratos: 17, grasas: 0.1 }
];

async function initializeDatabase() {
    try{
        // Conectar a MongoDB
        await client.connect();
        const db = client.db("mycookinghub");

        // Creamos la colección si no existe
        const nutritionCollection = db.collection("nutricion");

        const existingData = await nutritionCollection.find().toArray();
        if (existingData.length === 0) {
            await nutritionCollection.insertMany(initialData);
            console.log("Datos iniciales insertados en la colección 'nutricion'.");
        } else {
            console.log("La colección 'nutricion' ya contiene datos.");
        }

        console.log("Base de datos inicializada correctamente.");
    } catch (error) {
        console.error("Error al inicializar la base de datos:", error);
    } finally {
        await client.close();
    }
}

initializeDatabase();
