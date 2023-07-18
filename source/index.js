import { businessCNPJ } from './businessCNPJ.js'
import { cboFind } from './cbo.js'
businessCNPJ()
cboFind()
const sendBTN = document.querySelector('.sendBTN')
const downloadBTN = document.querySelector('.downloadBTN')

function sendInformation() {
    //DADOS CLIENTE
    const nameValue = (document.querySelector('.nameClient').value).toUpperCase()
    const cboValue = document.querySelector('.cboClient').value
    const occupationValue = document.querySelector('.occupationClient').value
    //DADOS EMPRESA
    const cnpjValue = document.querySelector('.cnpjCompany').value 
    const nameCompanyValue = document.querySelector('.nameCompany').value 
    const codeCompanyValue = document.querySelector('.codeCompany').value
    const dateAdmissionCompany = document.querySelector('.dateAdmissionCompany')
    //VALORES HOLERITE
    const salaryClientValue = document.querySelector('.salaryClient').value
    const salaryExtraClientValue = document.querySelector('.salaryExtraClient').value
    const paymentMonthClientValue = document.querySelector('.paymentMonthClient').value
    const descClientValue = document.querySelector('.descClient').value 
    
    //FEE 
    let totalSalaryBrute;
    let totalSalaryLiquid;
    let valueINSSTax;
    let valueIRRFTax;
    let taxINSS;
    let taxIRRF;
    let totalTax;

    // transform ',' for '.'
    let newSalaryValue;
    let newSalaryExtraValue; 

    if(salaryClientValue.includes(',')) {
        newSalaryValue = salaryClientValue.replace(',', '.')
        newSalaryValue = +newSalaryValue
    }
    if(salaryClientValue.includes(',')) {
        newSalaryExtraValue = +salaryExtraClientValue.replace(',', '.')
        newSalaryExtraValue = +newSalaryExtraValue
    }

    if(!(nameValue === '' || cboValue === '' || occupationValue === '' || cnpjValue === '' || nameCompanyValue === '' || codeCompanyValue === '' || dateAdmissionCompany === '' || salaryClientValue === '' || salaryExtraClientValue === '' || monthPay === '')) {
        calculate()
        myPhoto()
    } else {
        alert('PREENCHA O CAMPO VAZIO E TENTE NOVAMENTE.')
    }

    function calculate() {
        const salaryClient = document.querySelector('.salaryClient')
        const salaryExtraClient = document.querySelector('.salaryExtraClient')
        const salaryClientValue = +salaryClient.value 
        const salaryExtraClientValue = +salaryExtraClient.value 

        let valueTotalSalary = (newSalaryValue + newSalaryExtraValue) || (salaryClientValue + salaryExtraClientValue)
        let valueDescontINSS;
        let valueDescontIRRF;
        let valueLiquidSalary;
        let pushInfoINSS = []
        let pushInfoIRRF = []

        const valuesIRRF = [0, 7.5, 15, 22.5, 27.5]
        const valuesINSS = [7.5, 9, 12, 14]
        //INSS TABLE
        if(valueTotalSalary <= 1320 ) {
            valueDescontINSS = (salaryClientValue * calculateImposto(valuesINSS[0], 100)).toFixed(2)
            valueLiquidSalary = valueTotalSalary - valueDescontINSS
            pushInfoINSS.push([valueLiquidSalary, valuesINSS[0], (valueDescontINSS)])
        } else if (valueTotalSalary <= 2571) {
            valueDescontINSS = (valueTotalSalary * calculateImposto(valuesINSS[1], 100)).toFixed(2)
            valueLiquidSalary = valueTotalSalary - valueDescontINSS
            pushInfoINSS.push([valueLiquidSalary, valuesINSS[1], (valueDescontINSS)])
        } else if (valueTotalSalary <= 3856) {
            valueDescontINSS = (valueTotalSalary * calculateImposto(valuesINSS[2], 100)).toFixed(2)
            valueLiquidSalary = valueTotalSalary - valueDescontINSS
            pushInfoINSS.push([valueLiquidSalary, valuesINSS[2], (valueDescontINSS)])
        } else if (valueTotalSalary >= 3856) {
            valueDescontINSS = (valueTotalSalary * calculateImposto(valuesINSS[3], 100)).toFixed(2)
            valueLiquidSalary = valueTotalSalary - valueDescontINSS
            pushInfoINSS.push([valueLiquidSalary, valuesINSS[3], (valueDescontINSS)])
        }
        //IRRF TABLE
        if(valueLiquidSalary <= 1903) {
            valueDescontIRRF = 0 
            pushInfoIRRF.push([valueLiquidSalary, 0, (valueDescontIRRF).toFixed(2)])
        } else if (valueLiquidSalary <= 2826) {
            valueDescontIRRF = (valueLiquidSalary * calculateImposto(valuesIRRF[1], 100)).toFixed(2)
            valueLiquidSalary = (valueLiquidSalary - valueDescontIRRF).toFixed(2)
            pushInfoIRRF.push([valueLiquidSalary, valuesIRRF[1], (valueDescontIRRF)])
        } else if (valueLiquidSalary <= 3751) {
            valueDescontIRRF = (valueLiquidSalary * calculateImposto(valuesIRRF[2], 100)).toFixed(2)
            valueLiquidSalary = (valueLiquidSalary - valueDescontIRRF).toFixed(2)
            pushInfoIRRF.push([valueLiquidSalary, valuesIRRF[2], (valueDescontIRRF)])
        } else if (valueLiquidSalary <= 4664) {
            valueDescontIRRF = (valueLiquidSalary * calculateImposto(valuesIRRF[3], 100)).toFixed(2)
            valueLiquidSalary = (valueLiquidSalary - valueDescontIRRF).toFixed(2)
            pushInfoIRRF.push([valueLiquidSalary, valuesIRRF[3], (valueDescontIRRF)])
        } else if (valueLiquidSalary >= 4665) {
            valueDescontIRRF = (valueLiquidSalary * calculateImposto(valuesIRRF[4], 100)).toFixed(2)
            valueLiquidSalary = (valueLiquidSalary - valueDescontIRRF).toFixed(2)
            pushInfoIRRF.push([valueLiquidSalary, valuesIRRF[4], (valueDescontIRRF)])
        }
        totalSalaryBrute = (valueTotalSalary).toFixed(2)
        totalSalaryLiquid = (+valueLiquidSalary).toFixed(2)
        valueIRRFTax = pushInfoIRRF[0][2]
        valueINSSTax = pushInfoINSS[0][2]
        taxINSS = pushInfoINSS[0][1]
        taxIRRF = pushInfoIRRF[0][1]
        totalTax = (+valueINSSTax + +valueIRRFTax).toFixed(2)
        
        console.log(`
        TABELA HOLERITE: CONFIRA OS DADOS ANTES DE BAIXAR... 
        SALARIO MENSAL: R$${newSalaryValue || salaryClientValue}
        SALARIO EXTRA: R$${newSalaryExtraValue || salaryExtraClientValue}
        DESCONTO IRRF: R$${valueIRRFTax}
        DESCONTO INSS: R$${valueINSSTax}
        DESCONTO TAXA IRRF: ${taxIRRF}%
        DESCONTO TAXA INSS ${taxINSS}%
        VALOR TOTAL DAS TAXAS: R$${totalTax}
        SALARIO BRUTO: R$${totalSalaryBrute}
        SALARIO LIQUIDO: R$${totalSalaryLiquid}
        `)
        
    }
    function myPhoto() {
        let canvas = document.querySelector('#myCanvas')
        let context = canvas.getContext('2d')
        let img = new Image()
        img.src = '../holerite.png'
        canvas.classList.remove('noL')
        img.onload = function() {
            context.drawImage(img, 0, 0)
            context.font = "38px Courier bold";
            context.letterSpacing = '1.4px'
            context.fillStyle = "black";
            context.textAlign = "start";
            /*
            SISTEMA FUNCIONA DESSE JEITO:
            MSG / LARGURA / altura
            context.fillText(nomeVariavel, largura, altura)
            */
           
            //CLIENTE
            context.fillText(nameValue, 220, 220)
            context.fillText(cboValue, 1525, 220)
            context.fillText(occupationValue, 220, 260)

            //EMPRESA
            context.fillText(`CNPJ: ${dotCNPJ()}`, 75, 95)
            context.fillText(`EMPRESA: ${nameCompanyValue} `, 75, 50)
            context.fillText(codeCompanyValue, 77, 220)
            context.fillText(findDateOfIssue(), 1915, 275)

            //VALORES HOLERITE
            //REFERENCIA
            let taxINSSText = (taxINSS + '').length
            let taxIRRFText = (taxIRRF + '').length
            context.fillText('30.00', 1330, 393)
            context.fillText('26.00', 1330, 435)
            taxINSSText > 2 ? context.fillText(`${taxINSS}0`, 1330, 478) : context.fillText(`${taxINSS}.00`, 1330, 478)
            taxIRRFText > 2 ? context.fillText(`${taxIRRF}0`, 1330, 520) : context.fillText(`${taxIRRF}.00`, 1330, 520)
            taxIRRFText > 2 ? context.fillText(`${taxIRRF}0`, 1950, 1430) : context.fillText(`${taxIRRF}.00`, 1950, 1430)
            //VENCIMENTOS
            let valueSalaryExtraText = (addDotValueSalaryExtra() || salaryExtraClientValue).length
            context.fillText(addDotValueSalary() || salaryClientValue, 1600, 393)
            valueSalaryExtraText > 6 ? context.fillText(addDotValueSalaryExtra() || salaryExtraClientValue, 1600, 440) : context.fillText(addDotValueSalaryExtra() || salaryExtraClientValue, 1630, 440)
            //DESCONTOS
            let valueINSSTaxText = tradeDot(valueINSSTax).length
            let valueIRRFTaxText = tradeDot(valueIRRFTax).length
            valueINSSTaxText > 6 ? context.fillText(dotAddFirst(valueINSSTax), 1970, 480) : context.fillText(tradeDot(valueINSSTax), 1985, 480)
            valueIRRFTaxText > 6 ? context.fillText(dotAddFirst(valueIRRFTax), 1970, 480) : context.fillText(tradeDot(valueIRRFTax), 1985, 520)
            //HOLERITE PARTE BAIXA
            //TOTAL DESCONTO
            let valueDescontText = tradeDot(totalTax).length
            let liquidSalaryText = tradeDot(totalSalaryLiquid).length
            let valueStringTotalSalary = String(totalSalaryBrute)
            let valueTotalSalaryText = tradeDot(valueStringTotalSalary).length
            valueDescontText > 6 ? context.fillText(dotAddFirst(totalTax), 1930, 1250) : context.fillText(tradeDot(totalTax), 1930, 1250)
            liquidSalaryText > 6 ? context.fillText(dotAddFirst(totalSalaryLiquid), 1930, 1350) : context.fillText(tradeDot(totalSalaryLiquid), 1930, 1350)
            valueTotalSalaryText > 6 ? context.fillText(dotAddFirst(valueStringTotalSalary), 1550, 1250) : context.fillText(tradeDot(valueStringTotalSalary), 1550, 1250)
            context.fillText(addDotValueSalary() || salaryClientValue, 125, 1430)
            //FGTS BRUTE - BOT
            let calcFgts = (totalSalaryBrute - (totalSalaryBrute * (8 / 100))).toFixed(2) 
            let calcFgtsStr = String(calcFgts)
            context.fillText(dotAddFirst(calcFgtsStr), 935, 1430)
            //FGTS BRUTE - BOT
            let calculateFGTS = ((totalSalaryBrute  * (8 / 100))).toFixed(2)
            let calculateFGTSStr = String(calculateFGTS)
            context.fillText(tradeDot(calculateFGTSStr), 1250, 1430)
            //INSS - BOT
            let calcINSS = totalSalaryBrute - (taxINSS)
            let calcINSSStr = String(calcINSS)
            context.fillText(dotAddFirst(calcINSSStr), 535, 1430)
            //IRRF - BT
            let calcIRRF = (totalSalaryBrute - taxIRRF).toFixed(2)
            let calcIRRFStr = String(calcIRRF)
            context.fillText(dotAddFirst(calcIRRFStr), 1600, 1430)

            //MES DE PAGAMENTO E DESCRIÇÃO
            //mes
            context.fillText('Folha mensal', 1810, 50)
            context.fillText(`${paymentMonthClientValue} de 2023`, 1800, 85)

            //desc
            context.fillText(descClientValue, 220, 1250)
        }
        downloadBTN.classList.remove('noL')
    }
    //SALARIO
    function simbolValueUStoBRL() {
        let salaryTransform
        if(salaryClientValue.includes('.')) {
            salaryTransform = salaryClientValue.replace('.', ',')
        } else {
            salaryTransform = salaryClientValue
        }
        return salaryTransform
    }
    simbolValueUStoBRL()
    function addDotValueSalary() {
        let addDot;
        let subsDot;
        if((simbolValueUStoBRL()).length === 7) {
            addDot = Array.from(simbolValueUStoBRL())
            addDot.splice(1, 0, '.')
            subsDot = addDot.join('')
        } else if ((simbolValueUStoBRL()).length === 8) {
            addDot = Array.from(simbolValueUStoBRL())
            addDot.splice(2, 0, '.')
            subsDot = addDot.join('')
        }
        else if ((simbolValueUStoBRL()).length === 9) {
            addDot = Array.from(simbolValueUStoBRL())
            addDot.splice(3, 0, '.')
            subsDot = addDot.join('')
        }
        else if ((simbolValueUStoBRL()).length === 10) {
            addDot = Array.from(simbolValueUStoBRL())
            addDot.splice(4, 0, '.')
            subsDot = addDot.join('')
        } else {
            subsDot = simbolValueUStoBRL()
        }
        return subsDot
    }
    //SALARIO EXTRA
    function simbolSalaryExtraUStoBRL() {
        let salaryExtraTransform
        if(salaryExtraClientValue.includes('.')) {
            salaryExtraTransform = salaryExtraClientValue.replace('.', ',')
        } else {
            salaryExtraTransform = salaryExtraClientValue
        }
        return salaryExtraTransform
    }
    simbolSalaryExtraUStoBRL()
    function addDotValueSalaryExtra() {
        let addDot;
        let subsDot;
         if ((simbolSalaryExtraUStoBRL()).length >= 7) {
            addDot = Array.from(simbolSalaryExtraUStoBRL())
            addDot.splice(1, 0, '.')
            subsDot = addDot.join('')
        } else {
            subsDot = simbolSalaryExtraUStoBRL()
        }
        return subsDot
    }
    //VERIFY PONT
    function dotAddFirst(z) {
        let addDot;
        let subsDot;
        if((tradeDot(z)).length >= 7) {
        addDot = Array.from(tradeDot(z))
        addDot.splice(1, 0, '.')
        subsDot = addDot.join('')
        } else {
            addDot = tradeDot(z)
        }
        return subsDot
    }
    
    // TRADE DOT
    function tradeDot(variable) {
        let dot;
        if(variable.includes('.')) {
            dot = variable.replace('.', ',')
        } else {
            dot = variable
        }
        return dot
    }
    function monthPay() {
        const paymentMonthClient = document.querySelector('.paymentMonthClient')
        const paymentMonthValue = paymentMonthClient.value 
        return paymentMonthValue
    }
    monthPay()
    function descriptionClient() {
        const descClient = document.querySelector('.descClient')
        const descClientValue = descClient.value
        return descClientValue
    }
    descriptionClient()
    function findDateOfIssue() {
        const dateAdmissionCompanyValue = dateAdmissionCompany.value
        const yearAdmission = [dateAdmissionCompanyValue[0], dateAdmissionCompanyValue[1], dateAdmissionCompanyValue[2], dateAdmissionCompanyValue[3]].join('')
        const monthAdmission = [dateAdmissionCompanyValue[5], dateAdmissionCompanyValue[6]].join('')
        const dayAdmission = [dateAdmissionCompanyValue[8], dateAdmissionCompanyValue[9]].join('')
        return `${dayAdmission}/${monthAdmission}/${yearAdmission}`
    }
    function calculateImposto(number, percentage) {
        return +number / +percentage
    }
    function dotCNPJ() {
        let regexNumbers = /^[0-9]+$/;
        const cnpjGet = document.querySelector('.cnpjCompany')
        const cnpjGetValue = cnpjGet.value
        let strCNPJ
        if(regexNumbers.test(cnpjGetValue)) {
            let arrCNPJ = Array.from(cnpjGetValue)
            arrCNPJ.splice(2, 0, '.')
            arrCNPJ.splice(6, 0, '.')
            arrCNPJ.splice(10, 0, '/')
            arrCNPJ.splice(15, 0, '-') 
            strCNPJ = arrCNPJ.join('')
            return strCNPJ
        } else {
            strCNPJ = cnpjGetValue
            (strCNPJ)
            return strCNPJ
        }
    }
}
sendBTN.addEventListener('click', sendInformation)

downloadBTN.addEventListener('click', function() {
    print()
})
