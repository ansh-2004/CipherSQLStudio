import express from 'express'
import { executeQuery, getAllAssignments, getAssignment, getHint } from '../controllers/controller.js'
import { validation } from "../middleware/validation.js";
import { protect } from '../middleware/auth.js';
import {login,signup} from '../controllers/user.js'
const router = express.Router()


router.post('/login',login)
router.post('/signup',signup)


router.get('/',getAllAssignments)
router.get('/:id',getAssignment)
router.post('/execute',protect,validation,executeQuery)
router.post('/gethint',getHint)
export default router;