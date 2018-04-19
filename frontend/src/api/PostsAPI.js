const url = 'http://localhost:3001'

let token = localStorage.token
if ( !token )
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token
}

export const getAll = () => fetch(`${url}/posts`, { headers })
    .then(response => response.json())

export const getPost = (id) => fetch(`${url}/posts/${id}`, { headers })
    .then(response => response.json())


export const createPost = (post) => fetch(`${url}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(post)
})

export const voteUp = (id) => fetch(`${url}/posts/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ option: 'upVote' })
})

export const voteDown = (id) => fetch(`${url}/posts/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ option: 'downVote' })
})

export const updatePost = (id, post) => fetch(`${url}/posts/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(post)
})

export const deletePost = (id) => fetch(`${url}/posts/${id}`, {
    method: 'DELETE',
    headers,
    body: undefined
})