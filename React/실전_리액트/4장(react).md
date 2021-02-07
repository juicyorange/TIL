# 4장 리액트 실전 활용법

## 가속성과 생산성을 고려한 컴포넌트 코드 작성법
 * 추천하는 컴포넌트 파일 작성 예

    ```javascript
    // import 작성

    MyComponent.propTypes = {
        //...1
    };

    export default function MyComponent({ prop1, prop2 }) {
        //...2
    }

    const COLUMNES = [
        { id: 1, name: 'phoneNumber', width: 200, color: 'white'},
        { id: 2, name: 'city', width: 100, color: 'grey'},
        //...3
    ];

    const URL_PRODUCT_LIST = '/api/products';
    function getTotalPrice({ price, total }){
        //...3
    }
    ```
    - 1 : 최상단에는 속성값의 타입을 정의한다. 
    - 2 : 컴포넌트 함수의 매개변수는 위와같이 명명된 매개변수로 정의하는 것이 좋다. 
        - 속성값을 사용할 때마다 ```props.``` 을 반복해서 입력하지 않아도 된다.
    - 2 : 컴포넌트 이름을 반드시 작성하자. 그러면 디버깅할때 편리하다. 
    - 3 : 컴포넌트 바깥의 변수와 함수는 파일의 가장 밑에 정의한다. 
    - 3 : 변수는 const로 정의하고 위처럼 대문자로 변수명을 작성하는 것이 좋다. 
    - 3 : 컴포넌트 내부에서 커다란 객체를 생성하는 코드가 있을 때, 가능하다면 컴포넌트 외부에서 상수 변수로 정의해서 사용하도록 하자. -> 렌더링시 불필요한 객체 생성 피할 수 있다.

 * 서로 연관된 코드를 한 곳으로 모으기
    - 훅의 종류별로 모으는 것보다는 연관된 코드끼리 모아놓는 것이 가독성 측면에서 뛰어나다.
    - 그럼에도 컴포넌트가 너무 복잡해 보인다면 각 기능을 커스텀 훅으로 분리하는 것도 좋은 방법이다. (추후 재사용하기에도 좋다)

 * 속성값 타입 정의하기 : prop-types
    - prop-type은 속성값의 타입 정보를 정의할 때 사용하는 리액트 공식 패키지이다. 
    - 자바스크립트는 타입이 없기 때문에 배우기 쉽고, 간단한 프로그램 작성에 있어서 좋다. 하지만 규모가 커지면 생산성이 떨어진다는 단점이 있다. 
    - 타입 정보 정의
    
        ```javascript
        User.propTypes = {
            male : PropTypes.bool.isRequired,
            age : PropTypes.number,
            type : PropTypes.oneof(["gold", "silver", "bronze"]),
            onChangeName : PropTypes.func,
            onChangeTittle : PropTypes.func,isRequired
        };
        ```
        - ```ìsRequired``` 를 붙이면 필숫값이라는 의미로 값을 주지 않으면 에러메시지가 출력된다. 
    - 위의 경우 외에도 ```element(리액트 요소), node(컴포넌트 함수가 반환하는 모든 것)``` 등이 존재한다. 
    - 그 외에 커스텀으로 원하는 속성값 타입을 정의하는 것도 가능하다.

 * 가독성을 높이는 조건부 렌더링

    - 조건부 렌더링이란 컴포넌트 함수 내부에서 특정 조건에 따라 렌더링하는 것을 의미힌다.
    - if 문과 삼항연산자도 좋지만 가독성이 떨어질수 있다.
    - ```&&``` 와 ```||```를 사용하면 가독성을 높이면서 조건부 렌더링을 할 수 있다. 
    - &&와 || 모두 마지막으로 검사한 값을 반환한다. 
        - &&는 첫 거짓 값 또는 마지막 값을 반환
        - ||는 첫 참 값 또는 마지막 값을 반환
    - 배열을 조건부 렌더링으로 사용할때에 기본값으로 빈 배열을 넣어주는 것이 좋다. 그러면 매번 && 을 통해 배열이 비어잇는지 확인하지 않아도 된다. 

 * 관심사 분리를 위한 프레젠테이션, 컨테이너 컴포넌트 구분하기

    - 관심사 분리란 복잡한 코드를 비슷한 기능을 하는 코드끼리 모아서 별도로 관리하는 것을 의미한다. 
    - UI 처리, API 호출, DB 관리 등의 코드가 같은 곳에 있으면 복잡하기 때문에 이들은 서로 관심사가 다르다고 보고 분리해서 관리하는 것이 좋다. 
    - 컴포넌트에서 부모의 데이터를 별도의 상탯값으로 관리하는 것은 좋지 않다. (<a style="color: pink">아직 잘 이해 안된다.</a>)
    - 컴포넌트가 비즈니스 로직과 상탯값이 존재하면 재사용하기가 힘들다. 
    - 프레젠테이션 코드
        - 비즈니스 로직이 없다.
        - 상탯값이 없다. 단, 마우스 오버와 같은 UI 효과를 위한 상탯값을 제외한다. 
    - 일반적으로 프레젠테이션 컴포넌트 코드가 가독성이 더 좋고 재사용성도 높다. 
    
 * useEffect 실전사용

    - useEffect의 의존성 배열
        - UseEffect를 사용할때 2번째 매개변수인 의존성 배열을 잘못 관리하면 높은 확률로 오류가 발생한다. 
        - 하지만 대부분의 경우 입력하지 않아도 되고, 따라서 가능하면 입력하지 않는 것이 좋다.
        - 반드시 사용해야 하는 경우 
            - 불필요한 API 호출이 발생하지 않도록 주의해야 한다.
            - 부수 효과 함수 안에서 새로운 상탯값을 사용했다면 반드시 의존성 배열에 추가하여, 값이 바뀔때 렌더링될수 있도록 하자. 

    - useEffect 훅에서 async await 함수 사용하기 
        - async await 함수는 프로미스 객체를 반환하므로, 함수만 반환할 수 있는 부수 효과 함수에서 사용할 수 없다. 
        - 따라서 useEffect 훅에서 async await 함수를 사용하는 방법은 부수 효과 함수 내에서 async await 함수를 만들어 호출하는 것이다.
            
            ```javascript
            useEffect(() => {
                async function fetchAndSetUser() {
                    const data = await fetchUser(userId);
                    setUser(data);
                }
                fetchAndSetUser();
            }, [userId]);
            ```
            - 부수 효과 함수 안에서 async await 함수를 만들고 바로 다시 호출한다. 

    - 함수 재사용하기
        - 위의 코드에서 fetchAndSetUser 함수를 재사용해야 한다고 하자.

            - useEffect 훅 안에 있는 fetchAndSetUser 함수를 밖으로 뺐다. 

            ```javascript
            function Profile({ userId }) {
                const [user, setUser] = useState();
                async function fetchAndSetUser(needDetail) {
                    const data = await fetchUser(userId, needDetail);
                    setUser(data);
                }
                useEffect(() => {
                    fetchAndSetUser(false);
                }, [fetchAndSetUser]);
            }
            ```
            - 이때 의존성 배열에 fetchAndSetUser가 있으므로 fetchAndSetUser 함수는 렌더링 할 때마다 갱신되므로 매번 호출된다.
            - 이것을 필요할 때만 갱신되도록 변경하기 위해 useCallback 훅을 이용해 userId가 변경될 때만 갱신되도록 해보자

            ```javascript
            function Profile({ userId }) {
                const [user, setUser ] = useState();
                const fetchAndSetUser = useCallback(
                    async needDetail => {
                        const data = await fetchUser(userId, needDetail);
                        setUser(data);
                    },
                    [userId]
                );
                useEffect(()=> {
                    fetchAndSetUser(false);
                }, [fetchAndSetUser]);
            }
            ```
            - useCallback 을 활용한 결과 외부에 있는 함수가 useEffect 안에서 사용할 때 매번 갱신되지 않고, 필요한 경우에만 갱신되도록 했다.
    
    - 의존성 배열 사용하지 않기
        - 앞에서 말했듯이 의존성 배열은 사용하지 않는 것이 좋다. 의존성 배열을 관리하는 것이 어렵기 때문이다.
        - 특히 속성값으로 전달되는 함수를 의존성 배열에 넣는 순간, 그 함수는 useCallback 등을 활용해 자주 변경되지 않도록 관리해야한다.

        - 부수 효과 함수 내에서 의존성 배열 없이 조건문으로 함수를 원할때만 호출되도록 하기. 

            ```javascript
            function Profile({ userId }) {
                const [user, setUser] = useState();
                async function fetchAndSetUser(needDetail) {
                    const data = await fetchUser(userId, needDetail);
                    setUser(data);
                }
                useEffect(() => {
                    if( !user || user.id !== userId) { 
                        fetchAndSetUser(false);
                    }
                });
            }
            ```

            - if 를 통해 user.id가 변경되었을 때만 함수가 호출되도록 하였다. 
        
        - useState의 상탯값 변경 함수에 함수 입력하기
            - 이전 상탯값을 기반으로 다음 상탯값을 계산하기 위해 상탯값을 의존성 배열에 추가하는 경우가 있다.
            - 상탯값 변경 함수에 함수를 입력하면 이전 상탯값을 매개변수로 받을 수 있다. 

            ```javascript
            function MyComponent() {
                const [count, setCount] = useState(0);
                useEffect(() => {
                    function onClikc() {
                        setCount(prev => prev + 1);
                    }
                    window.addEventListener("click", onClick);
                    return () => window.removeEventListener("click", onClick);
                });
                //...
            }
            ```
            - setCount 에서 prev를 함수로 입력하여 이전 상탯값을 받을 수 있다. 

        - useReducer 활용하기
            - 여러 상탯값을 참조하면서 값을 변경할떄는 userReducer 훅을 사용하는 것이 좋다. 

            ```javascript
            function Timer({ initialTotalseconds }) {
                const [ state, dispatch ] = useReducer(reducer, {
                    hour : Math.floor(initialTotalseconds / 3600),
                    minute : Math.floor((initialTotalseconds % 3600) / 60),
                    second : initialTotalseconds % 60
                });
                const {hour, minute, second} = state;
                useEffect(() => {
                    const id = setInterval(dispatch, 1000);
                    return () => clearInterval(id);
                })
                //...
            }

            // 상탯값을 변경하는 로직은 reducer 함수에서 구현한다. 
            function reducer(state) {
                const { hour, minute, second } = state;
                if (second) {
                    return { ...state, second: second-1};
                }
                else if (minute) {
                    return { ...state, minute: minute-1, second: 59};
                }
                else if (hour) {
                    return { hour: hour-1, minute: 59, second : 59};
                }
                else{
                    return state;
                }
            }
            ```

            - 물론 hour, minute, second 를 하나의 객체에 담아서 useState 훅으로 관리할 수도 있지만 useReducer를 사용하면 다양한 액션과 상탯갑을 관리하기 좋고, 상탯값 변경 로직을 여러 곳에서 재사용하기도 좋다.
            
        - useRef 활용하기

            - 해당 속성값이 렌더링 결과에 영향을 주는 값이 아니라면 useRef 훅을 이용하여 의존성 배열을 제거할 수 있다. 
            - 특히 속성값으로 전달되는 함수의 경우 불필요하게 자주 변경되는 경우가 많다. 

            ```javascript
            function MyComponent ({ onClick }) {
                const onClickRef = useRef();
                useEffect(() => {
                    onClickRef.current = onClick; //이때 렌더링 결과와 무관한 값만 저장해야 한다. useRef에 저장된 값은 변경돼도 컴포넌트가 다시 렌더링되지 않는다. 
                });
                useEffect(() => {
                    window.addEventListener("click", () => {
                        onClickRef.current();
                        //...
                    });
                    //...
                });
                //...
            }
            ```

 * 렌더링 속도를 올리기 위한 성능 최적화 방법
    - 리액트가 실행될 때 가장 많은 CPU 리소스를 사용하는 것이 렌더링이다. 
    - 평상시에는 성능 최적화를 고민하지 말고 편하게 코딩하자. 대부분 고려하지 않고 짜도 잘 돌아간다. 성능 이슈가 생기면 그때 고민해도 늦지 않다. 

    - React.memo 로 렌더링 결과 재사용하기.

    - 속성값과 상탯값을 불변 변수로 관리하는 방법
        - useState, useReducer의 상탯값 변경 함수(2번째 매개변수)는 변하지 않는다는 점을 이용하자.
        - useCallback 훅을 이용해 이벤트 처리 함수를 구현하고, 의존성 배열로 빈 배열을 입력해주어 고정된 값을 가지도록 해준다. 

    - 객체의 값이 변경되지 않도록 관리하기
        - 컴포넌트 내부에서 객체를 정의하여 자식 컴포넌트의 속성값으로 입력하면, 자식 컴포넌트는 객체의 내용이 변경되지 않았는데도 속성값이 변경됐다고 인식한다. 
        - 렌더링과 무관하게 항상 같은 값을 가진다면 컴포넌트 밖에 상수 변수로 관리하자. (ex 1~100사이 숫자목록, 아이폰1~7까지 목록 등등 불변인 경우) 