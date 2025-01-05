# Seat Management Website (MERN Stack)

## Overview

The **Seat Management Website** is a real-time seat booking system built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and **Socket.io**. This application allows users to view, select, and manage seat reservations dynamically. It is designed for users who want to book seats for events, movies, or any other purpose that requires seat reservations.

The system supports **user authentication**, **real-time seat availability updates**, and a clean, user-friendly interface with **color-coded seat selections**.

## Key Features

- **User Authentication**: Users can register, log in, and authenticate using **JWT tokens**. Secure user authentication ensures only registered users can book seats.
- **Seat Selection**: A total of 80 seats are available, and each seat's status is color-coded:
  - **Green**: Available for booking.
  - **Blue**: Temporarily reserved by the current user (pending payment).
  - **Yellow**: Booked by another user (awaiting payment).
- **Real-Time Updates**: Seat availability is updated instantly across all users via **Socket.io**. If a user selects a seat, it is reflected in real-time for all other users.
- **My Tickets**: Authenticated users can view their booking details, including the event or movie name and the seats they have reserved.
- **Responsive Design**: The website is designed to be fully responsive, offering a great experience on both desktop and mobile devices.

## Technology Stack

- **Frontend**:
  - React.js
  - MUI (Material UI) for UI components and styling
- **Backend**:
  - Node.js
  - Express.js
- **Database**:
  - MongoDB (for storing user data and seat reservations)
- **Real-Time Communication**:
  - Socket.io (for real-time seat availability updates)
- **Authentication**:
  - JWT (JSON Web Tokens) for secure user authentication

## Demo

You can try the live demo of the Seat Management website here:

[Live Demo](https://seat-management.netlify.app/)

## Features Breakdown

### 1. **User Authentication**:

- Users can sign up with their email and password.
- Authentication is handled using JWT tokens for secure login/logout functionality.
- Once logged in, users can book seats and view their tickets.

### 2. **Seat Booking**:

- Users can view available seats in real-time.
- Seats are color-coded to indicate their status:
  - **Green**: Available for booking.
  - **Blue**: Temporarily reserved by the current user.
  - **Yellow**: Booked by another user.
- Seat availability is updated instantly via **Socket.io**, ensuring that all users see the same information at the same time.

### 3. **My Tickets**:

- After booking, users can navigate to "My Tickets" to view their seat reservations for upcoming events or movies.

### 4. **Real-Time Updates with Socket.io**:

- Using Socket.io, the seat availability is synced in real-time across all users. When one user selects or reserves a seat, the other users see the changes instantly.

### 5. **Responsive UI**:

- The app is built to work on both desktop and mobile devices, providing a smooth and interactive experience across all screen sizes.

## How to Run Locally

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/seat-management.git
   cd seat-management
   ```

2. **Install the dependencies for both frontend and backend**:

   - For **Frontend**:

     ```bash
     cd client
     npm install
     ```

   - For **Backend**:

     ```bash
     cd server
     npm install
     ```

3. **Start the Backend server**:

   ```bash
   cd server
   npm start
   ```

4. **Start the Frontend server**:

   ```bash
   cd client
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Installation Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/seat-management.git
   ```

2. **Install the necessary dependencies**:

   ```bash
   cd seat-management
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm start
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:3000` to view the application in your local environment.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Feel free to fork, modify, or contribute to the project! Enjoy managing your seat bookings! 🎟️
