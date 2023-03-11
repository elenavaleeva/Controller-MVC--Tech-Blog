const post_id = document.getElementById("post_id").value;
const post_title = document.getElementById("post_title").value;

const url = "http://localhost:3000/posts/" + post_id;

const handler = async (event) => {

    event.preventDefault();

    const title = document.querySelector("#post_title").value;

    const body = document.querySelector("#post_body").value;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            body: body,
        }),

        headers: {
            "Content-Type": "application/json",
            //     "Access-Control-Allow-Origin": "*",
            //     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            //     "Access-Control-Allow-Headers": "Content-Type",
            //     "Access-Control-Max-Age": "3600",
            //     "Access-Control-Allow-Credentials": "true"
        }
    });

    document.location.replace("/dashboard");
};

const deleteHandler = async (event) => {
    await fetch("http://localhost:3000/posts/" + post_id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
};


document.location.replace("/dashboard");

document.querySelector("#post_title").value = "";
document.querySelector("#post_body").value = "";
document.addEventListener("click", handler);

document.querySelector('#delete').style.display = "none";
document.addEventListener("click", deleteHandler);