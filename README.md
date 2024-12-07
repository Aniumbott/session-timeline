# Frontend Part of the Full Stack Application

This project is designed to display detailed information about meeting sessions, including participant details and their activities over the timeline. The UI design is based on the Figma design provided [here](https://www.figma.com/design/WZAxSHpOFZrnLEzJt3mJkN/Analytics-Timeline?node-id=1-243&node-type=frame&t=iYgjs4UEeqsc9jjI-0).

## Technologies Used

- React.js: For building the user interface.
- Axios: For making HTTP requests to the backend APIs.
- React Router: For handling routing within the application.
- Tailwind CSS: For styling the components.

## Project Structure

The project is organized as follows:

```
session-timeline/
│
├── public/                  # Public assets and the entry HTML file
│   ├── index.html           # Main HTML file
│   └── ...
│
├── src/                     # Source files
│   ├── pages/               # Page components
│   │   ├── Home.js          # Home page
│   │   ├── Session.js       # Session page
│   ├── components/          # Reusable React components
│   ├── data/                # Data files for testing
│   ├── App.js               # Main application component
│   ├── index.js             # Entry point of the application
│   └── ...
│
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation
```

## Approach

1. **Timeline Component**: Initially, I used basic HTML divs with borders to create the timeline but faced difficulties in aligning the elements properly. I considered using a chart library, but it would be overkill for basic lines, so I decided to use a Table component as the base, with other components positioned absolutely for proper alignment.

2. **Network Issue Detection**: Since no data field was specified for displaying network issues, I wrote logic to detect them based on time logs and event activity. I constructed a sorted event list based on activity, and if an event was active while the session was not, it was detected as a network issue. If all events were inactive before the session ended, it was considered a logout.

3. **Relative Positioning**: Each line represents event activity. To place these lines accurately, I used absolute positioning with calculated top and bottom values relative to the session start time and padding. The same method was used for event handles.

4. **Handle Grouping**: Some handles overlapped, causing them to become hidden or non-interactive. I wrote logic to group handles based on time and padding.

5. **Styling**: Tailwind CSS was used for styling the components.

## Setup Instructions

To get started with the frontend part of the application, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd session-timeline
   ```

2. **Install dependencies**:
   Ensure you have Node.js installed, then run:

   ```bash
   npm install
   ```

3. **Run the development server**:
   Start the React development server:

   ```bash
   npm start
   ```

   The application will open in your default web browser at `http://localhost:3000`.

4. **Build for production**:
   To create an optimized production build, run:

   ```bash
   npm run build
   ```

5. **Deployment**: The production-ready build can be deployed to any static site hosting service.

## Conclusion

This project was a valuable learning experience, allowing me to work on a real-world project with clear design and requirements. I faced challenges in aligning elements on the timeline but overcame them by using the Table component as a base. Overall, I enjoyed the problem-solving aspect and building the UI for this application.

---
