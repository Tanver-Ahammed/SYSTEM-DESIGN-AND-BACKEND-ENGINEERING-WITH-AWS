#!/bin/bash

# Function to handle errors
handle_error() {
  echo "Error on line $1"
  exit 1
}

trap 'handle_error $LINENO' ERR

# Update package list and install Node.js and npm
echo "Updating package list and installing Node.js and npm..."
sudo apt update
sudo apt install -y nodejs npm

# Install pm2 globally
echo "Installing pm2 globally..."
sudo npm install -g pm2

# Create a directory for the Node.js application
echo "Creating application directory..."
mkdir -p ~/node-app
cd ~/node-app

# Create the application file app.js
echo "Creating app.js..."
cat <<'EOF' > app.js
const express = require("express");
const os = require("os");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log(
    `[${new Date().toISOString()}] Received request from ${os.hostname()} From ${
      req.ip
    }`
  );
  res.send(
    `[${new Date().toISOString()}] Received request from ${os.hostname()} From ${
      req.ip
    }`
  );
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
EOF

# Create the package.json file
echo "Creating package.json..."
cat <<'EOF' > package.json
{
  "name": "node-app",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  }
}
EOF

# Install project dependencies
echo "Installing project dependencies..."
npm install

# Start the application with pm2
echo "Starting application with pm2..."
pm2 start app.js --name node-app

# Setup pm2 to run on startup
echo "Setting up pm2 to run on startup..."
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp /home/$USER
pm2 save

# Get the public IP address of the server and display the running URL
echo "Fetching public IP address..."
PUBLIC_IP=$(curl -s http://checkip.amazonaws.com)
echo "Node app is running on http://$PUBLIC_IP:3000"
