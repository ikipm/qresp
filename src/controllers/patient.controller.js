import qrcode from 'qrcode';
import {createTable, insertPacient, getAllPacients, getPacientById, updatePacient, deletePacient} from '../pacient_db.js';
import { getDiagnostic } from '../algoritme.js';
import { Pacient, ProvesPacient } from '../pacient.js';
import { tractament } from '../tractament.js';

const RenderPatientInfo = async (req, res) => {
    try {
        const patient = await getPacientById(req.params.id);
        if (patient) {
          const diagnostic = getDiagnostic(patient);
          const url = `http://localhost:3000/patient/${patient.id}`;
          const qrCodeImage = await qrcode.toDataURL(url);
          res.render('patient', { patient, qrCodeImage, diagnostic });
        }	else {
          res.status(404).send('Patient not found');
        }
      } catch (err) {
        console.error('Error getting pacients:', err);
        res.status(500).send('Server internal error');
      }
}

const AddPatientView = async (req, res) => {
  res.render('addPatient');
}

const AddPatient = async (req, res) => {
  try {
    const patient = new Pacient(null, req.body.name, req.body.cognom1, req.body.cognom2, req.body.malaltia, parseInt(req.body.edat), parseInt(req.body.estatActual), req.body.metge, req.body.centreSanitari); 
    const patientID = await insertPacient(patient);
    res.redirect('/patient/' + patientID);
  } catch (err) {
    console.error('Error adding pacient:', err);
    res.status(500).send('Internal Server Error');
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
      edat: parseInt(req.body.edat),
      enfermetat: req.body.malaltia,
      estatActual: parseInt(req.body.estatActual),
      metge: req.body.metge,
      centreSanitari: req.body.centreSanitari,
      dadesPacient: {
        PresenciaDeFebre: req.body.PresenciaDeFebre? 1: 0,
        ofeg: req.body.Ofeg? 1: 0,
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
        const url = "http://localhost:3000/patient/" + req.params.id;
        const qrCodeImage = await qrcode.toDataURL(url);
        res.send(`<img src="${qrCodeImage}" alt="QR Code"/>`);
      } catch (err) {
        console.error('Error generating QR code:', err);
        res.status(500).send('Internal Server Error');
      }
}

const showTestPatientForm = async (req, res) => {
  try {
    var patient = getPacientById(req.params.id);
    res.render('testPatient', {patient});
  } catch (err) {
    console.error('Error mostrant el formulari de proves:', err);
    res.status(500).send('Error intern del servidor');
  }
};

const processProvesPacient = async (req, res) => {
  try {
    var pacientProves = new ProvesPacient();

    // Assignar els valors del formulari
    pacientProves.urgencia = req.body.urgencia;
    pacientProves.provesAnalitiquesUrgents.rxTorax = req.body.rxTorax;
    pacientProves.provesAnalitiquesUrgents.suspitapneu = req.body.suspitapneu;
    pacientProves.dxConcret = req.body.dxConcret;
    pacientProves.sospitaTEP = req.body.sospitaTEP;
    pacientProves.tepConfirmat = req.body.tepConfirmat;
    pacientProves.immunocompetent = req.body.immunocompetent;
    pacientProves.immunosupressors = req.body.immunosupressors;
    pacientProves.pcrPositivaInfluenza = req.body.pcrPositivaInfluenza;
    pacientProves.sospitaCMV = req.body.sospitaCMV;
    pacientProves.sospitaPneumocystis = req.body.sospitaPneumocystis;
    pacientProves.necessitaOxigenoterapia = req.body.necessitaOxigenoterapia;
    pacientProves.inhibidorBombaProtons = req.body.inhibidorBombaProtons;
    pacientProves.nAcetilcisteina = req.body.nAcetilcisteina;
    pacientProves.nebulitzacions = req.body.nebulitzacions;
    pacientProves.hbpmNecessari = req.body.hbpmNecessari;
    pacientProves.metilprednisolona = req.body.metilprednisolona;
    pacientProves.losartanNecessari = req.body.losartanNecessari;

    // Cridar la funció de tractament
    const resultatTractament = tractament(pacientProves);
    console.log(resultatTractament);
    // Renderitzar una pàgina amb el resultat
    res.render('resultatTractament', { resultat: resultatTractament });
  } catch (err) {
    console.error('Error processant les proves del pacient:', err);
    res.status(500).send('Error intern del servidor');
  }
};

export { CreateQRCode, RenderPatientInfo, UpdatePacientView, saveUpdatePacient, AddPatientView, AddPatient, processProvesPacient, showTestPatientForm};
