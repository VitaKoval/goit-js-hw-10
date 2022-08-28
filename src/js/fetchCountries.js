export const fetchCountries =  function (name) {
fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
  return response.json();
})
}