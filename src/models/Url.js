import db from '../config/db.js';
import { nanoid } from 'nanoid';

class Url {
  // Create a new short URL
  static async create(originalUrl, customCode = null) {
    try {
      // Generate a short code if not provided
      const shortCode = customCode || nanoid(6);

      // Check if custom code already exists
      if (customCode) {
        const [existingUrl] = await db.query(
          'SELECT * FROM urls WHERE short_code = ?',
          [customCode]
        );

        if (existingUrl.length > 0) {
          throw new Error('Custom code already in use');
        }
      }

      // Insert the URL into the database
      const [result] = await db.query(
        'INSERT INTO urls (original_url, short_code) VALUES (?, ?)',
        [originalUrl, shortCode]
      );

      return { id: result.insertId, originalUrl, shortCode };
    } catch (error) {
      throw error;
    }
  }

  // Find a URL by its short code
  static async findByShortCode(shortCode) {
    try {
      const [urls] = await db.query(
        'SELECT * FROM urls WHERE short_code = ?',
        [shortCode]
      );

      return urls.length ? urls[0] : null;
    } catch (error) {
      throw error;
    }
  }

  // Increment the click count for a URL
  static async incrementClicks(shortCode) {
    try {
      await db.query(
        'UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?',
        [shortCode]
      );
    } catch (error) {
      throw error;
    }
  }

  // Get all URLs (with optional pagination)
  static async getAll(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;

      const [urls] = await db.query(
        'SELECT * FROM urls ORDER BY created_at DESC LIMIT ? OFFSET ?',
        [limit, offset]
      );

      const [countResult] = await db.query('SELECT COUNT(*) as total FROM urls');
      const totalUrls = countResult[0].total;

      return {
        urls,
        totalUrls,
        totalPages: Math.ceil(totalUrls / limit),
        currentPage: page
      };
    } catch (error) {
      throw error;
    }
  }

  // Find a URL by its ID
  static async findById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM urls WHERE id = ?', [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }

  // Delete a URL by its ID
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM urls WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

export default Url;
