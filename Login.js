localStorage.setItem("username","admin")
localStorage.setItem("password","admin")

document.getElementById("loginbtn").addEventListener("click",function (e) {
    e.preventDefault();

    let input_username = document.getElementById("username");
    let input_password = document.getElementById("password");

    const real_username = localStorage.getItem("username")
    const real_password = localStorage.getItem("password")

    if (input_username.value !== real_username) {
        input_username.style.outline = "2px solid red";
        alert("incorrect username!")
    }else if(input_password.value !== real_password){
        input_password.style.outline = "2px solid red";
        alert("incorrect password!")
    }else{
        input_username.value = ""
        input_password.value = ""
        input_username.style.outline = "0px";
        input_password.style.outline = "0px";
        window.location.href = "MainPage/Main.html";
    }
})