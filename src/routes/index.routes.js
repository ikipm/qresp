import {Router} from 'express';
import {RenderHome} from '../controllers/page.controller.js';
import { CreateQRCode, RenderPatientInfo, UpdatePacientView, saveUpdatePacient, AddPatientView, AddPatient, showTestPatientForm, processProvesPacient } from '../controllers/patient.controller.js';
import { renderChatBot, sendPrompt } from '../controllers/chatBot.controller.js';

const router = Router();

// Routes
router.get('/', RenderHome);
router.get('/chat/:id', renderChatBot);
router.post('/chat/:id', sendPrompt);
router.get('/patient/add/', AddPatientView);
router.get('/patient/:id', RenderPatientInfo);
router.get('/create-qr/:id', CreateQRCode);
router.get('/patient/edit/:id', UpdatePacientView);
router.post('/patient/edit/:id', saveUpdatePacient);
router.post('/patient/add/', AddPatient);
router.get('/patient/test/:id', showTestPatientForm);
router.post('/patient/test/:id', processProvesPacient);

export default router;