import express from 'express';
import { saveUser } from '../controllers/user.controller.js';
import { requireAuth } from "@clerk/express";

const router = express.Router();
router.post("/save-user", requireAuth(), saveUser);
export default router;
