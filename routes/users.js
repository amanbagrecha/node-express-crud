import express from 'express';

import { CreateUser, UpdateUser, DeleteUser, GetUser, GetUserId } from '../controllers/functions.js';

// Use the express.Router class to create modular, mountable route handlers
const router = express.Router();

router.get('/', GetUser)

// The push() method adds new items to the end of an array, and returns the new length.
router.post('/', CreateUser)

router.get('/:id', GetUserId)

router.delete('/:id', DeleteUser)

router.patch('/:id', UpdateUser)


export default router;
// module.exports = router