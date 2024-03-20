## NC News Project

[![React](https://img.shields.io/badge/-React-blue)](https://reactjs.org/)
[![HTML](https://img.shields.io/badge/-HTML-orange)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/-CSS-blueviolet)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Netlify](https://img.shields.io/badge/-Netlify-brightgreen)](https://www.netlify.com/)

### News Project link
![NC News]()
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fncnews.magz.dev)](https://ncnews.magz.dev)



This project demonstrates the ability to connect a backend API to a frontend application, creating RESTful APIs, and building a full-stack experience. The project showcases various components and functionalities, including user authentication, article browsing, commenting, voting, and topic filtering.

### Technologies Used

- **Frontend:** React.js with React Router for client-side routing
- **Styling:** Material-UI for component styling
- **Backend:** Express.js for building the API
- **Database:** SQL for storing data
- **Deployment:** The project is deployed on Render

### Features

1. **User Authentication:** Users can log in with their username. Validation is performed to check if the user exists in the database.
   
2. **Article Listing:** Articles are displayed based on various sorting criteria such as date, comment count, and votes. Users can navigate through articles and view detailed information about each article.

3. **Commenting:** Logged-in users can post comments on articles. Comments are associated with the respective articles and are displayed below each article.

4. **Voting:** Users can vote on articles. Each user can cast only one vote per article, and the vote count is updated in real-time.

5. **Topic Filtering:** Articles can be filtered based on topics. Users can click on topic buttons to view articles related to specific topics.

6. **Error Handling:** The application handles errors gracefully and displays appropriate error messages to users when encountering issues such as invalid user input or failed API requests.

### How to Run the Project

1. Clone the repository: `git clone https://github.com/Magdyz/nc_news.git`
2. Navigate to the project directory: `cd nc-news`
3. Install dependencies: `npm install`
4. Start the frontend and backend servers: `npm start`
5. Access the application in your browser at `http://localhost:3000`

### Project Structure

- **`/components`:** Contains React components for different parts of the application such as articles, comments, login, header, etc.
- **`/context`:** Includes context providers and consumers for managing global state within the application.
- **`/utils`:** Utility functions such as date formatting are stored here.
- **`App.js`:** Main entry point of the frontend application where routes are defined.

### Links

- **Backend API:** [https://api1.magz.dev/](https://api1.magz.dev/)
- **View the Project:** [https://ncnews.magz.dev/](https://ncnews.magz.dev)
