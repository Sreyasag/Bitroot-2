const express = require("express");
const contactsController = require('../controllers/contactsController');

const router = express.Router();

router.post('/',contactsController.upload.single('photo'), contactsController.create);
router.delete('/:id', contactsController.delete);
router.put('/:id', contactsController.update);
router.get('/', contactsController.getAllContacts);
router.get('/search', contactsController.search);



module.exports = router;