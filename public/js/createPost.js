async function newHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const description = document.querySelector('#post-content').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title: title, description: description }),

        headers: { 'Content-Type': 'application/json' },
    })
};

if (response.ok) {
    document.location.replace('/homepage');
} else {
    alert(response.statusText);
}

document.querySelector('#new-post-form').addEventListener('submit', newHandler);

