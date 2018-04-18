const url = 'http://localhost:3001'

let token = localStorage.token
if ( !token )
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': `${token}`,
    'content-type': 'application/json'
}

export const getAllForPost = (id) => fetch(`${url}/posts/${id}/comments`, { headers })
    .then(response => response.json())

export const createComment = (comment) => fetch(`${url}/comments`, {
    method: 'POST',
    headers,
    body: JSON.stringify(comment)
})

export const deleteComment = (id) => fetch(`${url}/comments/${id}`, {
    method: 'DELETE',
    headers,
    body: undefined
})

export const updateComment = (comment) => fetch(`${url}/comments/${comment.id}/`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(comment)
})
