const isCatch = document.getElementById('catch');
const release = document.getElementById('release');

const catchButtonHandler = () => {
  document.getElementById('firstbuttons').hidden = true;
  document.getElementById('secondbuttons').hidden = false;
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

const whenCLicked = (e) => {
  var id = e.target.id;

  if (id === 'catch') {
    catchButtonHandler();
  } else if (id == 'release') {
    releaseButtonHandler();
  }
};

this.addEventListener('click', whenCLicked);

// document.getElementById('catch').addEventListener('click', catchButtonHandler);
// document
//   .getElementById('release')
//   .addEventListener('click', releaseButtonHandler);
