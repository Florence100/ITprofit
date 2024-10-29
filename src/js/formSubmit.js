const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
import { phoneMask } from "./formValidation.js";

export async function formSubmit(data) {
    fetch('http://localhost:9090/api/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Bad request');
            }
            return response.json();
        })
        .then((result) => {
            if (result.status === 'error') {
                handleErrors(result);
            } else if (result.status === 'success') {
                handleSuccess(result);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function handleErrors(result) {
    const fields = result.fields
    for (const field in fields) {
        const errorElement = document.getElementById(`${field}Error`);
        if (errorElement) {
            errorElement.textContent = fields[field];
        }
    }
}

function handleSuccess(result) {
    form.reset();
    formMessage.textContent = result.msg;
    phoneMask.updateValue();
}