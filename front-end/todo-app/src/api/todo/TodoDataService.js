import axios from 'axios'
import { API_URL, JPA_API_URL } from '../../Constants.js'

class TodoDataService {
    retrieveAllTodos(name) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos`)//return a promise
    }

    retrieveTodo(name, id) {
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`)
    }

    deleteTodo(name, id) {
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`)
    }

    updateTodo(name, id, todo) {//todo: RequestBody
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo)
    }

    createTodo(name, todo) {//todo: RequestBody
        return axios.post(`${JPA_API_URL}/users/${name}/todos}`, todo)
    }
}

export default new TodoDataService()