# Aventuras en la cocina - Frontend Application

Welcome to the frontend application for **Aventuras en la cocina**,  a charming blog dedicated to the exquisite and fascinating art of cooking. In this virtual space, culinary enthusiasts can immerse themselves in a world of flavors and aromas, sharing their own cooking experiences and delighting us with original, delicious, and unique recipes born from their creativity and love for the kitchen.

By joining our community, you will have the opportunity to log in and publish your gastronomic adventures, from traditional dishes to innovative culinary fusions. Additionally, you can interact with other cooking enthusiasts, commenting on their recipes and articles, exchanging tips and tricks, and creating an atmosphere of camaraderie and continuous learning.

"Adventures in the Kitchen" is not just a blog; it is a meeting place for all those who enjoy creating magic in their kitchens, a place where every recipe tells a story and every comment adds a special touch to this delightful culinary journey.. This application is built using [Vite](https://vitejs.dev/), [React](https://reactjs.org/), [React Router DOM](https://reactrouter.com/), and [Tailwind CSS](https://tailwindcss.com/).

## Features

- **User Authentication**: Secure user registration and login system.
- **Recipe and Article Management**: Browse, search, and view recipes and articles.
- **Comment System**: Users can comment on recipes and articles.
- **Profile Management**: Users can manage their profiles and view other users' profiles.
- **Interactive Community**: Facilitates interaction among users through comments and recipe sharing.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later) or [yarn](https://yarnpkg.com/)

## Getting Started

Follow these steps to set up and run the application locally.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/EnriqueKloosterman/trabajo-integrador-final-frontend.git
   cd trabajo-integrador-final-frontend
   ```

2. **Install the dependencies**

    Using npm
    ```
    npm install
    ```

    Using yarn
    ```
    yarn install
    ```

## Running the Application

1. **Start the development server:**

    Using npm 
    ```
    npm run dev
    ```

    Using yarn
    ```
    yarn dev
    ```

## Project Structure

Overview of the project´s structure
```
├── public              # Public assets
├── src
│   ├── assets          # Assets like images, fonts, etc.
│   ├── components      # Reusable and Page components
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point for the application
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
├── vite.config.js      # Vite configuration
├── .env                # Environment variables
└── package.json        # Project metadata and dependencies
```

## Usage

**React Router DOM**

The application uses React Router DOM for client-side routing. Routes are defined in the src/routes directory. You can add new routes by updating the route configuration.

**Tailwind CSS**

The application uses Tailwind CSS for styling. You can customize the Tailwind configuration in the tailwind.config.js file. Add your custom styles in the src/styles directory.

**SweetAlert**
The application uses SweetAlert for enhanced alert messages. To use SweetAlert, follow these steps:

1. **Install SweetAlert**
    
    Using npm 
    ```
    npm install sweetalert2
    ```

    Using yarn
    ```
    yarn add sweetalert2
    ```

2. **Import SweetAlert in your component**
     ```
     import Swal from 'sweetalert2';
    ```

3. **Use SweetAlert in your component:**
    Here is an example of how to use SweetAlert for a success message:

    ```
    const handleSubmit = () => {
    	Swal.fire({
            title: 'Success!',
            text: 'Your recipe has been submitted.',
            icon: 'success',
            confirmButtonText: 'Cool'
            });
        };

    return (
        <button onClick={handleSubmit}>Submit Recipe</button>
    );
  ```


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.



