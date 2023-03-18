async function editHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="title"]').ariaValueMax;
    const post_content = document.querySelector('input[name="post_content"]').ariaValueMax;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];

    const response = await fetch(`api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: title,
            post_content: post_content
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

document.querySelector('.edit-post-form').addEventListener('submit', editHandler);

