import express from 'express'
import SkillController from '../controllers/skill.controller';
import SkillService from '../services/skill.service';
import SkillRepository from '../repositories/skill.repository';

const router = express.Router();

const skillRepository = new SkillRepository()
const skillService = new SkillService(skillRepository)
const skillController = new SkillController(skillService)

router.route('/skill').post(skillController.createNewSkill.bind(skillController))


export default router;