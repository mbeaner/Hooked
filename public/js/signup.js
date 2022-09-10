const yearSelect = document.getElementById('year');
const monthSelect = document.getElementById('month');
const daySelect = document.getElementById('day');
const genderSelect = document.getElementById('gender');
const fileSelect = document.getElementById('filename');

const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

(function populateMonths() {
  for (let i = 0; i < months.length; i++) {
    const option = document.createElement('option');
    option.textContent = months[i];
    monthSelect.appendChild(option);
  }
  monthSelect.value = '1';
})();

let previousDay;

function populateDays(month) {
  while (daySelect.firstChild) {
    daySelect.removeChild(daySelect.firstChild);
  }

  let dayNum;
  let year = yearSelect.value;

  if (
    month === '1' ||
    month === '3' ||
    month === '5' ||
    month === '7' ||
    month === '8' ||
    month === '10' ||
    month === '12'
  ) {
    dayNum = 31;
  } else if (
    month === '4' ||
    month === '6' ||
    month === '9' ||
    month === '11'
  ) {
    dayNum = 30;
  } else {
    if (new Date(year, 1, 29).getMonth() === 1) {
      dayNum = 29;
    } else {
      dayNum = 28;
    }
  }

  for (let i = 1; i <= dayNum; i++) {
    const option = document.createElement('option');
    option.textContent = i;
    daySelect.appendChild(option);
  }
  if (previousDay) {
    daySelect.value = previousDay;
    if (daySelect.value === '') {
      daySelect.value = previousDay - 1;
    }
    if (daySelect.value === '') {
      daySelect.value = previousDay - 2;
    }
    if (daySelect.value === '') {
      daySelect.value = previousDay - 3;
    }
  }
}

function populateYears() {
  let year = new Date().getFullYear();

  for (let i = 0; i < 201; i++) {
    const option = document.createElement('option');
    option.textContent = year - i;
    yearSelect.appendChild(option);
  }
}

populateDays(monthSelect.value);
populateYears();

yearSelect.onchange = function () {
  populateDays(monthSelect.value);
};
monthSelect.onchange = function () {
  populateDays(monthSelect.value);
};
daySelect.onchange = function () {
  previousDay = daySelect.value;
};

const genders = ['Male', 'Female'];

(function populateGenders() {
  for (let i = 0; i < genders.length; i++) {
    const option = document.createElement('option');
    option.textContent = genders[i];
    genderSelect.appendChild(option);
  }
})();

const files = ['saw.jpg', '01-blossoming-apricot.jpg'];

(function populateFiles() {
  for (let i = 0; i < files.length; i++) {
    const option = document.createElement('option');
    option.textContent = files[i];
    fileSelect.appendChild(option);
  }
})();

const signupFormHandler = async (event) => {
  event.preventDefault();

  const first_name = document.querySelector('#first-name').value.trim();
  const last_name = document.querySelector('#last-name').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const filename = document.querySelector('#filename').value.trim();
  var dob = `${yearSelect.value}-${monthSelect.value}-${daySelect.value}`;
  const gender = document.querySelector('#gender').value.trim();
  const location = document.querySelector('#location').value.trim();
  const bio = document.querySelector('#bio').value.trim();

  if (
    first_name &&
    last_name &&
    email &&
    password &&
    filename &&
    dob &&
    gender &&
    location &&
    bio
  ) {
    const response = await fetch('/api/users', {
      method: 'Post',
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
        filename,
        dob,
        gender,
        location,
        bio,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
