

Video Link : https://youtu.be/sXXPi3zZc-A

Website: Link: https://edu-app-final-1.onrender.com/dashboard
# PennyPals: Financial Learning Adventure

An interactive educational web app that teaches kids money skills through playful lessons, quizzes, a simulator game, and pet-care rewards.

## Highlights

- Grade-based learning flow with unit progression
- Lesson and assessment experience with rewards
- Invest simulator and goal-based saving gameplay
- Pet shop and prize shelf progression loop
- Accessibility options:
	dark mode, high-contrast mode, and large text

## Tech Stack

- Frontend: React, React Router, CSS
- Tooling: Create React App
- Optional backend service: Node.js + Express

## Project Structure

```text
project/
	src/
		components/
			Assessments/
			Investments/
			SimulatorGame/
			PetShop/
			PrizeShelf/
			...
		data/
		assets/
	backend/
	public/
```

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Start the frontend

```bash
npm start
```

Open http://localhost:3000 in your browser.

### 3. Build for production

```bash
npm run build
```

The production bundle is generated in the build folder.

## Available Scripts (Frontend)

In the project root, you can run:

### npm start

Runs the app in development mode with hot reload.

### npm test

Launches the test runner in watch mode.

### npm run build

Builds an optimized production bundle.

### npm run eject

One-way operation that exposes CRA config (use only if needed).

## Backend (Optional)

The backend folder contains an Express-based service.

```bash
cd backend
npm install
node index.js
```

Note: the frontend can run independently unless you are using backend-powered features.

## Learning Routes Overview

- /dashboard: home screen
- /units/:grade: grade unit list
- /lessons/:grade/:unit: lesson list
- /assessments/:grade: assessment unit list
- /assessment/:grade/:unit: assessment quiz
- /pet-shop: pet interactions and item shop
- /simulator: saving simulator game
- /investments: investment page
- /prize-shelf: rewards display

## Accessibility

Built-in settings panel includes:

- Dark mode
- Contrast mode
- Large text mode

These settings are stored locally for a consistent experience.

## Deployment

This app is built with Create React App and follows standard CRA deployment flow.

- Build command: npm run build
- Output directory: build
- Hosting base path is controlled by homepage in package.json

## Learn More

- Create React App docs: https://facebook.github.io/create-react-app/docs/getting-started
- React docs: https://react.dev
- CRA deployment docs: https://facebook.github.io/create-react-app/docs/deployment
