/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { uploadImage, createSticky } from '../fetch-utils.js';

/* Get DOM Elements */
const addStickyForm = document.getElementById('add-sticky-form');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('image-preview');

/* State */
let error = null;

/* Events */
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '';
    }
});

addStickyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    addStickyForm.querySelector('button').disabled = true;

    const formData = new FormData(addStickyForm);

    const imageFile = formData.get('sticky-image');
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `sticky-images/${randomFolder}/${imageFile.name}`;

    const url = await uploadImage('sticky-images', imagePath, imageFile);

    const sticky = {
        title: formData.get('title'),
        category: formData.get('category'),
        description: formData.get('description'),
        image_url: url,
    };

    const response = await createSticky(sticky);

    error = response.error;
    addStickyForm.querySelector('button').disabled = false;

    if (error) {
        displayError();
    } else {
        location.assign('/');
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
