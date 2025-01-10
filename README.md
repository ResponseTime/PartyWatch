# PartyWatch

PartyWatch is a collaborative video-watching platform that allows users to create and join virtual watch parties. With real-time synchronization of video playback, users can enjoy a shared viewing experience with friends and family, no matter where they are.

## Features

- **Create and Join Rooms**: Users can easily create a new watch party room or join an existing one using a unique room ID.
- **Real-Time Video Synchronization**: Playback is synchronized across all users in the room, ensuring everyone is watching the same content at the same time.
- **User-Friendly Interface**: The application features an intuitive design that makes it easy to navigate and interact with the platform.
- **Socket.IO Integration**: Utilizes WebSocket technology for real-time communication between users and the server.

## Tech Stack

- **Frontend**: React, Redux-toolkit, TypeScript
- **Backend**: Node.js, Express, TypeScript, Socket.IO

### Video Demo

https://github.com/user-attachments/assets/fb69714d-4ef1-45e4-8500-4a4434517608

## Getting Started

To run PartyWatch locally, follow these steps:

### Prerequisites

- Node.js 
- npm 

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/responsetime/partywatch.git
    cd partywatch
    ```

2. **Install the dependencies for both the frontend and backend:**

    - **Frontend installation:**

        ```bash
        cd frontend
        npm install
        ```

    - **Backend installation:**

        ```bash
        cd backend
        npm install
        ```

    - **Start the backend server:**

        ```bash
        cd backend
        npm run start:dev
        ```

    - **Start the frontend application:**

        ```bash
        cd frontend
        npm run dev
        ```

3. **Installation Using Docker:**

    ```bash
    docker-compose up --build
    ```

4. **Starting the app:**

    After setting up both the frontend and backend, or using Docker:

    - Open your browser and navigate to [http://localhost:5173] to access the application.

## Usage

1. Create a new room by entering a room name and video URL.
2. Share the room ID with friends to invite them to join.
3. Enjoy synchronized video playback together!


## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

