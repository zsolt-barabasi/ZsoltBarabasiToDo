import { Todo } from './constants';

const HEADERS = {
    'X-CSRF-TOKEN': (document.head.querySelector('meta[name="csrf-token"]') as HTMLMetaElement).content,
};

const getPayload = (todo: Todo | Omit<Todo, 'id'>) => {
    return JSON.stringify({ ...todo, priority: todo.priority.toString(), status: Number(todo.status).toString() });
};

export const getAllAPI = async (headers?: {}) => {
    const todosResponse = await fetch(window.location.href + '/todos', {
        method: 'get',
        headers: {
            ...HEADERS,
            ...headers,
        },
    });
    const todosJson = await todosResponse.json();
    return todosJson;
};

export const deleteAPI = async (id: number, headers?: {}) => {
    await fetch(window.location.href + '/todos/' + id, {
        method: 'delete',
        headers: {
            ...HEADERS,
            ...headers,
        },
    });
};

export const updateAPI = async (todo: Todo, headers?: {}) => {
    return await fetch(window.location.href + '/todos/' + todo.id, {
        method: 'put',
        body: getPayload(todo),
        headers: {
            ...HEADERS,
            ...headers,
        },
    });
};

export const createAPI = async (todo: Omit<Todo, 'id'>, headers?: {}) => {
    return await fetch(window.location.href + '/todos', {
        method: 'post',
        body: getPayload(todo),
        headers: {
            ...HEADERS,
            ...headers,
        },
    });
};
