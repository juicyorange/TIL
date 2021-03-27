# JS Async Await

## ✨ Async Await 란??

- `ES6` 에서 추가된 비동기처리를 위한 `Promise` 는 callback 함수를 통해 비동기를 처리하는 것 보다는 가독성 및 작성이 용이해졌지만, 여전히 처음 사용하는 사람이 이해하기에는 어려움이 있다.
- 이에 `ES8` 이후 Promise를 좀 더 간결하게 사용가능. 동기적인 코드처럼 작성하는 것이 가능해졌다.
- 새로운 비동기처리 방식을 만든 것이 아닌, 기존에 존재하던 Promise 위에 간편한 API를 제공하는 것 (syntactic sugar).
- `Async Await` 가 나왔다고 해서 `Promise` 를 사용하는 것이 나쁘다는 것은 아니다. Promise를 사용하는 것이 맞는 경우가 있고, 또는 async await를 사용해야지 깔끔해지는 경우도 있다.

## async

- 함수 앞에 `async` 를 붙임으로써 해당 함수 scope의 코드들을 자동으로 Promise로 변환해준다.
- return 값도 프로미스와 마찬가지이다.

  ```js
  // 프로미스 안에서 resolve, reject를 사용해야한다.
  // 그렇지 않으면 pending 상태의 프로미스가 리턴된다.
  function fetchUser() {
    return new Promise((resolve, reject) => {
      // do netwrok request
      resolve("Kim");
    });
  }

  const user = fetchUser();
  console.log(user); // Promise {<fulfulled>: "Kim"}

  // 함수 앞에 async를 붙이면 자동으로 코드블럭이 자동으로 Promise로 변한다
  async function fetchUser() {
    // do netwrok request
    return "Kim";
  }

  const user = fetchUser();
  console.log(user); // Promise {<fulfulled>: "Kim"}
  ```

## await

- `async` 가 붙은 함수 안에서만 사용이 가능하다.
- `await` 를 통해 코드를 동기적코드처럼 작성하는 것이 가능해진다.

  ```js
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function getApple() {
    await delay(3000); // delay 함수가 끝날때까지 기다려준다
    return "🍎";
  }

  async function getBanana() {
    await delay(3000);
    return "🍌";
  }
  // then을 사용
  function getBanana() {
    return delay(3000).then(() => "🍌");
  }

  // 프로미스도 너무 중첩되면 콜백지옥과 비슷한 문제가 발생
  function pickFruits() {
    return getApple().then((apple) => {
      return getBanana().then((banana) => `${apple} + ${banana}`);
    });
  }

  pickFruits().then(console.log);

  // await을 사용함으로써 코드의 가독성이 훨씬 올라간다.
  async function pickFruits() {
    const apple = await getApple();
    const banana = await getBanana();
    return `${apple} + ${banana}`;
  }
  ```

## Error Handling

- async await는 promise와 달리 `.catch()` 와 같은 에러처리 메소드가 없다. 따라서 `try{} catch{}` 를 통해 에러처리를 해주어야 한다.

  ```js
  async function getApple() {
    await delay(3000); // delay 함수가 끝날때까지 기다려준다
    throw "error";
    return "🍎";
  }

  async function pickFruits() {
    try {
      const apple = await getApple();
      const banana = await getBanana();
    } catch (error) {
      console.log(error);
    }
    return `${apple} + ${banana}`;
  }
  ```

## Parallelism

- 비동기 작업들을 병렬적으로 처리하는 것도 가능하다.
- 다만, 비동기 작업들이 많아지면 조금 지저분해 보일 수 있어 `Promise.all()` 이 더 깔끔할수도 있다.(?)
- 기본적인 방식

  ```js
  async function pickAllFruits() {
    const applePromise = getApple();
    const bananaPromise = getBanana();
    const apple = await applePromise;
    const banana = await bananaPromise;
    return `${apple} + ${banana}`;
  }
  ```

- Promise all
  ```js
  function pickAllFruits() {
      return Promise.all([getApple(), getBanana()]).then(fruits) => fruits.join(' + ');
  }
  ```
