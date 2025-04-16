import express from 'express';
import { redirectToOriginalUrl } from '../controllers/urlController.js';

const router = express.Router();

// Home page
router.get('/', (req, res) => {
  res.render('index', { title: 'URL Shortener' });
});

// Redirect to original URL
router.get('/:shortCode', redirectToOriginalUrl);

export default router;
