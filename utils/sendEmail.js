import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'
import moment from 'moment-timezone';

export default async function serndEmail(base64Content, documentoCliente, emailCliente, nombresCliente, typeFileVoucher, codLote, proyecto, payType, fileType, amount, nOperacion, fechaOperacion, usuario, correoUsuario) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USUARIO_PROD,
            pass: process.env.GMAIL_16DIGITOS_PROD,
        }
    });

    const mailOptions = {
        from: process.env.GMAIL_USUARIO_PROD,
        to: ["diegoespinozareyna@gmail.com", "supervisorbiohazard@gmail.com"],
        // cc: correoCliente,
        subject: `${nombresCliente} - ${moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss')}`, // Asunto del correo
        text: `Documento generado ${moment().tz('America/Lima').format('YYYY-MM-DD HH:mm:ss')}`,
        attachments: [
            {
                filename: `${nombresCliente}.${typeFileVoucher}`, // Nombre del archivo adjunto
                content: base64Content, // Usamos solo la cadena Base64 pura
                encoding: "base64", // Asegúrate de usar la codificación base64
            },
        ]
    }
    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);
    console.log("entre correo directo final", info.response)

    return info
}
