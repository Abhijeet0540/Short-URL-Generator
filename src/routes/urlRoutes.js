import express from 'express';
import { createShortUrl, redirectToOriginalUrl, getAllUrls, deleteUrl } from '../controllers/urlController.js';

const router = express.Router();

// Create a new short URL
router.post('/shorten', createShortUrl);

// Get all URLs for the dashboard
router.get('/dashboard', getAllUrls);

// Delete a URL
router.delete('/:id', deleteUrl);

// Alternative delete endpoint for browsers that don't support DELETE method
router.post('/delete/:id', deleteUrl);

export default router;