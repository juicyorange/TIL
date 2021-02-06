# 3장

## UI 라이브러리 - 리액트 

 * UI 라이브러리인 리액트는 UI 데이터를 보다 효율적으로 관리할 수 있도록 도와준다.

 * 이때 UI 데이터는 컴포넌트 내부에서 관리되는 ```상탯값(state)``` / 부모 컴포넌트에서 내려 주는 ```속성값(props)```으로 구성된다. 

 * 리액트에서는 UI 데이터가 변경되면 그것에 따른 돔을 찾아 변경하느 것이 아닌 리액트가 컴포넌트 함수를 이용해서 화면을 자동으로 갱신해 주며, 이것이 리액트의 가장 중요한 역할이라 할 수 있다. 

 * 기존의 javascript가 화면을 어떻게 그리는지 나타냈다면 리액트는 화면에 무엇을 그리는지를 나타낸다 할 수 있다. 

<br><br><br>

## 컴포넌트의 속성값과 상탯값
 * 위에서 언급했듯이 컴포넌트의 상태값은 해당 컴포넌트가 관리하는 데이터이고, 컴포넌트의 속성값을 부모 컴포넌트로부터 전달받는 데이터다. 
 * 리액트에서는 UI 데이터를 반드시 상탯값과 속성값으로 관리해야 한다. 그렇지 않으면 UI 데이터가 변경되어도 화면이 갱신되지 않을 수 있다. 
 * 상태값 : 컴포넌트 내부에서 관리하는 값
    - 컴포넌트의 상태값을 사용하지 않는 코드 

        ```javascript
        let color = "red";
        function MyComponent() {
            function onClick() {
                color = "blue";
            }
            return (
                <button style ={{ backgroundColor : color }} onClick = {onClick}>좋아요</button>
            );
        }
        ```
        - 이 경우 color 데이터는 파란색으로 변경되지만 리액트가 UI가 변경됬다는 사실을 모르기 때문에 버튼의 색은 여전히 빨간색이다. 
    - 컴포넌트의 상태값을 사용하는 코드

        ```javascript
            import React, {useState}, from 'react';

            function MyComponent() {
                const [color, setColor] = useState("red"); //useState 훅
                function onClick(){
                    setColor ("blue"); //상태값 변경 함수
                }
                return (
                <button style ={{ backgroundColor : color }} onClick = {onClick}>좋아요</button>
                );
            }
        ```
        - 컴포넌트에 상태값을 추가할 때는 ```useState``` 훅을 사용한다. 
        - ```useState``` 의 훅의 인자는 초깃값을 의미한다.
        - ```useState``` 가 반환하는 배열의 첫번째 원소는 상탯값이고, 두번째 원소는 상탯값 변경 함수이다. 
        - ```setColor```(상태값 변경 함수) 가 호출되면 상탯값을 변경하고 해당 컴포넌트를 다시 렌더링 한다. 
 * 속성값 : 부모 컴포넌트가 전달해주는 값

    - 대부분의 경우 UI 데이터를 포함한다. 
    - 속성값을 이용한 코드

        ```javascript
        function Title(props) {
            return <p>{props.title}</p>;
        }
        ```
        - Title 컴포넌트는 부모 컴포넌트로부터 ```props``` 객체를 받고 그 안에 ```title``` 이라는 속성값을 사용한다. 
        - Title 컴포넌트는 부모 컴포넌트가 렌더링될 때마다 같이 렌더링되므로 title 속성값의 변경 사항이 바로 화면에 반영된다. 
    - title 속성값을 내려 주는 부모 컴포넌트의 코드
    
        ```javascript
        function Todo() {
            const [count, setCount] = useState(0);
            function onClick() {
                setCount(count+1);
            }
            return (
                <div>
                    <Title title={`현재 카운트: ${count}`}/>
                    <button onClick={onClick}>증가</button>
                </div>
            )
        }
        ```
        - 버튼에 ```onClick```을 지정해 두었기 때문에 해당 함수 안에 있는 setCount가 실행되어 count의 상태값이 변경되고, ```Todo``` 컴포넌트는 다시 렌더링된다.
        - 이때 ```Title``` 컴포넌트는 새로운 ```title``` 속성값을 내려받는다. 
    - 이때 ```Title``` 컴포넌트는 부모 컴포넌트가 렌더링될 때마다 같이 렌더링 된다. 만약 ```title``` 속성값이 변경될 때만 렌더링되길 원한다면 ```React.memo``` 를 이용하면 된다.

        ```javascript
        // 자식 컴포넌트
        function Title(props) {
            return <p>{props.title}</p> ;
        }
        export default React.memo(Title);
        ```
    * 각 컴포넌트는 상태값을 저장하기 위한 자신만의 메모리 공간이 있기 때문에 같은 컴포넌트라도 자신만의 상탯값 공간이 존재한다. 

        ```javascript
        function App() {
            return (
                <div>
                    <MyComponent />
                    <Mycomponent />
                </div>
            )
        }
        ```
        - 두 개의 같은 컴포넌트의 상태값이 따로 관리된다. 
    * 속성값(props)는 불변값이지만 상태값(state)는 불변값이 아니다. 하지만 상태값도 불변값으로 관리하는 것이 좋다. 

<br><br><br>

## 컴포넌트 함수의 반환값
 * 컴포넌트 함수에서는 다양한 값들을 반환하는 것이 가능하다.
    - HTMl 대부분의 태그 반환 가능

        ```javascript
        // HTML의 대부분의 태그들 반환 가능
        return <MyCompoenet title="안녕하세요" />;
        return <p>안녕하세요</p>;
        ```

    - 문자열과 숫자 반환 가능

        ```javascript
        return 'hello';
        return 123;
        ```
    - 배열반환 가능. 단 각 리액트 요소는 ```key```속성값을 가져야 한다. 

        ```jsx
        return [<p key="a">안녕하세요</p>, <p key="b">Hello</p>]
        ```
    - fragment를 사용하면 배열을 사용하지 않고도 여러 개의 요소를 표현할 수 있다. 또한 fragment 내부의 리액트 요소에 key 속성값을 부여하지 않아도 되어 배열보다 편리하게 사용가능
        
        ```javascript
        return (
            <React.Fragment>
                <p>안녕하세오</p>
                <p>반갑습니다</p>
            </React.Fragment>
        );
        ```
    - fragment를 쓰기도 하지만 보통 바벨을 이용해 fragment를 축약해서 사용한다.

        ```javascript
        return (
            <>
                <p>안녕하세오</p>
                <p>반갑습니다</p>
            </>
        );
        ```
    - null 또는 불(boolean)을 반환하면 아무것도 렌더링하지 않는다.

        ```javascript
        // 불을 이용하여 조건부 렌더링을 하는 코드
        function MyComponent({ title }) {
            return title.length > 0 && <p>{title}</p>;
        }
        ```
    - 리액트 포털(portal)을 사용하면 컴포넌트의 현재 위치와는 상관없이 특정 돔 요소에 렌더링 할 수 있다.

        ```javascript
        // 사용 예
        function Modal({ title, desc }) {
            const domNode = document.getElementById('modal');
            // id가 'modal'인 곳에 렌더링 한다 
            return ReactDOM.createPortal(
                <div>
                    <p>{title}</p>
                    <p>{desc}</p>
                </div>,
                domNode,
            );
        }

        // 기본 형태
        return ReactDom.createPortal(<p>hello</p>, domNode);
        ```

<br><br><br>

## 리액트 요소와 가상 돔 
 * 리액트가 새로운 리액트 요소를 받으면 이전의 리액트 요소와 비교해서 변경된 부분만 실제 돔에 반영한다. 
 * JSX 문법으로 작성된 코드는 리액트의 createElement 함수로 변경되고, createElement 함수는 리액트 요소를 반환한다. 
 * 리액트 요소는 불변 객체이기 때문에 속성값을 변경할 수 없다. 

    ```javascript
    const element = <a href = "http://google.com">clink here</a>
    element.type = 'b'; // 에러 발생
    ````
 * 리액트는 렌더링을 할 때마다 가상 돔을 만들고 이전의 가상 돔과 비교하여 변경사항이 있는 부분만 실제 돔에 반영한다.
 * 실제 돔을 만들때 우선 최상위에 있는 태그와 컴포넌트를 바탕으로 type 값을 정해준다. 이후 type 값에 문자열이 아닌 컴포넌트가 들어가있는 경우 해당 컴포넌트 단위로 내려가서 다시 해당 작업을 반복하여 type에 모두 문자열이 올때까지 반복하여 실제 돔을 만든다. 
    - 이때 type 값에 문자열과 컴포넌트명이 섞여있는 것을 <strong>가상 돔</strong> 이라 부르고, 이를 type 값을 모두 문자열로 바꾸면 <strong>실제 돔</strong>이 된다. 

<br><br><br>

## 리액트 훅 

 * <b>리액트 훅</b>은 함수형 컴포넌트에 기능을 추가할 때 사용하는 함수이다. 
    - 훅을 이용하면 함수형 컴포넌트에서 상태값을 사용할 수 있고, 자식 요소에 접근할 수 있다.
    - 클래스형 컴포넌트보다는 훅을 사용해서 함수형 컴포넌트로 작성하는 것이 권장된다. 

 * 상태값 추가하기 : useState
    - ```useState``` 훅이 반환하는 배열의 두 번쨰 원소는 상태값 변경 함수이다.
    - 리액트는 상탯값 변경 함수가 호출되면 해당 컴포넌트를 다시 렌더링한다. 그 과정에서 자식 컴포넌트도 같이 렌더링 된다. 

        ```javascript
        function MyComponent() {
            const [count, setCount] = useState({ value: 0 });
            function onClick() {
                setCount({ value: count.value + 1});
                setCount({ value: count.value + 1});
            }
            console.log ("render called");
            return (
                <div>
                    <h2> { count.value }</h2>
                    <button onClick={onClick}>증가</button>
                </div>
            );
        }
        ```
        - 위 에서 ```setCount```를 2번 사용하여 값을 2번 증가시키려한다. 하지만 상태값 변경 함수는 비동기로 동작하기 때문에 1번만 증가한다. 
        - 리액트는 효율적으로 렌더링하기 위해 여러 개의 상탯값 변경 요청을 일괄처리 한다. 따라서 ```onClick``` 함수가 호출되어도 console.log는 한번만 동작하게 된다. 

        ```javascript
        function MyComponent()  {
            const [ count, setCount] = useState(0);
            function onClick() {
                setCount(prev => prev + 1);
                setCount(prev => prev + 1);
            }
            // ...
        }
        ``` 
        - 상탯값 변경 함수로 입력된 함수는 자신이 호출되기 직전의 상태값을 매개변수로 받는다. 
        - 여기서는 첫 번째 호출에서 변경된 상태값이 두 번째 호출의 인수로 사용된다. 따라서 onClick의 결과 count의 상태값이 2만큼 증가한다. 
    - 상태값 변경 함수는 비동기로 처리되지만 그 순서가 보장된다. 

 * useState 훅 하나로 여러 상탯값 관리하기
    - 기존의 클래스형 컴포넌트의 ```setState``` 메서드와 조금 다르게 동작한다. ```setState```는 기존 상탯값과 새로 입력된 값을 병합하지만 ```useState``` 훅의 상태값 변경 함수는 이전 상탯값에 덮어쓰는 방식이다.
    - 두 개의 상탯값 하나의 객체로 관리하기 ( 이것(```useState```) 보다는 ```useReducer```훅을 사용하는 것이 좋다.)

        ```js
        import React, { useState } from 'react';
        
        function Profile() {
            const [state, setState] = useState({ name: '', age: 0});
            return (
                <div>
                    <p>{`name is ${state.name}`}</p>
                    <p>{`age is ${state.age}`}</p>
                    <input
                        type = "text"
                        value={state.name}
                        onChange={e => setState({...state, name: e.target.name })}
                    />
                    <input
                        type = "number"
                        value={state.age}
                        onChange={e => setState({...state, age: e.target.age })}
                    />
                </div>
            )
        }
        ```
        - 이때 ```onChange```의 ```setState``` 에서 ```...state```를 해주었는데 이는 ```useState``` 훅이 이전 상탯값을 덮어쓰기 때문이다. 
 
 * 컴포넌트에서 부수 효과 처리하기 : useEffect
    - ```useEffect``` 는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 할 수 있는 훅이다. 
    - 함수 실행 시 함수 외부의 상태를 변경하는 연산을 부수 효과라고 부른다. 특별한 이유가 없다면 모든 부수 효과는 ```useEffect``` 훅을 이용해 처리하도록 하자.
        
        ```javascript
        import React, { useState, useEffect } from 'react';

        function MyComponent() {
            const [count, setCount] = useState(0);
            useEffect (() => {
                document.title = `업데이트 횟수 : ${count}`;
            });
            return <button onClick={() => setCount(count+1)}>increase</button>;
        }
        ```
        - ```useEffect``` 훅에 입력하는 함수를 부수 효과 함수라고 한다. 
        - 부수 효과 함수는 렌더링 결과가 실제 돔에 반영된 후 호출되고, 컴포넌트가 사라지기 직전에 마지막으로 호출된다. 
    * useEffect 훅을 이용하여 API를 호출하거나 이벤트 처리 함수를 등록하고 해제하는 것도 가능하다. 
    * useEffect 훅의 두 번째 인자로 배열을 입력하면 배열의 값이 변경되는 경우에만 함수가 호출된다. 그리고 이때 빈 배열을 넣으면 컴포넌트가 생성될때만 부수 효과 함수가 호출되고, 컴포넌트가 사라질 때만 반환된 함수가 호출된다.  

 * 리액트가 제공하는 훅을 이용해서 커스텀 훅을 만들 수 있다. 
 * 훅 사용시 지켜야 할 규칙
    - 하나의 컴포넌트에서 훅을 호출하는 순서는 항상 같아야한다.

        ```javascript
        function MyComponent() {
            const [value, setValue] = useState(0);

            // 조건에 따라 훅을 호출하면 순서가 보장되지 않는다. (규칙 위반)
            if ( value === 0 ) {
                const [v1, setV1] = useState(0);
            }
            else {
                const [v1, setV1] = useState(0);
                const [v2, setV2] = useState(0);
            }

            // 루프 안에서 훅을 호출하는 것도 순서가 보장되지 않는다. (규칙 위반)
            for (let i = 0 ; i  <value; i++) {
                const [num, setNum] = useState(0);
            }

            //func1 함수가 언제 호출될지 알 수 없기 때문에 순서가 보장되지 않는다. (규칙 위반)
            function func1() {
                const [num, setNum] = useState(0);
            }
        }
        ```
    - 훅은 함수형 컴포넌트 또는 커스텀 훅 안에서만 호출되어야 한다. 

<br><br><br>

 ## 콘텍스트 API로 데이터 전달하기
 * 보통 상위 컴포넌트에서 하쉬 컴포넌트로 데이터를 전해줄 때 속성값(props)이 사용되는데, 근처의 컴포넌트들끼리 데이터 전송을 속성값으로 충분하지만 멀리 떨어져있는 경우 속성값을 반복적으로 내려줘야 한다.(사용하지 않는데도 불구하고 내려주는 작업이 추가됨) 이때 콘텍스트 API를 통해 멀리 떨어져있는 컴포넌트로 쉽게 속성값을 전달할 수 있다. 함수를 보내는 것도 가능하다(추후에 dispatch 와 같은 함수를 전달하기도 함). 

 * 콘텍스트 api를 사용한 코드

    ```javascript
    const UserContext = React.createContext(''); //이것을 통해 context를 생성한다. context객체에는 Provider와 Consumer가 존재한다. 

    function App() {
        const [username, setUsername] = setState('');
        return (
            <div>
                <UserContext.Provider value = {username}>
                    <div>상단 메뉴</div>
                    <Profile />
                    <div>하단 메뉴</div>
                </UserContex.Provider>
                <input
                    type = "text" 
                    value = {username} 
                    onChange = { e => setUsername(e.target.value)}
                />
            </div>
        );
    }

    const Profile = React.memo(() => {
        return (
            <div>
                <Greeting />
                {/*...*/}
            </div>
        );
    });

    function Greetring() {
        return (
            <UserContext.Consumer>
                {username => <p>{`${username} 님 안녕하세요`}</p>}
            </UserContext.Consumer>
        )
    }
    ```

    -  ```createComtext``` 함수를 호출하면 아래와 같은 콘텍스트 객체가 생성된다.

        ```javascript
        React.createContext(defaultValue) => { Provider, Consumer} 
        ```
    - 상위 컴포넌트에서는 Provider 컴포넌트를 이용해서 데이터를 전달한다
    - 하위 컴포넌트에서는 Consumer 컴포넌트를 이용해서 데이터를 사용한다.
    - 이때 Consumer 컴포넌트는 상위로 올라가면서 가장 가까운 Provider 컴포넌트를 찾는데 만약 최상위에 갈때까지 못찾는다면 기본값을 사용한다. 
 * 콘텍스트 API는 여러 콘텍스트의 Provider, Consumer를 중첩해서 사용할 수 있다. 
 * 하위 컴포넌트에서 콘텍스트 데이터를 수정하는 것도 가능하다. 
    - 콘텍스트 데이터를 수정할 수 있도록 함수를 전달하면 된다. 

<br><br><br>

## ref 속성값으로 자식 요소 접근

 * 리액트로 작업하다보면 돔 요소에 직접 접근해야 할 때가 있다. 이때 ref 속성값을 이용하면 자식 요소에 직접 접근할 수 있다. 
 * ref 속성값을 이용해 자식 요소(컴포넌트, 돔 , etc...)에 직접 접근하는 것이 가능하다. 

    ```javascript
    import React, {useRef, useEffect} from "react";

    function TextInput() {
        const inputRef = useRef(); // useRef 훅이 반환하는 ref 객체를 이용해 자식 요소에 접근가능 

        useEffect(() => {
            inputRef.current.focus();
        }, []); //ref 객체의 current 속성을 이용하면 자식 요소에 접근할 수 있다.

        return (
            <div>
                <input type="text" ref = {inputRef} /> 
                // 접근하고자 하는 자식 요소의 ref 속성값에 ref 객체를 입력한다. 
                // 해당 돔 컴포넌트가 생성되면 ref 객체로 접근할 수 있다. 
                <button>저장</button>
            </div>
        )
    }
    ```
    - 위의 경우에는 ```useEffect``` 훅 내부에서 자식 요소에 접근하고 있다. 부수 효과 함수는 컴포넌트 렌더링 결과가 돔에 반영된 후에 호출되므로 해당 돔 요소는 이미 생성된 상태이다. 따라서 ref 값이 존재한다. 
 * 자식의 자식 요소에 ref 값을 넣는 경우
    - ref를 만드는 컴포넌트의 자식 컴포넌트의 구조까지 알아야 하므로 진짜 특별한 상황이 아니면 되도록 사용하지 말자. 
    - 이떄는 ```forwardRef``` 를 사용하는 것이 가장 깔끔하다.

        - 일반적으로 작성하면 사용이 불가하다. 가능하게 하려면 ```useRef```로 생성한 ref 객체명을 직접 넘겨야 한다. 

        ```javascript
        import React, { useRef } from 'react';

        function User() {
            const idReferenece = useRef();
            const passwordReferenece = useRef();

            // ...

            return (
                <form>
                    <LableInput text='id: ' type='text' ref={idReferenece} />
                    <LableInput text='password: ' type='password' ref={passwordReferenece} />
                </form>
            )
        };

        const LableInput =  ({text, type, ref }) => (
            <lable>
                {text}
                <input type={type} ref={ref} />
            </lable>
        )
        ```

        - forwardRef 를 이용하여 작성하면 ref 객체명을 직접 쓰지 않고, ref로 적어도 사용이 가능하다. 

        ```javascript
        import React, { useRef } from 'react';

        function User() {
            const idReferenece = useRef();
            const passwordReferenece = useRef();

            // ... 

            return (
                <form>
                    <LableInput text='id: ' type='text' ref={idReferenece} />
                    <LableInput text='password: ' type='password' ref={passwordReferenece} />
                </form>
            )
        };

        const LableInput =  React.forwardRef(({text, type}, ref }) => (
            <lable>
                {text}
                <input type={type} ref={ref} />
            </lable>
        ));
        ```
    - 주의할 사항으로 ref 객체의 current 속성이 존재하지 않을 수 있다.
        ```javascript
        function Form() {
            const inputRef = useRef();
            const [showText, setShowText] = useState(true);

            return (
                <div>
                    {showText && <input type ="text" ref = {inputRef} />}
                    <button onClick={() => setShowText(!showText)}>
                        텍스트 보이기 가리기
                    </button>
                    <button onClick={() => inputRef.current.focus()}>텍스트로 이동 </button>
                </div>
            )
        }
        ```
        - 이때 showText의 값에 따라 input 요소가 있을수도 없을 수도 있다. input 요소가 없는 상태에서는 inputRef 객체의 current 속성은 존재하지 않기때문에 버튼을 누르면 오류가 발생한다. 

        - 따라서 조건부 렌더링이 사용된 요소의 ref 객체는 current 속성을 검사하는 코드가 필요하다.
        
            ```javascript
            <button onClick={() => inputRef.current && inputRef.current.focus()}> 텍스트로 이동 </button>
            ```

<br> <br> <br> 

## 리액트 내장 훅
 * Consumer 컴포넌트 없이 콘텍스트 사용하기 : useContext

    ```javascript
    const UserContext = React.createContext();
    const user = { name : 'kim', age: 24};

    function ParentComponent() {
        return (
            <UserContext.Provider value = {user}>
                <ChildComponent/>
            </UserContext.Provider>
        )
    }

    // Consumer로 사용
    function ChildComponent() {
        //... 이 부분에서 콘텍스트 데이터를 사용하기 어렵다
        return (
            <div>
                <UserContext.Consumer>
                    {user => (
                        <>
                            <p>{`name is ${user.name}`}</p>
                            <p>{`age is ${user.age}`}</p>
                        </>
                    )}
                <UserContext.Consumer/>
            </div>
        );
    }

    // useContext를 사용했을때
    
    function ChildComponent() {
        const user = useContext(UserContext);
        console.log(`user: ${user.name}, ${user.age}`);
    }
    ````

    - Consumer를 사용하면 Comsumer 컴포넌트 안쪽에서만 콘텍스트 데이터에 접근할 수 있지만 이렇게 하면 Consumer 컴포넌트 밖에서도 사용이 가능하다.
    
 * 렌더링과 무관한 값 저장하기 : useRef
    - 렌더링과 무관한 값을 useState로 관리하면 적잡하지 않다. 이때 렌더링과는 무관하지만 이전의 값을 유지해야하는 경우 useRef를 통해 값을 저장할 수 있다. 

* 메모이제이션 훅 : useMemo, useCallback
    - 이전 값을 기억해서 성능을 최적화하는 용도로 사용한다. 
    - useMemo 훅은 함수에서 반환하는 숫자, 객체, 배열 등을 재사용하기 위해 사용한다.
    - useCallback은 함수 자체를 재사용하기 위해 사용한다.
    - 모두 불필요한 렌더링을 줄여주는데 사용한다.

* 컴포넌트의 상탯값을 리덕스처럼 관리하기 : useReducer
    - 기존에는 input이 여러개 있으면 useState를 여러개 썼지면 useReducer를 이용하면 한번만 써도 가능하다. 
    - 보통 상위 컴포넌트에서 다수의 상탯값을 관리하는데 자식 컴포넌트로부터 발생한 이벤트에서 상위 컴포넌트의 상태값을 변경해야 하는 경우도 있다. 이때 상위 컴포넌트에서 트리의 밑바닥 까지 이벤트 처리 함수를 보내려면 복잡하다. 이때 useReducer 훅과 콘텍스트 API를 이용하면 손쉽게 전달할 수 있다. 

        ```javascript
        //...
        export const ProfileDispatch = React.createContext(null); // dispatch 함수를 전달해주는 콘텍스트 객체 생성
        //...
        function Profile() {
            const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
            return (
                <div>
                    <p>{`name is ${state.name}`}</p>
                    <p>{`age is ${state.age}`}</p>
                    <ProfileDispatch.Provider value = {dispatch}> // Provider를 통해 dispatch 함수를 전달
                        <SomeCompoenet/> // SomeComponent 하위에 있는 모든 컴포넌트에서 콘텍스트를 통해 dispatch 함수 호출 가능
                    </ProfileDispatch.Provider value>
                </div>
            )
        }
        ```

 * 부모 컴포넌트에서 접근 가능한 함수 구현 : useImperativeHandle
    - useImperativeHandle 훅을 이용하여 부모 컴포넌트에 접근 가능한 함수를 구현하고, 이렇게 정의한 함수를 외부에서 호출할 수 있다. 
    - 다만 컴포넌트의 내부 구현에 대한 의존성이 생기므로 꼭 필요할때만 쓰자.

* <a href = "https://velog.io/@velopert/react-hooks">간단한 예제들<a>