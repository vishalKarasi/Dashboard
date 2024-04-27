## Table of Contents

- [Intro](#Intro)
- [Installation](#installation)
- [Folder Structure](#folder-structure-info)
- [Features](#features)
- [Best Practices](#best-practices)
- [Dependencies](#dependencies)
- [Contact](#contact)

# Intro

Dashboard is an Admin dashboard developed for an assignment in MERN stack. It includes features such as mode and theme change option, admin authentication and authorization, profile customization, different graph and chart components.

## Installation

To run WebBuilder locally, follow these steps:

1. Download and Unzip the project
2. Open root folder in vs code
3. Spilt terminal in two
4. On left run `cd client` then, `npm install` to install dependencies, then `npm run dev` to run frontend application.
5. On right run `cd server` then, `npm install` to install dependencies, then `npm start` to start backend server.

## Folder Structure Info

- **app:**

  - **api:** Contains the API-related code.
  - **services:** Houses features-based code.

- **components:** Holds globally reusable code

- **mock:** Contains data used to render option panels and offer cards.

- **pages:** Includes main pages with their respective nested routes.

- **widgets:** Consists of components specific to particular pages or routes.

## Features

- Mode and Theme Change Feature
- Admin Authentication and Authorization using jwt and bycrypt
- Custom Rating Component for Option Panels
- Dynamic table component with filtering feature
- Dynamic Custom Chart component made by react and D3.js
- Animations
- Fully Responsive

## Best Practices

Dashboard adheres to the following best practices:

1. **Code Quality:** The codebase follows best practices to ensure readability, maintainability, and scalability by utilizing optimal syntax, naming conventions, and folder structures.

2. **Performance Optimization:** Efforts have been made to optimize the performance of the application, providing a smooth user experience through lazy loading, code splitting, modulation, and routing.

3. **Responsive Design:** The application is designed to be responsive, ensuring a seamless experience across various devices.

## Dependencies

- [@reduxjs/toolkit](https://redux-toolkit.js.org/) - Used for State Management

## Contact

For any inquiries or questions, feel free to reach out to Vishal Karasi ~ (vishalbsk120902@gmail.com).
