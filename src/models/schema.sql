-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS url_shortener_db;

-- Use the database
USE url_shortener_db;

-- Create the URLs table
CREATE TABLE IF NOT EXISTS urls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  original_url VARCHAR(2048) NOT NULL,
  short_code VARCHAR(10) NOT NULL UNIQUE,
  clicks INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT DEFAULT NULL
);

-- Create the users table (for optional login feature)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX idx_short_code ON urls(short_code);
CREATE INDEX idx_user_id ON urls(user_id);
