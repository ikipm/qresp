import qrcode from 'qrcode';
import { Patient } from '../models/patient.model.js';
import {createTable, insertPacient, getAllPacients, getPacientById, updatePacient, deletePaciente} from '../pacient_db.js';

const CreateQRCode = async (req, res) =>{
    try {
        const url = "http://localhost:3000/patient/1"; // Here we should use the patient ID
        const qrCodeImage = await qrcode.toDataURL(url);
        res.send(`<img src="${qrCodeImage}" alt="QR Code"/>`);
      } catch (err) {
        console.error('Error generating QR code:', err);
        res.status(500).send('Internal Server Error');
      }
}

export { CreateQRCode };
