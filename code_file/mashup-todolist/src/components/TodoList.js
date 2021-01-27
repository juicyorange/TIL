import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../TodoContext';

const TodoListBox = styled.div`

    flex: 1; /* 자신이 차지할 수 있는 영역을 꽊 채운다. */
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y : auto;
`;

function TodoList() {

    const todos = useTodoState();
    
    return (
        <TodoListBox>
            {todos.map(todo => (
                <TodoItem
                    key = {todo.id}
                    id = {todo.id}
                    text = {todo.text}
                    done = {todo.done}
                />
            ))}
        </TodoListBox>
    );
}

export default TodoList;