async function newHandler(event) {
    event.preventDefault();
    async function newHandler(event) {
        event.preventDefault();

        const content = document.querySelector('#comment-body').value;
        const post_id = document.querySelector('#post_id').value;

        if (content && post_id) {
            await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({
                    post_id,
                    content,
                }),
                headers: { 'Content-Type': 'application/json' },
            });
        }

        console.log(content, post_id);
        document.location.reload();
    }

    document.querySelector('#comment-form').addEventListener('submit', newHandler)
};
