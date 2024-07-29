drop database if exists bandwidthSystem ;

create database if not exists bandwidthSystem ;

use bandwidthSystem ;

create table if not exists User_account(
                                           Email VARCHAR(10) PRIMARY KEY,
    userName VARCHAR(10) NOT NULL ,
    password VARCHAR(10) NOT NULL,
    image LONGBLOB
    );
create table if not exists history(
    date_use Date NOT NULL,
    total_download int NOT NULL,
    total_upload int NOT NULL,
    total int NOT NULL
);