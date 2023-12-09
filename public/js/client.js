// public/js/client.js

document.addEventListener("DOMContentLoaded", function () {
    // Check if username cookie is present
    const username = getCookie("username");

    if (username) {
        // User is logged in, show logout button
        const logoutButton = document.getElementById("logout-button");
        if (logoutButton) {
            logoutButton.style.display = "block";
            logoutButton.addEventListener("click", function () {
                // Remove the username cookie on logout
                document.cookie =
                    "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.href = "/logout"; // Redirect to logout route
            });
        }
    }
});

// Function to get cookie value by name
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}
