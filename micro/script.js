// In-memory store for posts, users, and followers
let posts = [];
let users = ['Alice', 'Bob', 'Charlie'];  // Sample users
let followers = {};  // Track who follows whom

document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    loadFollowers();

    // Handle post button click
    document.getElementById('postButton').addEventListener('click', function () {
        const user = document.getElementById('user').value;
        const content = document.getElementById('content').value;
        const imageInput = document.getElementById('imageInput');
        let imageUrl = '';

        // Check if an image is uploaded
        if (imageInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageUrl = e.target.result;
                addPost(user, content, imageUrl);
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            addPost(user, content, imageUrl);
        }

        // Clear input fields
        document.getElementById('user').value = '';
        document.getElementById('content').value = '';
        imageInput.value = '';
    });
});

// Load users
function loadUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    users.forEach(user => {
        const userElement = document.createElement('li');
        userElement.innerHTML = `
            ${user} <button onclick="toggleFollow('${user}')">Follow/Unfollow</button>
        `;
        userList.appendChild(userElement);
    });
}

// Load followers
function loadFollowers() {
    const followersList = document.getElementById('followersList');
    followersList.innerHTML = '';

    for (let [user, followerList] of Object.entries(followers)) {
        const followerElement = document.createElement('li');
        followerElement.innerText = `${user}: ${followerList.join(', ') || 'No followers'}`;
        followersList.appendChild(followerElement);
    }
}

// Add a new post with timestamp
function addPost(user, content, image) {
    const newPost = {
        user,
        content,
        image,
        timestamp: new Date(),
        comments: [],
        reactions: {
            likes: 0,
            dislikes: 0,
        }
    };

    posts.push(newPost);
    loadPosts();
}

// Load posts
function loadPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        postElement.innerHTML = `
            <h4>${post.user}</h4>
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post Image" style="max-width: 100%;">` : ''}
            <p class="post-timestamp">${formatDateTime(post.timestamp)}</p>
            <div class="reaction-buttons">
                <button onclick="addLike(${index})">👍 ${post.reactions.likes}</button>
                <button onclick="addDislike(${index})">👎 ${post.reactions.dislikes}</button>
            </div>
            <div class="comment-section">
                <h5>Comments (<span class="comment-counter">${post.comments.length}</span>):</h5>
                <ul id="comments-${index}">
                    ${post.comments.map(comment => `
                        <li>${comment.text} <p class="comment-timestamp">${formatDateTime(comment.timestamp)}</p></li>
                    `).join('')}
                </ul>
                <input type="text" id="comment-input-${index}" class="comment-input" placeholder="Add a comment...">
                <button class="comment-button" onclick="addComment(${index})">Comment</button>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Add a like
function addLike(index) {
    posts[index].reactions.likes += 1;
    loadPosts();
}

// Add a dislike (unlike)
function addDislike(index) {
    posts[index].reactions.dislikes += 1;
    loadPosts();
}

// Add a comment with timestamp
function addComment(index) {
    const commentInput = document.getElementById(`comment-input-${index}`);
    const comment = commentInput.value;

    if (!comment) {
        alert("Comment can't be empty");
        return;
    }

    posts[index].comments.push({
        text: comment,
        timestamp: new Date()
    });

    loadPosts();
    commentInput.value = ''; // Clear the input
}

// Toggle follow/unfollow
function toggleFollow(followedUser) {
    const currentUser = document.getElementById('user').value;

    if (!currentUser) {
        alert('Please enter your name to follow/unfollow users.');
        return;
    }

    if (!followers[currentUser]) {
        followers[currentUser] = [];
    }

    const index = followers[currentUser].indexOf(followedUser);

    if (index === -1) {
        followers[currentUser].push(followedUser);  // Follow
    } else {
        followers[currentUser].splice(index, 1);  // Unfollow
    }

    loadFollowers();
}

// Function to format date and time in a readable format
function formatDateTime(date) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    return new Date(date).toLocaleDateString('en-US', options);
}
