// In-memory store for posts
let posts = [];

document.addEventListener('DOMContentLoaded', () => {
    loadPosts();

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
            <div class="reaction-buttons">
                <button onclick="addReaction(${index}, 'hearts')">❤️ ${post.reactions.hearts}</button>
                <button onclick="addReaction(${index}, 'thumbsUps')">👍 ${post.reactions.thumbsUps}</button>
                <button onclick="addReaction(${index}, 'smiles')">😊 ${post.reactions.smiles}</button>
            </div>
            <div class="comment-section">
                <h5>Comments:</h5>
                <ul id="comments-${index}">
                    ${post.comments.map(comment => `<li>${comment}</li>`).join('')}
                </ul>
                <input type="text" id="comment-input-${index}" class="comment-input" placeholder="Add a comment...">
                <button class="comment-button" onclick="addComment(${index})">Comment</button>
            </div>
            <button class="delete-button" onclick="deletePost(${index})">Delete Post</button>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Add a new post
function addPost(user, content, image) {
    const newPost = {
        user,
        content,
        image,
        comments: [],
        reactions: {
            hearts: 0,
            thumbsUps: 0,
            smiles: 0
        }
    };

    posts.push(newPost);
    loadPosts();
}

// Function to add a comment
function addComment(index) {
    const commentInput = document.getElementById(`comment-input-${index}`);
    const comment = commentInput.value;

    if (!comment) {
        alert("Comment can't be empty");
        return;
    }

    posts[index].comments.push(comment);
    loadPosts();
    commentInput.value = ''; // Clear the input
}

// Function to add a reaction
function addReaction(index, type) {
    posts[index].reactions[type] += 1;
    loadPosts();
}

// Function to delete a post
function deletePost(index) {
    posts.splice(index, 1);
    loadPosts();
}
