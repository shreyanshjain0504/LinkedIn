class PostModule {
    constructor() {
        /* Declare DOM variables */
        this.divForPost = document.querySelector('.post');
        this.searchList = document.querySelectorAll('.peoples');
        this.sortOptionsList = document.querySelectorAll('span#myDropdown a')
        this.submitBtnDate = document.querySelector('.submit-class-date-sort');
        this.submitButton = document.querySelector('.submit-class');

        /* Adding event listeners */
        this.searchList.forEach(item => {
            item.addEventListener('click', (e) => {
                this.showAllPostsWithName(e?.target?.innerHTML);
            });
        });
        this.sortOptionsList.forEach(item => {
            item.addEventListener('click', (e) => {
                this.sortByDate(e?.target?.textContent);
            });
        });
        /* Binding because it is called via button, this needs to point to the class */
        this.submitButton.addEventListener('click', this.createPost.bind(this));
        this.submitBtnDate.addEventListener('click', this.filterPostsByDateRange.bind(this))

        /* Render for the first time */
        this.renderAllPosts()
    }
    
    static saveData(newPost) {
        const postArray = localStorage.getItem('data') 
                        ? JSON.parse(localStorage.getItem('data')) : []
        const newPostArray = [...postArray, newPost]
        localStorage.setItem('data', JSON.stringify(newPostArray));
    }
    
    createPost() {
        const today = new Date();
        const formattedToday = formatDate(today)
        const postContent = document.querySelector('.create-post-input textarea').value;
        const newPost = {
            postTime: formattedToday,
            content: postContent,
            author: {
                name: "Shreyansh Jain",
                designation: "ASE Intern Tekion"
            }
        };
        PostModule.saveData(newPost)
        this.renderPost(newPost);  // render just one post 
        document.querySelector('.create-post-input textarea').value = '';
    }
    
    static createPostElement(post = {}) {
        const newDiv = document.createElement('div');
        newDiv.setAttribute("data-date", post?.postTime);
        newDiv.innerHTML = `
            <div class="post-author">
                <img src="images/user-1.png" alt="Author Image">
                <div>
                    <h1>${post?.author?.name}</h1>
                    <small>${post?.author?.designation}</small>
                    <small>${post?.postTime}</small>
                </div>
            </div>
            <p>${post?.content}</p>
            <img src="images/post-image-1.png" width="100%" alt="Post Image">
            <div class="post-stats">
                <div>
                    <span class="liked-user">0 reactions</span>
                </div>
                <div>
                    <span>0 comments</span>
                </div>
            </div>
        `;
        return newDiv;
    }
    
    renderPost(post) {
        this.divForPost.appendChild(PostModule.createPostElement(post));
    }

    renderAllPosts() {
        this.divForPost.innerHTML = '';
        const postArray = localStorage.getItem('data') 
                        ? JSON.parse(localStorage.getItem('data')) : []
        postArray.forEach(post => this.renderPost(post));
    }

    sortByDate(order = 'Asc') {
        const postArray = localStorage.getItem('data') 
                        ? JSON.parse(localStorage.getItem('data')) : []
        postArray.sort((a, b) => {
            const dateA = parseDateToDays(a.postTime);
            const dateB = parseDateToDays(b.postTime);
            return order === 'Asc' ? dateA - dateB : dateB - dateA;
        });
        this.divForPost.innerHTML = '';
        postArray.forEach(post => this.renderPost(post));
    }
    
    filterPostsByDateRange() {
        const startDate = document.querySelector('input#start').value
        const endDate = document.querySelector('input#end').value
        const startTime = parseDateToDaysForFilter(startDate)
        const endTime = parseDateToDaysForFilter(endDate)
        this.divForPost.innerHTML = '';
        const postArray = localStorage.getItem('data') 
                        ? JSON.parse(localStorage.getItem('data')) : []
        postArray.forEach(post => {
            const postDays = parseDateToDays(post.postTime);
            if (startTime <= postDays && postDays <= endTime) {
                this.renderPost(post)
            }
        });
    }
    
    showAllPostsWithName(name) {
        this.divForPost.innerHTML = ''; // Clear the container first
        const postArray = localStorage.getItem('data') 
                        ? JSON.parse(localStorage.getItem('data')) : []
        postArray.forEach(post => {
            if (post.author.name === name) {
                this.renderPost(post)
            }
        });
    }
}

const postModule = new PostModule()