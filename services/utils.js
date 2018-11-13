import {store} from '../lib/create-store'
import {updateState} from '../store'

function OnInput() {
		this.style.height = 'auto';
		this.style.height = (this.scrollHeight) + 'px';
}

export const handleTextarea = _ => {
	let tx = document.getElementsByTagName('textarea');
	for (let i = 0; i < tx.length; i++) {
			tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
			tx[i].removeEventListener("input", OnInput, true)
			tx[i].addEventListener("input", OnInput, true);
	}
}


let timeOut = setTimeout(function() {}, 10);

export const showMessage = (text, type) => {
	if(timeOut) {
		clearTimeout(timeOut)
		timeOut = null
	}
	store.dispatch(updateState(text, type))
	timeOut = setTimeout(function() {
		store.dispatch(updateState())
	}, 3000);
}