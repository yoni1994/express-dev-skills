import { Router } from 'express'
import * as skillsCtrl from '../controllers/skills.js'

const router = Router()

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource')
// })

router.get('/', skillsCtrl.index)
router.get('/new', skillsCtrl.new)
router.get('/:id', skillsCtrl.show)
router.post('/', skillsCtrl.create)
router.delete('/:id', skillsCtrl.delete)

export {
  router
}
