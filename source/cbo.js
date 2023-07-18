export function cboFind() {
    const findCBO = document.querySelector('.findCBO')

    function setCBO() {
        const cboClient = document.querySelector('.cboClient')
        const occupationClient = document.querySelector('.occupationClient')
        const valueCboClient = cboClient.value
        const arrCBO = []
        
        fetch('./source/CBO2002.json').then(r => r.json())
        .then(data => {
            data.forEach(x => {
                const cboNameJSON = x.name
                const cboCodeJSON = x.code
                if(valueCboClient === cboCodeJSON) {
                    return arrCBO.push([cboNameJSON, cboCodeJSON])
                }
            })
            occupationClient.value = arrCBO[0][0]
        }).catch(e => {
            alert('Algum erro aconteceu ao procurar o CBO. Verifique se o numero está correto ou consulte no site http://www.mtecbo.gov.br/cbosite/pages/pesquisas/BuscaPorCodigo.jsf ')
        })
    }
    findCBO.addEventListener('click', setCBO)
}