import {Router} from 'express';
import {RenderHome} from '../controllers/page.controller.js';
import { CreateQRCode } from '../controllers/patient.controller.js';

const router = Router();

// Routes
router.get('/', RenderHome);
router.get('/create-qr', CreateQRCode);

export default router;