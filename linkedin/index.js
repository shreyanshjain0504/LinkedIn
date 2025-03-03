const divForPost = document.querySelector('.post');
const list = document.querySelectorAll('.peoples');
const listOfSorts = document.querySelectorAll('span#myDropdown a')
let newPostArray = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : []
const submitBtnDate = document.querySelector('.submit-class-date-sort');
const submitButton = document.querySelector('.submit-class');

class ToggleMenus {
    constructor(props) {}

    static toggleProfileMenu() {
        /* adds and removes the class name open-menu whenever called */
        let profileMenu = document.getElementById("profileMenu");
        profileMenu.classList.toggle("open-menu");
    }
    
    static toggleListMenu() {
        /* toggles the profile menu */ 
        let dropdown = document.getElementById("myDropdown")
        dropdown.classList.toggle("show");
    }
    
    static displayDateRange() {
        /* displays the date range sort functionality */
        let dropdownContentDate = document.querySelector('span.dropdown-date')
        dropdownContentDate.classList.toggle('show-dropdown');
    }
    
    static displaySortOrder() {
        /* displays the post sort functionality */
        let dropdownContent = document.querySelector('span.dropdown-content')
        dropdownContent.classList.toggle('show-dropdown');
    }
}

class DateOperator {
    constructor(props) {}

    static parseDateToDays(date = new Date()) {
        const [dd, mm, yyyy] = date.split('/').map(Number);
        return yyyy * 365 + mm * 30 + dd;
    };
    
    static formatDate(date = new Date()) {
        let dd = date.getDate()
        let mm = date.getMonth() + 1
        let yyyy = date.getFullYear()
        if (dd < 10) dd = '0' + dd
        if (mm < 10) mm = '0' + mm
        return `${dd}/${mm}/${yyyy}`
    }

    static parseDateToDaysForFilter(date = new Date()) {
        const [yyyy, mm, dd] = date.split('-').map(Number);
        return yyyy * 365 + mm * 30 + dd;
    };
}

class PostModule extends DateOperator {
    constructor(props) {
        super(props)
        PostModule.renderAllPosts()

        list.forEach(item => {
            item.addEventListener('click', (e) => {
                console.log('this is called! showAllPostWithName()!')
                PostModule.showAllPostsWithName(e.target.innerHTML);
            });
        });

        listOfSorts.forEach(item => {
            item.addEventListener('click', (e) => {
                console.log('this is called! sortByDate()!')
                PostModule.sortByDate(e.target.textContent);
            });
        });
    }
    
    static saveData() {
        console.log('save data is called!')
        console.log('updated postArray - ', newPostArray)
        localStorage.setItem('data', JSON.stringify(newPostArray));
    }
    
    static createPost() {
        console.log('post is created!')
        const today = new Date();
        const formattedToday = DateOperator.formatDate(today);
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
        PostModule.saveData()
        PostModule.renderPost(newPost);  // render just one post 
        document.querySelector('.create-post-input textarea').value = '';
    };
    
    static createPostElement(post) {
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
    
    static renderPost(post) {
        divForPost.appendChild(PostModule.createPostElement(post));
    };

    static renderAllPosts() {
        divForPost.innerHTML = '';
        newPostArray.forEach(post => {
            divForPost.appendChild(PostModule.createPostElement(post));
        });
    };

    static sortByDate(order = 'Asc') {
        newPostArray.sort((a, b) => {
            console.log('sort is called!')
            const dateA = DateOperator.parseDateToDays(a.postTime);
            const dateB = DateOperator.parseDateToDays(b.postTime);
            console.log(dateA, dateB)
            return order === 'Asc' ? dateA - dateB : dateB - dateA;
        });
        PostModule.saveData();
        this.renderAllPosts();
    };
    
    static filterPostsByDateRange() {
        const startTime = DateOperator.parseDateToDaysForFilter(document.querySelector('input#start').value)
        const endTime = DateOperator.parseDateToDaysForFilter(document.querySelector('input#end').value)
        divForPost.innerHTML = '';
        newPostArray.forEach(post => {
            const postDays = DateOperator.parseDateToDays(post.postTime);
            if (startTime <= postDays && postDays <= endTime) {
                divForPost.appendChild(PostModule.createPostElement(post));
            }
        });
    };
    
    static showAllPostsWithName(name) {
        divForPost.innerHTML = ''; // Clear the container first
        newPostArray.forEach(post => {
            if (post.author.name === name) {
                divForPost.appendChild(PostModule.createPostElement(post));
            }
        });
    }
}

class EventListenersAdder extends ToggleMenus {
    constructor(props) {
        super(props)
        window.onload = postModule.loadData;
    }
}

const postModule = new PostModule()
submitButton.addEventListener('click', PostModule.createPost);
submitBtnDate.addEventListener('click', PostModule.filterPostsByDateRange)