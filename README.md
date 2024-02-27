# Dota 2 Personal Tracker

## Overview

The Dota 2 Personal Tracker is a web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This application allows Dota 2 players to track their personal performance, view statistics, and analyze their gameplay.

## Features

- **User Authentication:** Secure user registration and authentication system.
- **Player Profile:** Create and manage your Dota 2 player profile and information.
- **Match History:** Track and view your recent Dota 2 matches.
- **Performance Statistics:** Analyze your in-game statistics, including win/loss ratio, KDA, GPM, and more.
- **Interactive Dashboard:** Visualize your progress and trends with interactive charts and graphs.

## Technologies Used

- **Frontend:**
  - React.js
  - Redux (or MobX for state management)
  - Material-UI (or any other UI library of your choice)
  - Axios for API requests

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (Mongoose as ODM)
  - JWT for authentication
  - RESTful API design

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:

``` bash
git clone https://github.com/your-username/dota2-personal-tracker.git
cd dota2-personal-tracker
```

2. Make sure .env file is added:
.env file needs the following:
DB_URI={DATABASEURI}


3. To run use to following:
npm run dev