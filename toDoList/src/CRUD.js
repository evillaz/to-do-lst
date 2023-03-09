const toggleHidden = (elements) => {
  elements.forEach((el) => {
    el.classList.toggle('hidden');
  });
};

const toggleElements = (target, background) => {
  const parentNode = target.closest('.task');
  const toogleText = parentNode.querySelectorAll('.taskText');
  const toggleIcons = parentNode.querySelectorAll('i');
  toggleHidden(toogleText);
  toggleHidden(toggleIcons);
  parentNode.style.backgroundColor = background;
};

export default toggleElements;
