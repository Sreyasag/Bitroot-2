const express = require("express");
const contactsController = require('../controllers/contactsController');

const router = express.Router();

router.post('/',contactsController.upload.single('photo'), contactsController.create);
router.delete('/:id', contactsController.delete);
router.put('/:id', contactsController.update);
router.get('/all', contactsController.getAllContacts);
router.get('/search', contactsController.search);
router.get('/', contactsController.instructions);




module.exports = router;