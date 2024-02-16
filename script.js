let previousValue = ''
let currentValue = ''
let operator = ''

document.addEventListener('DOMContentLoaded', function () {
  let clear = document.querySelector('#clear')
  let equal = document.querySelector('.equal')
  let decimal = document.querySelector('.decimal')
  let percent = document.querySelector('#percent')

  let numbers = document.querySelectorAll('.number')
  let operators = document.querySelectorAll('.operator')

  let previousScreen = document.querySelector('.previous')
  let currentScreen = document.querySelector('.current')

  numbers.forEach((number) =>
    number.addEventListener('click', function (e) {
      handleNumber(e.target.textContent)
      currentScreen.textContent = currentValue
    })
  )

  operators.forEach((op) =>
    op.addEventListener('click', function (e) {
      if (previousValue && currentValue) {
        calculate()
      }
      handleOperator(e.target.textContent)
      previousScreen.textContent = previousValue + ' ' + operator
      currentScreen.textContent = currentValue
    })
  )

  clear.addEventListener('click', function () {
    previousValue = ''
    currentValue = ''
    operator = ''
    previousScreen.textContent = currentValue
    currentScreen.textContent = currentValue
  })

  equal.addEventListener('click', function () {
    if (currentValue != '' && previousValue != '') {
      calculate()
      previousScreen.textContent = ''
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
  })

  percent.addEventListener('click', function () {
    makePercent()
    currentScreen.textContent = currentValue
  })
})

function handleNumber(num) {
  if (currentValue.length <= 5) {
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
  currentValue = currentValue.toString()
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
  currentValue *= 0.01
}
