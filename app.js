// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrHSyVJkyvqwOqX1hoELx-MRlyDnnqK5o",
    authDomain: "proxchat-3c48b.firebaseapp.com",
    projectId: "proxchat-3c48b",
    storageBucket: "proxchat-3c48b.firebasestorage.app",
    messagingSenderId: "269335509157",
    appId: "1:269335509157:web:4c9233d6a8d226d35d754c"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();


// DOM elements
const loginScreen = document.getElementById('login-screen');
const chatScreen = document.getElementById('chat-screen');
const profileScreen = document.getElementById('profile-screen');

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-button');
const messageList = document.getElementById('message-list');
const messageInput = document.getElementById('message-input');
const sendMessageButton = document.getElementById('send-message-button');
const profileButton = document.getElementById('profile-button');
const newUsernameInput = document.getElementById('new-username');
const profilePictureInput = document.getElementById('profile-picture');
const saveProfileButton = document.getElementById('save-profile-button');
const backToChatButton = document.getElementById('back-to-chat-button');

// Functions

// Login function
const login = () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    auth.signInWithEmailAndPassword(username + "@gmail.com", password)
        .then(userCredential => {
            console.log("Logged in as:", userCredential.user.uid);
            loginScreen.style.display = 'none';
            chatScreen.style.display = 'block';
            loadMessages();
        })
        .catch(error => {
            console.error("Login failed:", error.message);
        });
};

// Load messages from Firestore
const loadMessages = () => {
    const chatRef = db.collection("chats").doc("chat_id").collection("messages");
    chatRef.orderBy("timestamp").onSnapshot(snapshot => {
        messageList.innerHTML = '';
        snapshot.forEach(doc => {
            const message = doc.data();
            const messageElement = document.createElement('div');
            messageElement.textContent = message.content;
            messageList.appendChild(messageElement);
        });
    });
};

// Send message function
const sendMessage = () => {
    const message = messageInput.value;
    const messageRef = db.collection("chats").doc("chat_id").collection("messages");
    messageRef.add({
        content: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        userId: auth.currentUser.uid
    })
    .then(() => {
        messageInput.value = ''; // Clear input after sending
    });
};

// Save profile function
const saveProfile = () => {
    const newUsername = newUsernameInput.value;
    const profilePictureFile = profilePictureInput.files[0];

    if (profilePictureFile) {
        const profilePicRef = storage.ref().child("profile_pictures/" + auth.currentUser.uid);
        profilePicRef.put(profilePictureFile).then(() => {
            profilePicRef.getDownloadURL().then(url => {
                db.collection("users").doc(auth.currentUser.uid).update({
                    username: newUsername,
                    profilePicture: url
                })
                .then(() => {
                    console.log("Profile updated successfully");
                    profileScreen.style.display = 'none';
                    chatScreen.style.display = 'block';
                });
            });
        });
    } else {
        db.collection("users").doc(auth.currentUser.uid).update({
            username: newUsername
        })
        .then(() => {
            console.log("Username updated successfully");
            profileScreen.style.display = 'none';
            chatScreen.style.display = 'block';
        });
    }
};

// Event Listeners
loginButton.addEventListener('click', login);
sendMessageButton.addEventListener('click', sendMessage);
profileButton.addEventListener('click', () => {
    chatScreen.style.display = 'none';
    profileScreen.style.display = 'block';
});
saveProfileButton.addEventListener('click', saveProfile);
backToChatButton.addEventListener('click', () => {
    profileScreen.style.display = 'none';
    chatScreen.style.display = 'block';
});