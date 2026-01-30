 # HomePlate – Frontend

![React](https://img.shields.io/badge/react-18.x-blue)
![Vite](https://img.shields.io/badge/vite-5.x-purple)
![CSS](https://img.shields.io/badge/styling-CSS-lightgrey)
![JWT](https://img.shields.io/badge/auth-JWT-blue)

**HomePlate Frontend** is the client-side application for HomePlate, a recipe-sharing social platform where users can create recipes, browse a feed, like, comment, and follow other creators.

## Description

This React + Vite application consumes the HomePlate REST API and provides an interactive UI for authenticated users.
It includes protected routes, dynamic navigation depending on authentication state, and reusable components for likes, follows, and user avatars.


## Project Links


- **Frontend Repository:**  
  [View the HomePlate Frontend repository on GitHub](https://github.com/Gabyara237/homeplate-frontend/)

- **Backend Repository:**  
  [View the HomePlate Backend repository on GitHub](https://github.com/Gabyara237/homeplate-backend)

- **Project Planning (Trello):**  
  [Explore the project planning board on Trello](https://trello.com/b/yilTjBMH/project-3-homeplate)

- **Deployed Application:**  
  [Visit the live HomePlate application](https://new-homeplate.netlify.app/)

## Screenshots

![Public Home](https://i.imgur.com/HGsEh1F.jpeg) 

![Profile Page](https://i.imgur.com/qbZ6ONZ.png) 

![Create/Edit Recipe Form](https://i.imgur.com/FEFaa2X.png)


## Core Features

- Public landing page with sign up / sign in
- JWT authentication and protected routes
- Recipe feed with filtering by type (Breakfast, Lunch, Dinner, etc.)
- Recipe detail page with ingredients, steps, tags, and metadata
- Create / edit / delete recipe forms (full CRUD)
- Comment system (create, edit, delete with ownership checks)
- Like/unlike recipes with reusable LikeButton component
- Follow/unfollow users with reusable FollowButton component
- Shared user avatar component used across pages

## Technologies Used

- **React** – frontend framework
- **Vite** – build tool and dev server
- **React Router** – client-side routing
- **CSS** – styling
- **JWT** – auth token storage and protected routes
- **Fetch/Axios (depending on your project)** – API requests


## Team

This project was collaboratively developed by:

- **Gabriela Araujo** – Full Stack Development  
  [GitHub Profile](https://github.com/Gabyara237)

- **Rebecca** – Full Stack Development  
  [GitHub Profile](https://github.com/Rebecca-10)

- **Tavi** – Frontend Development  
  [GitHub Profile](https://github.com/TaviJ)


## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Gabyara237/homeplate-frontend.git
cd homeplate-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a .env file in the root of the frontend project:

```bash
VITE_BACK_END_SERVER_URL=http://localhost:3000
```


The variable name must start with VITE_ or Vite will not expose it to the app. 

Use your deployed backend URL in production (example: Render/Heroku/etc.)

### 4. Run the app locally

```bash
npm run dev
```

> The frontend will run on a local Vite port (usually http://localhost:5173).



## Future Improvements

- Add search by recipe title/tags

- Add pagination/infinite scroll for feed

- Add profile pages for other users (view creator profile by clicking username)

- Add saved/bookmarked recipes

## Attributions

- Background and UI assets used under valid licenses (Freepik/Flaticon or similar)
- Recipe images used during development sourced from public image providers (testing/demo only)