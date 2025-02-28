class ToggleHandler {
    constructor(props) {}
    
    static toggleProfileMenu() {
        /* adds and removes the class name open-menu whenever called */
        let profileMenu = document.getElementById("profileMenu");
        profileMenu.classList.toggle("open-menu");
    }
    
    static togglePopup() {
        let overlay = document.getElementById('popupOverlay');
        overlay.classList.toggle('show');
    }
}

function change(type) {
    document.querySelector('input#company').setAttribute('placeholder', (type == 'ed' ? 'Enter your College' : 'Enter your Company'));
    document.querySelector('input#position').setAttribute('placeholder', (type == 'ed' ? 'Enter your Branch' : 'Enter your Position'));
    document.querySelector('#pos').innerHTML = (type == 'ed' ? 'Branch' : 'Position');
    document.querySelector('#com').innerHTML = (type == 'ed' ? 'College' : 'Company');
    document.querySelector('.btn-submit').innerHTML = (type == 'ed' ? 'Add Education' : 'Add Experience');
    document.querySelector('.btn-submit').setAttribute('onclick', (type == 'ed' ? 'createEducation()' : 'creatreExperience()'));
}

class ConcreteSectionBuilder  {
    setType(type) {
        this.type = type;
        return this;
    }

    setCollege(college) {
        this.college = college;
        return this;
    }

    setBranch(branch) {
        this.branch = branch;
        return this;
    }

    setPosition(position) {
        this.position = position;
        return this;
    }

    setCompany(company) {
        this.company = company;
        return this;
    }

    setFrom(from) {
        this.from = from;
        return this;
    }

    setTo(to) {
        this.to = to;
        return this;
    }

    setDesc(desc) {
        this.desc = desc;
        return this;
    }

    setTime(time) {
        this.time = time;
        return this;
    }

    getSection() {
        return this;
    }
}

const ProfileManager = (() => {  
    const elements = {
        experienceContainer: document.querySelector('.experience'),
        educationContainer: document.querySelector('.education'),
        skillsContainer: document.querySelector('.skills'),
        inputSkill: document.querySelector('.input-for-skills'),
        submitButton: document.querySelector('.btn-submit')
    };

    /* Factory Method */
    const SkillFactory = (skill) => ({
        type: "skill",
        name: skill
    });

    const saveDataExperience = () => {
        localStorage.setItem('experience', JSON.stringify(this.experienceList));
    };

    const saveDataEducation = () => {
        localStorage.setItem('education', JSON.stringify(this.educationList));
    };

    const saveDataSkills = () => {
        localStorage.setItem('skills', JSON.stringify(this.skillList));
    };

    const loadData = () => {
        experienceList = JSON.parse(localStorage.getItem('experience')) || [];
        educationList = JSON.parse(localStorage.getItem('education')) || [];
        skillList = JSON.parse(localStorage.getItem('skills')) || [];
        renderAll();
    };

    // Render functions
    const renderAll = () => {
        renderExperienceAll();
        renderEducationAll();
        renderSkillsAll();
    };

    /* add just one divs to the div and don't re-render div */ 
    const renderSkills = (skill) => {
        elements.skillsContainer.innerHTML += `<a class="skills-btn">${skill.name}</a>`;
    }

    /* renderAll lists at refresh */
    const renderExperienceAll = () => {
        elements.experienceContainer.innerHTML = '';
        this.experienceList.forEach(exp => { 
            elements.experienceContainer.innerHTML += `
                <div class="profile-desc-row" id="${exp.time}">
                    <img src="images/tekion.png" height="120px" alt="${exp.company}">
                    <div>
                        <h3>${exp.company}</h3>
                        <b>${exp.position}</b>
                        <b>${exp.from} - ${exp.to}</b>
                        <p>${exp.desc}</p>
                        <hr>
                    </div>
                    <button class="remove-btn" data-id="${exp.time}">Remove</button>
                </div>
            `;
        });
    };

    const renderEducationAll = () => {
        elements.educationContainer.innerHTML = '';
        this.educationList.forEach(ed => {
            elements.educationContainer.innerHTML += `
                <div class="profile-desc-row" id="${ed.time}">
                    <img src="images/nitraipur.png" alt="">
                    <div>
                        <h3>${ed.college}</h3>
                        <b>${ed.branch}</b>
                        <b>${ed.from} - ${ed.to}</b>
                        <p>${ed.desc}</p>
                        <hr>
                    </div>
                    <button class="remove-btn" data-id="${ed.time}">Remove</button>
                </div>
            `;
        });
    };

    const renderSkillsAll = () => {
        elements.skillsContainer.innerHTML = '';
        this.skillList.forEach(skill => {
            elements.skillsContainer.innerHTML += `<a class="skills-btn">${skill.name}</a>`;
        });
    };

    // Event handlers
    const handleExperienceCreation = () => {
        /* Builder method */
        const sectionBuilder = new ConcreteSectionBuilder()
        const exp = sectionBuilder
            .setPosition(document.querySelector('#position').value)
            .setCompany(document.querySelector('#company').value)
            .setFrom(document.querySelector('#from').value)
            .setTo(document.querySelector('#to').value)
            .setDesc(document.querySelector('#desc').value) 
            .setTime(Date.now())
            .setType("experience") 
            .getSection()
        this.experienceList.unshift(exp);
        saveDataExperience();
        renderExperienceAll();
    };

    const handleEducationCreation = () => {
        /* Builder method */
        const sectionBuilder = new ConcreteSectionBuilder()
        const ed = sectionBuilder
            .setBranch(document.querySelector('#position').value)
            .setCollege(document.querySelector('#company').value)
            .setFrom(document.querySelector('#from').value)
            .setTo(document.querySelector('#to').value)
            .setDesc(document.querySelector('#desc').value) 
            .setTime(Date.now())
            .setType("education") 
            .getSection()

        this.educationList.unshift(ed);
        saveDataEducation();
        renderEducationAll();
    };

    const handleSkillCreation = () => {
        const skillName = elements.inputSkill.value.trim();
        if (!skillName) {
            alert('Enter a skill first!');
            return;
        }
        /* Factory Method */ 
        const newSkill = SkillFactory(skillName);
        this.skillList.push(newSkill);
        elements.inputSkill.value = '';
        saveDataSkills();
        renderSkills(newSkill);
    };

    const handleRemoveItem = (e) => {
        if (!e.target.classList.contains('remove-btn')) return;
        const id = e.target.getAttribute('data-id');
        experienceList = this.experienceList.filter(exp => exp.time != id);
        educationList = this.educationList.filter(ed => ed.time != id);
        saveDataEducation();
        saveDataExperience();
        renderAll();
    };

    // Event listeners
    elements.experienceContainer.addEventListener('click', handleRemoveItem);
    elements.educationContainer.addEventListener('click', handleRemoveItem);
    
    elements.submitButton.addEventListener('click', () => {
        if (elements.submitButton.innerHTML.includes('Experience')) {
            handleExperienceCreation();
        } else {
            handleEducationCreation();
        }
    });

    return {
        init: loadData,
        createExperience: handleExperienceCreation,
        createEducation: handleEducationCreation,
        createSkills: handleSkillCreation
    };
})();

// Initialize the Profile Manager
window.onload = ProfileManager.init;

let profileImage = document.querySelector('.nav-profile-img')
let addSkillBtn = document.querySelector('.add-skills')
let formCloseBtn = document.querySelector('.btn-close-popup')
let addBtns = document.querySelectorAll('.add-btn')
let submitBtn = document.querySelector('.btn-submit')
let inputSkillBtn = document.querySelector('.input-for-skills')

addSkillBtn.addEventListener('click', ProfileManager.createSkills)
profileImage.addEventListener('click', ToggleHandler.toggleProfileMenu)
formCloseBtn.addEventListener('click', ToggleHandler.togglePopup)
submitBtn.addEventListener('click', ToggleHandler.togglePopup)
addBtns.forEach(addBtn => {
    addBtn.addEventListener('click', ToggleHandler.togglePopup)
    const isExperience = addBtn.textContent.trim() == 'Add Experience'
    addBtn.addEventListener('click', () => change(isExperience ? 'exp' : 'ed'))
})
inputSkillBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') ProfileManager.createSkills();
});