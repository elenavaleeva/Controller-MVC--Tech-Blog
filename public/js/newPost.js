const newUserData = async function () {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();

    await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    document.location.replace('/dashboard');
};


document.querySelector('.signup-form').addEventListener('submit', newUserData);
document.addEventListener('click', newUserData);