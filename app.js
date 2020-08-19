const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { doesNotReject } = require("assert");
const { exit } = require("process");

let newEmployees = [];
console.log(newEmployees);

function start() {
  inquirer
    .prompt({
      message: "What kind of employee would you like to add?",

      type: "list",
      name: "role",
      choices: ["Manager", "Engineer", "Intern", "Done"],
    })
    .then((res) => {
      console.log(res.role);
      switch (res.role) {
        case "Manager":
          managerPrompt();
          break;
        case "Engineer":
          engineerPrompt();
          break;
        case "Intern":
          internPrompt();
          break;
        case "Done":
          console.log("done!");
          output();
      }
    });
}

start();

function managerPrompt() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the Employee you would like to add?",
        name: "employeeName",
      },
      {
        type: "input",
        message: "What is the ID for the employee you would like to add?",
        name: "employeeID",
      },
      {
        type: "input",
        message: "What is the email of the employee you would like to add?",
        name: "employeeEmail",
      },
      {
        type: "input",
        message:
          "What is the phone number for the employee you would like to add?",
        name: "employeePhone",
      },
    ])
    .then((res) => {
      console.log(res);
      newEmployees.push(
        new Manager(
          res.employeeName,
          res.employeeID,
          res.employeeEmail,
          res.employeePhone
        )
      );
      start();
    });
}

function engineerPrompt() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the Employee you would like to add?",
        name: "employeeName",
      },
      {
        type: "input",
        message: "What is the ID for the employee you would like to add?",
        name: "employeeID",
      },
      {
        type: "input",
        message: "What is the email of the employee you would like to add?",
        name: "employeeEmail",
      },
      {
        type: "input",
        message:
          "What is the github name for the employee you would like to add?",
        name: "employeeGithub",
      },
    ])
    .then((res) => {
      console.log(res);
      newEmployees.push(
        new Engineer(
          res.employeeName,
          res.employeeID,
          res.employeeEmail,
          res.employeeGithub
        )
      );
      start();
    });
}

function internPrompt() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the Employee you would like to add?",
        name: "employeeName",
      },
      {
        type: "input",
        message: "What is the ID for the employee you would like to add?",
        name: "employeeID",
      },
      {
        type: "input",
        message: "What is the email of the employee you would like to add?",
        name: "employeeEmail",
      },
      {
        type: "input",
        message: "What school did this employee come from?",
        name: "employeeSchool",
      },
    ])
    .then((res) => {
      console.log(res);
      newEmployees.push(
        new Intern(
          res.employeeName,
          res.employeeID,
          res.employeeEmail,
          res.employeeSchool
        )
      );
      start();
    });
}

function output() {
  fs.writeFile("output/team.html", render(newEmployees), (err) => {
    if (err) throw err;
  });
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
