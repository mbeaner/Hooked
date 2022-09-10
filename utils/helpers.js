module.exports = {
  ifNotCurrentUser: (id1, id2) => id1 == id2,
  age: (dob) => {
    var date = dob.split('-');
    var birth_date = new Date(`${date[0]}, ${date[1]}, ${date[2]}`);
    var birth_date_day = birth_date.getDate();
    var birth_date_month = birth_date.getMonth();
    var birth_date_year = birth_date.getFullYear();

    var today_date = new Date();
    var today_day = today_date.getDate();
    var today_month = today_date.getMonth();
    var today_year = today_date.getFullYear();

    var calc_age = 0;

    if (today_month > birth_date_month) {
      calc_age = today_year - birth_date_year;
    } else if (today_month === birth_date_month) {
      if (today_day >= birth_date_day) {
        calc_age = today_year - birth_date_year;
      } else {
        calc_age = today_year - birth_date_year - 1;
      }
    } else {
      calc_age = today_year - birth_date_year - 1;
    }

    return calc_age;
  },
};
