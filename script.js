function getPasswordLength() {
  const length = document.getElementById("length").value;
  if (length < 8 || length > 128) {
    alert("Password length must be between 8 and 128 characters.");
    return;
  }
  return Number(length);
}

function getPasswordProperties() {
  const ids = ["lowercase", "uppercase", "numbers", "symbols"];
  const properties = {};

  for (const id of ids) {
    const element = document.getElementById(id);
    properties[id] = element.checked;
  }

  return properties;
}

// Returns an array of lowercase or uppercase characters
function getChars(lowercase = true) {
  const start = lowercase ? 97 : 65;
  let chars = [];

  // Loop through the ASCII table
  for (let i = start; i < start + 26; i++) {
    chars.push(String.fromCharCode(i));
  }

  return chars;
}

// Returns an array of symbols
function getSymbols() {
  let symbols = [];

  // Loop through the ASCII table
  for (let i = 33; i < 48; i++) {
    symbols.push(String.fromCharCode(i));
  }

  return symbols;
}

// Returns an array of numbers from 0 to 9
function getNumbers() {
  let numbers = [];

  // Loop through the numbers 0 to 9
  for (let i = 0; i < 9; i++) {
    numbers.push(i);
  }

  return numbers;
}

function getCharacterList() {
  const properties = getPasswordProperties();
  let characterList = [];

  // Loop through the properties object
  for (const property in properties) {
    // If the property is true, push the characters into the array
    if (properties[property]) {
      // Switch statement to determine which characters to push
      switch (property) {
        case "lowercase":
          characterList.push(...getChars(true));
          break;
        case "uppercase":
          characterList.push(...getChars(false));
          break;
        case "numbers":
          characterList.push(...getNumbers());
          break;
        case "symbols":
          characterList.push(...symbols);
          break;
      }
    }
  }

  // Return the character list based on which properties are true
  return characterList;
}

function copyPassword() {
  const password = document.getElementById("password").innerText;

  navigator.clipboard
    .writeText(password)
    .then(alert("Password copied to clipboard!"))
    .catch((err) =>
      console.error("There was an error copying the password: ", err)
    );
}

const lowercaseChars = getChars(true);
const uppercaseChars = getChars(false);
const numbers = getNumbers();
const symbols = getSymbols();

function generatePassword() {
  // Get the length and character list
  const length = getPasswordLength();
  const chars = getCharacterList();

  let pwd = [];
  for (let i = 0; i < length; i++) {
    // This will ensure we always get values less than the length
    const randomIndex = Math.floor(Math.random() * chars.length);
    // This will get the character at the random index
    const char = chars[randomIndex];
    // Push each character into the array
    pwd.push(char);
  }

  // Joins the elements in the array into a string
  const pwdString = pwd.join("");

  // Display the password in the HTML
  document.getElementById("password").innerHTML = "<p>" + pwdString + "</p>";
}
