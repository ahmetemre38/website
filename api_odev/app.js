let selectUsers = document.getElementsByClassName("dropdown-menu").item(0); 
const usersInfo = axios.get('https://jsonplaceholder.typicode.com/users/');
usersInfo.then(response => {    
    response.data.forEach(user => {
        let selectOption = document.createElement('li');
        selectOption.id = user.id;        
        selectUsers.appendChild(selectOption);
        
        let selectBtn = document.createElement('button');
        selectBtn.id = user.id; 
        selectBtn.value = user.id;
        selectBtn.innerText = user.name;
        selectBtn.className = 'dropdown-item';
        selectBtn.type = 'button';
        selectOption.appendChild(selectBtn);

        selectBtn.addEventListener('click', (event) => { 
            let ul = document.getElementById("ulTodos");
            while(ul.children.length > 0){
                ul.removeChild(ul.children[ul.children.length-1]);
            };                   
            const taskInfo = axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${event.target.value}`);
            taskInfo.then(resTask => {
                resTask.data.forEach(task => {
                    let liTodo = document.createElement('li');
                    liTodo.className = 'list-group-item list-group-item-success'; 
                    liTodo.innerText = task.id + "-" + task.completed + "-" + task.title;      
                    ulTodos.appendChild(liTodo);
                 });
            });
        });
    });
});
btnSearch.addEventListener('click', () => {
    let ul = document.getElementById("ulTodos");
    let searchText = document.getElementById("txtSearch");
    if(ul.children.length > 0){
        for (let i = 0; i < ul.children.length; i++) {
            let IsSearchText = ul.children[i].innerText.search(searchText.value);
            if (IsSearchText > 0) {
                ul.children[i].className = 'list-group-item list-group-item-danger';
            };
        };
    };
});
