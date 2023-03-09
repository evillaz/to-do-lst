const filterCompleted = () => {
  const tasksArray = JSON.parse(localStorage.getItem('toDoList'));
  const filtered = tasksArray.filter((obj) => obj.completed !== true);
  for (let i = 0; i < filtered.length; i += 1) {
    filtered[i].index = i + 1;
  }
  localStorage.setItem('toDoList', JSON.stringify(filtered));
};

export default filterCompleted;
