
# Nexora Learning Platform

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone this repository
2. Install dependencies:
```
npm install
```

### Running the application

To run the application locally, you have two options:

#### Option 1: Development Mode (with hot reloading)
```
npm run dev
```
This will start the Vite development server with hot reloading at http://localhost:8080

#### Option 2: Production Mode
```
npm run build
node start-server.js
```
This will build the application and start the Express server at http://localhost:3000

### Backend API

The application includes a simple Express backend with the following endpoints:

- POST `/api/contact` - Endpoint for contact form submissions
  - The data is logged to the console and saved to a `contact-submissions.json` file

## Project Structure

- `/src` - Frontend React application
- `/public` - Static assets
- `server.js` - Express backend server
- `start-server.js` - Helper script to run the application in production mode


## Live link: https://www.nexora-as.com/
