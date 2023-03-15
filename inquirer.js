'use strict';

const axios = require('axios');
const inquirer = require('inquirer');
const base64 = require('base-64');
require('dotenv').config();

let localUser;
let axiosUser;

inquirer
  .prompt([
    {
      name: 'user_choice',
      type: 'list',
      message: 'Please login',
      choices: ['Signin', 'Signup'],
    },
  ])
  .then((answer) => {
    if (answer.user_choice === 'Signin') {
      clearLocalUser();
      signIn();
      //console.log('Welcome to your signin');
    }
    else if (answer.user_choice === 'Signup') {
      clearLocalUser();
      signUp();
      //console.log('Please enter your info to signup');
    }

  });

const signIn = () => {

  inquirer
    .prompt([
      {
        name: 'userName',
        type: 'input',
        message: 'Please enter your username',
      },
      {
        name: 'pWord',
        type: 'password',
        message: 'Please enter your password',
      },
    ])
    .then((answer) => {
      localUser.username = answer.userName;
      localUser.password = answer.pWord;
      console.log(localUser);
      handleSignin(localUser);


    });
};

const handleSignin = async (user) => {
  let url = `${process.env.EXPRESS_SERVER}/signin`;
  let userStr = `${user.username}:${user.password}`;
  let encodedUser = base64.encode(userStr);
  let config = {
    url,
    method: 'post',
    headers: {
      'authorization': `basic ${encodedUser}`,
    },

  };
  axiosUser = await axios(config);
  console.log(axiosUser.data);

};
// headers: {
//   "Authorization": `bearer ${token}`,
// },
const signUp = () => {
  
  inquirer
    .prompt([
      {
        name: 'userName',
        type: 'input',
        message: 'Please enter your username',
      },
      {
        name: 'pWord',
        type: 'password',
        message: 'Please enter your password',
      },
      {
        name: 'role',
        type: 'list',
        message: 'Choose a role',
        choices: ['user', 'writer', 'editor', 'admin'],
      },
    ])
    .then((answer) => {
      localUser.username = answer.userName;
      localUser.password = answer.pWord;
      localUser.role = answer.role;
      console.log(localUser);

      handleSignUp(localUser);
    });
};

const handleSignUp = async (user) => {
  let url = `${process.env.EXPRESS_SERVER}/signup`;
  // let userStr = `${user.username}:${user.password}`;
  // let encodedUser = base64.encode(userStr);
  let config = {
    url,
    method: 'post',
    data: {
      'username': user.username,
      'password': user.password,
      'role': user.role,
    },
  };
  axiosUser = await axios(config);
  console.log(axiosUser.data);

};


const userMenu = () => {
  inquirer
    .prompt([
      {
        name: 'menu',
        type: 'list',
        message: 'Choose a task',
        choices: ['Search', 'Request order'],
      },
    ])
    .then((answer) => {
      console.log(answer.menu);
    });
};

const adminMenu = () => {
  inquirer
    .prompt([
      {
        name: 'menu',
        type: 'list',
        message: 'Choose a task',
        choices: ['Search', 'Create', 'Read', 'Update', 'Delete'],
      },
    ])
    .then((answer) => {
      console.log(answer.menu);
    });
};

const clearLocalUser = () => {
  localUser = {
    username: '',
    password: '',
    role: '',
  };
};

const search = () => { };
const Create = () => { };
const Read = () => { };
const Update = () => { };
const Delete = () => { };



// const startInquire = () => {
//   inquirer
//     .prompt([
//       {
//         name: 'user_test',
//         message: 'Which would you like to choose?',
//         type: 'list',
//         choices: ['Proof of life A', 'Proof of life B'],
//       },
//     ])
//     .then((answer) => {
//       console.log('You have chosen ' + answer.user_test);
//     });
// };
