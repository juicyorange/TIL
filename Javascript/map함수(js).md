# map 함수에 대해

 * map() 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 바탕으로 새로운 배열을 반환합니다.

 * map() 을 호출한 배열의 요소를 함수의 매개변수로 하나씩 가져와서 함수안의 작업을 처리한다. 

 * Array.map()의 에시 코드

    ```javascript
    const array1 = [1, 4, 9, 16];

    const map1 = array1.map(x => x * 2);

    console.log(map1); // [2, 8, 18, 32]
    ```

 * 맵 함수의 매개변수로 들어가는 함수의 매개변수는 object이다.<br>
   마지막에 return 을 통해 각 아이템을 처리한 결과를 돌려준다.

    ```javascript
    var kvArray = [{key:1, value:10},
               {key:2, value:20},
               {key:3, value: 30}];

    var reformatArr = kvArray.map(obj => {
        return { [obj.key] = obj.value };
    })

    // reformatArr [{1:10}, {2:20}, {3:30}]

    // kvArray는 그대로
    // [{key:1, value:10},
    //  {key:2, value:20},
    //  {key:3, value: 30}]
    ```

 * map 에서 화살표 함수를 이용한 return 입력 생략
    
    ```javascript
    Array.map(obj => {
        return obj.count + 1;
    })

    Array.map(obj => obj.count + 1)
    ```



 * react에서 배열에 있는 값들을 컴포넌트에게 하나씩 전달해서 무엇인가 보여주려할 때 자주 사용된다.
    
    ```javascript
    function App() {
        return (
            <div>
               <Food key = {dish.id} name ={dish.name} color = {dish.color} />
            </div>
        )
    }
    ```