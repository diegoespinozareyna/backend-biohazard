import { Router } from 'express';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import sendEmail from '../utils/sendEmail.js';

const app = express();

dotenv.config();

// console.log("prd?", process.env.NODE_ENV)
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
        "http://localhost:5173",
    ], // Permite solo solicitudes desde tu frontend
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
    credentials: true // Permitir cookies o credenciales
}));
// app.use(cors());

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(express.text({ limit: '200mb' }));

const router = Router();

router.post('/postCorreoVoucherPdf', async (req, res) => {

    try {

        const body = await req.body;

        const {
            voucherBase64,
            nombresCliente,
        } = body;

        console.log("body de postCorreo: ", nombresCliente)


        const base64Content = (voucherBase64.split(",")[1] !== undefined && voucherBase64.split(",")[1] !== null) ? voucherBase64.split(",")[1] : voucherBase64; // Obtiene la parte base64 pura

        const typeFileVoucher = "pdf"; // Tipo de archivo

        const info = await sendEmail(base64Content, "", "", nombresCliente, typeFileVoucher, "", "", "", "", "", "", "", "", "");

        console.log(info)

        res.status(201).json({
            message: 'Enviado Correctamente.',
            data: "okay", // Datos del usuario decodificados del token
            status: 201,
        });
    } catch (error) {
        console.log("error");
        return res.status(500).json({ message: error });
    }
});

export default router;