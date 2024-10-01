const express = require('express');
const { dashboard, createTask, deleteTodo } = require('../controllers/todo');

const router = express.Router();


router.get('/dashboard', dashboard);

router.post('/create-todo', createTask); 

router.delete('/delete-todo/:id', deleteTodo);


module.exports = router; 