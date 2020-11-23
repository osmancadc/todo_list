const server = "http://localhost:4200"


export function validateUser(username, password, callback) {
    const myRequest = new Request(`${server}/access/login`, {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    fetch(myRequest)
        .then(response => (response.status == 200) ? response.json() : false)
        .then(response => {
            callback((response != false), response)
        })
}

export function createUser(username, name, password, email,callback) {
    const myRequest = new Request(`${server}/access/register`, {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
            name:name,
            email:email
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    fetch(myRequest)
        .then(response => callback(response.status==200))     
}

export function validateSession() {
    if (sessionStorage.getItem('token') != undefined)
        location.replace('task.html')
}