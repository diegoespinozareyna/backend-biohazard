import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';  // Asegúrate de agregar ".js" a la ruta

dotenv.config();

const app = express();
// Configuración de CORS
app.use(cors({
    origin: [
        "https://inmobackend.site",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3004",
        "http://localhost:3005",
        "http://localhost:3006",
        "http://localhost:3007",
        "https://parquesdeparacas.inmobackend.site",
        "https://mirafloresdelnorte1.inmobackend.site",
        "https://mirafloresdelnorte2.inmobackend.site",
        "https://portalesdeparaiso.inmobackend.site",
        "https://vallehermosocanete.inmobackend.site",
        "https://vallehermosocanete2.inmobackend.site",
        "https://vallehermosocanete.inmunoz.com",
        "https://biohazardfiles.vercel.app",
    ], // Permite solo solicitudes desde tu frontend
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
    credentials: true // Permitir cookies o credenciales
}));
// app.use(cors());

// capturar body
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.text({ limit: '200mb' }));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 2001;
const HOST = "0.0.0.0"; // Asegura que escucha en todas las IPs

app.get("/", (req, res) => {
    res.send("Servidor biohazard funcionando correctamente 🚀");
});

app.listen(PORT, HOST, () => {
    console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
});