// This file is used to store the ICE server configuration. This file is used by the WebRTC client to connect to the ICE server. The ICE server is used to establish a connection between the WebRTC client and the WebRTC server. The ICE server configuration is stored in the .env file and is accessed using the Vite environment variables.
const iceServer = JSON.parse(import.meta.env.VITE_ICE_SERVER_CONFIG);

export default iceServer;
