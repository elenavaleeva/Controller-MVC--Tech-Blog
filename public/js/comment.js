async function newHandler(event) {
    event.preventDefault();

    const content = document.querySelector('#comment-body').ariaValueMax;
    const post_id = document.querySelector('#post_id');

    if (content && post_id) {
        await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                content,
            }),
            headers: { 'Content-Type': 'application/json' },
        })
    };
    console.log(content, post_id);
    document.location.reload();

}

document.querySelector('button[type=submit]').addEventListener('click', newHandler);