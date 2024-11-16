$(document).ready(function() {
    const chartCard = $("#chartCard");
    const images = [
        "../assets/Images/agri.png",
        "../assets/Images/agritwo.jpg"
    ];

    let currentIndex = 0;

    setInterval(() => {
        // Cycle through images
        currentIndex = (currentIndex + 1) % images.length;

        // Apply the background image with smooth transition using jQuery's fadeOut() and fadeIn()
        chartCard.fadeOut(500, function() { // Fade out the current image
            chartCard.css("background-image", `linear-gradient(135deg, rgba(47, 47, 47, 0.98) 0%, rgba(118,255,179,0.18) 100%), url('${images[currentIndex]}')`);
            chartCard.fadeIn(500); // Fade in the new image
        });
    }, 5000); // Change every 3 seconds

    // Toggle the sidebar
    $('#header-toggle').click(function() {
        $('#nav-bar').toggleClass('show');
    });

    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const currentTime = `${hours}:${minutes}:${seconds}`;
        $('#current-time').text(currentTime);
    }

    // Update the time every second
    setInterval(updateTime, 1000);

    // Initial call to display time immediately
    updateTime();
});