function toggleMenu() {
    /* adds and removes the class name open-menu whenever called */
    let profileMenu = document.getElementById("profileMenu");
    profileMenu.classList.toggle("open-menu");
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function displayDateRange() {
    const dropdownContentDate = document.querySelector('span.dropdown-date');
    dropdownContentDate.style.display = (dropdownContentDate.style.display === "block") ? "none" : "block";
}

function displaySortOrder() {
    const dropdownContent = document.querySelector('span.dropdown-content');
    dropdownContent.style.display = (dropdownContent.style.display === "block") ? "none" : "block";
}

const setupEventListeners = () => {
    window.onload = loadData;
    document.getElementById('refreshButton').addEventListener('click', handleRefresh);
    window.onclick = handleDropdownClick;
};

const handleRefresh = () => {
    window.scrollTo(0, 0);
    setTimeout(() => location.reload(), 200);
};

const handleDropdownClick = (event) => {
    if (!event.target.matches('.dropbtn')) {
        document.querySelectorAll('.dropdown-content').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }
};

const parseDateToDays = (date) => {
    const [dd, mm, yyyy] = date.split('/').map(Number);
    return yyyy * 365 + mm * 30 + dd;
};

const list = document.querySelectorAll('.dropdown-content a');
list.forEach(item => {
    item.addEventListener('click', (event) => {
        PostModule.sortByDate(event.target.innerHTML);
    });
});

function formatDate(date) {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    return `${dd.toString().padStart(2, '0')}/${mm.toString().padStart(2, '0')}/${yyyy}`;
}

const dateList = document.querySelector('.dropdown-date button');
dateList.addEventListener('click', (event) => {
    let sD = document.querySelector('span.dropdown-date #start').value;
    let eD = document.querySelector('span.dropdown-date #end').value;
    let startTime = Number(sD.substring(0, 4)) * 365 + Number(sD.substring(5, 7)) * 30 + Number(sD.substring(8, 10));
    let endTime = Number(eD.substring(0, 4)) * 365 + Number(eD.substring(5, 7)) * 30 + Number(eD.substring(8, 10));
    PostModule.filterPostsByDateRange(startTime, endTime);
});

const PostModule = (() => {
    let newPostArray = [];
    const divForPost = document.querySelector('.post');

    const init = () => {
        loadData();
        setupEventListeners();
    };

    const loadData = () => {
        const savedPosts = localStorage.getItem('data');
        if (savedPosts) {
            newPostArray = JSON.parse(savedPosts);
            renderAllPosts();
        }
    };

    const saveData = () => {
        localStorage.setItem('data', JSON.stringify(newPostArray));
    };

    const createPost = () => {
        const today = new Date();
        const formattedToday = formatDate(today);
        const val = document.querySelector('.create-post-input textarea').value;

        let newPost = {
            postTime: formattedToday,
            content: val,
            author: {
                name: "Shreyansh Jain",
                designation: "ASE Intern Tekion"
            },
            reactions: 0,
            comments: 0
        };

        newPostArray.push(newPost);
        saveData();
        renderAllPosts();
        document.querySelector('.create-post-input textarea').value = '';
    };

    const createNewDiv = (post) => {
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

    const renderAllPosts = () => {
        divForPost.innerHTML = '';
        newPostArray.forEach(post => {
            divForPost.appendChild(createPostElement(post));
        });
    };

    const createPostElement = (post) => {
        const newDiv = document.createElement('div');
        newDiv.setAttribute("data-date", post.postTime);
        newDiv.innerHTML = `
            <div class="post-author">
                <img src="images/user-1.png" alt="Author Image">
                <div>
                    <h1>${post.author.name}</h1>
                    <small>${post.author.designation}</small>
                    <small>${post.postTime}</small>
                </div>
            </div>
            <p>${post.content}</p>
            <img src="images/post-image-1.png" width="100%" alt="Post Image">
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
    };

    const sortByDate = (order = 'Asc') => {
        newPostArray.sort((a, b) => {
            const dateA = parseDateToDays(a.postTime);
            const dateB = parseDateToDays(b.postTime);
            return order === 'Asc' ? dateA - dateB : dateB - dateA;
        });
        saveData();
        renderAllPosts();
    };

    const filterPostsByDateRange = (startTime, endTime) => {
        divForPost.innerHTML = '';
        newPostArray.forEach(post => {
            const postDays = parseDateToDays(post.postTime);
            if (startTime <= postDays && postDays <= endTime) {
                divForPost.appendChild(createPostElement(post));
            }
        });
    };

    const showAllPostsWithName = (name) => {
        divForPost.innerHTML = ''; // Clear the container first
        newPostArray.forEach(post => {
            if (post.author.name === name) {
                divForPost.appendChild(createNewDiv(post));
            }
        });
    }

    return {
        init,
        createPost,
        showAllPostsWithName,
        sortByDate,
        filterPostsByDateRange
    };
})();

// Initialize the module
PostModule.init();

const submitButton = document.querySelector('.submit-class');
submitButton.addEventListener('click', PostModule.createPost);

const searchList = document.querySelectorAll('.peoples');
searchList.forEach(item => {
    console.log(item);
    item.addEventListener('click', (event) => {
        console.log(event.target.innerHTML);
        PostModule.showAllPostsWithName(event.target.innerHTML);
    });
});