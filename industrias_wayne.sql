CREATE DATABASE IF NOT EXISTS industrias_wayne;

USE industrias_wayne;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('funcionario', 'gerente', 'admin_seguranca') NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('equipamento', 'veiculo', 'dispositivo_seguranca') NOT NULL,
    serial_number VARCHAR(255) UNIQUE,
    plate VARCHAR(255) UNIQUE,
    location VARCHAR(255),
    status ENUM('disponivel', 'em_uso', 'em_manutencao') NOT NULL,
    acquisition_date DATE NOT NULL,
    last_maintenance_date DATE
);

CREATE TABLE IF NOT EXISTS access_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    access_area VARCHAR(255),
    access_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('sucesso', 'falha'),
    ip_address VARCHAR(45),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT IGNORE INTO resources (name, type, serial_number, plate, location, status, acquisition_date) VALUES
('Bat-computador principal', 'equipamento', 'BC-001-ALPHA', NULL, 'Batcaverna', 'em_uso', '2020-01-15'),
('Batmovel MK-III', 'veiculo', NULL, 'GOTHAM-001', 'Batcaverna', 'disponivel', '2022-03-10'),
('Câmera de Vigilância T-2000', 'dispositivo_seguranca', 'CAM-T2K-005', NULL, 'Entrada Principal', 'disponivel', '2021-08-01'),
('Drone de Reconhecimento G-Series', 'equipamento', 'DRN-G-010', NULL, 'Hangar B', 'em_manutencao', '2023-05-20');