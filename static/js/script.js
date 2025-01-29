// Wait for the DOM to fully load before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {

    // Handle form submission for symptom prediction
    document.getElementById("predict-form")?.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload
        
        let symptomsInput = document.getElementById("symptoms").value.trim();

        if (symptomsInput === "") {
            alert("Please enter symptoms before submitting.");
            return;
        }

        // Show loading animation
        let resultContainer = document.getElementById("results");
        resultContainer.innerHTML = "<p>Processing... Please wait.</p>";

        // Send AJAX request to Flask server
        fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `symptoms=${encodeURIComponent(symptomsInput)}`
        })
        .then(response => response.text())
        .then(data => {
            resultContainer.innerHTML = data; // Update results section
        })
        .catch(error => {
            console.error("Error:", error);
            resultContainer.innerHTML = "<p style='color:red;'>An error occurred. Please try again.</p>";
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
});
