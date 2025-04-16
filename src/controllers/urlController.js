import Url from '../models/Url.js';

// Create a new short URL
export const createShortUrl = async (req, res) => {
    try {
        const { originalUrl, customCode } = req.body;

        // Validate URL
        if (!originalUrl) {
            return res.status(400).render('index', {
                error: 'Please provide a URL to shorten',
                originalUrl: originalUrl || ''
            });
        }

        // Validate URL format
        try {
            new URL(originalUrl);
        } catch (err) {
            return res.status(400).render('index', {
                error: 'Please provide a valid URL',
                originalUrl: originalUrl || ''
            });
        }

        // Create short URL
        const url = await Url.create(originalUrl, customCode);

        // Generate the full short URL
        const shortUrl = `${req.protocol}://${req.get('host')}/${url.shortCode}`;

        // Render the page with the result
        return res.render('index', {
            success: 'Short URL created successfully!',
            originalUrl,
            shortUrl,
            shortCode: url.shortCode
        });
    } catch (error) {
        console.error('Error creating short URL:', error);

        // Handle custom code already in use
        if (error.message === 'Custom code already in use') {
            return res.status(400).render('index', {
                error: 'Custom code already in use. Please try another one.',
                originalUrl: req.body.originalUrl || ''
            });
        }

        return res.status(500).render('index', {
            error: 'An error occurred while creating the short URL',
            originalUrl: req.body.originalUrl || ''
        });
    }
};

// Redirect to the original URL
export const redirectToOriginalUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        // Find the URL in the database
        const url = await Url.findByShortCode(shortCode);

        if (!url) {
            return res.status(404).render('404', { message: 'Short URL not found' });
        }

        // Increment the click count
        await Url.incrementClicks(shortCode);

        // Redirect to the original URL
        return res.redirect(url.original_url);
    } catch (error) {
        console.error('Error redirecting to original URL:', error);
        return res.status(500).render('error', {
            message: 'An error occurred while redirecting to the original URL'
        });
    }
};

// Get all URLs for the dashboard
export const getAllUrls = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = await Url.getAll(page, limit);

        return res.render('dashboard', {
            urls: result.urls,
            totalUrls: result.totalUrls,
            totalPages: result.totalPages,
            currentPage: result.currentPage
        });
    } catch (error) {
        console.error('Error getting all URLs:', error);
        return res.status(500).render('error', {
            message: 'An error occurred while getting all URLs'
        });
    }
};

// Delete a URL
export const deleteUrl = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Deleting URL with ID:', id, 'Method:', req.method);

        // Ensure id is a valid number
        const urlId = parseInt(id, 10);
        if (isNaN(urlId)) {
            console.error('Invalid URL ID:', id);
            return res.status(400).json({ success: false, message: 'Invalid URL ID' });
        }

        // Check if the URL exists before deleting
        const url = await Url.findById(urlId);
        if (!url) {
            console.error('URL not found with ID:', urlId);
            return res.status(404).json({ success: false, message: 'URL not found' });
        }

        // Delete the URL
        const deleted = await Url.delete(urlId);
        console.log('Delete result:', deleted);

        if (!deleted) {
            return res.status(500).json({ success: false, message: 'Failed to delete URL' });
        }

        // If it's a POST request from a form, redirect to dashboard
        if (req.method === 'POST' && req.headers['content-type'] !== 'application/json') {
            return res.redirect('/api/urls/dashboard');
        }

        // Otherwise return JSON response
        return res.json({ success: true, message: 'URL deleted successfully' });
    } catch (error) {
        console.error('Error deleting URL:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the URL'
        });
    }
};