let currentUser = null;

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simple user validation
    if (username && password) {
        currentUser = { username, password };
        document.getElementById('register-page').style.display = 'none';
        document.getElementById('chat-page').style.display = 'block';
        document.getElementById('username-display').textContent = username;
    } else {
        alert("Please fill out all fields!");
    }
});

document.getElementById('send-message').addEventListener('click', function() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = message;
        document.getElementById('messages').appendChild(messageElement);
        
        messageInput.value = '';  // Clear input after sending
    }
});

// Allow pressing Enter to send message
document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('send-message').click();
    }
});
