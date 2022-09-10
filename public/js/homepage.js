const isCatch = document.getElementById('catch');
const release = document.getElementById('release');

const catchButtonHandler = (e) => {
  const cardEl = e.target.closest('.card');
  const btnGroup = e.target.closest('.firstbuttons');
  console.log('444', cardEl.dataset.ismatch);
  if (cardEl.dataset.ismatch === 'true') {
    console.log('it is a match');
    btnGroup.hidden = true;
    btnGroup.nextElementSibling.hidden = false;
  } else {
    console.log('nope!');
    const id = btnGroup.getAttribute('data-id');
    console.log(id);
    const pleaseDelete = async (event) => {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete user');
      }
    };
    pleaseDelete();
  }
};

const releaseButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete user');
    }
  }
};

// const whenCLicked = (e) => {
//   var id = e.target.id;

//   if (id === 'catch') {
//     catchButtonHandler();
//   } else if (id == 'release') {
//     releaseButtonHandler();
//   }
// };

// this.addEventListener('click', whenCLicked);

// document.getElementById('catch').addEventListener('click', catchButtonHandler);
// document
//   .getElementById('release')
//   .addEventListener('click', releaseButtonHandler);

const gallery = document.getElementById('gallery-container');

gallery.addEventListener('click', (e) => {
  console.log('>>>>', e.target);
  const id = e.target.id;
  const cardEl = e.target.closest('.card');
  //todo: 1. check if the button was click otherwise ignore
  // 2. find the parent element of the button and do the rest of the logic
  if (id === 'catch') {
    catchButtonHandler(e);
  } else if (id == 'release') {
    releaseButtonHandler(e);
  }
});
