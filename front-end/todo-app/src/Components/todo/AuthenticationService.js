import { getConfig } from '@testing-library/react'
import axios from 'axios'
import { API_URL } from '../../Constants.js'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

//register the fact that the user has logged in
class AuthenticationService {
    
    createBasicAuthToken(username, password) {
        let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)
        return basicAuthHeader
    }

    executeBasicAuthenticationService(username, password) {
        //check if the request with encoded header is successful => can enter /basicauth => login succeeds
        //header should match with username & password defined in application.properties in back-end
        return axios.get(`${API_URL}/basicauth`, {headers : {authorization : this.createBasicAuthToken(username, password)}})
    }

    registerSuccessfulLogin(username, password) {
        //encoding header 
        //let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)      
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))   //set up axios interceptor, token will be used on every subsequent requests
    }

    createJwtToken(token) {
        return 'Bearer ' + token
    }

    executeJwtAuthenticationService(username, password) {
        //get Jwt Token
        return axios.post(`${API_URL}/authenticate`, {username, password})
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)      
        this.setupAxiosInterceptors(this.createJwtToken(token))   //set up axios interceptor, token will be used on every subsequent requests
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)         
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME) 
        if(user===null) return false        
        return true
    }

    GetLoggedInUserName() {       
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME) 
        if(user===null) return '' 
        return user
    }

    setupAxiosInterceptors(token) {
        //set up interceptor on requests
        axios.interceptors.request.use(
            (config) => { //input old config, send updated config as output
                if(this.isUserLoggedIn())
                    config.headers.authorization = token
                return config   
            }                 
        )      
    }
}

export default new AuthenticationService()//export new instance