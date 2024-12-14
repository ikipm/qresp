import {Router} from 'express';
import {RenderHome} from '../controllers/page.controller.js';
import { CreateQRCode, RenderPatientInfo } from '../controllers/patient.controller.js';

const router = Router();

// Routes
router.get('/', RenderHome);
router.get('/patient/:id', RenderPatientInfo);
router.get('/create-qr/:id', CreateQRCode);

export default router;