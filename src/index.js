import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(evt) {
  let userSearch = evt.target.value.trim();
  // console.log('userSearch: ' + userSearch.length);
  // console.log(userSearch === '')

  if (userSearch === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(userSearch)
    .then(country => {
      console.log(country.length);
      if (country.length > 10) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (country.length === 1) {
        createMarkup(country);
      } else if (country.length >= 2 && country.length <= 10) {
        createMarkupAll(country);
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function createMarkup(country) {
  const murkupAllInfo = country
    .map(country => {
      return `<img src=${country.flags.svg} alt='flag of ${
        country.name.official
      }' width='200'/>
             <p>${country.name.official}</p>
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <p>Languages: ${Object.values(country.languages)}</p>`;
    })
    .join();
  countryList.innerHTML = '';
  countryInfo.innerHTML = murkupAllInfo;
}

function createMarkupAll(country) {
  const markupСhoice = country
    .map(country => {
      return `<li class='country-item'>
        <img src=${country.flags.svg} alt='flag of ${country.name.official}' width='60'/>
        <p>${country.name.official}</p>
        </li>`;
    })
    .join('');
  countryInfo.innerHTML = '';
  countryList.innerHTML = markupСhoice;
}
