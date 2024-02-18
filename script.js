let previousValue = ''
let currentValue = ''
let operator = ''

document.addEventListener('DOMContentLoaded', function () {
  let clear = document.querySelector('#clear')
  let equal = document.querySelector('.equal')
  let decimal = document.querySelector('.decimal')
  let percent = document.querySelector('#percent')
  let negative = document.querySelector('#negative')

  let numbers = document.querySelectorAll('.number')
  let operators = document.querySelectorAll('.operator')

  let previousScreen = document.querySelector('.previous')
  let currentScreen = document.querySelector('.current')

  numbers.forEach((number) =>
    number.addEventListener('click', function (e) {
      if (previousScreen.textContent != '') {
        clear.classList.add('adjust-font')
        clear.innerHTML = 'C'
      }
      handleNumber(e.target.textContent)
      currentScreen.textContent = currentValue
    })
  )

  operators.forEach((op) =>
    op.addEventListener('click', function (e) {
      if (currentScreen.textContent != 0 && currentScreen.textContent != '.') {
        if (previousScreen.textContent != '') {
          calculate()
        }
        handleOperator(e.target.textContent)
        previousScreen.textContent = previousValue + ' ' + operator
        currentScreen.textContent = currentValue
      }
    })
  )

  clear.addEventListener('click', function () {
    if (previousScreen.textContent != '' && currentScreen.textContent == '0') {
      previousValue = ''
      currentValue = ''
      operator = ''
      previousScreen.textContent = ''
      currentScreen.textContent = '0'
    } else if (
      previousScreen.textContent.includes(operator) &&
      currentScreen.textContent == ''
    ) {
      previousValue = ''
      currentValue = ''
      operator = ''
      previousScreen.textContent = ''
      currentScreen.textContent = '0'
    } else {
      currentValue = ''
      currentScreen.textContent = '0'
      clear.innerHTML = 'A/C'
    }
  })

  equal.addEventListener('click', function () {
    if (
      currentValue != '' &&
      previousValue != '' &&
      currentScreen.textContent > 0
    ) {
      calculate()
      previousScreen.textContent = ''
      clear.innerHTML = 'A/C'
      if (previousValue.length <= 5) {
        currentScreen.textContent = previousValue
      } else {
        currentScreen.textContent = previousValue.slice(0, 5) + '...'
      }
    }
  })

  decimal.addEventListener('click', function () {
    addDecimal()
    currentScreen.textContent = currentValue
    clear.innerHTML = 'C'
  })

  percent.addEventListener('click', function () {
    makePercent()
    currentScreen.textContent = currentValue
  })

  negative.addEventListener('click', function () {
    convertToNegative()
    currentValue = currentValue.toString()
    currentScreen.textContent = currentValue
  })
})

function handleNumber(num) {
  if (currentValue === '0') {
    currentValue = num
  } else if (currentValue.length <= 5) {
    currentValue += num
  }
}

function handleOperator(op) {
  operator = op
  previousValue = currentValue
  currentValue = ''
}

function calculate() {
  previousValue = Number(previousValue)
  currentValue = Number(currentValue)

  if (operator === '+') {
    add()
  } else if (operator === '-') {
    subtract()
  } else if (operator === 'x') {
    multiply()
  } else {
    divide()
  }

  previousValue = roundNumber(previousValue)
  previousValue = previousValue.toString()
}

function add() {
  previousValue += currentValue
  currentValue = previousValue
}

function subtract() {
  previousValue -= currentValue
  currentValue = previousValue
}

function multiply() {
  previousValue *= currentValue
  currentValue = previousValue
}

function divide() {
  previousValue /= currentValue
  currentValue = previousValue
}

function roundNumber(num) {
  return Math.round(num * 1000) / 1000
}

function addDecimal() {
  if (!currentValue.includes('.')) {
    currentValue += '.'
  }
}

function makePercent() {
  if (currentValue != 0 && currentValue != '.') {
    currentValue *= 0.01
  } else if (currentValue == 0) {
    currentScreen.textContent = 0
  }
}

function convertToNegative() {
  if (Math.sign(currentValue) == -1) {
    currentValue = Math.abs(currentValue)
  } else if (currentValue != 0 && currentValue != '.') {
    currentValue = -Math.abs(currentValue)
  } else if (currentValue == 0) {
    currentScreen.textContent = 0
  }
}
