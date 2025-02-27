# MyDiary - Mobile App

## Project Overview
MyDiary is a mobile app that allows users to create, view, and manage notes with specific dates and times. It provides a simple and secure way to store daily thoughts and reminders. The app features JWT-based authentication and supports viewing notes according to the day. The app is built using:

- **Frontend**: React Native (Expo)
- **Backend**: Node.js with Express.js
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)

## Features
- Add notes with a date and time.
- View notes specific to a particular day.
- JWT-based authentication for secure access.
- Real-time data syncing with the backend.

## Setup Instructions

### 1. Clone the Repository
#### Backend:
```bash
git clone https://github.com/sawaniThiwandika/Diary-Mobile-App-Backend.git
```
#### Frontend:
```bash
git clone https://github.com/sawaniThiwandika/My-Diary-Mobile-App.git
```

### 2. Backend Setup (Node.js with Express)
- Navigate to the backend directory:
  ```bash
  cd Diary-Mobile-App-Backend
  ```
- Install the required dependencies:
  ```bash
  npm install
  ```
- Configure your MySQL database in the `.env` file:
  ```env
  DB_HOST=localhost
  DB_USER=yourusername
  DB_PASSWORD=yourpassword
  DB_NAME=mydiarydb
  JWT_SECRET=yourjwtsecret
  ```
- Run Prisma migrations to set up the database schema:
  ```bash
  npx prisma migrate dev
  ```
- Start the backend server:
  ```bash
  npm start
  ```

### 3. Frontend Setup (React Native with Expo)
- Navigate to the frontend directory:
  ```bash
  cd My-Diary-Mobile-App
  ```
- Install the required dependencies:
  ```bash
  npm install
  ```
- Start the Expo project:
  ```bash
  expo start
  ```

### 4. Running the Application
- Once both servers are running, you can open the app on a mobile device or simulator using Expo.
- The frontend will be accessible via the Expo client, and the backend will be available at `http://localhost:5000`.
- Users can log in with their JWT token and start adding, viewing, and managing notes.

## Technologies Used
- React Native (Expo)
- Node.js
- Express.js
- MySQL
- Prisma ORM
- JWT Authentication

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
