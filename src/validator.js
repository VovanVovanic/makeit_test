
class Validator {
  static validate(sudoku) {
    const validator = new Validator

    return validator.validate(sudoku)
  }

  validate(sudoku) {
    ///lets make the string into array which contains numbers only
    const totalArr = sudoku.toString().replace(/[^0-9]/g, '').split('').map((e) => +e)
    ///check if the puzzle complete
    const isInComplete = totalArr.some((el) => el === 0)

    // splice into subarrays
    const spliceHandler = (arr, chunkSize) => {
      const res = [];
      while (arr.length > 0) {
        const chunk = arr.splice(0, chunkSize);
        res.push(chunk);
      }
      return res;
    }
    const sudokuArr = spliceHandler(totalArr, 9)

    // the main function. It will check whether the essence match the condition
    // because Set contains unique dates only, if an array made from set is shorter than the original array,
    // thats mean original array contains non unique dates and the puzzle is wrong
    let isEssenceCorrect = true

    const handleCheck = (arr) => {
      const setArr = [...new Set(arr)]
      if (setArr.length !== arr.length) {
        isEssenceCorrect = false
      }
    }

    ///check the rows 
    const rowsCheck = (arr) => {
      isEssenceCorrect = true
      sudokuArr.forEach((arr) => {
        const filteredZeros = arr.filter((e) => e !== 0)
        handleCheck(filteredZeros)
      })
      return isEssenceCorrect
    }

    // columns check
    const columnsCheck = (arr) => {
      isEssenceCorrect = true
      const initArr = new Array(9).fill().map((_, i) => i)
      initArr.forEach((el) => {
        const reducedColumns = arr.reduce((acc, item) => {
          acc.push(item[el])
          return acc
        }, [])
        const filteredColumnsZero = reducedColumns.filter((e) => e !== 0)
        handleCheck(filteredColumnsZero)
      })
      return isEssenceCorrect
    }

    /// squaresCheck
    const squaresCheck = (arr) => {
      isEssenceCorrect = true
      const squareArr = new Array(9).fill().map((_, i) => [])
      arr.forEach((el, i) => {
        el.forEach((e, j) => {
          squareArr[Math.floor(i / 3) * 3 + Math.floor(j / 3)].push(arr[i][j])
        })
      })
      squareArr.forEach((el) => {
        const filteredSquareZero = el.filter((e) => e !== 0)
        handleCheck(filteredSquareZero)
      })

      return isEssenceCorrect
    }

    const isRowsOk = rowsCheck(sudokuArr)
    const isColumnsOk = columnsCheck(sudokuArr)
    const isSquaresOk = squaresCheck(sudokuArr)

    const completeMsg = isInComplete ? 'incompleted' : 'completed'
    const result = { 'rows': isRowsOk, 'columns': isColumnsOk, 'squares': isSquaresOk }
    const keys = Object.keys(result)
    const values = Object.values(result)
    const puzzleKey = keys.filter((k) => !result[k]).join()
    const isPuzzlePassed = values.every((el) => el === true)

    const message = isPuzzlePassed ? `The puzzle is ${completeMsg} and passed.` : `The puzzle is ${completeMsg} and faled. Check the ${puzzleKey}`
    const returnMessage = isPuzzlePassed ? `Sudoku is valid.` : `Sudoku is invalid.`
    console.log(message)
    return returnMessage
  }
}

module.exports = Validator
