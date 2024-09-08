drop database if exists bandwidthSystem ;

create database if not exists bandwidthSystem ;

use bandwidthSystem ;

create table if not exists User_account(
    id  int primary key AUTO_INCREMENT,
    Email VARCHAR(100) NOT NULL ,
    name VARCHAR(100) NOT NULL ,
    contact int NOT NULL ,
    userName VARCHAR(10) NOT NULL ,
    password VARCHAR(10) NOT NULL,
    image LONGBLOB
    );
create table if not exists users(
                                    name varchar(200),
                                    email varchar(200),
                                    password varchar(200)
);
create table if not exists history(
    date_use Date NOT NULL,
    total_download int NOT NULL,
    total_upload int NOT NULL,
    total int NOT NULL
);