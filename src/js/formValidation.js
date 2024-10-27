import IMask from 'imask';
// import { ajaxSubmit } from './ajaxSubmit.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const phoneInput = document.getElementById('phone');
    const formMessage = document.getElementById('formMessage');

    IMask(phoneInput, {
        mask: '+{375} 00 000-00-00',
    });

    const fields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        message: document.getElementById('message')
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearErrors();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (!validateForm(data)) {
            return;
        }

        const result = await ajaxSubmit(data);
        // handleResponse(result);
    });

    Object.keys(fields).forEach(field => {
        fields[field].addEventListener('input', () => validateField(field, fields[field].value));
    });

    function validateForm(data) {
        let isValid = true;

        Object.keys(fields).forEach(field => {
        if (!validateField(field, data[field])) {
            isValid = false;
        }
        });

        return isValid;
    }

    function validateField(field, value) {
        let isValid = true;

        if (!value) {
            showError(field, 'Заполните поле');
        isValid = false;
        } else if (field === 'email' && !validateEmail(value)) {
            showError(field, 'Ошибка: Некорректный формат почты');
            isValid = false;
        } else {
            clearError(field);
        }

        return isValid;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function showError(field, message) {
        const errorElement = document.getElementById(`${field}Error`);
        const inputElement = document.getElementById(field);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.classList.add('error');
    }

    function clearError(field) {
        const errorElement = document.getElementById(`${field}Error`);
        const inputElement = document.getElementById(field);
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        inputElement.classList.remove('error');
    }

    function clearErrors() {
        Object.keys(fields).forEach(field => clearError(field));
    }

    function handleResponse(result) {
        if (result.status === 'error') {
            for (const field in result.fields) {
                showError(field, result.fields[field]);
            }
        } else if (result.status === 'success') {
            form.reset();
            formMessage.textContent = result.msg;
        }
    }

    async function ajaxSubmit(data) {
        console.log(data)
    }
});

