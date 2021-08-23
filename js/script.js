const profileInfo = document.querySelector(".overview");
const username = CatMonge;

const gitUserInfo= async function(){
    const usersInfo= await fetch (`https://api.github.com/users/${username}`);
    const data= await usersInfo.jason();
};

