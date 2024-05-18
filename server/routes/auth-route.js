const express = require('express');
const router = express.Router();
const authcontrollers= require('../controllers/auth-controllers')
// const {resgiter} = require('../controllers/auth-controllers')
const {signUpSchema,loginSchema} = require('../validators/auth-validators');

const validate = require('../middlewares/validator-middleware')
const authMiddleware = require('../middlewares/auth-middleware');


router.route('/').get(authcontrollers.home);
router.route('/register').post(validate(signUpSchema), authcontrollers.register);
router.route('/login').post(validate(loginSchema),authcontrollers.login);
router.route('/user').get(authMiddleware,authcontrollers.user);



// router.get('/',(req,res)=>{
//     res.status(200).send('Hello Daniyal Router');
// });
// router.route('/').get((req,res)=>{
//     res.send("MERN Rounter is Activated Now")
// })

module.exports = router ;