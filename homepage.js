document.addEventListener("DOMContentLoaded", () => {
    loadConfessions();
    checkForSecretMessage();
});

// Store confessions locally
function submitConfession() {
    let text = document.getElementById("confession-text").value.trim();
    if (text) {
        let confessions = JSON.parse(localStorage.getItem("confessions")) || [];
        confessions.unshift({ text, time: new Date().toLocaleString() });
        localStorage.setItem("confessions", JSON.stringify(confessions));
        document.getElementById("confession-text").value = "";
        loadConfessions();
    }
}

// Load confessions
function loadConfessions() {
    let confessions = JSON.parse(localStorage.getItem("confessions")) || [];
    let feed = document.getElementById("confession-feed");
    feed.innerHTML = confessions.map((c) => `<div class="alert alert-secondary">${c.text} <small class="d-block text-end">${c.time}</small></div>`).join("");
}

// Generate secret message link
function generateSecretMessage() {
    let text = document.getElementById("secret-message").value.trim();
    if (text) {
        let messageId = "msg-" + Math.random().toString(36).substr(2, 9);
        let expiryTime = Date.now() + 24 * 60 * 60 * 1000; // Expires in 24 hours
        localStorage.setItem(messageId, JSON.stringify({ text, expiryTime }));
        let link = `${window.location.origin + window.location.pathname}?msg=${messageId}`;
        document.getElementById("generated-link").innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
    }
}

// Check if there's a secret message in the URL
function checkForSecretMessage() {
    let params = new URLSearchParams(window.location.search);
    let messageId = params.get("msg");
    if (messageId && localStorage.getItem(messageId)) {
        let messageData = JSON.parse(localStorage.getItem(messageId));
        let now = Date.now();

        if (now > messageData.expiryTime) {
            document.getElementById("message-view").innerHTML = `<div class="alert alert-danger">This message has expired! ⏳</div>`;
            localStorage.removeItem(messageId);
        } else {
            document.getElementById("message-view").classList.remove("d-none");
            document.getElementById("message-content").textContent = messageData.text;
            startCountdown(messageId, messageData.expiryTime);
        }
    }
}

// Start countdown timer
function startCountdown(messageId, expiryTime) {
    let countdownElem = document.getElementById("countdown");
    let timer = setInterval(() => {
        let now = Date.now();
        let timeLeft = Math.max(expiryTime - now, 0);
        let hours = Math.floor(timeLeft / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        countdownElem.textContent = `${hours}h ${minutes}m ${seconds}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            localStorage.removeItem(messageId);
            countdownElem.textContent = "Expired!";
        }
    }, 1000);
}

// Delete message instantly
function deleteMessage() {
    let params = new URLSearchParams(window.location.search);
    let messageId = params.get("msg");
    if (messageId) {
        localStorage.removeItem(messageId);
        document.getElementById("message-view").innerHTML = `<div class="alert alert-danger">Message Deleted! 🚀</div>`;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    loadConfessions();
    checkForSecretMessage();
});

// Store confessions locally with categories
function submitConfession() {
    let text = document.getElementById("confession-text").value.trim();
    let category = document.getElementById("confession-category").value;

    if (text) {
        let confessions = JSON.parse(localStorage.getItem("confessions")) || [];
        confessions.unshift({ text, category, time: new Date().toLocaleString(), likes: 0 });
        localStorage.setItem("confessions", JSON.stringify(confessions));
        document.getElementById("confession-text").value = "";
        loadConfessions();
    }
}

// Load confessions with categories & interaction features
function loadConfessions() {
    let confessions = JSON.parse(localStorage.getItem("confessions")) || [];
    let feed = document.getElementById("confession-feed");
    feed.innerHTML = confessions
        .map((c, index) => `
            <div class="alert alert-secondary">
                <strong>[${c.category}]</strong> ${c.text}
                <small class="d-block text-end">${c.time}</small>
                <button class="btn btn-sm btn-success" onclick="likeConfession(${index})">👍 ${c.likes}</button>
            </div>
        `).join("");
}

// Like confession
function likeConfession(index) {
    let confessions = JSON.parse(localStorage.getItem("confessions")) || [];
    confessions[index].likes += 1;
    localStorage.setItem("confessions", JSON.stringify(confessions));
    loadConfessions();
}

// Generate secret message link
function generateSecretMessage() {
    let text = document.getElementById("secret-message").value.trim();
    if (text) {
        let messageId = "msg-" + Math.random().toString(36).substr(2, 9);
        let expiryTime = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem(messageId, JSON.stringify({ text, expiryTime }));
        let link = `${window.location.origin + window.location.pathname}?msg=${messageId}`;
        document.getElementById("generated-link").innerHTML = `<a href="${link}" target="_blank">${link}</a>`;
    }
}

// Check if there's a secret message in the URL
function checkForSecretMessage() {
    let params = new URLSearchParams(window.location.search);
    let messageId = params.get("msg");
    if (messageId && localStorage.getItem(messageId)) {
        let messageData = JSON.parse(localStorage.getItem(messageId));
        let now = Date.now();

        if (now > messageData.expiryTime) {
            document.getElementById("message-view").innerHTML = `<div class="alert alert-danger">This message has expired!</div>`;
            localStorage.removeItem(messageId);
        } else {
            document.getElementById("message-view").classList.remove("d-none");
            document.getElementById("message-content").textContent = messageData.text;
            startCountdown(messageId, messageData.expiryTime);
        }
    }
}
