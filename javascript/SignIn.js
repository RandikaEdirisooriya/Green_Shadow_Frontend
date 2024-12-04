function SignIn(){
    let email = $(`#email`).val();
    let password = $(`#password`).val();



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
            Swal.fire({
                icon: 'success',
                title: 'Logged In!',
                text: 'Logged in successfully.',
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: false,
                timer: 2000
            });

        },
        error:function (){
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `Error Logging In: ${xhr.responseText || error}`,
                background: 'rgba(65,65,66,0.18)',
                showConfirmButton: true
            });

        }

    });
}