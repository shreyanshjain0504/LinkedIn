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

// let newExperienceArray = [];
// let newEducationArray = [];
// let newSkillsArray = [];
// const divForExperience = document.querySelector('.experience');
// const divForEducation = document.querySelector('.education');
// const divForSkills = document.querySelector('.skills');

// function saveData() {
//     localStorage.setItem('experience', JSON.stringify(newExperienceArray));
//     localStorage.setItem('education', JSON.stringify(newEducationArray));
//     localStorage.setItem('skills', JSON.stringify(newSkillsArray));
// }

// // Retrieve saved posts from localStorage
// window.onload = () => {
//     const savedExperience = localStorage.getItem('experience');
//     const savedEducation = localStorage.getItem('education');
//     const savedSkills = localStorage.getItem('skills');
//     if (savedExperience) {
//         newExperienceArray = JSON.parse(savedExperience);
//         showAllExperiences();
//     }
//     if (savedEducation) {
//         newEducationArray = JSON.parse(savedEducation);
//         showAllEducation();
//     }
//     if (savedSkills) {
//         newSkillsArray = JSON.parse(savedSkills);
//         showAllSkills();
//     }
// };

// function createExperience() {
//     let newExperience = {
//         val: document.querySelector('#position').value,
//         company: document.querySelector('#company').value,
//         from: document.querySelector('#from').value,
//         to: document.querySelector('#to').value,
//         desc: document.querySelector('#desc').value,
//         time: (new Date()).getTime()
//     };
//     newExperienceArray.unshift(newExperience);
//     saveData();
//     showAllExperiences();
// }

// function showAllExperiences() {
//     divForExperience.innerHTML = ''; 
//     for (let exp of newExperienceArray) {
//         let newDiv = document.createElement('div');
//         newDiv.innerHTML = `
//             <div class="profile-desc-row" id=${exp.time}>
//                 <img src="images/tekion.png" height="120px" alt=${exp.company}>
//                 <div>
//                     <h3>${exp.val}</h3>
//                     <b>${exp.company}</b>
//                     <b>${exp.from} - ${exp.to}</b>
//                     <p>${exp.desc}</p>
//                     <hr>
//                 </div>
//                 <button class=${exp.time}>Remove</button>
//             </div>
//         `;
//         divForExperience.appendChild(newDiv);
//     }
// }

// function createEducation() {
//     let newEducation = {
//         college: document.querySelector('#company').value,
//         branch: document.querySelector('#position').value,
//         from: document.querySelector('#from').value,
//         to: document.querySelector('#to').value,
//         desc: document.querySelector('#desc').value,
//         time: (new Date()).getTime()
//     };
//     newEducationArray.unshift(newEducation);
//     saveData();
//     showAllEducation();
// }

// function showAllEducation() {
//     divForEducation.innerHTML = '';
//     for (let ed of newEducationArray) {
//         let newDiv = document.createElement('div');
//         newDiv.innerHTML = `
//             <div class="profile-desc-row" id=${ed.time}>
//                 <img src="images/nitraipur.png" alt="">
//                 <div>
//                     <h3>${ed.college}</h3>
//                     <b>${ed.branch}</b>
//                     <b>${ed.from} - ${ed.to}</b>
//                     <p>${ed.desc}</p>
//                     <hr>
//                 </div>
//                 <button class=${ed.time}>Remove</button>
//             </div>
//         `;
//         divForEducation.appendChild(newDiv);
//     }
// }

// document.querySelector('.experience').addEventListener('click', (event) => {
//     if (event.target.tagName === 'BUTTON') {
//         removeExperience(event.target.className);
//     }
// });

// document.querySelector('.education').addEventListener('click', (event) => {
//     if (event.target.tagName === 'BUTTON') {
//         removeEducation(event.target.className);
//     }
// });

// function removeExperience(id) {
//     newExperienceArray = newExperienceArray.filter(exp => exp.time != id);
//     saveData();
//     showAllExperiences();
// }

// function removeEducation(id) {
//     newEducationArray = newEducationArray.filter(exp => exp.time != id);
//     saveData();
//     showAllEducation();
// }

// function createSkills() {
//     if (document.querySelector('.input-for-skills').value === '') {
//         alert('Enter a skill first!');
//         return ;
//     }
//     let newSkill = {
//         college: "skills-btn",
//         innerHTMLContent: document.querySelector('.input-for-skills').value
//     };
//     document.querySelector('.input-for-skills').value = '';
//     newSkillsArray.push(newSkill);
//     saveData();
//     showAllSkills();
// }

// function showAllSkills() {
//     divForSkills.innerHTML = '';
//     for (let skill of newSkillsArray) {
//         let newA = document.createElement('a');
//         newA.className = 'skills-btn';
//         newA.innerHTML = skill.innerHTMLContent;
//         divForSkills.appendChild(newA);
//     }
// }

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
        this.obj = new Section()
    }
  
    setType(type) {
        this.obj.type = type;
        return obj;
    }

    setCollege(college) {
        this.obj.college = college;
        return obj;
    }

    setBranch(branch) {
        this.obj.branch = branch;
        return obj;
    }

    setPosition(position) {
        this.obj.position = position;
        return obj;
    }

    setCompany(company) {
        this.obj.company = company;
        return obj;
    }

    setFrom(from) {
        this.obj.from = from;
        return obj;
    }

    setTo(to) {
        this.obj.to = to;
        return obj;
    }

    setDesc(desc) {
        this.obj.desc = desc;
        return obj;
    }

    setTime(time) {
        this.obj.time = time;
        return obj;
    }

    getSection() {
        return this.obj;
    }
  }

  class Section {
    constructor() {
      this.obj = {}
    }

    render() {
      // make create divs and push it to the respective divs
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

    // Factory functions for creating objects
    const ExperienceFactory = (position, company, from, to, desc) => ({
        type: "experience",
        position,
        company,
        from,
        to,
        desc,
        time: Date.now()
    });

    const EducationFactory = (college, branch, from, to, desc) => ({
        type: "education",
        college,
        branch,
        from,
        to,
        desc,
        time: Date.now()
    });

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
                        <h3>${exp.position}</h3>
                        <b>${exp.company}</b>
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
        const newExperience = ExperienceFactory(
            document.querySelector('#position').value,
            document.querySelector('#company').value,
            document.querySelector('#from').value,
            document.querySelector('#to').value,
            document.querySelector('#desc').value
        );
        this.experienceList.unshift(newExperience);
        saveData();
        renderExperience();
    };

    const handleEducationCreation = () => {
        const newEducation = EducationFactory(
            document.querySelector('#company').value,
            document.querySelector('#position').value,
            document.querySelector('#from').value,
            document.querySelector('#to').value,
            document.querySelector('#desc').value
        );
        this.educationList.unshift(newEducation);
        saveData();
        renderEducation();
    };

    const handleSkillCreation = () => {
        const skillName = elements.inputSkill.value.trim();
        if (!skillName) {
            alert('Enter a skill first!');
            return;
        }
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