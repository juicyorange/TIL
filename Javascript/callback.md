# JS callback

## ✨ 동기적인 JS

- JavaScript는 동기적으로 `hoisting` 된 이후부터 코드가 작성된 순서대로 실행된다.

  > hoisting : `var`, `function` 과 같은 선언들이 자동적으로 코드 상단으로 올라가는 것

- network request, file read 와 같이 오래걸리는 작업들은 동기적으로 수행하면 뒤의 코드가 실행되지 못하기 때문에 비효율적이다. 이에 비동기 처리를 사용하는데 `callback function` 을 통해 언제 끝날지 모르는 비동기처리가 올바르게 수행되도록 관리할 수 있다.

## callback function

- callback : 인자로 전달해준 함수를 나중에 실행시켜달라 하는 것.
- js는 함수를 callback 형태로 인자로써 다른 함수에 전달할 수도 있고, 변수에 할당할 수도 있다.

## Use callback

- Synchronous callback

  ```js
  console.log ("1");
  setTimeout( () => console.log("2"), 1000);
  console.lo ("3");

  // Synchronous callback
  function printImmediately(print) {
      print();
  {

  printImmediately(() => console.log("4"));

  // 1 -> 3 -> 4 -> 2
  ```

* Asynchronous callback

  ```js
  console.log ("1");
  setTimeout( () => console.log("2"), 1000);
  console.lo ("3");

  // Asynchronous callback
  function printImmediately(print, timeout) {
      setTimeout(print, timeout);
  {

  printImmediately(() => console.log("4"), 2000);

  // 1 -> 3 -> 2 -> 4
  ```

## 🔥 callback hell

- callback function은 유용하게 쓰일 수 있다. 특히 callback function 안에서 또 callback function을 호출할 수 있어 유용한데, 이를 너무 반복적으로 사용하다보면 코드가 매우 복잡해진다.
- 코드 가독성이 떨어져, 어디서 어떤것이 연결되어 있는지 한눈에 파악하는 것이 어렵다.
- 체인이 길어질수록 에러가 발생하거나 디버깅이 어렵다.
- 유지보수 또한 어려워진다.

  ```js
  class UserStorage {
    loginUser(id, password, onSuccess, onError) {
      setTimeout(() => {
        if (
          (id === "kim" && password === "young") ||
          (id === "tae" && password === "young")
        ) {
          onSuccess(id);
        } else {
          onError(new Error("not found"));
        }
      }, 2000);
    }
    getRoles(user, onSuccess, onError) {
      setTimeout(() => {
        if (user === "kim") {
          onSuccess({ name: "tae young", role: "admin" });
        } else {
          onError(new Error("not found"));
        }
      });
    }
  }

  const UserStorage = new UserStorage();
  const id = prompt("enter your id");
  const password = prompt("enter your pw");

  // 콜백이 너무 많아져 가독성이 떨어진다.
  UserStorage.loginUser(
    id,
    password,
    (user) => {
      UserStorage.getRoles(
        user,
        (userwithRole) => {
          alert(`Hello ${userwithRole.name}, you have a ${userwithRole.role}`);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    (error) => {
      console.log(error);
    }
  );
  ```
