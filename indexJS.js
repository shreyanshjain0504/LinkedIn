let newPostArray = [];
const divForPost = document.querySelector('.post');

function toggleMenu() {
    /* adds and removes the class name open-menu whenever called */
    let profileMenu = document.getElementById("profileMenu");
    profileMenu.classList.toggle("open-menu");
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Retrieve saved posts from localStorage
window.onload = () => {
    const savedPosts = localStorage.getItem('data');
    if (savedPosts) {
        newPostArray = JSON.parse(savedPosts);
        showAllPosts();
    }
};

function saveData() {
    // Save the array as a JSON string in localStorage
    localStorage.setItem('data', JSON.stringify(newPostArray));
}

setTimeout(() => {
    const popup = document.getElementById('refreshPopup');
    popup.style.display = 'block';
}, 20000);
  
  // Refresh page when the button is clicked
document.getElementById('refreshButton').addEventListener('click', () => {
    window.scrollTo(0, 0); 
    setTimeout(() => {
      location.reload();   
    }, 200);  
});


function createPost() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = dd + '/' + mm + '/' + yyyy;
    const val = document.querySelector('.create-post-input textarea').value;
    let newPost = {
        postTime: formattedToday,
        content: val,
        author: {
            name: "Shreyansh Jain",
            designation: "ASE Intern Tekion",
        },
        reactions: 0,
        comments: 0
    };
    newPostArray.push(newPost);
    saveData();
    showAllPosts();
    document.querySelector('.create-post-input textarea').value = '';
}

function displaySortOrder() {
    const dropdownContent = document.querySelector('span.dropdown-content');
    dropdownContent.style.display = (dropdownContent.style.display === "block") ? "none" : "block";
}

function displayDateRange() {
    const dropdownContentDate = document.querySelector('span.dropdown-date');
    dropdownContentDate.style.display = (dropdownContentDate.style.display === "block") ? "none" : "block";
}

/**/
function sortByAscOrder() {
    newPostArray.sort(function(a, b) {
        const dateA = parseDateToDays(a.postTime);
        const dateB = parseDateToDays(b.postTime);
        return dateA - dateB;  
    });
    saveData();
    showAllPosts();
    return newPostArray;
}

function sortByDescOrder() {
    newPostArray = sortByAscOrder().reverse();
    saveData();
    showAllPosts();       
}

function createNewDiv(post) {
    let newDiv = document.createElement('div');
    newDiv.setAttribute("dataDate", post.postTime);
    newDiv.innerHTML = `
        <div class="post-author">
            <img src="images/user-1.png">
            <div>
                <h1>${post.author.name}</h1>
                <small>${post.author.designation}</small>
                <small>${post.postTime}</small>
            </div>
        </div>
        
        <p>${post.content}</p>
        <img src="images/post-image-1.png" width="100%">
        <div class="post-stats">
            <div>
                <span class="liked-user">${post.reactions} reactions</span>
            </div>
            <div>
                <span>${post.comments} comments</span>
            </div>
        </div>
    `;
    return newDiv;
}

function showAllPosts() {
    divForPost.innerHTML = ''; // Clear the container first
    newPostArray.forEach(post => {
        divForPost.appendChild(createNewDiv(post));
    });
}

function showAllPostsWithName(name) {
    divForPost.innerHTML = ''; // Clear the container first
    newPostArray.forEach(post => {
        if (post.author.name === name) {
            divForPost.appendChild(createNewDiv(post));
        }
    });
}

function parseDateToDays(date) {
    const [dd, mm, yyyy] = date.split('/').map(Number);
    return yyyy * 365 + mm * 30 + dd;
};

function showPostsInDateRange() {
    const startDate = document.querySelector('span.dropdown-date #start').value;
    const endDate = document.querySelector('span.dropdown-date #end').value;
    const daysStart = parseDateToDays(startDate);
    const daysEnd = parseDateToDays(endDate);
    divForPost.innerHTML = ''; // Clear the container first
    newPostArray.forEach(post => {
        const postDays = parseDateToDays(post.postTime);
        if (daysStart <= postDays && postDays <= daysEnd) {
            let newDiv = createNewDiv(post);
            divForPost.appendChild(newDiv);
        }
    });
}




// const PostModule = (() => {
//     let newPostArray = [];
//     const divForPost = document.querySelector('.post');

//     const init = () => {
//         loadData();
//         setupEventListeners();
//     };

//     const loadData = () => {
//         const savedPosts = localStorage.getItem('data');
//         if (savedPosts) {
//             newPostArray = JSON.parse(savedPosts);
//             renderAllPosts();
//         }   
//     };

//     const saveData = () => {
//         localStorage.setItem('data', JSON.stringify(newPostArray));
//     };

//     const setupEventListeners = () => {
//         window.onload = loadData;
//         document.getElementById('refreshButton').addEventListener('click', handleRefresh);
//         window.onclick = handleDropdownClick;
//     };

//     const handleRefresh = () => {
//         window.scrollTo(0, 0);
//         setTimeout(() => location.reload(), 200);
//     };

//     const handleDropdownClick = (event) => {
//         if (!event.target.matches('.dropbtn')) {
//             document.querySelectorAll('.dropdown-content').forEach(dropdown => {
//                 dropdown.classList.remove('show');
//             });
//         }
//     };

//     const createPost = () => {
//         const today = new Date();
//         const formattedToday = formatDate(today);
//         const val = document.querySelector('.create-post-input textarea').value;

//         let newPost = {
//             postTime: formattedToday,
//             content: val,
//             author: {
//                 name: "Shreyansh Jain",
//                 designation: "ASE Intern Tekion"
//             },
//             reactions: 0,
//             comments: 0
//         };

//         newPostArray.push(newPost);
//         saveData();
//         renderAllPosts();
//         document.querySelector('.create-post-input textarea').value = '';
//     };

//     const formatDate = (date) => {
//         const yyyy = date.getFullYear();
//         let mm = date.getMonth() + 1;
//         let dd = date.getDate();
//         return `${dd.toString().padStart(2, '0')}/${mm.toString().padStart(2, '0')}/${yyyy}`;
//     };

//     const renderAllPosts = () => {
//         divForPost.innerHTML = '';
//         newPostArray.forEach(post => {
//             divForPost.appendChild(createPostElement(post));
//         });
//     };

//     const createPostElement = (post) => {
//         const newDiv = document.createElement('div');
//         newDiv.setAttribute("data-date", post.postTime);
//         newDiv.innerHTML = `
//             <div class="post-author">
//                 <img src="images/user-1.png" alt="Author Image">
//                 <div>
//                     <h1>${post.author.name}</h1>
//                     <small>${post.author.designation}</small>
//                     <small>${post.postTime}</small>
//                 </div>
//             </div>
//             <p>${post.content}</p>
//             <img src="images/post-image-1.png" width="100%" alt="Post Image">
//             <div class="post-stats">
//                 <div>
//                     <span class="liked-user">${post.reactions} reactions</span>
//                 </div>
//                 <div>
//                     <span>${post.comments} comments</span>
//                 </div>
//             </div>
//         `;
//         return newDiv;
//     };

//     const sortByDate = (order = 'asc') => {
//         newPostArray.sort((a, b) => {
//             const dateA = parseDateToDays(a.postTime);
//             const dateB = parseDateToDays(b.postTime);
//             return order === 'asc' ? dateA - dateB : dateB - dateA;
//         });
//         saveData();
//         renderAllPosts();
//     };

//     const parseDateToDays = (date) => {
//         const [dd, mm, yyyy] = date.split('/').map(Number);
//         return yyyy * 365 + mm * 30 + dd;
//     };

//     const filterPostsByDateRange = (startDate, endDate) => {
//         const daysStart = parseDateToDays(startDate);
//         const daysEnd = parseDateToDays(endDate);

//         divForPost.innerHTML = '';
//         newPostArray.forEach(post => {
//             const postDays = parseDateToDays(post.postTime);
//             if (daysStart <= postDays && postDays <= daysEnd) {
//                 divForPost.appendChild(createPostElement(post));
//             }
//         });
//     };

//     return {
//         init,
//         createPost,
//         sortByDate,
//         filterPostsByDateRange
//     };
// })();

// // Initialize the module
// PostModule.init();