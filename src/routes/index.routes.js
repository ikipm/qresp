import {Router} from 'express';
import {RenderHome} from '../controllers/page.controller.js';
import { CreateQRCode, RenderPatientInfo, UpdatePacientView, saveUpdatePacient } from '../controllers/patient.controller.js';

const router = Router();

// Routes
router.get('/', RenderHome);
router.get('/patient/:id', RenderPatientInfo);
router.get('/create-qr/:id', CreateQRCode);
router.post('/patient/edit/:id', saveUpdatePacient);

export default router;