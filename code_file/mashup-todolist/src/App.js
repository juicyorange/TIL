import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import { TodoProvider } from './TodoContext';

// index.css 에서 적용해도 무방하나 
// styled-components를 이용해보자
// styled-components 에서 특정 컴포넌트를 만들어서 스타일링 하는것이 아닌 글로벌 스타일을 추가하고 싶을 땐 createGlobalStyle 을 사용한다.
// 이 함수를 사용하면 컴포넌트가 만들어지는데 이 컴포넌트를 렌더링하면 된다. 
const GlobalStyle = createGlobalStyle `
  body {
    background : #e9ecef;
  }
`;


function App() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate/>
      </TodoTemplate>
    </TodoProvider>
  )
}

export default App;
