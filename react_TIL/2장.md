# 2장


## 기존 ES5를 쓰던 자바스크립트의 문제
 * var 로 정의된 변수가 함수 scope를 가진다.
    ```javascript 
    function example() {
        var i = 1;
    }
    console.log(i); //참조 에러
    ```
    이 처럼 함수 scope를 벗어나면 변수를 사용할 수 없다. 

    ```javascript
    function example1() {
        i = 1;
    }
    function example2() {
        console.log(i);
    }
    example1();
    example2(); // 1이 출력됨
    ```
    또한 var 을 사용하지 않는경우 위처럼 전역변수가 된다.

    ```javascript
    for (var i =0 ; i < 10; i++){
        console.log(i);
    }
    console.log(i); //10
    ```
    함수 scope기 때문에 같은 함수안에서는 for문 이후에 i 를 다시쓰면 10이 그대로 나오는 모습이다. 
 * var 의 호이스팅 문제
    - var로 정의된 변수는 그 변수가 속한 scope의 최상단으로 끌어올려진다. 이를 호이스팅(hoisting)이라 부른다.
        ```javascript
        console.log(myVar);
        var myVar = 1;
        ```
        위와 같은 코드가 오류가 발생하지 않는다.

## const 와 let
 * const, let은 블록 스코프이다. 
    - 함수 스코프의 단점 대부분이 블록 스코프에는 존재하지 않는다.
        ```javascript
        if (true) {
            const i = 0;
        }
        console.log(i); // 참조 에러
        ```
 * const로 정의된 변수는 재할당이 불가능하다. var, let은 재할당이 가능하다.
    - 재할당이 불가능한 변수는 프로그램의 복잡도를 상당히 낮춰주기 때문에 되도록 재할당 불가능한 변수를 사용하는 것이 좋다. 
    - const는 재할당이 불가능하지만 const로 정의된 객체의 내부 속성값은 수정, 추가 모두 가능하다. 

## 객체와 배열의 사용성 개선
 * 단축 속성명과 계산된 속성명을 사용하면 객체와 배열을 생성하고 수정하는 코드를 쉽게 작성할 수 있다. 
 * 전개 연산자와 비구조화 할당 덕분에 객체와 배열의 속성값을 밖으로 꺼내는 것이 훨씬 쉬워졌다. 
 * 단축 속성명(shorthand property names)
    - 간편하게 새로운 객체를 만들수 있다. 

        ```javascript
        const name = 'mike';
        const obj = {
            age: 21,
            name, //새로 마들려는 객체의 속성값 일부가 이미 변수로 존재하면 그냥 변수명을 적어주면 된다.
            getName() {return this.name} // 속성값이 함수인 경우 function 키워드 없이 함수명만 적어도 된다. 
        }
        ```
    - 단축 속성명을 사용하면 코드를 훨씬 간결하고 보기 좋게 작성할 수 있다. 

        ```javascript
        function makePerson1(age, name) {
            return {age: age, name: name};
        } // 단축 속성명을 사용하지 않은 경우
        function makePerson2(age, name){
            return {age, name};
        } // 단축 속성명을 사용한 경우
        ```

    - console.log에서 단축 속성명 활용

        ```javascript
        const name = 'mike';
        const age = 21;
        console.log('name =', name, ',age = ', age); //name = mike, age =21
        console.log({name, age}); // { name : 'mike', age : 21}
        ```
 * 계산된 속성명(computed property names)
    - 객체의 속성명을 동적으로 결정하기 위해 나온 문법이다. 

        ```javascript
        function makeObject1(key, value) {
            const obj = {} ;
            obj[key] = value;
            return obj;
        } // 계산된 속성명을 사용하지 않은 경우
        function makeObject2(key, value) {
            return { [key] : value};
        } // 계산된 속성명을 사용하 경우
        ```
    * 객체의 상탯값을 변경할 때 유용하게 쓸 수 있다. 

        ```javascript
        class MyComponent extends React.Component {
            state = {
                count1 : 0,
                count2 : 0,
                count3 : 0,
            };
            //...
            Onclick = index => {
                const key = `count${index}`;
                const value = this.state[key];
                this.setState({ [key]: value+1}); //여기서 계산된 속성명을 사용해 간결하게 코드를 짤 수 있다. 
            }
        }
        ```

 * 전개 연산자(spread operator)
    - 전개연산자는 배열이나 객체의 모든 속성을 풀어놓을 때 사용하는 문법이다. 

        ```javascript
        Math.max(1,3,7,9); // 전개 연산자를 사용하지 않은 경우

        const numbers = [1,3,7,9];
        Math.max(...numbers); // 전개 연산자를 사용한 경우
        ```
    - 전개 연산자는 배열이나 객체를 복사할 때도 유용하다. 

        ```javascript
        const arr1 = [1,2,3];
        const obj1 = {age: 23, name : 'Kim'};

        const arr2 = [...arr1];
        const obj2 = {...obj1};
        ```
        - 배열의 경우 전개 연산자를 사용하면 그 원소들의 순서가 유지된다. 
    - ES5 까지는 중복된 속성명을 사용하면 에러가 발생했으나 ES6 부터는 중복된 속성명이 허용된다.

        ```javascript
        const obj1 = {x: 1, x:2, y:'a'}; // {x : 2 , y : 'a'}
        //중복된 속성명을 사용했을때 가장 마지막 속성명의 값이 결과가 된다. 

        const obj2 = {...obj1, y:'b'}; // {x : 2 , y : 'b'}
        // 객체의 특정 속성값을 변경할 때 이전 객체에 영향을 주지 않고 새로운 객체를 만들어 낼 수 있다. 
        ```

 * 배열 비구조화(array destructuring)
    - 배열의 여러 속성값을 변수로 쉽게 할당할 수 있는 문법

        ```javascript
        const arr = [1,2];
        const [a,b] = arr;
        console.log(a); //1
        console.log(b); //2
        ```
 * 객체 비구조화(object destructuring)
    - 객체의 여러 속성값을 변수로 쉽게 할당 할 수 있는 방법이다.

        ```javascript
        const obj = {age: 21, name: 'Kim'};
        const {age, name} = obj;
        console.log(age); // 21
        console.log(name); // mike
        ```
        - 배열과 다르게 중괄호 안의 변수의 순서는 중요하지 않다. 단 기존 속성명을 그대로 사용하여야 한다. 
        - ```const {age: theAge, name} = obj; ```를 사용하면 기존 속성명과 다른 이름으로 변수를 생성할 수 있다. 
    - 기본값을 지정하는 것도 가능하다.

        ```javascript
        const obj = { age : undefined, name : null, grade: 'A'};
        const { age = 0 , name = 'noName', grade = 'F'} = obj;
        console.log(age); // 0
        console.log(name); // null
        console.log(grade); // A
        ```
        - ```undefined``` 라고 지정해놓으면 기본값을 넣을 수 있고, 그렇지 않고 나머지의 경우에는 기본값이 들어가지 않는다. 
    - for 문을 통해 객체를 원소를 갖는 배열을 순회할 때 객체 비구조화를 사용하면 편리하다

        ```javascript
        const people = [{age : 21, name: 'Kim'}, {age: 51, name: 'Shin'}];
        for ( const {age, name}, of people) {
            // ...
        }
        ```

## 강화된 함수의 기능 
 * 나머지 매개변수를 이용하여 함수의 parameter가 가변적일때 유용하게 사용이 가능하다.

    ```javascript
    function printLog(a, ...rest){
        console.log({ a, rest });
    }
    printLog(1, 2, 3); // { a: 1, rest: [2, 3]}
    ```   
 * ES6 에서는 화살표 함수를 이용해 함수를 정의하는 방법이 추가되었다.
    - 화살표 함수를 이용하면 함수를 간결하게 작성하는 것이 가능하다. 

        ```javascript
        const add = (a,b) => a + b;
        console.log(add(1,2)); // 3
        // 함수를 중괄호로 감싸지 않아도 되고 return 코드를 작성할 필요 없이 훨씬 명시적이고, 코드가 간결해진다.

        const add5 = a => a+5;
        console.log(add5(1)); // 6
        // 매개변수가 하나라면 감싸는 소괄호도 생략이 가능하다. 

        const addAndReturnObject = ( a, b ) => ({result : a + b});
        console.log(addAndReturnObject(1,2).result); // 3
        // 객체를 반환하는 경우에는 소괄호로 감싸야 한다. 
        ```
    - 코드가 여러줄이라면 전체를 중괄호로 묶고, 반환값에서는 return 키워드를 사용하다.

        ```javascript
        const add = (a, b) => {
            if ( a <= 0 || b <= 0) {
                throw new Error ('must be positive number');
            }
            return a + b;
        };
        ```
    - 화살표함수는 일반함수와 달리 ```this 와 argument``` 가 바인딩되지 않는다. 그래서 화살표함수에서 ```argument```가 필요하다면 나머지 매개변수를 이용한다.

        ```javascript
        const printLog = (...rest) => console.log(rest);
        printLog(1,2); // [1,2]
        ```

## 프로미스

 * 프로미스를 사용하면 비동기 코드 방식을 동기 코드 방식으로 작성하는 것이 가능하다.
    - 비동기 프로그래밍을 할때 코드를 순차적으로 작성할 수 있다. 
    - 프로미스 생성하기

        ```javascript
        const p1 = new Promise ((resolve, reject) => {
            // ...
            // resolve(data)
            // or reject('messeage')
        });
        const p2 = Promise.reject('error message');
        const p3 = Promise.resolve(param);
        ```
        - 일반적으로 new 키워드를 사용하여 프로미스릉 생성하고, 이 방법으로 생성된 프로미스는 대긱 중 상태가 된다.(```p1```) 
        - 생성자에 입력되는 함수는 resolve와 reject라는 콜백 함수를 매개변수를 갖게되고, 비동기로 어떤 작업을 수행 후 성공했을 때 resolve를 호출하고, 실패했을 때 reject를 호출하면 된다. 
        - new 키워드를 사용하지않고 Promise.reject를 호출하면 거부됨 상태인 프로미스가 생성된다.(```p2```)
        - ```Promise.resolve```를 호출해도 프로미스가 생성되며, 만약 입력값이 프로미스였다면 그 프로미스가 그대로 반환되고, 프로미스가 아니라면 이행됨 상태인 프로미스가 반환된다. (```p3```)
    - 프로미스 then
        - ```then```은 처리됨 상태가 된 프로미스를 처리할 때 사용되는 메서드이다. 
        - 프로미스가 처리됨 상태가 되면 ```then``` 메서드의 인수로 전달된 함수가 호출된다.

            ```javascript
            requestData().then(onResolve, onReject);
            Promise.resolve(123).then(data => console.log(data)); //123
            Promise.reject('err').then(null, error => console.log(error)); // 에러 발생
            ```
            - 프로미스가 처리됨 상태가 되면 ```onReolve``` 함수가 호출되고, 거부됨 상태가 되면 ```onReject``` 함수가 호출된다. 
        - ```then``` 메서드는 항상 프로미스를 반환한다. 따라서 하나의 프로미스로부터 연속적으로 ```then``` 메소드를 호출하는 것이 가능하다. 
            - 거부됨 상태가 되면 ```onReject``` 함수를 호출하는데, 거부됨 상태인 프로미스는 처음으로 만나는 ```onReject``` 함수를 호출하게 된다. 이전에 ```onResolve```만 있는 ```then```은 다 건너뛰고 처음만나는 ```onReject```가 있는 함수의 작업을 수행하게 된다. 
    - 프로미스 catch
        - 프로미스에서 보통 예외처리는 ```catch```를 사용한다. 

            ```javascript
            Promise.resolve()
                .then(() => {
                    throw new Error('some error');
                })
                .catch(error => {
                    console.log(error);
                });
            ```
    - 프로미스 finally
        - ```finally```는 프로미스가 이햄됨 또는 거부됨 상태일때 호출되는 메서드로 프로미스 체인의 가장 마지막에 사용한다. 

            ```javascript
            requestData()
                .then(data => {
                    //...
                })
                .catch(error => {
                    //...
                })
                .finally(() => {
                    //...
                })
            ```
        - ```finally```메서드는 ```.then(onResolve, onReject)``` 코드와 유사하지만, 이전에 사용된 프로미스를 그대로 반환한다. 따라서 처리됨 상태인 프로미스의 데이터를 건드리지 않고 추가 작업을 할때 유용하다. (새로운 프로미스 생성 x)

 * 프로미스 활용하기 
    - ```then``` 메서드를 체인으로 연결하면 각각의 비동기 처리가 병렬로 처리되지 않는다. 이때 ```Promise.all```을 이용해 병렬로 처리되도록 할 수 있다. 

        ```javascript
        Promise.all([requestData1(), requestData2()]).theb (([data1, data2]) => {
            console.log(data1, data2);
        });
        ```
    - ```Promise.race```를 통해 여러 개의 프로미스 중에서 가장 빨리 처리된 프로미스를 반환하게 할 수 도 있다. 

        ```javascript
        Promise.race([
            requestData(),
            new Promise ((_, reject) => setTimeout(reject, 3000)),
        ])
        .then(data => console.log(data))
        .catch(error => console.log(error));
        ```
        - ```requestData``` 함수가 3초 안에 데이터를 받으면 ```then``` 메소드가 호출되고 그렇지 않으면 ```catch``` 메소드가 호출된다. 
 * 프로미스 주의사항 
    - ```return``` 을 빠드리면 안된다. 
    - 프로미스는 불변객체이다. 
    - 프로미스를 중첩하여 사용하는 경우는 없도록 구현하자. 
    
    <br>

## 향상된 비동기 프로그래밍(async await)
 * async await를 사용하면 훨씬 쉽게 비동기 프로그래밍이 가능하다.(Promise보다 향상된 최신 기법)
 * ```await```는 일반함수에서는 사용이 불가능하고 ```async``` 함수안에서만 가능하다. 

    ```javascript
    // Promise
    function getDataPromise(){
        return asyncFunc1()
        .then(data1 => Promise.all([data1, asyncFunc2(data1)]))
        .then(([data1, data2]) => {
            return asyncFunc3(data1, data2);
        });
    }
    // Async
    async function getDataAsync() {
        const data1 = await asyncFunc1();
        const data2 = await asyncFunc2(data1);
        return asyncFunc3(data1, data2);
    }
    ```

 * 비동기 함수를 병렬로 실행하는 것도 가능하다. 
 
    ```javascript
    async function getData() {
        const p1 = asyncFunc1();
        const p2 = asyncFunc2();
        const data1 = await p1;
        const data2 = await p2;
        //...
    }

    async function getData(){
        const [data1, data2] = await Promise.all([asyncFunc1(), asyncFunc2()]);
        //...
    }
    ```
 * 예외처리하기

    ```javascript
    async function getData() {
        try {
            await doAsync(); // 비동기함수
            return doSync(); // 동기함수
        } catch (error) {
            console.log(error);
        }
    }
    ```
