class ToggleMenus {
    constructor() {
        /* Declare DOM variables */
        this.profileMenu = document.getElementById("profileMenu");
        this.dropdown = document.getElementById("myDropdown");
        this.dropdownContentDate = document.querySelector('span.dropdown-date');
        this.dropdownContent = document.querySelector('span.dropdown-content');
        this.searchBox = document.querySelector('input#search-box');
        this.navProfileImage = document.querySelector('.nav-profile-img');
        this.sortButton = document.querySelector('.sort-button');
        this.rangeButton = document.querySelector('.range-button');

        /* Adding event listeners */
        this.searchBox.addEventListener('click', () => this.toggleListMenu());
        this.navProfileImage.addEventListener('click', () => this.toggleProfileMenu());
        this.sortButton.addEventListener('click', () => this.displaySortOrder());
        this.rangeButton.addEventListener('click', () => this.displayDateRange());
    }

    toggleProfileMenu() {
        /* adds and removes the class name open-menu whenever called */
        this.profileMenu.classList.toggle("open-menu");
    }

    toggleListMenu() {
        /* toggles the profile menu */
        this.dropdown.classList.toggle("show");
    }

    displayDateRange() {
        /* displays the date range sort functionality */
        this.dropdownContentDate.classList.toggle('show-dropdown');
    }

    displaySortOrder() {
        /* displays the post sort functionality */
        this.dropdownContent.classList.toggle('show-dropdown');
    }
}

/* Instantiate the ToggleMenus class */
const toggleMenu = new ToggleMenus();