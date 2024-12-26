# BurgerCraft
A Web App for Customizing and Ordering Burgers

# Description
BurgerCraft is a web application that allows users to customize and order burgers with a variety of ingredients. Built with React, Express.js, and MongoDB, it features user authentication, ingredient selection, an order summary page, and user's favoirte and history of orders.

# Technologies
- **Frontend**: React, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Cookies, Tokens

# Features
- Customizable burger creation with multiple ingredient options
- User authentication (login/signup) for order management
- Ingredient favorites and selection system
- Order summary page with total price display
- Favorite and History of Orders

# Installation Instructions
1. Clone the repository
2. Navigate to the project directory:
   - cd burgercraft
3. Install dependencies for both the frontend and backend:
   1. cd Front_end
   2. npm install
   3. cd ../Back_end
   4. npm install
4. Set up and start Docker:
   - Ensure Docker is installed and opened
   1. docker-compose up -d
   2. To check if the container is running: docker-compose ps 
6. Start the development server:
   1. cd ../Front_end
   2. npm run dev
   3. cd ../Back_end
   4. npm run dev
7. Open the app in your browser at http://localhost:5173/

# Usage
1. Sign up or log in.
2. Browse the available burger ingredients.
3. Select your favorite ingredients and add them to your burger.
4. View your order summary and total cost.
5. History and Favorites of orders

# Status 
The project is currently in development, and everything is functional in the development environment. The production build has not been created yet, but all core features and functionalities are working as expected in development mode.

# Contact 
For any questions, please reach out to me at liujerry523@gmail.com
