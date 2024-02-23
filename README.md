# PeerMeet

PeerMeet is a peer-to-peer video conferencing React application inspired by Omegle. It allows users to engage in video calls with strangers in a seamless and user-friendly interface.

## Features

- **Peer-to-Peer Video Calls:** Utilizing WebRTC technology, PeerMeet enables direct video calls between users without the need for a central server.
- **Random Matching:** Similar to Omegle, users are randomly matched with each other for spontaneous video conversations.
- **React-based Interface:** Built using React.js, PeerMeet offers a modern and responsive user interface for an optimal user experience.
- **Metered Turn Servers:** PeerMeet leverages Metered.ca, a third-party service, for TURN servers to facilitate peer-to-peer connections, ensuring reliable and secure communication.

## Getting Started

To run PeerMeet locally, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies by running
   
   ```
   npm install
   ```

  
4. Start the development server with

    ```
     npm run dev
     ```
    
6. Navigate to backend folder and Install the dependices
7. The server will start at port 3000
8. Open your browser and navigate to `http://localhost:5173`.

## Usage

1. Upon opening the application, users are prompted to allow access to their camera and microphone.
2. Once access is granted, users are matched with a random peer and can initiate a video call.
3. During the call, users can interact with each other via video and audio.
4. To end the call, users can simply close the browser tab or click on the end call button.

## Configuration

If you wish to use your own TURN server or another service for handling peer connections, you can configure it in the application settings.

## Dependencies

- React.js
- WebRTC
- Metered.ca (for TURN servers)
- Plannig to impelement own TURN server in AWS

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to help improve PeerMeet.

