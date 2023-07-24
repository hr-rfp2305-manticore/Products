# Product Overview: System Design for The Mercury Store's Component

## The Manticore Project
 The Product Overview repo is a back-end system design for the The Mercury Store's front-end component running on JavaScript and PostgreSQL.

The repo ensures a clean and smooth ETL process allowing users to make 6 API requests to a postgreSQL database in under 50ms.

# Getting Started
## Checking Prerequisites
Ensure you have the following to run the repo:
* [Install node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* Access and downloaded the required CSV files to import to Database.

_**Note**: To obtain the CSV files, you need to be enrolled in the Hack Reactor Program._
* Installed PostgreSQL via Home Brew or PGAdmin

_**Note**: This project was created with PostgreSQL version 14.8 and may differ from your version._


## Installing Manticore's Product Repo
Once you completed the prequestite requirements, follow these steps to run the repo:
1. Fork and clone the repo.
2. Run **npm install** to install dependencies within the **_Products_** directory in your terminal.
3. Create a **.env** file to with the following format and export

          PGUSER = 'YOUR POSTGRESQL USERNAME'
          PGHOST = IP Address
          PGDATABASE = 'DATABASE NAME'
          PGPASSWORD = 'PASSWORD'
          PGPORT = 5432
4. Create a DATABASE via terminal by entering:

        1. psql -U postgres
        2. postgres-# CREATE DATABASE product;

5. CREATE TABLES via terminal by entering:

        psql -U <your_username> -d product -f schema.sql

