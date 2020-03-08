import _ from 'lodash'
import imgTest from './123.png'
import './index.scss'

function component() {
    let element = document.createElement('div')
    element.innerHTML = _.join(['Hello','webpack'],' ')
    let img = new Image();
    img.src = imgTest;
    img.classList.add('avatar')
    // img.style.width = '100px';
    // img.style.height = '100px'
    element.appendChild(img)
    return element;
}

document.body.appendChild(component())