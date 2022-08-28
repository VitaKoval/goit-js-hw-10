import './css/styles.css';
import debounce from 'lodash.debounce';

import { fetchCountries } from './js/fetchCountries'

const DEBOUNCE_DELAY = 300;

const userCountries = document.querySelector('#search-box')

// повесить слушатель на инпут?

fetchCountries('ukr')



