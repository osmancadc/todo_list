const server = "http://localhost:4200"
var global_tasks = []

if (sessionStorage.getItem('token') == undefined)
    location.replace('index.html')

const closeSession = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('id')
    location.replace('index.html')
}
const getIdentifier = (element) => parseInt($($(element).closest('div').siblings()[1])[0].innerHTML)

const fillTasks = (data) => {
    let tasks = []
    let btn_complete = `<button class="btn btn-completed" onclick="updateTask(this,{status:1})"><i class="fas fa-check fa-lg"></i><span class="tooltiptext">Complete task</span></button>`
    let btn_incomplete = `<button class="btn btn-incompleted" onclick="updateTask(this,{status:0})"><i class="fas fa-times fa-lg"></i><span class="tooltiptext">Incomplete task</span></button>`
    let page_size = Math.floor(window.innerWidth / 320)
    global_tasks = data

    for (d of data) {
        tasks.push(`
        <div class="card">
            <div class="content">
                <h2 contentEditable="true">${d.title}</h2>
                <h6>${d.id}</h6>
                <p contentEditable="true">${d.description}</p>
                <div class="actions">   
                    ${(d.status==0)?btn_complete:btn_incomplete}
                    <button class="btn btn-alert" onclick="updateTask(this,false)"><i class="fas fa-save fa-lg"></i>
                        <span class="tooltiptext">Save task</span></button>
                    <button class="btn btn-danger" onclick="deleteTask(this)"><i class="fas fa-trash-alt fa-lg"></i>
                        <span class="tooltiptext">Delete task</span></button>
                </div>
            </div>
        </div>`)
    }
    $('.pagination').pagination({
        dataSource: tasks,
        pageSize: page_size * 2,
        callback: function (data, pagination) {
            $('.container').html(data);
        }
    })
}

const getData = () => {
    const myRequest = new Request(`${server}/task/get/${sessionStorage.getItem('id')}`, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        }
    });
    fetch(myRequest)
        .then(response => (response.status == 200) ? response.json() : 403)
        .then(response => {
            if (response == 403)
                closeSession()
            else
                fillTasks(response.data)
        })
}

const deleteTask = (element) => {
    let identifier = getIdentifier(element)

    const myRequest = new Request(`${server}/task/delete`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({
            user: sessionStorage.getItem('id'),
            task: identifier
        })
    });
    fetch(myRequest)
        .then(response => response.status)
        .then(status => {
            if (status == 200)
                getData()
            else if (status == 403)
                closeSession()
        })
}

const updateTask = (element, data) => {
    let identifier = getIdentifier(element)
    if (data == false)
        data = {
            title: $($(element).closest('div').siblings()[0])[0].innerHTML,
            description: $($(element).closest('div').siblings()[2])[0].innerHTML
        }
    if(data.title==='')
        alert('Error the task doesn\'t have a title')
    else if(data.description==='' )
        alert('Error the task doesn\'t have a description')
        else{
        const myRequest = new Request(`${server}/task/put/${sessionStorage.getItem('id')}/${identifier}/${JSON.stringify(data)}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        fetch(myRequest)
            .then(response => response.status)
            .then(status => {
                if (status == 200)
                    getData()
                else if (status == 403)
                    closeSession()
            })
    }

}

const newTask = ()=>{
    const myRequest = new Request(`${server}/task/add`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify({
            user:sessionStorage.getItem('id')
        })
    });
    fetch(myRequest)
        .then(response => response.status)
        .then(status => {
            console.log(status)
            if (status == 200)
                getData()
            else if (status == 403)
                closeSession()
        })
}

const searchTask = (element) => {
    let text = $($(element).siblings()[0])[0].value
    if (text === '')
        getData()
    else {
        const myRequest = new Request(`${server}/task/get/${sessionStorage.getItem('id')}/${text}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        fetch(myRequest)
            .then(response => (response.status == 200) ? response.json() : 403)
            .then(response => {
                if (response == 403)
                    closeSession()
                else
                    fillTasks(response.data)
            })
    }

}
getData()