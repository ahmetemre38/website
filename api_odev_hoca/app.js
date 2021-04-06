const baseUrl = 'http://jsonplaceholder.typicode.com';
const selectElement = document.querySelector('#users');
const listElement = document.querySelector('#todos');
const searchinput = document.querySelector('#search');
const todoBody = document.querySelector('#tbody');

let userTodos = [];
let searchStr = '';

const getUsers = () =>{
    return axios.get(`${baseUrl}/users`);
}

const getUserTodos = async (userId) => {
    const todos = await axios.get(`${baseUrl}/toDos?userId=${userId}`);
    userTodos = todos.data;
    return todos;
}

const searchTodo = (str) => {
    const temp = userTodos.filter(item => {
        return item.title.includes(str) == true;
    })
    makeList(temp);
}

const makeList = (data) => {
    todoBody.innerHTML = '';

    data.forEach(todo => {    
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        const td2 = document.createElement('td2');
        const button = document.createElement('button');

        td.innerHTML = (todo.completed) ? `<del>${todo.title}</del>` : todo.title;
        button.innerHTML = (todo.completed) ? 'done': 'undone';
        button.className = (todo.completed) ? 'btn btn-success': 'btn btn-warning';
        button.setAttribute('id',todo.id);
        button.addEventListener('click',(e) => {
            changeStatus(e.target.id);
        })

        td2.appendChild(button);

        tr.appendChild(td);
        tr.appendChild(td2);
        todoBody.appendChild(tr);
    }); 
}

const changeStatus = (id) => {
    const index = userTodos.findIndex(item => item.id == id);    
    userTodos[index].completed = !userTodos[index].completed;    

    if (searchStr == '') {
        makeList(userTodos)
    } else {
        searchTodo(searchStr)
    }
}

searchinput.addEventListener('input', (e) => {
    searchStr = e.target.value;
    searchTodo(e.target.value);
});

window.addEventListener('load', async () => {   
    const {data} = await getUsers();
    
    data.forEach(user => {
        const opt = document.createElement('option');
        opt.value = user.id;
        opt.text = user.name;
        selectElement.add(opt);
    });
    
});

selectElement.addEventListener('change',async (e)=>{   
    const {data} = await getUserTodos(e.target.value);
    
    makeList(data);
});
