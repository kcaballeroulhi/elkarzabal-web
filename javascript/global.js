const URL = "http://localhost:3000/api/";

const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
var urlID = urlParams.get('id');