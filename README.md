# PAWS

## Setup
```
❯ tree -I "node_modules|dist|coverage|.git|.cache|*.png"
.
├── client
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── jsconfig.app.json
│   ├── jsconfig.json
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── about.webp
│   │   ├── sampledogs
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── App.jsx
│   │   ├── assets
│   │   ├── components
│   │   │   ├── FilterDialog.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PetImages.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ui
│   │   │       ├── accordion.jsx
│   │   │       ├── alert.jsx
│   │   │       ├── badge.jsx
│   │   │       ├── button.jsx
│   │   │       ├── card.jsx
│   │   │       ├── checkbox.jsx
│   │   │       ├── dialog.jsx
│   │   │       ├── input.jsx
│   │   │       ├── label.jsx
│   │   │       ├── navigation-menu.jsx
│   │   │       ├── select.jsx
│   │   │       ├── separator.jsx
│   │   │       ├── slider.jsx
│   │   │       ├── switch.jsx
│   │   │       ├── table.jsx
│   │   │       ├── tabs.jsx
│   │   │       └── textarea.jsx
│   │   ├── context
│   │   │   └── AuthContext.jsx
│   │   ├── index.css
│   │   ├── lib
│   │   │   └── utils.js
│   │   ├── main.jsx
│   │   ├── pages
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditPet.jsx
│   │   │   ├── ExplorePets.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LikedPets.jsx
│   │   │   ├── ListPets.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ManagePets.jsx
│   │   │   └── Signup.jsx
│   │   └── services
│   │       ├── api.jsx
│   │       └── petapi.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
├── README.md
└── server
    ├── models
    │   ├── index.js
    │   ├── pet.js
    │   ├── user
    │   │   ├── adopter.js
    │   │   └── rehomer.js
    │   └── user.js
    ├── package.json
    ├── package-lock.json
    ├── server.js
    └── uploads
        ├── image1.png
        └── ...
```
- Vite
- Express

> Initial setup : https://youtu.be/mKmxc8TcWQ8?si=RHCkCCJ_Ajum-k_J + Shadcn in vite setup

