const express=require('express')
const router = express.Router()

const {
    getAllMedicines,
    createMedicine,
    getMedicine,
    updateMedicine,
    deleteMedicine,
} =require('../controllers/medicines')

router.route('/').get(getAllMedicines).post(createMedicine)
router.route('/:id').get(getMedicine).patch(updateMedicine).delete(deleteMedicine)

module.exports=router