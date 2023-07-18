export function businessCNPJ () {
    const findCNPJ = document.querySelector('.findCNPJ')
    const cnpjCompany = document.querySelector('.cnpjCompany')
    const nameCompany = document.querySelector('.nameCompany')
    const codeCompany = document.querySelector('.codeCompany')
    let cnpjAPIvalue;
    let cnpjVerifySimbol
    function searchCompany(result) {
        let fantasyName = result['NOME FANTASIA']
        let corporateName = result['RAZAO SOCIAL']
        let cnpjValueForJSON = result['JSON']
        let nameCompanyValue = nameCompany.value

        nameCompany.value = corporateName || fantasyName
        let regexNumeros = /^[0-9]+$/;
        cnpjAPIvalue = cnpjValueForJSON

        if(regexNumeros.test(cnpjAPIvalue)) {
            let arrayCNPJ = Array.from(cnpjAPIvalue)
                arrayCNPJ.splice(2, 0, '.').splice(6, 0, '.').splice(10, 0, '/').splice(15, 0, '-')
                cnpjVerifySimbol = arrayCNPJ.join('')
                return {cnpjVerifySimbol, nameCompanyValue} 
        } else {
            return {cnpjAPIvalue, nameCompanyValue}
        }

    }
    function findDateCNPJ() {
        const cnpjCompanyValue = cnpjCompany.value
        const cnpjCompanyTransformText = cnpjCompanyValue.replace(/\D/g, '')
        const options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }
        fetch(`https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpjCompanyTransformText}`, options)
            .then(x => {
                x.json().then(data => searchCompany(data))
            }).catch(e => console.log('ERROR: ' + e))
    }
    function setCodeCompany() {
        let codeCompanyValue = codeCompany.value 
        return codeCompanyValue
    }
    setCodeCompany()
    findCNPJ.addEventListener('click', findDateCNPJ)
}