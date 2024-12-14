import qrcode from 'qrcode';
import {createTable, insertPacient, getAllPacients, getPacientById, updatePacient, deletePacient} from '../pacient_db.js';
import { getDiagnostic } from '../algoritme.js';

const RenderPatientInfo = async (req, res) => {
  console.log("This is the param: " + req.params.id);
    try {
        const patient = await getPacientById(req.params.id);
        if (patient) {
          const diagnostic = getDiagnostic(patient.dadesPacient);
          res.render('patient', { patient, diagnostic });
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
        const url = "http://localhost:3000/patient/" + req.param.id;
        const qrCodeImage = await qrcode.toDataURL(url);
        res.send(`<img src="${qrCodeImage}" alt="QR Code"/>`);
      } catch (err) {
        console.error('Error generating QR code:', err);
        res.status(500).send('Internal Server Error');
      }
}

export { CreateQRCode, RenderPatientInfo };
