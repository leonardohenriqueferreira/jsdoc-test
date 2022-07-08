/**
 * Express application module
 * @see {@link https://expressjs.com/|Express}
 */
const express = require('express')

/**
 * Express instance
 * @see {@link https://expressjs.com/|Express}
 */
const app = express()

/**
 * Port of the application
 * @type {number}
 */
const port = 3000

/**
 * Calculator
 * @see module:calculator
 */
const calculator = require('./calculator')

app.use(express.static('docs'));

app.get('/hello', (req, res) => {
    res.send('Hello World!')
})

app.get('/calculator/:operation/:value1/:value2', (req, res) => {
  try {
    const operation = req.params.operation
    const value1 = parseInt(req.params.value1)
    const value2 = parseInt(req.params.value2)

    let result = 0
    switch (operation) {
      case 'addition':
        result = calculator.addition(value1, value2)
      break;

      case 'subtraction':
        result = calculator.subtraction(value1, value2)
      break;
  
      default:
        return res.status(404).json({ error: "Operation not found" })
    }

    res.status(200).json({
      operation,
      value1,
      value2,
      result
    })
  } catch (ex) {
      res.status(500).json({ error: "Operation execution failure" })
  }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
