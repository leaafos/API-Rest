document.getElementById('country-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const countryName = document.getElementById('country').value;
    fetchCountryInfo(countryName);
});

function fetchCountryInfo(countryName) {
    fetch(`https://restcountries.com/v2/name/${countryName}`)
        .then(response => response.json())
        .then(data => displayCountryInfo(data))
        .catch(error => console.error('Error while fetching the country information:', error));
}

function displayCountryInfo(countryData) {
    const countryInfoContainer = document.getElementById('country-info');
    if (countryData.status === 404) {
        countryInfoContainer.innerHTML = '<p>Country not found. Please Check the name.</p>';
    } else {
        const country = countryData[0];
        const currencyCode = country.currencies[0].code;
        const isInEU = country.regionalBlocs.some(block => block.acronym === 'EU');

        countryInfoContainer.innerHTML = `
            <h2>${country.name}</h2>
            <p><b>Natif Name :</b> ${country.nativeName}</p>
            <p><b>Capital :</b> ${country.capital}</p>
            <p><b>Région :</b> ${country.region}, <b>Subrégion :</b> ${country.subregion}</p>
            <p><b>Population :</b> ${country.population}</p>
            <p><b>Currency :</b> ${currencyCode}</p>
            <p><b>International area code :</b> +${country.callingCodes}</p>`;
            if (isInEU) {
                countryInfoContainer.innerHTML += `<p><b>Part of European Union : </b> Yes</p>`
            }
            countryInfoContainer.innerHTML += `<img src="${country.flags.svg}" alt="Drapeau de ${country.name}" style="width: 100px;">
        `;
    }
}

/*test pour savoir quelles informations sont dispo avec mon API*/ 
fetch('https://restcountries.com/v2/name/France')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Erreur lors de la récupération des informations sur le pays:', error));
