#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
var filessystem = require('fs');
var dir = './';
var ext_component= [".html", ".css", ".tsx", ".spec.tsx"];
var ext_others= [".tsx", ".spec.tsx"];

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync("Node JS", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );
};

const askQuestions = () => {
  const questions = [
    {
      name: "FILENAME",
      type: "input",
      message: "What is the name of the Object?"
    },
    {
      type: "list",
      name: "TYPE",
      choices: ["Component", "Interface"],
      filter: function(val) {
        return val;
      }
    }
  ];
  return inquirer.prompt(questions);
};

const createFile = (filename,TYPE) => {
  var filePath;

  if(`${TYPE}`=="Component"){
    dir=`${TYPE}`+'/'+filename;
    shell.mkdir('-p', dir);
    for(i=0; i< ext_component.length; i++){
      filePath = `${process.cwd()+'/'+dir}/${filename+ext_component[i]}`
     shell.touch(filePath);  
   }
  }
  else{
    for(i=0; i< ext_others.length; i++){
      filePath = `${process.cwd()+'/'+dir}/${filename+ext_others[i]}`
     shell.touch(filePath);  
   }
     
  }

return filePath; 
 
};

const success = filepath => {
  console.log(
    chalk.white.bold(`Done! File created at ${filepath}`)
  );
};
const inprogress = (option) => {
  console.log(
    chalk.white.bgBlue(`Creating ${option} ...`)
  );
};

const run = async () => {
    // show script introduction
    init();
    const answers = await askQuestions();
    const { FILENAME,TYPE } = answers;
   console.log(answers);

  // create the file
  const filePath = createFile(FILENAME,TYPE);

  inprogress(FILENAME)

  // show success message
  success(filePath);
    const { OPTION } = answers;
  
}

run();
