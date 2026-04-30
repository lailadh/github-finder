# GitHub Finder

A web application to search GitHub profiles, view developer statistics, and manage favorite profiles.

## Description

GitHub Finder allows recruiters to quickly discover GitHub developer profiles, visualize their public statistics, and save interesting profiles to favorites for later consultation.

## Features

- Search GitHub users by username
- Display complete profile (avatar, bio, followers, repos...)
- Add / Remove bookmarks in one click
- Persistent favorites via localStorage
- Loading spinner during API requests
- Error handling (404, 403, network errors)
- Responsive design (mobile-first)
- Dark mode

## Technologies Used

- HTML5 (semantic structure)
- CSS3 (Flexbox, Grid, CSS Variables, Dark mode)
- JavaScript Vanilla (async/await, fetch API, DOM manipulation)
- GitHub REST API (public)
- localStorage (persistent storage)

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

## Author

- Salma Harda
- GitHub: @ton-username
