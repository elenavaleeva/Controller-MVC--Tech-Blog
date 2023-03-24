async function editHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="title"]').value;
    const content = document.querySelector('input[name="content"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: title,
            content: content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('form').addEventListener('submit', editHandler);


