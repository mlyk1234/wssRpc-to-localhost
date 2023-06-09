const WebSocket = require('ws');

// Connect to the Alchemy WebSocket endpoint
const alchemyEndpoint = new WebSocket('YOUR_WSS_PRC_PROVIDER_URL');

// When the Alchemy socket is open, create a local WebSocket server
alchemyEndpoint.on('open', () => {
  const server = new WebSocket.Server({ port: 8080 });

  // When a client connects to the local server
  server.on('connection', (localSocket) => {
    // When the local socket receives data, forward it to the Alchemy socket
    localSocket.on('message', (data) => {
      if (alchemyEndpoint.readyState === WebSocket.OPEN) {
        alchemyEndpoint.send(data);
      } else {
        console.error('Alchemy WebSocket is not open yet.');
      }
    });

    // When the Alchemy socket receives data, forward it to the local socket
    alchemyEndpoint.on('message', (data) => {
      localSocket.send(data);
    });
  });
});
