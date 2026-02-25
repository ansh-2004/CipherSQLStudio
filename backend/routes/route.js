import express from 'express'
import { executeQuery, getAllAssignments, getAssignment } from '../controllers/controller.js'
import { validation } from "../middleware/validation.js";

const router = express.Router()

router.get('/',getAllAssignments)
router.get('/:id',getAssignment)
router.post('/execute',validation,executeQuery)


export default router;