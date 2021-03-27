# JS Promise

## ✨ Promise 란?

- JavaScript에서 비동기처리의 흐름을 관리하는 것을 간단히 할 수 있도록 도와주는 Object.
- 주어진 작업을 수행하고, 정상적으로 수행했다면 성공메시지와 함께 처리된 결과값을 전달해주고, 문제가 발생했다면 에러를 전달해준다.
- callback 함수를 통해 비동기처리를 관리할때의 단점들을 보완할 수 있는 `ES6` 의 새로운 기능.
- network request, file read 와 같이 오래걸리는 작업들은 동기적으로 수행하면 뒤의 코드가 실행되지 못하기 때문에 비효율적이다. 이에 비동기 처리를 사용하는데 `Promise` 을 통해 언제 끝날지 모르는 비동기처리가 올바르게 수행되도록 관리할 수 있다.

## 🔥 Promise의 핵심

- `state` : 프로세스가 무엇인가를 수행하고 있는지, 아니면 모두 다 수행하고 성공 또는 실패했는지.
  - pending -> fufilled or rejected
- Producer vs Consumer
  - `Producer` : 우리가 필요한 데이터를 제공해주는 Object.
  - `Consumer` : 제공된 데이터를 사용하는 Object.

## 생성(Producer)

```js
// 1. Producer
// when new Promise is created, the executor runs automatically.

const promise = new Promise((resolve, reject) => {
  console.log("doing something");
}); // doing something 바로 출력
```

- 프로미스를 만드는 순간 `executer` 라는 콜백함수가 바로 실행되는 것을 볼 수 있다.
  - 프로미스를 만드는 순간 그 안에 전달한 `executer` 콜백함수가 바로 실행되니 주의하기.
  - 예를들어 네트워크 요청을 사용자가 요구했을때만 해야되는 경우라면, 그리고 사용자가 버튼을 눌렀을때 네트워크 요청을 해야하는 경우라면 위처럼 작성하면 사용자가 요청하지 않았는데 불필요한 네트워크 통신이 발생할 수 있다.

## 사용(Consumer)

- `then`, `catch`, `finally` 를 이용해서 값을 받아올 수 있다.
- then

  - fufilled 상태의 프로미스를 처리.
  - 값을 전달할 수도, 프로미스를 전달할 수도 있다.

    ```js
    // Producer
    const promise = new Promise((resolve, reject) => {
      console.log("doing something");
      setTimeout(() => {
        resolve("Kim"); // resolve 가 아닌 return을 하면 fufilled 상태가 아닌 pending 상태의 프로미스가 된다.
      }, 2000);
    });

    // Consumer
    promise.then((value) => {
      console.log(value); // kim
    });
    ```

- catch

  - rejected 상태의 프로미스나 에러를 처리.
  - 값을 전달할 수도, 프로미스를 전달할 수도 있다.

    ```js
        // Producer
        const promise = new Promise((resolve, reject) => {
            console.log('doing something');
            setTimeout (() => {
                reject(new Error('no network');
            }, 2000);
        })

        // Consumer
        promise.then((value) => {
            console.log(value);
        })
        .catch((error) => {
            console.log(error) // Error: no network
        })

        // rejected 상태의 promise에 then메소드를 호출하면 그 결과값으로 다시 rejected 상태의 promise를 내놓는다.
        // 그리고 그 promise에서 다시 catch를 호출한것.
    ```

- finally

  - 프로미스의 상태가 `fufilled`이던 `rejected`이던 마지막에 반드시 호출되어지는 것.
  - 수행된 작업의 성공, 실패 여부에 관계없이 마지막에 어떤 기능을 하고 싶을 때.

    ```js
    // Producer
        const promise = new Promise((resolve, reject) => {
            console.log('doing something');
            setTimeout (() => {
                reject(new Error('no network');
            }, 2000);
        })

        // Consumer
        promise.then((value) => {
            console.log(value);
        })
        .catch((error) => {
            console.log(error) // Error: no network
        })
        .finally(() => {
            console.log('finally'); // finally
        })
        // 실패했을때도 finally()가 호출된다.
        // 성공했을떄도 마찬가지로 finally()가 호출된다.
    ```

## Promise chaning

- 비동기적인 작업들을 묶어서 동기적으로 처리할 수 있다.

  ```js
  const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
  });

  fetchNumber
    .then((num) => num * 2) // 1초뒤 : 2
    .then((num) => num * 3) // 1초뒤 : 6
    .then((num) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(num - 1), 1000);
      });
    })
    .then((num) => console.log(num)); // 1초뒤 : 5
  ```

## Error Handling

- `catch`를 통해 에러를 처리할 수 있다.
- `catch`의 위치와 에러가 발생한 위치에 따라 서로 다른 `catch`가 실행될 수 있다.

  ```js
  const getHen = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(`🐓`), 1000);
    });

  const getEgg = (hen) =>
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error(`${hen} => 🥚`)), 1000);
    });

  const cook = (egg) =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve(`${egg} => 🍳`), 1000);
    });

  getHen()
  // 넘겨주는 파리미터와, 사용하는 파라미터가 한개라면 생략이 가능하다.
  .then((hen) => getEgg(hen)) // .then(getEgg)
  .catch(error => {
      return `🍞`;
  })
  .then((egg) => cook(egg)) // .then(cook) 로 생략가능
  .then((meal) => console.log(meal)); // .then(consoe.log) 로 생략가능
  .catch(console.log); // 🐓 => 🍞
  ```

## Parallelism

- `Promise.all()` 을 통해 비동기처리 작업들을 모아서 한번에 처리하는 병렬처리가 가능하다.
- 훨씬 깔끔해보이고, 보기가 좋다.

  ```js
  const getApple = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("🍎"), 3000);
    });

  const getBanana = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("🍌"), 3000);
    });

  function pickAllFruits() {
    // 배열에 있는 애들을 병렬적으로 모아준다.
    return Promise.all([getApple(), getBanana()]).then((fruits) =>
      fruits.join(" +  ")
    );
  }
  pickAllFruits().then(console.log); // 3초 뒤 🍎+🍌 출력
  ```

## Race

- `Promise.race()` 를 통해 여러개의 비동기처리를 진행하고, 그 중 가장 먼저 끝난 것을 가져올 수 있다.

  ```js
  const getApple = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("🍎"), 2000);
    });

  const getBanana = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("🍌"), 3000);
    });
  function pickOnlyOne() {
    return Promise.race([getApple(), getBanana]);
  }

  pickOnlyOne().then(console.log); // 2초뒤 🍎 출력
  ```
