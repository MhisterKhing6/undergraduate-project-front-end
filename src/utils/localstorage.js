import Cookies from "js-cookie"

function saveToken(key, value) {
	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	Cookies.set(key, value)
}


function getToken(key) {
	// if the item doesn't exist, return null
	return Cookies.get(key)
}

function Logout(key) {
    Cookies.remove(key)
}

export {Logout, saveToken, getToken}
