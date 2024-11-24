function AddStaff(){
    let staffCode = $(`#staffCode`).val();
    let firstName = $(`#firstName`).val();
    let lastName = $(`#lastName`).val();
    let designation = $(`#designation`).val();
    let buildingName = $(`#buildingName`).val();
    let laneName = $(`#laneName`).val();
    let city = $(`#city`).val();
    let postalCode = $(`#postalCode`).val();
    let gender = $(`#gender`).val();
    let email = $(`#email`).val();
    let role = $(`#role`).val();
    let logId = $(`#logId`).val();
    let Province = $(`#Province`).val();
    let contact_No = $(`#contact_No`).val();
    let dob = $(`#dob`).val();
    let joinedDate = $(`#joinedDate`).val();

    let token = localStorage.getItem("token");

    $.ajax({
        method: "POST",
        url: "http://localhost:8080/api/v1/staff",
        headers: {
            "Authorization": "Bearer " + token
        },
        contentType: "application/json",
        data: JSON.stringify({
            "staffId": staffCode,
            "firstName": firstName,
            "lastName": lastName,
            "designation": designation,
            "gender": gender,
            "joinedDate": joinedDate,
            "dob": dob,
            "addressOne": buildingName,
            "addressTwo": laneName,
            "addressThree": city,
            "addressFour": Province,
            "addressFive": postalCode,
            "contact_No": contact_No,
            "email": email,
            "role": role,
            "logCode": logId

        }),
        success: function (data) {
            clearForm();
            alert("Saved");
        },
        error: function () {
            alert("Error");
        }
    });


}
function clearForm() {

    $(`#firstName`).val(" ");
    $(`#lastName`).val(" ");
    $(`#designation`).val(" ");
    $(`#buildingName`).val(" ");
    $(`#laneName`).val(" ");
    $(`#city`).val(" ");
    $(`#postalCode`).val(" ");
    $(`#gender`).val(" ");
    $(`#email`).val(" ");
    $(`#role`).val(" ");
    $(`#logId`).val(" ");
    $(`#Province`).val(" ");
    $(`#contact_No`).val(" ");
    $(`#dob`).val(" ");
    $(`#joinedDate`).val(" ");
}