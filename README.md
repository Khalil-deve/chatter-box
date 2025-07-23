# Real-Time Chat App

This is a full-stack real-time chat application built with **Next.js** (frontend), **Express.js** (backend), and **Socket.IO** for real-time messaging. It supports sending text and image messages in personal and group chats.

---

## Features

-  Authentication (Register/Login)
-  Real-time messaging using WebSockets (Socket.IO)
-  Join and create group chats
-  Send text and image messages
-  Error and 404 pages
-  Clean and modular code structure (frontend & backend)

---

##  Tech Stack

### Frontend (Next.js 14 with App Router)
- React + Next.js
- Tailwind CSS
- Axios
- Socket.IO-client

### Backend (Express.js + MongoDB)
- Express.js
- MongoDB + Mongoose
- Socket.IO
- bcrypt + JWT
- dotenv

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/khalil-deve/chatter-box.git
cd chat-app
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Start backend:

```bash
npm start
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Start frontend:

```bash
npm run dev
```

App will run at: [http://localhost:3000](http://localhost:3000)

---

## 🔌 WebSocket Integration (Socket.IO)

* Users join rooms via `join-user` and `join-chat` events.
* Messages are emitted through `send-message`.
* Received using `receive-message` and `new-message-notification`.

Socket logic is modularized in `backend/sockets/socket.js`.

---

## Screenshots

### Group Chat
![Group Chat](/fronted/public/group-chat.png)
---


## Contributions

Pull requests and feedback are welcome!
Feel free to open issues or fork this repo to improve the app.



