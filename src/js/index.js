import '../css/styles.css';
import { fetchCountries } from './fetch';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#search-box');
const coutriesListEl = document.querySelector('.country-list');
const countryCardEl = document.querySelector('.country-info');

const renderContryList = country => {
  return country
    .map(el => {
      return `
  <li class="country-list-el">
      <img class="flag-img" src="${el.flags.svg}" alt=""> 
      <h2 class="country-name">${el.name.official}</h2>
    </li>
    `;
    })
    .join('');
};

const renderCountryInfo = country => {
  return country
    .map(el => {
      const languagesList = Object.values(el.languages);
      return `
         <ul class="country-card">
            <li><b>Capital: </b>${el.capital}</li>
             <li><b>Population: </b>${el.population}</li>
             <li><b>Languages: </b>${languagesList}</li>
         </ul>
        `;
    })
    .join('');
};

const onSearchInput = () => {
  const query = inputEl.value;

  fetchCountries(query)
    .then(countries => {
      countryCardEl.innerHTML = '';
      coutriesListEl.innerHTML = '';

      if (!countries) {
        return;
      }
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        coutriesListEl.innerHTML = '';
      }
      if (countries.length > 1 && countries.length < 10) {
        coutriesListEl.innerHTML = renderContryList(countries);
      }
      if (countries.length === 1) {
        coutriesListEl.innerHTML = renderContryList(countries);
        countryCardEl.innerHTML = renderCountryInfo(countries);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
    });
};

inputEl.addEventListener('input', debounce(onSearchInput, 300));
