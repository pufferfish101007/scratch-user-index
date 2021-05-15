const jsoning = require("jsoning"),
  fetch = require("node-fetch"),
  db = new jsoning("db.json"),
  beep = require("beepbeep");
let users;

const run = async () => {
  users = await db.get("users");
  let i = 1000;
  console.log(users.length);
  let interval1 = setInterval(async () => {
    if (i >= users.length) return clearInterval(interval1);
    let user = users[i];
    let offset = 0;
    let interval2 = setInterval(async () => {
      let followers = await (await fetch(`https://api.scratch.mit.edu/users/${user}/followers?limit=40&offset=${offset}`)).json();
      if (!followers.length) return clearInterval(interval2);
      followers.forEach(follower => {
          if (!users.includes(follower.username)) users.push(follower.username);
      });
      offset += 20;
    }, 101);
    offset = 0;
    let interval3 = setInterval(async () => {
      let following = await (await fetch(`https://api.scratch.mit.edu/users/${user}/following?limit=40&offset=${offset}`)).json();
      if (!following.length) return clearInterval(interval3);
      following.forEach(followee => {
          if (!users.includes(followee.username)) users.push(followee.username);
      });
      offset += 20;
    }, 103);
    db.set("users", users);
    i++;
    if (i % 20 === 0) {
      console.log(i, users.length);
      const used = process.memoryUsage().heapUsed / 1024 / 1024;
      console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
      if (used > 1024) beep(5); 
    }
  }, 107);
};
run();
