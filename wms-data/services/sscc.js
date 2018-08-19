// 00 080179380010044425
var sscc = '08017938001004442';
var GS1CompanyPrefix = '';
const applicationIdentifier = '00';
const extensionDigit = '0';
var serialReference = '';
var checkDigit = '';

let obSjscc = { 
    extensionDigit : '' ,
    GS1CompanyPrefix: '',
    GS1Serial: '', 
    serialNumber: '',
    checkDigit: ''
    };


function create() {
    obSjscc.extensionDigit = '0'; // long 1
    obSjscc.GS1CompanyPrefix = '0000'; // long 7
    obSjscc.GS1Serial = '000' ;// long 3
    obSjscc.serialNumber = '000001'// long long 6 - 999.999




}

function checkDigitCalculate(_sscc) {
    var _calculateDigit = 0;
    var _value = 0;
    for( i = 0; i< 17 ; i++){
        if (i % 2 == 0 ) _value = (Number.parseInt(_sscc[i]) * 3)
        else _value = (Number.parseInt(_sscc[i]) * 1)
        _calculateDigit = _calculateDigit + _value;
        //console.log (`Calculating...is ${i % 2 == 0}  (Stringa[${i}]- ${_sscc[i]}) -> ${_value} Sum:${_calculateDigit}  `);
    }
    const lastDigitCalculated =_calculateDigit % 10 ;
    //console.log('Units: ', lastDigitCalculated);
    if (lastDigitCalculated >4 ) checkDigit = 10 -  lastDigitCalculated;
    else checkDigit = lastDigitCalculated;
    //console.log('Check digit is: ', checkDigit);
    //console.log(split(sscc + checkDigit));
    return checkDigit;
}

function check(_sscc) {
    const checkResult = checkDigitCalculate(_sscc.substring(0,17));
    if (checkResult === _sscc.substring(17,18)) return { result: 'OK' }
    else null
}

function split(_sscc) {
    if (!check(_sscc)) return { result: 'error', message: 'Check digit is not right...' }
    else {
        return { 
            result: 'OK',
            extensionDigit : _sscc.substring(0, 1) ,
            GS1CompanyPrefix: _sscc.substring(1, 8),
            GS1Serial: _sscc.substring(8, 11), 
            serialNumber: _sscc.substring(11, 17),
            checkDigit: _sscc.substring(17, 18)
            
        }
    }
}


//console.log(checkDigitCalculate(sscc));