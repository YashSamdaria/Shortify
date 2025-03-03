# Shortify

Shortify is a simple and efficient URL shortener that helps you create and share short links easily. Built with React for the frontend and Node.js for the backend, Shortify ensures fast and reliable link shortening.

## Features

- 🔗 Shorten long URLs instantly
- 📋 Copy shortened links with one click
- 📤 Share links via social media or email
- 📊 Track the number of clicks on each link (Future feature)
- 🎨 Responsive and user-friendly UI

## Tech Stack

### Frontend (Client)
- React.js
- Tailwind CSS

### Backend (Server)
- Node.js
- Express.js
- MongoDB (for storing shortened URLs)

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js (v16+ recommended)
- npm or yarn

### Steps to Run Locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/shortify.git
   cd shortify
   ```

2. **Install dependencies for the frontend and backend:**
   ```sh
   cd client
   npm install  # Install React dependencies
   cd  server
   npm install  # Install Node.js dependencies
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the `server/` directory and add your MongoDB connection string:
     ```env
     MONGO_URI=your_mongodb_connection_string
     BASE_URL=http://localhost:5000
     ```

4. **Start the development servers:**
   ```sh
   # Start backend
   cd server
   node index.js

   # Start frontend (in a separate terminal)
   cd  client
   npm start
   ```

5. Open `http://localhost:3000` in your browser to use Shortify.

## Deployment

Shortify is deployed on Vercel for the frontend and Render for the backend.
- Live URL: [https://shortify.vercel.app](https://shortify.vercel.app)
- API URL: [https://shortify-api.onrender.com](https://shortify-api.onrender.com)

## Contributing

Contributions are welcome! If you’d like to improve Shortify:
1. Fork the repo
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.

---

🚀 Happy shortening!

