const jsoning = require("jsoning");
const db = new jsoning("db.json");

const chars = "qwertyuiopasdfghjklzxcvbnm1234567890-_";
let i,
  j,
  k;
  
const run = async () => {
  let users = await db.get("users");
  console.log("hi");
  for (i = 0; i < chars.length; i++) {
    for (j = 0; j < chars.length; j++) {
      for (k = 0; k < chars.length; k++) {
        if (!users.includes(chars[i] + chars[j] + chars[k])) {
          await db.push("users", chars[i] + chars[j] + chars[k]);
        }
      }
    }
    console.log(i);
    console.log((await db.get("users")).length);
  }
};

run();
