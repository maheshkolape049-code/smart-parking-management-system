CREATE DATABASE IF NOT EXISTS smartparking;
USE smartparking;

CREATE TABLE IF NOT EXISTS slots(
  id INT AUTO_INCREMENT PRIMARY KEY,
  slot_number INT UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'available'
);

CREATE TABLE IF NOT EXISTS bookings(
  id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_number VARCHAR(30),
  owner_name VARCHAR(100),
  slot_number INT,
  booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO slots(slot_number,status) VALUES
(1,'available'),(2,'available'),(3,'available'),
(4,'available'),(5,'available'),(6,'available');
