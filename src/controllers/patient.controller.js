import qrcode from 'qrcode';
import {createTable, insertPacient, getAllPacients, getPacientById, updatePacient, deletePacient} from '../pacient_db.js';

const RenderPatientInfo = async (req, res) => {
  console.log("This is the param: " + req.params.id);
    try {
        const patient = await getPacientById(req.params.id);
        if (patient) {
          res.render('patient', { patient });
        }	else {
          res.status(404).send('Patient not found');
        }
      } catch (err) {
        console.error('Error getting pacients:', err);
        res.status(500).send('Server internal error');
      }
}

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

export { CreateQRCode, RenderPatientInfo };
