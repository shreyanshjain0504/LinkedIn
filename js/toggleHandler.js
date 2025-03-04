class ToggleHandler {
    constructor() {
        /* Declare DOM variable */
        this.profileMenu = document.getElementById("profileMenu");
        this.overlay = document.getElementById('popupOverlay');
        this.profileImage = document.querySelector('.nav-profile-img')
        this.formCloseBtn = document.querySelector('.btn-close-popup')
        this.addBtns = document.querySelectorAll('.add-btn')
        this.companyInput = document.querySelector('input#company')
        this.positionInput = document.querySelector('input#position')
        this.companyLabel = document.querySelector('#com')
        this.positionLabel = document.querySelector('#pos')
        this.submitBtn = document.querySelector('.btn-submit')

        /* Adding event listeners */
        this.profileImage.addEventListener('click', () => this.toggleProfileMenu())
        this.formCloseBtn.addEventListener('click', () => this.togglePopup())
        this.submitBtn.addEventListener('click', () => this.togglePopup())
        this.addBtns.forEach(addBtn => {
            addBtn.addEventListener('click', () => this.togglePopup())
            const isExperience = addBtn.textContent.trim() == 'Add Experience'
            addBtn.addEventListener('click', () => this.changeFormType(isExperience ? 'experience' : 'education'))
        })
    }
    
    toggleProfileMenu() {
        /* adds and removes the class name open-menu whenever called */
        this.profileMenu.classList.toggle("open-menu");
    }
    
    togglePopup() {
        /* displays the popup form */
        this.overlay.classList.toggle('show');
    }

    changeFormType(type) {
        this.companyInput.placeholder = (type == 'education' ? 'Enter your College' : 'Enter your Company');
        this.positionInput.placeholder = (type == 'education' ? 'Enter your Branch' : 'Enter your Position');
        this.companyLabel.innerHTML = (type == 'education' ? 'College' : 'Company');
        this.positionLabel.innerHTML = (type == 'education' ? 'Branch' : 'Position');
        this.submitBtn.innerHTML = (type == 'education' ? 'Add Education' : 'Add Experience');
        this.submitBtn.setAttribute('onclick', (type == 'education' ? 'createEducation()' : 'creatreExperience()'));
    }
}

const toggleHandler = new ToggleHandler()