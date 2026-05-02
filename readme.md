# GitHub Finder

Application web pour rechercher des profils GitHub et gérer ses favoris.

## Features

- Search GitHub users by username
- Display complete profile (avatar, bio, followers, repos...)
- Add / Remove bookmarks in one click
- Persistent favorites via localStorage
- Loading spinner during API requests
- Error handling (404, 403, network errors)
- Responsive design (mobile-first)

## Technologies Used

- HTML5 / CSS3 / JavaScript Vanilla
- GitHub REST API
- localStorage

## Project Structure

github-finder/
├── index.html → structure HTML
├── style.css → styles CSS
├── script.js → logique JavaScript
├── config.js → configuration API
├── .gitignore → fichiers ignorés
└── image/
├── logo.png
└── menu.png

## Installation

1. Clone the repository:
   git clone https://github.com/ton-username/github-finder.git

2. Open index.html with Live Server in VS Code

## API Used

GET https://api.github.com/users/{username}
GET https://api.github.com/users/{username}/repos?per_page=5&sort=stars
