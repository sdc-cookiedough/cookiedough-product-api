# Project Atelier System Design

## Overview
In order to sustain production-level traffic, we set out to completely overhaul Atelier's backend as a part of Hack Reactor's systems-design capstone project. We transitioned from the legacy monolithic architecture to the current microservices architecture. I was in charge of the Products microservice, which dealt with queries spanning millions of rows across multiple tables. Through extensive benchmarking, stresstesting, and horizontal scaling, I was able to scale the microservice to handle 4,500 requests per second while maintaining a 0% error rate and 150ms response time.

## Technology
The microservice consisted of an EC2 instance managing an NGINX load balancer, which spreads requests to 3 EC2 servers handling all requests. I leveraged Docker to ease our horizontal scaling by compacting our servers into Docker images. I opted to use PostgreSQL on another EC2 instance for our database solution, considering the information I inherited was structured, relational data, and the queries involved would require complex joins between multiple tables. Through the use of K6, Loader.io, and NewRelic, I was able to scale the microservice to handle 4,500 requests per second while maintaining a 0% error rate and 150ms response time.

## Stack

### Server
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)\
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)\
![NGINX](https://img.shields.io/badge/NGINX-white?style=for-the-badge)

### Database
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### Deployment
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)\
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)\

### Testing/Benchmarking
![K6](https://img.shields.io/badge/K6-white?style=for-the-badge)\
![Loader.io](https://img.shields.io/badge/Loader.io-white?style=for-the-badge)\
![NewRelic](https://img.shields.io/badge/NewRelic-green?style=for-the-badge)
