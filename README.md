# Smart Parking Management System - Easy Version

## Features
- 6 parking slots
- Available / Booked status
- Simple booking form
- MySQL database
- Docker and Docker Compose
- AWS EC2 deployment
- Jenkinsfile included for CI/CD

## Run locally
```bash
docker compose up -d --build
```

Open:
http://localhost:3000

## Run on AWS EC2
```bash
sudo apt update
sudo apt install docker.io docker-compose-v2 git -y
git clone YOUR_GITHUB_URL
cd smart-parking-easy
sudo docker compose up -d --build
```

Open:
http://YOUR_EC2_PUBLIC_IP:3000

## Project flow
GitHub -> Docker -> AWS EC2 -> Smart Parking

Jenkins is included as an optional next step.
