export function fetchCountries(query) {
  //   console.log(query);
  return fetch(
    `https://restcountries.com/v3.1/name/${query}?fields=name,capital,population,official,languages,flags`
  ).then(response => {
    if (!response.ok) {
      throw new Error('Oops, there is no country with that name');
    }
    return response.json();
  });
}
