import express from 'express';
import { createSOS, resolveSOS, assignSOS, getActiveSOS, getSOS, getSOSHistory } from '../controllers/sosController.mjs';
import { getTrackingBySOS } from "../controllers/sosController.mjs";

const router = express.Router();

// POST /api/sos - Create a new SOS
router.post('/', createSOS);

// PUT /api/sos/:id/resolve - Resolve an SOS
router.put('/:id/resolve', resolveSOS);

// PUT /api/sos/:id/assign - Assign a responder to SOS
router.put('/:id/assign', assignSOS);

// GET /api/sos/active - Get all active SOS
router.get('/active', getActiveSOS);

// GET /api/sos/active-sos - Alias for active SOS
router.get('/active-sos', getActiveSOS);

// GET /api/sos/history - Get resolved/assigned SOS alerts
router.get('/history', getSOSHistory);

router.get("/tracking/:sosId", getTrackingBySOS);

// GET /api/sos/:id - Get SOS by ID
router.get('/:id', getSOS);

export default router;