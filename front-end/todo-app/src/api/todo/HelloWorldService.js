import axios from 'axios'

class HelloWorldService {
    executeHelloWorldService() {
        //console.log('executed service')
        return axios.get('http://localhost:8080/hello-world')//return a promise
    }

    executeHelloWorldBeanService() {
        //console.log('executed service')
        return axios.get('http://localhost:8080/hello-world-bean')
    }

    executeHelloWorldPathVariableService(name) {
        //console.log('executed service')
        // let username = 'super'
        // let password = 'dummy'
        // //encoding header 
        // let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password)

        return axios.get(`http://localhost:8080/hello-world-bean/path-variable/${name}`
        // , 
        // {
        //     //send authorization header when making a request
        //     headers : {
        //         authorization : basicAuthHeader
        //     }
        // }
        )
    }
}

export default new HelloWorldService()