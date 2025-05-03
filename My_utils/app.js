

/*Je cible ts les element html que je vait manipuler par la suite*/
const addTaskButton = document.getElementById('add-task-btn');/*input de ajouter une tache a voir sur le fichier html */
const taskInput = document.getElementById('task-input');
const todoList = document.getElementById('todo-list');
const completedList = document.getElementById('finish');




// 1) POUR AJOUTER UNE TACHE
function addTask(taskContent) {
  const taskItem = document.createElement('li');
  taskItem.textContent = taskContent;


  /*Pourque qd on veut supprimer la tache 
  qui est ds la liste sdes taches a faire (listes qu'on a creer avec la fonction createElement) 
  il soit supprime */
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Supprimer';
  deleteButton.addEventListener('click', () => {
    taskItem.remove();
  });


  /*Pourque qd on appuie sur le button terminer qu'on cree avec (completeButton.textContent = 'Terminer';) la tache 
  qui est ds la liste sdes taches treminees soit enlever  */
  const completeButton = document.createElement('button');
  completeButton.textContent = 'Terminer';
  completeButton.addEventListener('click', () => {
    completeTask(taskItem);
  });

  taskItem.appendChild(completeButton);
  taskItem.appendChild(deleteButton);
  todoList.appendChild(taskItem);
}




// 2) POUR AJOUTER UNE TAHCES A LA LISTE
addTaskButton.addEventListener('click', () => {
  const taskContent = taskInput.value;
  if (taskContent) {
    addTask(taskContent);
    taskInput.value = ''; 
  }
});



// 3)POUR MARQUER UNE TACHES COMME TERMINEE
function completeTask(taskItem) {
  completedList.appendChild(taskItem);
  taskItem.querySelector('button').remove();
}








