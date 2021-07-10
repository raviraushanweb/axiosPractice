//url https://jsonplaceholder.typicode.com/todos

// GET REQUEST
const getTodos = async () => {
  console.log("GET Request");
  try {
    // const res = await axios.get(
    //   "https://jsonplaceholder.typicode.com/todos?_limit=5"
    // );

    const res = await axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/todos",
      params: {
        _limit: 5,
      },
    });

    showOutput(res);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// POST REQUEST
async function addTodo() {
  try {
    const res = await axios.post("https://jsonplaceholder.typicode.com/todos", {
      title: "Adding a new todo",
      completed: "false",
    });

    showOutput(res);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

// PUT/PATCH REQUEST
const updateTodo = async () => {
  try {
    const res = await axios.patch(
      "https://jsonplaceholder.typicode.com/todos/1",
      {
        title: "Updated todo",
        completed: "false",
      }
    );

    showOutput(res);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// DELETE REQUEST
const removeTodo = async () => {
  try {
    const res = await axios.delete(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    showOutput(res);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// SIMULTANEOUS DATA
const getData = async () => {
  try {
    const res = await axios.all([
      axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
      axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
    ]);
    const [todos, posts] = res;
    showOutput(posts);
    console.log(todos);
    console.log(posts);
  } catch (error) {
    console.log(error);
  }
};

// CUSTOM HEADERS
const customHeaders = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "sometoken",
    },
  };
  try {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "New Todo",
        completed: false,
      },
      config
    );
    showOutput(res);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log("Transform Response");
}

// ERROR HANDLING
function errorHandling() {
  console.log("Error Handling");
}

// CANCEL TOKEN
function cancelToken() {
  console.log("Cancel Token");
}

// INTERCEPTING REQUESTS & RESPONSES
//details https://masteringjs.io/tutorials/axios/interceptors

// axios.interceptors.request.use(
//   (config) => {
//     console.log(
//       `${config.method.toUpperCase()} request sent to ${
//         config.url
//       } at ${new Date().getTime()}`
//     );

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

axios.interceptors.request.use((req) => {
  // `req` is the Axios request config, so you can modify the `headers`.
  req.headers.authorization = "my secret token";
  return req;
});

// Automatically sets the authorization header because of the request interceptor
const interceptors = async () => {
  try {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    showOutput(res);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

console.log(res);

// AXIOS INSTANCES
const axiosInstance = axios.create({
  //other custom settings
  baseURL: "https://jsonplaceholder.typicode.com",
});

const getInstance = async () => {
  try {
    const res = await axiosInstance.get("/comments?_limit=5");
    console.log(res);
    showOutput(res);
  } catch (error) {
    console.log(error);
  }
};

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
document.getElementById("instance").addEventListener("click", getInstance);
document.getElementById("interceptors").addEventListener("click", interceptors);
