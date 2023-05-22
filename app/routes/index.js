import express from 'express';


const router = express.Router();


router.post('/control', userController.signin);


export default router;