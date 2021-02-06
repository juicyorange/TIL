# 1 장

## 리액트 개발환경
 * ```create-react-app``` 을 통해 자동으로 웹 애플리케이션 제작을 위한 리액트 개발환경을 구축할 수 있다.
    - 이때  index.html, index.js, package.json 은 파일 빌드 시 예약된 파일 이름이므로 제거해서는 안된다. 
    - index.js로 부터 연결된 모든 자바스크립트 파일과 CSS파일은 src 폴더 밑에 있어야한다.( src 폴더 바깥에 있는 파일을 ```import```를 통해 가져오려하면 오류가 발생한다. )
    - index.html에서 참조하는 파일은 public폴더 아래 있어야 한다. 이때 public폴더 아래 있는 JS파일이나 CSS를 ```link```나 ```script``` 태그를 통해서 index.html에 포함시킬 수 있다. 하지만 특별한 이유가 없다면 index.html에 직접 연결하는 것보다 src폴더 밑에서 ``ìmport``를 통해 포함시키는 것이 좋다. 
    - 이미지  파일이나 폰트 파일도 마찬가지로 src 폴더 밑에서 ``ìmport``를 통해 포함시키는 것이 좋다. 
 * 리액트 네이티브의 경우에는 ```expo``` 를 통해 구축이 가능하다

## create-react-app의 다양한 기능
 * ```npm start```를 통해 프로그램을 실행할 수 있다.
 * https를 사용하기 위해서
    - 맥 : ```HTTPS=true npm start```
    - 윈도우 : ```set HTTPS=true && npm start```
 * ```npm run build```를 통해 배포환경에서 사용할 파일을 만들어준다.
    - 생성된 정적 파일을 웹 서버를 통해서 사용자가 내려받을 수 있게 하면 된다. 

## CSS 작성하기 
 * 응집도를 높이기 위해서 CSS 코드를 컴포넌트 내부에서 관리하는 것이 좋다.
    - css-module, css-in-js 2가지가 좋은 방법이다.
    - 일반적인 방법과 Sass를 이용하는 방법도 알아보자.
 * 일반적인 CSS 작성방법을 사용하면 서로다른 CSS 파일의 CSS 클래스명이 같을때 하나의 CSS가 나머지것의 CSS를 대체하여 원하는대로 동작이 안되는 경우가 생긴다. (클래스명 충돌)
 * css-module 을 사용하면 일반적인 CSS 파일에서 클래스명이 충돌할 수 있는 단점을 극복할 수 있다. 
    - ```{이름}.module.css``를 통해 css-module을 작성할 수 있다. 
    - ```ìmport```를 통해 가져오면 클래스명 정보를 담고있는 객체를 내보낸다. 
    - CSS 파일에서 정의한 클래스명이 style 객체의 속성 이름으로 존재한다. 
    - 이때 객체를 직접 입력하기가 번거롭다. 이에 ```classname``모듈을 이용하면 훨씬 편리하게 입력이 가능하다.<br>
      module.css를 사용할때.
      ```javascript
      import style from './Button2.module.css';
      
      <button className={'${style.button} ${style.small}'}>작은 버튼</button>
      ```
      classnames 패키지를 이용
      ```js
      import style from './Button2.module.css';
      
      <button className={cn(style.button, style.small)}>작은 버튼</button>
      ```
 * Sass로 작성하기는 나중에 공부하자. 지금은 별 필요성을 못느끼겠다.
 * css-in-js 방식은 요즈음 떠오르는 방식이다. 
    - CSS 코드를 자바스크립트 파일 안에서 작성한다. 
    - 다만 CSS 제작팀과 개발팀이 분리되어있다면 작성에 어려움을 겪을 수 있다. 
    - 동적으로 스타일을 적용할 수 있다. 
      ```js
      import React from 'react';
      import styled from 'styled-components';

      // 동적 스타일이 적용된 Box4

      const BoxCommon = styled.div`
         width: ${props => (props.isBig ? 200 : 100)}px;
         height: 50px;
         background-color: #aaaaaa;
      `;

      function Box({size}) {
         const isBig = size === 'big';
         const label = isBig ? '큰 박스' : '작은 박스';
         return <BoxCommon isBig = {isBig}>{label}</BoxCommon>;
      }

      export default Box;
      ```

## 단일 페이지 어플리케이션
 * 리액트 어플리케이션의 페이지 전환은 단일 페이지 어플리케이션(single page application, SPA) 방식으로 개발하는 것이 정석이다. 
 * 단일 페이지 어플리케이션은 초기 요청 시 서버에서 첫 페이지를 처리하고 이후의 라우팅은 클라이언트에서 처리하는 웹 애플리케이션이다. 
 * 전통적인 방식의 웹페이지에서는 페이지를 전환할 때마다 렌더링 결과를 서버에서 받기 때문에 화면이 전환될때 깜빡이는 단점이다. 
 * 단일 페이지 어플리케이션 구현을 위해 필요한 기능 2가지
    - 자바스크립트에서 브라우저로 페이지 전환 요청을 보낼 수 있다. 단, 브라우저는 서버로 요청을 보내지 않아야 한다.
    - 브라우저의 뒤로 가기와 같은 사용자의 페이지 전환 요청을 자바스크립트에서 처리할 수 있다. 이때도 브라우저는 서버로 요청을 보내지 않아야 한다. 
 * 이 조건들을 만족시키기 위한 브라우저 API로 ``` pushState, replaceState``` 함수, ```popstate```이벤트가 있다. 그리고 브라우저에는 히스토리에 state를 저장하는 stack이 존재한다. 

## react-router-dom
 * 브라우저 히스토리 API를 이용해서 페이지 라우팅 처리를 직접 구현할 수도 있지만 신경써야할 뿐이 많다. 이때 react-router-dom을 이용하면 리액트로 단일 페이지 어플리케이션을 쉽게 구성할 수 있다.
 * react-router-dom 패키지도 내부적으로 브라우저 히스토리 API를 사용한다. 
 * 리앱트 웹 뿐만아니라 리액트 네이티브 또한 지원한다. 
 * react-router-dom을 사용하기 위해서는 반드시 ```BrowserRouter``` 컴포넌트로 전체를 감싸야 한다.
 * 페이지 전환
    - 페이지 전환의 경우 ```Link``` 를 이용해서 구현한다
      ```javascript
      <Link to="/">홈</Link>
      <Link to="/photo">사진</Link>
      <Link to="/rooms">방 소개</Link>
      ```
    - 이때 ```to``` 속성값은 이동할 주소를 나타낸다.
 * 각 페이지 정의
    - 각 페이지를 정의하기 위해서는 ```Route``` 컴포넌트를 이용하여 구현한다.
      ```javascript
      <Route exact path="/" component={Home} />
      <Route exact path="/photo" component={Photo} />
      <Route exact path="/rooms" component={Rooms} />
      ```
    - 현재 주소가 ```path``` 에 들어가있는 값으로 시작하면 ```component```에 들어가있는 컴포넌트를 렌더링한다. 
    - 이때 ```exact``` 속성을 추가해주면 주소가 정확히 모두 일치해야 해당 컴포넌트가 렌더링된다. 
 * ```Route```를 통해 렌더링되는 컴포넌트는 ```match```라는 속성값을 사용할 수 있다. 
 * 이때 ```match.url``` 은 Route 컴포넌트의 ```path의 속성값```과 같다.