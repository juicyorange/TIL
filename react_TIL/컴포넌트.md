# 컴포넌트에 대해서

## 리액트의 컴포넌트에서 다루는 데이터는 props와 state 2개로 구분할 수 있다. 

## props에 대해 
 * 부모 컴포넌트가 자식 컴포넌트에게 주는 값
 * 이때 자식 컴포넌트에서는 props를 받아오기만 하고 직접 props를 수정하는것이 불가하다. 
 * props 예제<br><br>
    src/MyName 컴포넌트를 다음과 같이 작성하자.
    ```javascript
    import React, { Component } from 'react';

    class MyName extends Component {
        render() {
            return (
            <div>
                안녕하세요! 제 이름은 <b>{this.props.name}</b> 입니다.
            </div>
            );
        }
    }

    export default MyName;
    ```
    이때 받아온 props는 ```this.``` 을 통해 조회하는 것이 가능하다. </br>
    위 코드에서는 현재 부모 컴포넌트에게서 받은 name이라는 props를 보여주도록 설정되어 있다. <br><br>
    src/App.js를 다음과 같이 작성하자.
    ```javascript
    import React, { Component } from 'react';
    import MyName from './MyName';

    class App extends Component {
        render() {
            return (
            <MyName name="리액트" />
            );
        }
    }

    export default App;
    ```
    이 결과 App.js에서 지정해준 name값이 MyName 컴포넌트의 props로 들어가 "리액트"라는 값이 출력된다.

## default props
 * props의 기본값을 설정해 줄 수 있다. 
 * default props를 설정하는 방법으로는 2가지 방법이 있다. 
    ```javascript
        import React, { Component } from 'react';
        class MyName extends Component {
            static defaultProps = {
                name: '기본이름'
            }
            render() {
                return (
                <div>
                    안녕하세요! 제 이름은 <b>{this.props.name}</b> 입니다.
                </div>
                );
            }
        }

        export default MyName;
    ```
    또는
    ```javascript
        import React, { Component } from 'react';

        class MyName extends Component {
            render() {
                return (
                <div>
                    안녕하세요! 제 이름은 <b>{this.props.name}</b> 입니다.
                </div>
                );
            }
        }

        MyName.defaultProps = {
            name: '기본이름'
        };

        export default MyName;
    ```
    를 통해 default값을 지정해주는 것이 가능하다. 그 뒤 해당 컴포넌트에 props를 default를 주어 사용하고 싶다면 ```<Myname />```과 같이 name 값을 생략하면 "기본이름"이 표시된다. 

## 함수형 컴포넌트 
 * 단순히 props를 받아서 특별한 작업없이 보여주는 경우 함수의 형태로 작성하면 훨씬 편리하다.
 * 위의 Myname 컴포넌트를 함수형으로 작성해보자. 
    ```js
        import React from 'react';

        const MyName = ({ name }) => {
            return (
                <div>
                안녕하세요! 제 이름은 {name} 입니다.
                </div>
            );
        };

        export default MyName;
    ```
    이때 처음에 보았던 클래스형 컴포넌트와 함수형 컴포넌트의 차이는 함수형 컴포넌트에는 state와 LifeCylce이 빠져있다는 점이다. 

## state
 * 컴포넌트 내부에서 선언하며 그 값을 변경하는 것이 가능하다. 
 * 그 결과 데이터를 동적으로 다루는 것이 가능하다. 
    ```js
    import React, { Component } from 'react';

    class Counter extends Component {
        state = {
            number: 0
        }

        handleIncrease = () => {
            this.setState({
            number: this.state.number + 1
            });
        }

        handleDecrease = () => {
            this.setState({
            number: this.state.number - 1
            });
        }

        render() {
            return (
            <div>
                <h1>카운터</h1>
                <div>값: {this.state.number}</div>
                <button onClick={this.handleIncrease}>+</button>
                <button onClick={this.handleDecrease}>-</button>
            </div>
            );
        }
    }

    export default Counter;
    ```

 ## this.setState
  * 이 함수가 호출되면 컴포넌트가 리렌더링 된다. 
  * setState는 객체로 전달되는 값을 업데이트 해준다. 
  * 작성하는 방법이 2가지가 존재한다.
    ```js
        handleIncrease = () => {
            const { number } = this.state;
            this.setState({
                number: number + 1
            });
        }

        handleDecrease = () => {
            this.setState(
                ({ number }) => ({
                    number: number - 1
                })
            );
        }
    ```

## 이벤트
 * 위에서 했던 Counter의 render함수에서 이벤트를 설정했던 것을 보자. 
    ```js
    render() {
        return (
        <div>
            <h1>카운터</h1>
            <div>값: {this.state.number}</div>
            <button onClick={this.handleIncrease}>+</button>
            <button onClick={this.handleDecrease}>-</button>
        </div>
        );
    }
    ```
    <b>```<주의>```caseCamel 스타일로 작성하고, 함수를 호출하는 것이 아닌 함수의 이름을 넣어줘야 한다!!</b></br>
    예를 들어  ```<button onclick={this.handleIncrease()}>+</button>``` 을 보면 caseCamel도 아니고 함수를 호출을하고 있다. 잘못된 형식이다.</br>
    
 * App.js에서 실행하기
    ```js
    import React, { Component } from 'react';
    import Counter from './Counter';

    class App extends Component {
        render() {
            return (
            <Counter />
            );
        }
    }

    export default App;
    ```