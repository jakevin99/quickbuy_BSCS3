
-- Select the database

USE quickbuy_db;

-- Create the users table with admin role
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL, 
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer', 'seller', 'admin') NOT NULL,
    shop_name VARCHAR(100) DEFAULT NULL, -- Only applicable to sellers
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: SHow Confirmation Message
SELECT 'Users Table created successfully' AS message; 
