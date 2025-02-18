create database movie_booking;
use movie_booking;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    genre VARCHAR(100),
    duration INT,  -- Duration in minutes
    release_date DATE,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE theaters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    total_seats INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE showtimes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT,
    theater_id INT,
    show_date DATE NOT NULL,
    show_time TIME NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
    FOREIGN KEY (theater_id) REFERENCES theaters(id) ON DELETE CASCADE
);

CREATE TABLE seats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    showtime_id INT,
    seat_number VARCHAR(10) NOT NULL,
    status ENUM('available', 'booked') DEFAULT 'available',
    FOREIGN KEY (showtime_id) REFERENCES showtimes(id) ON DELETE CASCADE
);
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    showtime_id INT,
    seat_id INT,
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (showtime_id) REFERENCES showtimes(id) ON DELETE CASCADE,
    FOREIGN KEY (seat_id) REFERENCES seats(id) ON DELETE CASCADE
);

CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT,
    amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('card', 'paypal', 'upi'),
    status ENUM('successful', 'failed') DEFAULT 'successful',
    transaction_id VARCHAR(255) UNIQUE,
    payment_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);
use movie_booking;
INSERT INTO showtimes (movie_id, start_time, end_time, screen_id) 
VALUES (2, '2025-02-10 14:00:00', '2025-02-10 16:00:00', 2);
SELECT * FROM theaters;
INSERT INTO theaters (name, location, total_seats) 
VALUES ('IMAX pok', 'pok, Nepal', 245);

select * from movies;
INSERT INTO showtimes (movie_id, theater_id, show_date, show_time, price)
VALUES (2, 2, '2025-02-10', '14:00:00', 1500.00);
select * from seats;
SELECT * FROM showtimes;
INSERT INTO seats (showtime_id, seat_number, status)
VALUES (1, 'A1', 'available'),
       (1, 'A2', 'available'),
       (1, 'A3', 'available');
       
       SELECT @@global.time_zone, @@session.time_zone;
       SET GLOBAL time_zone = '+05:45'; -- Nepal Time (NPT)
SET SESSION time_zone = '+05:45';
