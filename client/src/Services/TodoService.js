export default {
  getTodos: () => {
    return fetch("/user/todos").then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      }
      return { message: { msgBody: "Unauthorized", msgError: true } };
    });
  },
  postTodo: (todo) => {
    return fetch("/user/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      }
      return { message: { msgBody: "Unauthorized", msgError: true } };
    });
  },
};
