/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { getAllStickies } from './fetch-utils.js';
import { renderSticky } from './render-utils.js';

/* Get DOM Elements */
const bulletinList = document.getElementById('bulletin-list');
const errorDisplay = document.getElementById('error-display');

/* State */
let error = null;
let stickies = [];

/* Events */
window.addEventListener('load', async () => {
    const response = await getAllStickies();

    error = response.error;
    stickies = response.data;

    if (error) {
        displayError();
    } else {
        displayStickies();
    }
});

/* Display Functions */
function displayError() {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayStickies() {
    bulletinList.innerHTML = '';

    for (const sticky of stickies) {
        const stickyEl = renderSticky(sticky);
        bulletinList.append(stickyEl);
    }
}
