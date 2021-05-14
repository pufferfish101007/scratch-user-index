const jsoning = require("jsoning");
const fetch = require("node-fetch");

const db = new jsoning("db.json");
let users;
const run = async () => {
  users = await db.get("users");
  console.log(users.length);
  let i = 0;
  /*const checkUsr = async (index) => {
    if (index >= users.length) return;
    let res = await fetch("https://api.scratch.mit.edu/users/" + users[index] + "/");
    if (res.status >= 400) {
      if (users.length - index < 50) {
        users.splice(index, 1);
        await db.set("users", users);
        console.log(`usr: ${users[index]}\nstatus: ${res.status}\nindex: ${index}\nlength:${users.length}\njson: ${await res.text()}`);
        setTimeout(() => checkUsr(index + 1, 5), 108 + Math.floor(Math.random * 40));
      } else {
        let rand = Math.floor(Math.random() * 40) + 10;
        [users[index], users[index + rand]] = [users[index + rand], users[index]];
        setTimeout(() => checkUsr(index), 120 + Math.floor(Math.random() * 20));
      }
    }
    else {
    //  console.log(users[index] + " ✅");
      if (index % 50 === 0) console.log(index);
      setTimeout(() => checkUsr(index + 1), 108 + Math.floor(Math.random * 30) + (Math.random() > 0.9 ? 50 : 0));
    }
  };*/
  const checkUsr = async index => {
    if (index >= users.length) return;
    let res = await fetch("https://api.scratch.mit.edu/users/" + users[index] + "/");
    if (res.status >= 400) {
      console.log(users[index], res.status);
      users.splice(index, 1);
      await db.set("users", users);
      setTimeout(() => checkUsr(index), 101);
    } else {
      if (index % 50 === 0) console.log(index, users.length, ((index / 54872) * 100)+"% done");
      setTimeout(() => checkUsr(index + 1), 113);
    }
  };
  checkUsr(i);
};

run();
