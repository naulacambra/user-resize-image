import './style.css';
import {
    addClass,
    removeClass
} from './utils/classes';

const baseClass = 'ur';
const wrapperClass = `${baseClass}-wrpr`;
const handlerClass = `${baseClass}-hndlr`;

document.querySelectorAll('[contenteditable=true]').forEach(editor => editor.addEventListener('input', event => {
    var images = editor.querySelectorAll('img');
    images.forEach(image => {
        addClass(image, baseClass);
    });
}));

var resizables = document.querySelectorAll(`.${baseClass}`);
resizables.forEach(resizable => {
    var wrapper = document.createElement('div');
    addClass(wrapper, wrapperClass);
    resizable.parentElement.insertBefore(wrapper, resizable);
    wrapper.appendChild(resizable);

    var handler = document.createElement('span');
    handler.draggable = true;
    addClass(handler, handlerClass);
    handler.addEventListener('mousedown', event => {
        event.stopPropagation();
        addClass(resizable, 'focused');
    });

    handler.addEventListener('mouseup', event => {
        event.stopPropagation();
        removeClass(resizable, 'focused');
    });

    handler.addEventListener('drag', event => {
        event.stopPropagation();
        addClass(resizable, 'resizing');
        let width = resizable.width + event.offsetX;
        let height = resizable.height + event.offsetY;
        console.log(resizable.width, width, height);
        resizable.style.width = `${width}px`;
        resizable.style.height = `${height}px`;
    });

    wrapper.appendChild(handler);
});