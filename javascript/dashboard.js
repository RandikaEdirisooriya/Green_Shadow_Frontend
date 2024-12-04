$(document).ready(function () {
    getCountCrop();
    getCountVehicle();
    getCountField();
    getCountStaff();
    getCountEquipment();
});

function getCountCrop() {
    let token = localStorage.getItem("token");
    $.ajax({
        url: 'http://localhost:8080/api/v1/crop/count',
        type: 'GET',
        headers: {
            "Authorization": "Bearer " + token
        },
        dataType: 'json',
        success: function (data) {
            $('#cropcount').text(data);
        },
        error: function () {
            console.log("Error fetching crop count");
        }
    });
}

function getCountVehicle() {
    let token = localStorage.getItem("token");
    $.ajax({
        url: 'http://localhost:8080/api/v1/vehicle/count',
        type: 'GET',
        headers: {
            "Authorization": "Bearer " + token
        },
        dataType: 'json',
        success: function (data) {
            $('#vehiclecount').text(data);
        },
        error: function () {
            console.log("Error fetching vehicle count");
        }
    });
}

function getCountField() {
    let token = localStorage.getItem("token");
    $.ajax({
        url: 'http://localhost:8080/api/v1/field/count',
        type: 'GET',
        headers: {
            "Authorization": "Bearer " + token
        },
        dataType: 'json',
        success: function (data) {
            $('#fieldcount').text(data);
        },
        error: function () {
            console.log("Error fetching field count");
        }
    });
}

function getCountStaff() {
    let token = localStorage.getItem("token");
    $.ajax({
        url: 'http://localhost:8080/api/v1/staff/count',
        type: 'GET',
        headers: {
            "Authorization": "Bearer " + token
        },
        dataType: 'json',
        success: function (data) {
            $('#staffcount').text(data);
        },
        error: function () {
            console.log("Error fetching staff count");
        }
    });
}

function getCountEquipment() {
    let token = localStorage.getItem("token");
    $.ajax({
        url: 'http://localhost:8080/api/v1/equipment/count',
        type: 'GET',
        headers: {
            "Authorization": "Bearer " + token
        },
        dataType: 'json',
        success: function (data) {
            $('#equipmentcount').text(data);
        },
        error: function () {
            console.log("Error fetching equipment count");
        }
    });
}
