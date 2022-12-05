const BASE_URL = 'http://localhost:7890';

/* Auth related functions */

export async function getUser() {
    const resp = await fetch(`${BASE_URL}/api/v1/users/me`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    if (resp.ok) {
        const user = await resp.json();
        return user;
    }
}

export async function signUpUser(email, password) {
    const resp = await fetch(`${BASE_URL}/api/v1/users`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });
    const data = await resp.json();
    if (resp.ok) {
        // location.replace('/');
        await signInUser(email, password);
    } else {
        // eslint-disable-next-line no-console
        console.error(data.message);
    }
}

export async function signInUser(email, password) {
    const resp = await fetch(`${BASE_URL}/api/v1/users/sessions`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });
    const data = await resp.json();
    if (resp.ok) {
        location.replace('/');
    } else {
        // eslint-disable-next-line no-console
        console.error(data.message);
    }
}

export async function signOutUser() {
    const resp = await fetch(`${BASE_URL}/api/v1/users/sessions`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (resp.ok) {
        location.replace('/auth');
    }
}

/* Data functions */
export async function createTodo({ userId, detail }) {
    const resp = await fetch(`${BASE_URL}/api/v1/todos`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, detail }),
        credentials: 'include',
    });
    const data = await resp.json();
    if (resp.ok) {
        return data;
    } else {
        // eslint-disable-next-line no-console
        console.error(data.message);
    }
}

export async function fetchTodos() {
    const resp = await fetch(`${BASE_URL}/api/v1/todos`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const data = await resp.json();
    if (resp.ok) {
        return data;
    } else {
        // eslint-disable-next-line no-console
        console.error(data.message);
    }
}
