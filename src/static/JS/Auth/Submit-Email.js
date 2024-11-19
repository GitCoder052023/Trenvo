const SEND = document.getElementById("submitOTP");
const Email = document.getElementById("email");

SEND.addEventListener("click", () => {
    const emailValue = Email.value.trim();
    
    if (emailValue !== "" && emailValue.includes("@") && emailValue.endsWith(".com")) {
        document.getElementById("body").innerHTML = `
    <div class="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
        <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div></div>
        <script src="/static/JS/Auth/Submit-Email.js"></script>`
        fetch("http://localhost:8000/auth/password-reset/request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: emailValue }),
        })
        .then(response => response.json()) // Parse the JSON from the response
        .then(data => {
            if (data.otpToken) {
                window.localStorage.setItem("otpToken", data.otpToken); 
                window.location.href = "/Auth/Reset/Submit/OTP";
            } else {
                window.localStorage.removeItem("otpToken");
                alert("Failed to retrieve OTP. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error sending OTP:", error);
            window.localStorage.removeItem("otpToken");
            alert("An error occurred while sending OTP. Please try again later.");
        });
    } else {
        alert("Please enter a valid email address!");
    }
});
