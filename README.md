
# StayVista 🏨
### Full-Stack Stay Booking Platform

StayVista is a full-stack stay booking web application inspired by Airbnb, built to provide a seamless and user-friendly experience for exploring properties, managing listings, and sharing reviews.

The project focuses on responsive UI design, authentication, ownership-based authorization, and maintainable backend architecture using **Node.js, Express.js, MongoDB, Mongoose, and EJS**.

<p align="center">
  <a href="https://stayvista-airbnbclone-1.onrender.com/">
    <img src="https://img.shields.io/badge/Live_Demo-Visit_App-success?style=for-the-badge" alt="Live Demo">
  </a>
  <img src="https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-Framework-black?style=for-the-badge&logo=express" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/EJS-Templating-purple?style=for-the-badge" alt="EJS">
</p>

---

## 📸 Screenshots

### Homepage
![StayVista Homepage](<img width="1366" height="674" alt="StayVista-Home" src="https://github.com/user-attachments/assets/2cf262a3-6f33-49a2-8c54-a7d11f0f3cef" />

)

### Login Page
![StayVista Login](<img width="1366" height="662" alt="StayVista-Login" src="https://github.com/user-attachments/assets/1880f083-0c22-4ab8-bf88-225b3feb8df4" />

)

### Register Page
![StayVista Register](<img width="1366" height="670" alt="StayVista-Register" src="https://github.com/user-attachments/assets/0402108d-4d74-42f5-8e02-64153acb8fb3" />

)


### Property Listings
![StayVista Property Listings](<img width="1366" height="670" alt="Property-Listing" src="https://github.com/user-attachments/assets/c986572c-f537-47e9-8312-586a01f88139" />

)

### Property Details and Reviews
![StayVista Property Details](<img width="1366" height="670" alt="Property Details - Listing" src="https://github.com/user-attachments/assets/81377937-c33a-46dc-9221-586a1dc507bf" />

)

> **Note:** Add your actual screenshots to the `screenshots/` directory using the filenames shown above. GitHub will display them automatically.

---

## ✨ Features

- **Authentication:** User registration, login, and protected routes.
- **Property Listings:** Browse properties and view detailed information.
- **Listing Management:** Create, edit, and delete listings with owner-only authorization.
- **Reviews & Ratings:** Authenticated users can submit reviews and ratings.
- **Review Authorization:** Users can delete their own reviews.
- **Guest Access:** Guests can browse listings and read reviews without logging in.
- **Responsive UI:** User-friendly layouts for mobile, tablet, and desktop.
- **Image Management:** Support for property images.
- **MVC Architecture:** Organized routes, models, controllers, middleware, and views.

## 🔐 Access Control

| Action | Guest | Authenticated User |
|---|---|---|
| Browse listings | Yes | Yes |
| View reviews | Yes | Yes |
| Create listing | No | Yes |
| Add review | No | Yes |
| Edit/delete listing | No | Owner only |
| Delete review | No | Review author only |

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap
- **Templating:** EJS
- **Architecture:** MVC, RESTful Routing
- **Tools:** Git, GitHub, npm

## 📂 Project Structure

```text
StayVista/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
├── src/
│   ├── routers/
│   ├── models/
│   ├── init/
│   ├── controllers/
│   ├── middleware/
│   ├── utils/
│   └── views/
│       ├── layouts/
│       ├── listings/
│       ├── reviews/
│       ├── users/
│       └── includes/
├── app.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Vaibhavvi/StayVista.git
cd StayVista
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add the environment variables required by your application.

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_secure_session_secret
```

> Use the exact environment variable names expected by your application. Never commit secrets to GitHub.

### 4. Start the application

```bash
npm start
```

For development, if configured:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## 🔮 Coming Soon

Future enhancements planned for StayVista:

- [ ] Property booking and reservation management
- [ ] Online payment gateway integration
- [ ] Search filters and advanced sorting
- [ ] Interactive maps and location-based search
- [ ] Wishlist and favorite properties
- [ ] Host dashboard and booking analytics
- [ ] Availability calendar and seasonal pricing
- [ ] Email verification and password recovery
- [ ] Guest-host messaging and notifications
- [ ] Verified-stay reviews and review moderation
- [ ] Cloud-based image storage
- [ ] Multi-language support and dark mode
- [ ] Automated testing and performance optimization

*These features are planned and may not be available in the current version.*

## 👨‍💻 Author

**Vaibhav Dubey**

Full-Stack Developer | DSA – Java

- **GitHub:** [Vaibhavvi](https://github.com/Vaibhavvi)
- **LinkedIn:** [Vaibhav Dubey](https://www.linkedin.com/in/vaibhav-dubey-8199292b4/)

---

If you find StayVista interesting, consider giving the repository a ⭐.

<p align="center">
  <strong>StayVista — Discover stays. Share experiences. Travel better.</strong>
</p>
