import component from "./createAvatar";
import imgTest from './123.png'
import style from './index.scss'
function component1() {
    let element = document.createElement('div')
    let img = new Image();
    img.src = imgTest;
    img.classList.add(style.avatar)
    // img.style.width = '100px';
    // img.style.height = '100px'
    element.appendChild(img)
    return element;
}
document.body.appendChild(component1())
document.body.appendChild(component())