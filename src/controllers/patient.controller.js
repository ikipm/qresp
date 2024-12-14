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

const UpdatePacientView = async (req, res) => {
  try {
    const patient = await getPacientById(req.params.id);
    if (patient) {
      res.render('updatePatient', { patient });
    } else {
      res.status(404).send('Patient not found');
    }
  } catch (err) {
    console.error('Error getting pacients:', err);
    res.status(500).send('Server internal error');
  }
}

const saveUpdatePacient = async (req, res) => {
  try {
    const updatedPacient = {
      id: parseInt(req.params.id),
      name: req.body.name,
      cognom1: req.body.cognom1,
      cognom2: req.body.cognom2,
      edat: parseInt(req.body.Edat),
      dadesPacient: {
        PresenciaDeFebre: req.body.PresenciaDeFebre? 1: 0,
        Ofeg: req.body.Ofeg? 1: 0,
        IncrementMucositatICongestioNasalDolorDeGola: req.body.IncrementMucositatICongestioNasalDolorDeGola ? 1: 0,
        IncrementMucositatIFebre: req.body.IncrementMucositatIFebre? 1: 0,
        DolorToracic: req.body.DolorToracic? 1: 0,
        Xiulets: req.body.Xiulets? 1: 0,
        SignesAlarmaPresents: {
            FebreAltaODesaturacio: req.body.SignesAlarma_FebreAltaODesaturacio? 1: 0,
            IncrementDeRespiracions: req.body.SignesAlarma_IncrementDeRespiracions? 1: 0,
            OfegEnReposOCianosi: req.body.SignesAlarma_OfegEnReposOCianosi? 1: 0,
        },
        malaltiesPrevis: req.body.MalaltiesPrevis? 1: 0,
        altresCroniques: req.body.AltresCroniques? 1: 0,
        medicacioHabit: {
            antifibrotics: req.body.MedicacioHabit_Antifibrotics? 1: 0,
            immunosupressors: req.body.MedicacioHabit_Immunosupressors? 1: 0,
            oxigenoterapia: req.body.MedicacioHabit_Oxigenoterapia? 1: 0,
        },
        habitsToxics: {
            consumTabac: req.body.HabitsToxics_ConsumTabac? 1: 0,
            exposicioFum: req.body.HabitsToxics_ExposicioFum? 1: 0,
        },
        DLCO: parseFloat(req.body.DLCO),
        FVC: parseFloat(req.body.FVC),
        desaturacioPM6M: parseFloat(req.body.DesaturacioPM6M),
        hipertensioPulmonar: req.body.HipertensioPulmonar? 1: 0,
        enfisema: req.body.Enfisema? 1: 0,
        refluxGastroesofagic: req.body.RefluxGastroesofagic? 1: 0,
        apneaSon: req.body.ApneaSon? 1: 0,
        carcinomaBroncogenic: req.body.CarcinomaBroncogenic? 1: 0,
      },
    }
    await updatePacient(updatedPacient);
    res.redirect('/patient/' + req.params.id);
  } catch (err) {
    console.error('Error updating pacient:', err);
    res.status(500).send('Internal Server Error');
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

export { CreateQRCode, RenderPatientInfo, UpdatePacientView, saveUpdatePacient };
