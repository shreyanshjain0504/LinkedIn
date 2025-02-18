function toggleMenu() {
    /* adds and removes the class name open-menu whenever called */
    let profileMenu = document.getElementById("profileMenu");
    profileMenu.classList.toggle("open-menu");
}

function togglePopup() {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');
}

function change(type) {
    document.querySelector('input#company').setAttribute('placeholder', type == 'ed' ? 'Enter your College' : 'Enter your Company');
    document.querySelector('input#position').setAttribute('placeholder', type == 'ed' ? 'Enter your Branch' : 'Enter your Position');
    document.querySelector('#pos').innerHTML = type == 'ed' ? 'Branch' : 'Position';
    document.querySelector('#com').innerHTML = type == 'ed' ? 'College' : 'Company';
    document.querySelector('.btn-submit').innerHTML = type == 'ed' ? 'Add Education' : 'Add Experience';
    document.querySelector('.btn-submit').setAttribute('onclick', type == 'ed' ? 'createEducation()' : 'creatreExperience()');
}

/* Interface */
class SectionBuilder {
    // all abstract methods
    setType(type) {}

    setCollege(college) {}

    setBranch(branch) {}

    setPosition(postition) {}

    setCompany(company) {}

    setFrom(from) {}

    setTo(to) {}

    setDesc(desc) {}

    setTime(time) {}

    getSection() {}
}


  class ConcreteSectionBuilder extends SectionBuilder {
    constructor() {
      super()
    }
  
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

  class Section {
    render() {
      // make create divs and push it to the respective divs
      renderExperience();
      renderEducation();
      renderSkills();
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

    const saveData = () => {
        localStorage.setItem('experience', JSON.stringify(this.experienceList));
        localStorage.setItem('education', JSON.stringify(this.educationList));
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
        renderExperience();
        renderEducation();
        renderSkills();
    };

    const renderExperience = () => {
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

    const renderEducation = () => {
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

    const renderSkills = () => {
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
        saveData();
        renderExperience();
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
        saveData();
        renderEducation();
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
        saveData();
        renderSkills();
    };

    const handleRemoveItem = (event) => {
        if (!event.target.classList.contains('remove-btn')) return;
        const id = event.target.getAttribute('data-id');
        experienceList = this.experienceList.filter(exp => exp.time != id);
        educationList = this.educationList.filter(ed => ed.time != id);
        saveData();
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

    document.querySelector('.input-for-skills').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') handleSkillCreation();
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








// class ProfileManager {  
//     constructor() {
//         this.experienceContainer = document.querySelector('.experience'),
//         this.educationContainer = document.querySelector('.education'),
//         this.skillsContainer = document.querySelector('.skills'),
//         this.inputSkill = document.querySelector('.input-for-skills'),
//         this.submitButton = document.querySelector('.btn-submit')
//     };

//     /* Factory Method */
//     static SkillFactory(skill) {
//         this.type = "skill",
//         this.name = skill
//     }

//     static saveData() {
//         localStorage.setItem('experience', JSON.stringify(this.experienceList));
//         localStorage.setItem('education', JSON.stringify(this.educationList));
//         localStorage.setItem('skills', JSON.stringify(this.skillList));
//     }

//     static loadData() {
//         this.experienceList = JSON.parse(localStorage.getItem('experience')) || [];
//         this.educationList = JSON.parse(localStorage.getItem('education')) || [];
//         this.skillList = JSON.parse(localStorage.getItem('skills')) || [];
//         this.renderAll();
//     }

//     // Render functions
//     static renderAll() {
//         this.srenderExperience();
//         this.renderEducation();
//         this.renderSkills();
//     }

//     renderExperience = () => {
//         elements.experienceContainer.innerHTML = '';
//         this.experienceList.forEach(exp => { 
//             this.elements.experienceContainer.innerHTML += `
//                 <div class="profile-desc-row" id="${exp.time}">
//                     <img src="images/tekion.png" height="120px" alt="${exp.company}">
//                     <div>
//                         <h3>${exp.company}</h3>
//                         <b>${exp.position}</b>
//                         <b>${exp.from} - ${exp.to}</b>
//                         <p>${exp.desc}</p>
//                         <hr>
//                     </div>
//                     <button class="remove-btn" data-id="${exp.time}">Remove</button>
//                 </div>
//             `;
//         });
//     };

//     renderEducation = () => {
//         elements.educationContainer.innerHTML = '';
//         this.educationList.forEach(ed => {
//             this.elements.educationContainer.innerHTML += `
//                 <div class="profile-desc-row" id="${ed.time}">
//                     <img src="images/nitraipur.png" alt="">
//                     <div>
//                         <h3>${ed.college}</h3>
//                         <b>${ed.branch}</b>
//                         <b>${ed.from} - ${ed.to}</b>
//                         <p>${ed.desc}</p>
//                         <hr>
//                     </div>
//                     <button class="remove-btn" data-id="${ed.time}">Remove</button>
//                 </div>
//             `;
//         });
//     };

//     renderSkills = () => {
//         elements.skillsContainer.innerHTML = '';
//         this.skillList.forEach(skill => {
//             this.elements.skillsContainer.innerHTML += `<a class="skills-btn">${skill.name}</a>`;
//         });
//     };

//     // Event handlers
//     handleExperienceCreation = () => {
//         /* Builder method */
//         const sectionBuilder = new ConcreteSectionBuilder()
//         const exp = sectionBuilder
//             .setPosition(document.querySelector('#position').value)
//             .setCompany(document.querySelector('#company').value)
//             .setFrom(document.querySelector('#from').value)
//             .setTo(document.querySelector('#to').value)
//             .setDesc(document.querySelector('#desc').value) 
//             .setTime(Date.now())
//             .setType("experience") 
//             .getSection()
//         this.experienceList.unshift(exp);
//         this.saveData();
//         this.renderExperience();
//     };

//     handleEducationCreation = () => {
//         /* Builder method */
//         const sectionBuilder = new ConcreteSectionBuilder()
//         const ed = sectionBuilder
//             .setBranch(document.querySelector('#position').value)
//             .setCollege(document.querySelector('#company').value)
//             .setFrom(document.querySelector('#from').value)
//             .setTo(document.querySelector('#to').value)
//             .setDesc(document.querySelector('#desc').value) 
//             .setTime(Date.now())
//             .setType("education") 
//             .getSection()

//         this.educationList.unshift(ed);
//         saveData();
//         renderEducation();
//     };

//     handleSkillCreation = () => {
//         const skillName = elements.inputSkill.value.trim();
//         if (!skillName) {
//             alert('Enter a skill first!');
//             return;
//         }
//         /* Factory Method */ 
//         const newSkill = SkillFactory(skillName);
//         this.skillList.push(newSkill);
//         this.elements.inputSkill.value = '';
//         saveData();
//         renderSkills();
//     };

//     handleRemoveItem = (event) => {
//         if (!event.target.classList.contains('remove-btn')) return;
//         const id = event.target.getAttribute('data-id');
//         this.experienceList = this.experienceList.filter(exp => exp.time != id);
//         this.educationList = this.educationList.filter(ed => ed.time != id);
//         saveData();
//         renderAll();
//     };

    

//     // return {
//     //     init: loadData,
//     //     createExperience: handleExperienceCreation,
//     //     createEducation: handleEducationCreation,
//     //     createSkills: handleSkillCreation
//     // };
// };

// // Initialize the Profile Manager
// // window.onload = ProfileManager.init;