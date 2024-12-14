import {Router} from 'express';
import {RenderHome} from '../controllers/page.controller.js';
const router = Router();
router.get('/', RenderHome);

export default router;