const profileInfo = document.querySelector(".overview");
const username = "CatMonge";
const repoList = document.querySelector(".repo-list");
const repoInfo = document.querySelector(".repos");
const data = document.querySelector(".repo-data")

const gitUserInfo= async function () {
    const usersInfo= await fetch (`https://api.github.com/users/${username}`);
    const data= await usersInfo.json();
    displayUserInfo(data)
};

gitUserInfo();

const displayUserInfo = function (data){
const div = document.createElement("div");
div.classList.add("user-info");
div.innerHTML = `<figure>
<img alt="user avatar" src=${data.avatar_url} />
</figure>
<div>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Bio:</strong> ${data.bio}</p>
<p><strong>Location:</strong> ${data.location}</p>
<p><strong>Number of public repos:</strong> ${data.public_repos}</p>
</div> `;

profileInfo.append(div); 
getRepos();
};

const getRepos = async function () {
    const userRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await userRepos.json();
//console.log(userRepos);
repoInformation(repoData)

};

const repoInformation = async function (repos){
for (const repo of repos){
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
}
};

repoList.addEventListener ("click", function(e){
if (e.target.matches ("h3")){
    const repoName = e.target.innerText;
   // console.log(repoName);
   specificRepo(repoName);
}
});

const specificRepo = async function (repoName){
    const specificRepoData = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoSpecificInfo= await specificRepoData.json();
    const fetchLanguages = await fetch (repoSpecificInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(repoSpecificInfo);
    //console.log(languateData);

    const languages = [];
    for (const language in languageData){
        languages.push(language);
        //console.log(languages);
    }
 displayRepoInfo(repoSpecificInfo, languages)
    
};

const displayRepoInfo = function (repoSpecificInfo, languages){
data.innerHTML = "";
data.classList.remove("hide");
repoInfo.classList.add("hide");
const div = document.createElement("div");
div.innerHTML = 
`<h3>Name: ${repoSpecificInfo.name}</h3>
<p>Description: ${repoSpecificInfo.description}</p>
<p>Default Branch: ${repoSpecificInfo.default_branch}</p>
<p>Languages: ${languages.join(", ")}</p>
<a class="visit" href="${repoSpecificInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`

data.append(div);
};
