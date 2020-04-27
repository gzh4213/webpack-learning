import React, { Component } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
class App extends Component {
    componentDidMount() {
        let url = '/react/api/header.json'
        axios.get(url).then(res => {
            console.log(res)
        })
    }
    render() {
        return <div>Hello World</div>
    }
}

ReactDom.render(<App />, document.getElementById('root'))