export const moodButtonStyle = new CSSStyleSheet();

moodButtonStyle.replaceSync(`
button {
	all: unset;
	text-align: center;
	margin: 0 5px;
}
`);

export const listCreatingStyle = new CSSStyleSheet();

listCreatingStyle.replaceSync(`
button {
	all: unset;
	text-align: center;
	margin: 0 5px;
}
input {
	all: unset;
	border: darkred 1px solid;
	border-radius: 5px;
	width: 60%;
	height: 20px;
	margin-top: 10px;
	text-align: center;
}

ul {
	all: unset;
}

li {
	all: unset;
	display: flow;
	margin: 10px 0 5px;
	padding: 5px 0;
	text-align: center;
	font-size: 16px;
	border: 1px solid darkgreen;
	border-radius: 10px;
	transition: 0.5s;
}

li:hover {
	transition: 0.5s;
	background-color: darkgreen;
}

dialog {
	width: 300px;
	height: 400px;
	border-radius: 1em;
}

dialog::backdrop {
	background-color: rgba(0, 0, 0, 0.6);
}

#createButton {
	width: 200px;
	height: 35px;
	border-radius: 10px;
	margin-top: 10px;
	background-color: darkgreen;
	color: lightgoldenrodyellow;
}

#closeDialog {
	width: 200px;
	height: 35px;
	margin-top: 10px;
	border-radius: 10px;
	background-color: darkred;
	color: lightgoldenrodyellow;
}

.list_container {
	display: flex;
	flex-direction: column;
	align-items: center;
}
`);
