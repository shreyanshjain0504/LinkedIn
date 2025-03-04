class SkillManager {
    constructor() {
        /* Declare DOM variables */
        this.skillInput = document.querySelector('.input-for-skills');
        this.divForSkills = document.querySelector('.skills');
        this.addSkillBtn = document.querySelector('.add-skills');

        /* Binding the methods with the class */
        this.handleSkillCreation = this.handleSkillCreation.bind(this);
        this.skillInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.handleSkillCreation();
        });
        this.addSkillBtn.addEventListener('click', () => this.handleSkillCreation());

        this.renderSkillsAll(); 
    }

    static createSkillElement(skill) {
        const skillTag = document.createElement('a');
        skillTag.className = 'skills-btn';
        skillTag.textContent = skill.name; 
        return skillTag;
    }

    renderSkill(skill) {
        const skillElement = SkillManager.createSkillElement(skill);
        this.divForSkills.appendChild(skillElement);
    }

    renderSkillsAll() {
        this.divForSkills.innerHTML = ''; 
        const skillsArray = localStorage.getItem('skills')
                            ? JSON.parse(localStorage.getItem('skills')) : [];
        skillsArray.forEach(skill => this.renderSkill(skill));
    }

    // Save new skill to localStorage
    saveDataSkills(newSkill) {
        const skillsArray = localStorage.getItem('skills') 
                            ? JSON.parse(localStorage.getItem('skills')) : [];
        const newSkillsArray = [...skillsArray, newSkill];
        localStorage.setItem('skills', JSON.stringify(newSkillsArray)); 
    }

    skillFactory(skill) {
        return { type: 'skill', name: skill }; 
    }

    // Handle skill creation
    handleSkillCreation() {
        const skillName = this.skillInput.value.trim();
        if (!skillName) return; 
        const newSkill = this.skillFactory(skillName);
        this.skillInput.value = '';
        this.saveDataSkills(newSkill);
        this.renderSkill(newSkill);
    }
}

const skillManager = new SkillManager()