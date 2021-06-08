let myToken = config.ACCESS_TOKEN;
let userInput = document.querySelector("#username");
let repositories = document.querySelector(".repositories-list");
let repoSpan = document.querySelector("#active span");
let userDetails = document.querySelector(".user-details");

const insertUserDetails = (user) => {
  let details = `  
        <div class="user flex">
            <div id="user-img">
                <img src=${user.avatarUrl} alt="repo profile picture">
            </div>
            <div class="name-login">
                <h2 id="user-name">${user.name}</h2>        
                <p id="user-login">${user.login}</p>
            </div>
        </div>
        <p id="user-bio">${user.bio}</p>
    `;
  return details;
};

const getGithubData = async () => {
  repositories.innerHTML = `<div style="width: 200px; height: 200px; margin: 20px auto;"><img src="https://res.cloudinary.com/adenike/image/upload/v1622295294/octocat-spinner_zjxedw.gif" alt="github icon spinner"> </div>`;

  let api = "https://api.github.com/graphql";
  username = userInput.value;
  try {
    let resp = await axios({
      method: "POST",
      url: `${api}`,
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
      data: {
        query: `
                    query getRepository {
                        user(login: "${username}") {
                            avatarUrl
                            bio
                            name
                            login
                            repositories(affiliations: OWNER, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}, first: 20) {
                                totalCount
                                nodes {
                                    name
                                    description
                                    url
                                    stargazerCount
                                    forkCount
                                    languages(orderBy: {field: SIZE, direction: DESC}, first: 1) {
                                        nodes {
                                            color
                                            name
                                        }
                                    }
                                    createdAt
                                    updatedAt
                                }
                            }
                        }
                    }
                `,
      },
    });
    let user = resp.data.data.user;
    console.log(user);

    // if user found..., else return error
    if (user) {
      userInput.value = "";
      let userRepo = user.repositories;
      let userRepoNodes = user.repositories.nodes;
      document.querySelector(
        ".small-user"
      ).innerHTML = `<img src="${user.avatarUrl}" alt="user picture icon"><span class="header-login hide-display">${user.login}</span>`;
      userDetails.innerHTML = insertUserDetails(user);
      repositories.innerHTML = insertRepoData(userRepoNodes);

      //insert repositories total count only after a valid user is found
      if (userRepo || userRepo === 0) {
        repoSpan.textContent = userRepo.totalCount;
        repoSpan.style.backgroundColor = "#e1e4e8";
      }
    } else {
      userDetails.innerHTML = "";
      repositories.innerHTML = `<h2 style="font-size: 20px;">We couldn’t find any repositories matching ${userInput.value}</h2>`;
    }
  } catch (err) {
    console.log(err);
    repositories.innerHTML = `<h2 style="font-size: 20px;">Error: Please check your network or access token provided</h2>`;
  }
};

// start searching only when enter btn is clicked
const searchBtn = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (userInput.value) {
      getGithubData();
    } else {
      alert("Please supply a username to search");
    }
  }
};

document.addEventListener("keydown", searchBtn);
