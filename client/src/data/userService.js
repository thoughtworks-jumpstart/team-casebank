const users = [
  {
    _id: "asd2390384jkbudis",
    name: "John Mayer",
    role: "Developer",
    techstack: ["javascript", "python"],
    projects: ["sleep-app", "pokemo-app", "to-do-list"]
  },
  {
    _id: "asd2348923jkbudis",
    name: "Mary Lamb",
    role: "Developer",
    techstack: ["javascript", "html"],
    projects: ["react-app", "todo", "feedback"]
  },
  {
    _id: "asd8976923jkbquds",
    name: "Vlad",
    role: "Developer",
    techstack: ["python", "ruby"],
    projects: ["airline", "e-commerce", "appstore"]
  },
  {
    _id: "arh8983923jkjsigs",
    name: "James",
    role: "Developer",
    techstack: ["php", "python"],
    projects: ["shipping", "accounting"]
  },
  {
    _id: "asq1256923osufuds",
    name: "Daniel",
    role: "Developer",
    techstack: ["Java", "c++"],
    projects: ["freshfood", "beverage"]
  }
];

function getUsers() {
  return users;
}

async function getUserById(userId) {
  try {
    let response = await fetch(`/users/${userId}`, {
      method: "get",
      headers: { "Content-Type": "application/json" }
    });
    let user = await response.json();
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function login(email, password) {
  try {
    const loginStatus = await fetch("/users/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { email, password } })
    });
    const loginStatusContent = await loginStatus.json();
    if (loginStatusContent.user) {
      return { user: loginStatusContent.user };
    } else {
      return { message: loginStatus.data.message };
    }
  } catch (error) {
    return { message: `Login unhandled failure. ${error.message}` };
  }
}

export { getUsers, getUserById, login };
