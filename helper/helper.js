// Add some introduction design to Command Line
const art = require("ascii-art");

art.font("Employee Tracker", "doom", (err, rendered) => {
  //if err, err is the error that occured
  if (err) {
    console.log(err);
    throw err;
  }
  //if !err rendered is the ascii
  console.log(rendered);
});


module.exports = art;