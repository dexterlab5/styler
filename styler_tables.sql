DROP TABLE IF EXISTS termin;
DROP TABLE IF EXISTS free_appointment;
DROP TABLE IF EXISTS service;
DROP TABLE IF EXISTS artist;
DROP TABLE IF EXISTS artist_img;
DROP TABLE IF EXISTS studio_img;
DROP TABLE IF EXISTS studio;
DROP TABLE IF EXISTS studio_img;
DROP TABLE IF EXISTS user;


CREATE TABLE `user` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(60) NOT NULL, -- Bcrypt always produces a 60-char string
    `studio` BOOL DEFAULT FALSE
);


CREATE TABLE `studio` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255),
    `user_id` BIGINT NOT NULL,
    CONSTRAINT `fk_studio_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `studio_img` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `studio_id` BIGINT NOT NULL,
    `img` VARCHAR(255) NOT NULL,
    CONSTRAINT `fk_studio_img` FOREIGN KEY (`studio_id`) REFERENCES `studio`(`id`)
);

CREATE TABLE `artist` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255),
    `yearsExp` VARCHAR(50), -- Kept as string per request
    `studio_id` BIGINT NOT NULL,
    `img` VARCHAR(255) NOT NULL,
    CONSTRAINT `fk_artist_studio` FOREIGN KEY (`studio_id`) REFERENCES `studio`(`id`)
);

CREATE TABLE `service` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `time` VARCHAR(100),
    `extra` VARCHAR(255),
    `price` VARCHAR(100),
    `studio_id` BIGINT NOT NULL,
    CONSTRAINT `fk_service_studio` FOREIGN KEY (`studio_id`) REFERENCES `studio`(`id`)
);

CREATE TABLE `free_appointment` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `studio_id` BIGINT NOT NULL,
    `artist_id` BIGINT NOT NULL,
    `date` VARCHAR(255) NOT NULL,
    `hour` VARCHAR(2) NOT NULL,
    `minute` VARCHAR(2) NOT NULL,
    CONSTRAINT `fk_free_appointment_studio` FOREIGN KEY (`studio_id`) REFERENCES `studio`(`id`),
    CONSTRAINT `fk_free_appointment_artist_id` FOREIGN KEY (`artist_id`) REFERENCES `artist`(`id`)
);

CREATE TABLE `termin` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `studio_id` BIGINT NOT NULL,
    `artist_id` BIGINT NOT NULL,
    `service_id` BIGINT NOT NULL,
    `year` VARCHAR(4),
    `month` VARCHAR(2),
    `day` VARCHAR(2),
    `time` VARCHAR(10),
    `note` TEXT,
    CONSTRAINT `fk_termin_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
    CONSTRAINT `fk_termin_studio` FOREIGN KEY (`studio_id`) REFERENCES `studio`(`id`),
    CONSTRAINT `fk_termin_artist` FOREIGN KEY (`artist_id`) REFERENCES `artist`(`id`),
    CONSTRAINT `fk_termin_service` FOREIGN KEY (`service_id`) REFERENCES `service`(`id`)
);

