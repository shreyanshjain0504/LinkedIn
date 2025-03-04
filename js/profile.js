class ConcreteSectionBuilder {
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

class ProfileManager {
    constructor() {
        this.submitButton = document.querySelector('.btn-submit');        
        this.submitButton.addEventListener('click', () => this.handleSubmit());
    }

    handleSubmit() {
        if (this instanceof ExperienceManager) {
            this.handleExperienceCreation();
        } else {
            this.handleEducationCreation();
        }
    }

    renderAll() {}
    saveData(newItem) {}
    handleRemoveItem(e) {}
}

class ExperienceManager extends ProfileManager {
    constructor() {
        super();
        this.divForExperience = document.querySelector('.experience');
        this.renderExperienceAll();
        this.divForExperience.addEventListener('click', this.handleRemoveItem.bind(this));
    }

    renderExperienceAll() {
        const experienceArray = localStorage.getItem('experience')
                                ? JSON.parse(localStorage.getItem('experience')) : [];
        this.divForExperience.innerHTML = '';
        experienceArray.forEach(experience => {
            this.divForExperience.innerHTML += `
                <div class="profile-desc-row" id="${experience.time}">
                    <img src="images/tekion.png" height="120px" alt="${experience.company}">
                    <div>
                        <h3>${experience.company}</h3>
                        <b>${experience.position}</b>
                        <b>${experience.from} - ${experience.to}</b>
                        <p>${experience.desc}</p>
                        <hr>
                    </div>
                    <button class="remove-btn" data-id="${experience.time}">Remove</button>
                </div>
            `;
        });
    }

    saveDataExperience(newExperience) {
        const experienceArray = localStorage.getItem('experience')
                                ? JSON.parse(localStorage.getItem('experience')) : [];
        const newExperienceArray = [newExperience, ...experienceArray];
        localStorage.setItem('experience', JSON.stringify(newExperienceArray));
    }

    handleExperienceCreation() {
        const sectionBuilder = new ConcreteSectionBuilder();
        const newExperience = sectionBuilder
            .setPosition(document.querySelector('#position').value)
            .setCompany(document.querySelector('#company').value)
            .setFrom(document.querySelector('#from').value)
            .setTo(document.querySelector('#to').value)
            .setDesc(document.querySelector('#desc').value)
            .setTime(Date.now())
            .setType("experience")
            .getSection();
        this.saveDataExperience(newExperience);
        this.renderExperienceAll();
    }

    handleRemoveItem(e) {
        if (!e.target.classList.contains('remove-btn')) return;
        const id = e.target.getAttribute('data-id');
        const experienceArray = localStorage.getItem('experience')
            ? JSON.parse(localStorage.getItem('experience')) : [];
        const updatedArray = experienceArray.filter(experience => experience.time != id);
        localStorage.setItem('experience', JSON.stringify(updatedArray));
        this.renderExperienceAll();
    }
}

class EducationManager extends ProfileManager {
    constructor() {
        super();
        this.divForEducation = document.querySelector('.education');
        this.renderEducationAll();
        this.divForEducation.addEventListener('click', this.handleRemoveItem.bind(this));
    }

    renderEducationAll() {
        const educationArray = localStorage.getItem('education')
                                ? JSON.parse(localStorage.getItem('education')) : [];
        this.divForEducation.innerHTML = '';
        educationArray.forEach(education => {
            this.divForEducation.innerHTML += `
                <div class="profile-desc-row" id="${education.time}">
                    <img src="images/nitraipur.png" alt="">
                    <div>
                        <h3>${education.college}</h3>
                        <b>${education.branch}</b>
                        <b>${education.from} - ${education.to}</b>
                        <p>${education.desc}</p>
                        <hr>
                    </div>
                    <button class="remove-btn" data-id="${education.time}">Remove</button>
                </div>
            `;
        });
    }

    saveDataEducation(newEducation) {
        const educationArray = localStorage.getItem('education')
                                ? JSON.parse(localStorage.getItem('education')) : [];
        const newEducationArray = [newEducation, ...educationArray];
        localStorage.setItem('education', JSON.stringify(newEducationArray));
    }

    handleEducationCreation() {
        const sectionBuilder = new ConcreteSectionBuilder();
        const newEducation = sectionBuilder
            .setBranch(document.querySelector('#position').value)
            .setCollege(document.querySelector('#company').value)
            .setFrom(document.querySelector('#from').value)
            .setTo(document.querySelector('#to').value)
            .setDesc(document.querySelector('#desc').value)
            .setTime(Date.now())
            .setType("education")
            .getSection();
        this.saveDataEducation(newEducation);
        this.renderEducationAll();
    }

    handleRemoveItem(e) {
        if (!e.target.classList.contains('remove-btn')) return;
        const id = e.target.getAttribute('data-id');
        const educationArray = localStorage.getItem('education')
            ? JSON.parse(localStorage.getItem('education')) : [];
        const updatedArray = educationArray.filter(education => education.time != id);
        localStorage.setItem('education', JSON.stringify(updatedArray));
        this.renderEducationAll();
    }
}

const educationManager = new EducationManager();
const experienceManager = new ExperienceManager();