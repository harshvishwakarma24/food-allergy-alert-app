# Food Allergy Alert Application

##Overview
A mobile application that helps users detect food allergens by scanning product barcodes and providing real-time alerts based on personalized allergy profiles.

##Features
- Barcode scanning for product detection
- Real-time allergen alerts
- Personalized allergy profile
- Product ingredient analysis
- Scan history tracking

## Tech Stack
- Frontend: React Native
- Backend: Django (REST API)
- Database: SQLite
- APIs: Open Food Facts
- Tools: expo, VS Code

## How it Works
1. User registers and selects allergens
2. Scans food product barcode
3. App fetches ingredients
4. Compares with user allergies
5. Shows Safe / Unsafe alert

##Project Structure
frontend/
backend/

Setup Instructions
Backend
cd backend/config
python manage.py runserver 0.0.0.0:8000
Frontend
cd frontend
npm install
npx expo start
Important Note
This project runs on a private network
You may need to update the API base URL (IP address) in the frontend code to match your system
Example:

http://192.168.x.x:8000/api/

# Backend
cd backend
pip install -r requirements.txt
python manage.py runserver
