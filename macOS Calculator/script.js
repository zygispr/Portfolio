var previousOutputText = '';
var currentOutputText = '0';
var output = 0;
var outputRounded = 0;
var selectedOperator;
var wasNumberSelected = false;
var wasOperatorSelected = false;
var wasEqualsSelected = false;
var operationsCounter = 0;
var overallCounter = 0;

var operatorArray = document.getElementsByClassName('operator');
var possibleOperationsArray = ['/', '*', '-', '+'];

document.getElementById('display').innerHTML = currentOutputText;

// Viską ištrina
function allClear() {
    previousOutputText = '';
    currentOutputText = '0';
    output = 0;
    outputRounded = 0;
    wasNumberSelected = false;
    wasOperatorSelected = false;
    wasEqualsSelected = false;
    operationsCounter = 0;
    overallCounter = 0;

    document.getElementById('display').innerHTML = currentOutputText;

    console.log('allClear():');
    console.log('previous ' + previousOutputText);
    console.log('current ' + currentOutputText);
    console.log('output ' + output);
    console.log('output rounded ' + outputRounded);
    console.log('----------------');
}

// Ištrina paskutinį skaičių
function deleteChar() {
    if (!wasEqualsSelected && wasNumberSelected) {
        if (currentOutputText.length > 0) {
            currentOutputText = currentOutputText.slice(0, -1);
            if (currentOutputText == '') currentOutputText = '0';
        }
        document.getElementById('display').innerHTML = currentOutputText;
    }

    console.log('deleteChar():');
    console.log('previous ' + previousOutputText);
    console.log('current ' + currentOutputText);
    console.log('output ' + output);
    console.log('output rounded ' + outputRounded);
    console.log('----------------');
}

// Pakeičia skaičiaus ženklą
function plusMinus() {
    // Priklausomai nuo to, kuriuo momentu buvo paspaustas ± mygtukas (t. y. ar po lygybės, skaičiaus ar operatoriaus), minusas turi būti padedamas/nuimamas prie skirtingo skaičiaus (prie output, currentOutputText ar previousOutputText atitinkamai)
    if (wasEqualsSelected && wasNumberSelected) {
        output = -output;
        outputRounded = -outputRounded;
        document.getElementById('display').innerHTML = outputRounded.toString();
    } else if (wasNumberSelected) {
        if (currentOutputText.charAt(0) !== '-') {
            currentOutputText = '-' + currentOutputText;
        } else {
            currentOutputText = currentOutputText.substring(1);
        }
        document.getElementById('display').innerHTML = currentOutputText;
    } else if (wasOperatorSelected) {
        if (output === 0 && outputRounded === 0) {
            if (previousOutputText.charAt(0) !== '-') {
                previousOutputText = '-' + previousOutputText;
            } else {
                previousOutputText = previousOutputText.substring(1);
            }
            document.getElementById('display').innerHTML = previousOutputText;
        } else if (output !== 0 && outputRounded !== 0) {
            output = -output;
            outputRounded = -outputRounded;
            document.getElementById('display').innerHTML = outputRounded.toString();
        }
    }

    console.log('decimal():');
    console.log('previous ' + previousOutputText);
    console.log('current ' + currentOutputText);
    console.log('output ' + output);
    console.log('output rounded ' + outputRounded);
    console.log('----------------');
}

// Paspaudus kablelį
function decimal() {
    // Jeigu apskaičiavus, pradedi rašyti kablelį/skaičių, viskas prasideda iš naujo
    if (wasEqualsSelected) {
        allClear();
        currentOutputText = '';
    }

    if (!currentOutputText.includes('.')) {
        if (currentOutputText != '') {
            currentOutputText = currentOutputText + '.';
        } else {
            currentOutputText = '0.';
        }
    }
    document.getElementById('display').innerHTML = currentOutputText;

    console.log('decimal():');
    console.log('previous ' + previousOutputText);
    console.log('current ' + currentOutputText);
    console.log('output ' + output);
    console.log('output rounded ' + outputRounded);
    console.log('----------------');
}

// Paspaudus skaičių
function numberPressed(number) {
    // Šita eilutė padaro, kad ekrane nesirašytų 0 prieš skaičius
    if (currentOutputText === '0') currentOutputText = '';

    // Jeigu apskaičiavus, pradedi rašyti skaičių, viskas prasideda iš naujo
    if (wasEqualsSelected) {
        allClear();
        currentOutputText = '';
    }

    currentOutputText += number;
    document.getElementById('display').innerHTML = currentOutputText;

    wasNumberSelected = true;
    wasOperatorSelected = false;

    console.log('numberPressed():');
    console.log('previous ' + previousOutputText);
    console.log('current ' + currentOutputText);
    console.log('output ' + output);
    console.log('output rounded ' + outputRounded);
    console.log('----------------');
}

// Paspaudus operatorių
function operatorPressed(operator) {
    if (!wasOperatorSelected) {
        operationsCounter++;
        overallCounter++;
        if (operationsCounter === 1) {
            previousOutputText = currentOutputText;
        }
        if (operationsCounter > 1) {
            equals('from-operator');
        }
        currentOutputText = '';
        wasNumberSelected = false;
        wasOperatorSelected = true;
        wasEqualsSelected = false;



    }
    selectedOperator = operator;
    setOperatorStyle(possibleOperationsArray.indexOf(selectedOperator));

    console.log('operatorPressed():');
    console.log('previous ' + previousOutputText);
    console.log('current ' + currentOutputText);
    console.log('output ' + output);
    console.log('output rounded ' + outputRounded);
    console.log('----------------');
}

// Paspaudus lygybę
function equals(place) {
    setOperatorStyle(undefined);
    wasEqualsSelected = true;

    if (output === 0 && overallCounter === 1) output = parseFloat(previousOutputText, 10);
    if (output === 0 && overallCounter === 2) output = parseFloat(previousOutputText, 10);

    if (place != 'from-operator') {
        operationsCounter = 0;
    }

    if (wasNumberSelected) {
        if (selectedOperator == undefined) {
            output = parseFloat(currentOutputText, 10);
        } else if (selectedOperator === '/') {
            output /= parseFloat(currentOutputText, 10);
        } else if (selectedOperator === '*') {
            output *= parseFloat(currentOutputText, 10);
        } else if (selectedOperator === '-') {
            output -= parseFloat(currentOutputText, 10);
        } else if (selectedOperator === '+') {
            output += parseFloat(currentOutputText, 10);
        }
        outputRounded = parseFloat(output.toFixed(3));
    } else if (wasOperatorSelected) {
        if (selectedOperator === '/') {
            output = parseFloat(previousOutputText, 10) / parseFloat(previousOutputText, 10);
        } else if (selectedOperator === '*') {
            output = parseFloat(previousOutputText, 10) * parseFloat(previousOutputText, 10);
        } else if (selectedOperator === '-') {
            output = parseFloat(previousOutputText, 10) - parseFloat(previousOutputText, 10);
        } else if (selectedOperator === '+') {
            output = parseFloat(previousOutputText, 10) + parseFloat(previousOutputText, 10);

        }
        outputRounded = parseFloat(output.toFixed(3));
        currentOutputText = previousOutputText;
        wasOperatorSelected = false;
        wasNumberSelected = true;
    }
    // wasNumberSelected = false;
    document.getElementById('display').innerHTML = outputRounded.toString();

    console.log('equals():');
    console.log('previous ' + previousOutputText);
    console.log('current ' + currentOutputText);
    console.log('output ' + output);
    console.log('output rounded ' + outputRounded);
    console.log('----------------');
}

// Operatorių paryškinimo atsiradimas/pašalinimas
function setOperatorStyle(operatorArrayIndex) {
    // Iškvietus funkciją, pradžiai visiems operatoriams yra nuimamas paryškinimas
    for (let i = 0; i < operatorArray.length - 1; i++) {
        operatorArray[i].style.boxShadow = "none";
    }
    // Tada paryškina tą operatorių, kurio index'ą paėmė (neryškina tik mygtuko '=')
    if (operatorArrayIndex != undefined) operatorArray[operatorArrayIndex].style.boxShadow = "inset 0px 0px 2px 2px black";
}