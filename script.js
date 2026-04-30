/*const searchInput= document.getElementById("search-input");*/

const state = {
  currentUser: null,
  bookmarks: [],
  isViewingBookmarks: false,
};
/*nrabto html b js  */
/*dom element*/
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const bookBtn = document.getElementById("book-btn");
const bookCount = document.getElementById("book-count");

/*section wla div */

const welcomeEl = document.getElementById("welcome");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const errorMsg = document.getElementById("error-msg");
const resultatEl = document.getElementById("resultat");
const userCard = document.getElementById("user-card");
const bookmarksEl = document.getElementById("bookmarks");
const bookmarksList = document.getElementById("bookmarks-list");

/*nweri div wnkhabi lba9i */
/*hado nkhabihom */

//function showSection(sectionName) {
// welcomeEl.classList.add("hidden");
//loadingEl.classList.add("hidden");
//errorEl.classList.add("hidden");
//resultatEl.classList.add("hidden");
//bookmarksEl.classList.add("hidden");

/*YWERI LITLABNA*/

// if (sectionName === "welcome") welcomeEl.classList.remove("hidden");
// if (sectionName === "loading") loadingEl.classList.remove("hidden");
//  if (sectionName === "error") errorEl.classList.remove("hidden");
//  if (sectionName === "resultat") resultatEl.classList.remove("hidden");
// if (sectionName === "bookmarks") bookmarksEl.classList.remove("hidden");
//}

function showSection(sectionName) {
  // ytkhabaw
  [welcomeEl, loadingEl, errorEl, resultatEl, bookmarksEl].forEach((el) => {
    el.classList.add("hidden");
  });

  // ybano
  const sections = {
    welcome: welcomeEl,
    loading: loadingEl,
    error: errorEl,
    resultat: resultatEl,
    bookmarks: bookmarksEl,
  };

  sections[sectionName].classList.remove("hidden");
}

/*depart */

showSection("welcome");

function renderUser(user) {
  /*enrg utilisateur f state*/

  state.currentUser = user;

  /*enreg f html*/

  document.getElementById("user-avatar").src = user.avatar_url;

  document.getElementById("user-name").textContent = user.name || user.login;
  document.getElementById("user-login").textContent = "@" + user.login;
  document.getElementById("user-bio").textContent =
    user.bio || "No bio available";
  document.getElementById("user-followers").textContent = user.followers;
  document.getElementById("user-following").textContent = user.following;
  document.getElementById("user-repos").textContent = user.public_repos;
  /*link github */
  document.getElementById("user-link").href = user.html_url;
  /*wri section resultat */
  showSection("resultat");
  fetchUserRepos(user.login);
}

/*test */

/*
renderUser({
  login: "torvalds",
  name: "Linus Torvalds",
  avatar_url: "https://avatars.githubusercontent.com/u/1024588?v=4",
  bio: "Linux creator",
  followers: 200000,
  following: 0,
  public_repos: 50,
  html_url: "https://github.com/torvalds",
});*/

async function searchUser(username) {
  showSection("loading");

  try {
    /*dima t3ayti lih b repot wla token */
    const response = await fetch("https://api.github.com/users/" + username, {
      headers: {
        Authorization: `token ${env.Token}`,
      },
    });

    if (response.status === 404) {
      errorMsg.textContent = "❌ Utilisateur non trouvé !";
      showSection("error");
      return;
    } else if (response.status === 403) {
      errorMsg.textContent = "⚠️ Rate limit reached. Try later.";
      showSection("error");
      return;
    } else if (!response.ok) {
      errorMsg.textContent = "❌ Unexpected error occurred";
      showSection("error");
      return;
    }

    const user = await response.json();
    renderUser(user);
  } catch (error) {
    errorMsg.textContent = "⚠️ Erreur réseau. Vérifiez votre connexion.";
    showSection("error");
  }
}

searchBtn.addEventListener("click", () => {
  const username = searchInput.value.trim();
  if (username === "") return;
  searchUser(username);
});
/*entrer mn keyboard*/
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const username = searchInput.value.trim();
    if (username === "") return;
    searchUser(username);
  }
});

//  YTZAD RA9M  Fheader
function updateCounter() {
  bookCount.textContent = state.bookmarks.length;
}

// زيد bookmark
function addBookmark(user) {
  // ENREGESTRER LMA3LOMAT DARORIYA
  const bookmark = {
    id: user.id,
    login: user.login,
    name: user.name || user.login,
    avatar_url: user.avatar_url,
  };

  // زيدو ل array
  state.bookmarks.push(bookmark);

  // سالي ف loc
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));

  // YHOT RA9EM
  updateCounter();
}

function removeBookmark(id) {
  //YHAYED LINA LI3ANDO NEFS ID
  state.bookmarks = state.bookmarks.filter((b) => b.id !== id);

  //  RAYSALI F localStorage
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));

  updateCounter();
}

// عرض liste des bookmarks
function renderBookmarks() {
  //ILA MAKANCH favoris
  if (state.bookmarks.length === 0) {
    bookmarksList.innerHTML = "<p>No bookmarks yet ⭐</p>";
    return;
  }

  bookmarksList.innerHTML = "";
  state.bookmarks.forEach((bookmark) => {
    const div = document.createElement("div");
    div.classList.add("bookmark-item");
    div.innerHTML = `
      <img src="${bookmark.avatar_url}" alt="${bookmark.login}" />
      <span>${bookmark.name}</span>
      <button onclick="searchUser('${bookmark.login}')">View</button>
      <button onclick="removeBookmark(${bookmark.id})">❌</button>
    `;
    bookmarksList.appendChild(div);
  });

  showSection("bookmarks");
}

function loadBookmarks() {
  const saved = localStorage.getItem("bookmarks");
  if (saved) {
    state.bookmarks = JSON.parse(saved);
    updateCounter();
  }
}

loadBookmarks();

async function fetchUserRepos(username) {
  try {
    //console.log(env.Token);
    const response = await fetch(
      "https://api.github.com/users/" +
        username +
        "/repos?per_page=5&sort=stars",
      {
        headers: {
          Authorization: `token ${env.Token}`,
        },
      },
    );

    const repos = await response.json();
    displayRepositories(repos);
    //console.log("============");
    //console.log(env.Token);
  } catch (error) {
    //console.log("============");
    //console.log(env.Token);
    //console.log("Repos error:", error);
  }
}

// async function fetchUserRepos(username) {
//   try {
//     const response = await fetch(
//       "https://api.github.com/users/" +
//         username +
//         "/repos?per_page=5&sort=stars",
//     );
//     const repos = await response.json();
//     displayRepositories(repos);
//   } catch (error) {
//     console.log("Repos error:", error);
//   }
// }

function displayRepositories(repos) {
  const reposList = document.getElementById("repos-list");
  reposList.innerHTML = "";

  repos.forEach((repo) => {
    const div = document.createElement("div");
    div.classList.add("repo-card");
    div.innerHTML = `
      <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
      <p>${repo.description || "No description"}</p>
      <div class="repo-stats">
        <span>⭐ ${repo.stargazers_count}</span>
        <span>🍴 ${repo.forks_count}</span>
        <span>💻 ${repo.language || "N/A"}</span>
      </div>
    `;
    reposList.appendChild(div);
  });
}

bookBtn.addEventListener("click", () => {
  renderBookmarks();
});

document.getElementById("bookmark-btn").addEventListener("click", () => {
  if (!state.currentUser) return;

  const alreadyAdded = state.bookmarks.find(
    (b) => b.id === state.currentUser.id,
  );

  if (alreadyAdded) {
    removeBookmark(state.currentUser.id);
    document.getElementById("bookmark-btn").textContent = "⭐ Add to Bookmarks";
  } else {
    addBookmark(state.currentUser);
    document.getElementById("bookmark-btn").textContent = "❌ Remove Bookmark";
  }
});
