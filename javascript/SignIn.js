function SignIn(){
    let email = $(`#email`).val();
    let password = $(`#password`).val();
    console.log(email)
    console.log(password)
    //window.location.href = "Dashboard.html";

    $.ajax({
        method:"POST",
        contentType:"application/json",
        url:"http://localhost:8080/api/v1/auth/signin",
        async:true,
        data:JSON.stringify({

            "email":email,
            "password":password,




        }),
        success:function (data){


            localStorage.setItem("token",data.token);
            window.location.href = "Dashboard.html";
            alert("saved")

        },
        error:function (){
            alert("Error")
        }

    });
}