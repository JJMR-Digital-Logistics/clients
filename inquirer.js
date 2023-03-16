'use strict';

const axios = require('axios');
const inquirer = require('inquirer');
const base64 = require('base-64');
require('dotenv').config();

let localUser;
let currentUser;

const startInquire = () => {
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
};



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
    .then(async (answer) => {
      localUser.username = answer.userName;
      localUser.password = answer.pWord;
      //console.log(localUser);

      currentUser = await handleSignin(localUser);
      //console.log('currentUser: ', currentUser);
      console.log('****************************************');
      console.log('');
      // if (currentUser.role === 'admin') {
      //   adminMenu();
      // }
      // else {
      //   userMenu();
      // }
      menu();
    });
};

const handleSignin = async (user) => {
  try {
    let url = `${process.env.EXPRESS_SERVER}/signin`;
    let userStr = `${user.username}:${user.password}`;
    //let encodedUser = base64.encode(userStr);
    let config = {
      url,
      method: 'post',
      auth: {
        username: user.username,
        password: user.password,
      },
      // headers: {
      //   'authorization': `basic ${encodedUser}`,
      // },

    };
    let axiosUser = await axios(config);
    //console.log('axiosUser', axiosUser);
    return axiosUser.data.user;

    //console.log(axiosUser.data);
  }
  catch (error) {
    console.log(error);
  }


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
      //console.log(localUser);
      console.log('****************************************');
      console.log('');

      handleSignUp(localUser);
      startInquire();
    });
};

const handleSignUp = async (user) => {
  try {
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
    let axiosUser = await axios(config);
    //axiosUser = await axios(config);
    //console.log(axiosUser.data);
    console.log('User created');
  }
  catch (error) {
    console.log(error);
  }


};

const menu = () => {
  // console.log('****************************************');
  // console.log('');

  if (currentUser.role === 'admin') {
    adminMenu();
  }
  else {
    userMenu();
  }

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

      if (answer.menu === 'Search') {
        search();
      }
      else if (answer.menu === 'Request order') {
        console.log('Request order');
      }
    });
};

const adminMenu = () => {
  inquirer
    .prompt([
      {
        name: 'menu',
        type: 'list',
        message: 'Choose a task',
        choices: ['Search part', 'Create part', 'Display all parts', 'Update part', 'Delete part'],
      },
    ])
    .then((answer) => {
      //console.log(answer.menu);
      switch (answer.menu) {
        case 'Search part':
          search();
          break;
        case 'Create part':
          Create();
          break;
        case 'Display all parts':
          Read().then(() => menu());
          break;
        case 'Update part':
          Update();
          break;
        case 'Delete part':
          Delete();
          break;
        default:
          break;
      }
      
    });

};

const clearLocalUser = () => {
  localUser = {
    username: '',
    password: '',
    role: '',
  };
};

const search = () => {
  console.log('****************************************');
  console.log('');
  inquirer
    .prompt([
      {
        name: 'searchTerm',
        type: 'input',
        message: 'Search: ',
      },
    ])
    .then((answer) => {
      console.log('searchTerm', answer.searchTerm);
      handleSearch(answer.searchTerm).then(() => menu());
    });
};

const handleSearch = async (searchTerm) => {
  try {
    let url = `${process.env.EXPRESS_SERVER}/api/v2/parts/${searchTerm}`;
    let config = {
      url,
      method: 'get',
      headers: {
        'authorization': `bearer ${currentUser.token}`,
      },
    };
    let axiosItem = await axios(config);
    //axiosUser = await axios(config);
    console.log(axiosItem.data);
    return axiosItem.data;
  }
  catch (error) {
    console.log(error);
  }
};

const Create = () => {
  console.log('****************************************');
  console.log('');

  let item = {
    name: '',
    quantity: '',
    description: '',
    manufacturer: '',
    color: '',
  };

  inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: 'Enter item name ',
      },
      {
        name: 'quantity',
        type: 'number',
        message: 'Enter item quantity ',
      },
      {
        name: 'description',
        type: 'input',
        message: 'Enter item description ',
      },
      {
        name: 'manufacturer',
        type: 'input',
        message: 'Enter item manufacturer ',
      },
      {
        name: 'color',
        type: 'input',
        message: 'Enter item color ',
      },
    ])
    .then((answer) => {
      item.name = answer.name;
      item.quantity = answer.quantity;
      item.description = answer.description;
      item.manufacturer = answer.manufacturer;
      item.color = answer.color;
      console.log('item', item);

      handleCreate(item).then(() => menu());
    });
};

const handleCreate = async (item) => {
  try {
    let url = `${process.env.EXPRESS_SERVER}/api/v2/parts`;
    let config = {
      url,
      method: 'post',
      headers: {
        'authorization': `bearer ${currentUser.token}`,
      },
      data: {
        name: item.name,
        quantity: item.quantity,
        description: item.description,
        manufacturer: item.manufacturer,
        color: item.color,
      },
    };
    let axiosUser = await axios(config);
    //axiosUser = await axios(config);
    //console.log('axiosUser.data: ', axiosUser.data);
    console.log(`${axiosUser.data.name} part created`);
  }
  catch (error) {
    console.log(error);
  }
};

const Read = async () => {
  console.log('****************************************');
  console.log('');

  try {
    let url = `${process.env.EXPRESS_SERVER}/api/v2/parts`;
    let config = {
      url,
      method: 'get',
      headers: {
        'authorization': `bearer ${currentUser.token}`,
      },
    };
    let axiositem = await axios(config);
    //axiosUser = await axios(config);
    console.log('');
    console.log('Part Inventory: ', axiositem.data);
    return axiositem.data;
  }
  catch (error) {
    console.log(error);
  }
};


const Update = async () => {
  console.log('****************************************');
  console.log('');

  let itemsArr = await Read();
  let item;
  //console.log('itemsArr', itemsArr);
  inquirer
    .prompt([
      {
        name: 'userChoice',
        type: 'list',
        message: 'Choose an item to update.',
        choices: itemsArr,
      },
    ])
    .then(async (answer) => {
      //console.log('item', answer.userChoice);
      item = await handleSearch(answer.userChoice);
      //console.log('item', item);
      handleItemUpdate(item);
    });
};

const handleItemUpdate = (item) => {
  let updateItem = {
    name: '',
    quantity: '',
    description: '',
    manufacturer: '',
    color: '',
  };

  inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: 'Enter name or press enter to skip',
        default: `${item.name}`,
      },
      {
        name: 'quantity',
        type: 'number',
        message: 'Enter quantity or press enter to skip',
        default: item.quantity,
      },
      {
        name: 'description',
        type: 'input',
        message: 'Enter description or press enter to skip',
        default: item.description,
      },
      {
        name: 'manufacturer',
        type: 'input',
        message: 'Enter manufacturer or press enter to skip',
        default: item.manufacturer,
      },
      {
        name: 'color',
        type: 'input',
        message: 'Enter updated item color ',
        default: item.color,
      },
    ])
    .then((answer) => {
      updateItem.name = answer.name;
      updateItem.quantity = answer.quantity;
      updateItem.description = answer.description;
      updateItem.manufacturer = answer.manufacturer;
      updateItem.color = answer.color;
      console.log('item', updateItem);
      handleUpdate(item.id, updateItem).then(() => menu());
    });
};

const handleUpdate = async (id, item) => {
  try {
    let url = `${process.env.EXPRESS_SERVER}/api/v2/parts/${id}`;
    let config = {
      url,
      method: 'put',
      headers: {
        'authorization': `bearer ${currentUser.token}`,
      },
      data: {
        name: item.name,
        quantity: item.quantity,
        description: item.description,
        manufacturer: item.manufacturer,
        color: item.color,
      },
    };
    let axiosUser = await axios(config);
    //axiosUser = await axios(config);
    //console.log('axiosUser.data: ', axiosUser.data);
    console.log(`Part: ${axiosUser.data.name} updated`);
  }
  catch (error) {
    console.log(error);
  }
};


const Delete = async () => {
  console.log('****************************************');
  console.log('');

  let itemsArr = await Read();
  let item;
  //console.log('Items Array', itemsArr);
  inquirer
    .prompt([
      {
        name: 'deletedItem',
        type: 'list',
        message: 'Which item do you want to delete ',
        choices: itemsArr,
      },
    ])
    .then(async (answer) => {
      console.log('deletedItem', answer.deletedItem);
      item = await handleSearch(answer.deletedItem);
      handleDelete(item.id).then(() => menu());
    });
};

const handleDelete = async (id) => {
  try {
    let url = `${process.env.EXPRESS_SERVER}/api/v2/parts/${id}`;
    let config = {
      url,
      method: 'delete',
      headers: {
        'authorization': `bearer ${currentUser.token}`,
      },
    };
    let axiosUser = await axios(config);
    //console.log(axiosUser.data);
    console.log('Part deleted');
  }
  catch (error) {
    console.log(error);
  }
};

startInquire();

//module.exports = startInquire;
