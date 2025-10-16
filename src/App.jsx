import { useState } from 'react'
import './App.css'

let nextId = 0

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Title = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Textbox = ({ placeholder, value, onChange }) => {
  return (
    <input type="text" placeholder={placeholder} value={value} onChange={onChange}/>
  )
}

const TransactionType = ({ options, setType }) => {
  return (
    <div>
      {options.map((option) => (
          <button key={option.value} value={option.value} onClick={() => setType(option.value)}>{option.text}</button>
      ))}
    </div>
  )
}

const TransactionBox = ({ value, onChange, type, setType }) => {
  return (
    <div className='transaction-box'>
      <TransactionType 
      type={type}
      setType={setType}
      options= {[
        {value: 'income', text: 'Income'},
        {value: 'expense', text: 'Expense'}
      ]}/>
      <input type='number' value={value} onChange={onChange}/>
    </div>
  )
}

const Categories = ({ options, text, value, onChange }) => {
  return (
    <label>
      {text}
      <select name='selectedCategory' value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.text}</option>
        ))}
      </select>
    </label>
  )
}

const AddTransaction = ({ title, setTitle, note, setNote, amount, setAmount, onClick, setCategory, category, type, setType }) => {

  return (
    <div>
      <Title text='Add Transaction' />
      <div className='add-transaction-container'>
        <div className='add-transaction'>
          <Textbox placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
          <Textbox placeholder='Notes' value={note} onChange={(e) => setNote(e.target.value)}/>
          <TransactionBox value={amount} onChange={(e) => setAmount(e.target.value)} type={type} setType={setType}/>
          <Categories text='Select Category:' value={category} 
          onChange={(e) => setCategory(e.target.value)}
          options={[
            {value: 'dining', text: 'Dining'},
            {value: 'food', text: 'Food & Drink'},
            {value: 'groceries', text: 'Groceries'},
            {value: 'shopping', text: 'Shopping'},
            {value: 'transit', text: 'Transit'},
            {value: 'entertainment', text: 'Entertainment'},
            {value: 'bills', text: 'Bills'},
            {value: 'gifts', text: 'Gifts'},
            {value: 'beauty', text: 'Beauty'},
            {value: 'work', text: 'Work'},
            {value: 'travel', text: 'Travel'},
            {value: 'income', text: 'Income'}
          ]}  />
          <Button onClick={onClick} text='+'/>
        </div>
      </div>
    </div>
  )
}

const CurrentRecord = ({ records, income, expense, savings }) => {
  const list = [income, expense, savings]


  return (
    <div className='record-container'>
      {records.map((record, index)=> 
      <div key={index} className='record-row'>
        <p className='record-item-one'>₱{list[index]}</p>
        <p className='record-item-two'>{record}</p>
      </div>
      )}
    </div>
  )
}

const TransactionList = ({ transactions }) => {
  return (
    <div className='list-container'>
      {transactions.length > 0 && <Title text='Transactions'/>}
      <table>
        {transactions.length > 0 &&
        <thead>
          <tr>
            <th>Transaction Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Note</th>
          </tr>
        </thead>}

        <tbody>
        {transactions.map(transaction => (
        <tr key={transaction.id}>
          <td className='list-row'>
            <div className='list-items'>
              <p className='item-one'>{transaction.title}</p>
              <p className='item-two'>{transaction.category}</p>
            </div>    
          </td>
          <td className='list-row'>{transaction.date}</td>
          <td className='list-row'> ₱{transaction.amount}</td>
          <td className='list-row'>{transaction.note}</td>
        </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('dining')
  const [transactions, setTransactions] = useState([])
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const [savings, setSavings] = useState(0)
  const [type, setType] = useState('income')

  const today = new Date()
  const month = today.getMonth()
  const year = today.getFullYear()
  const date = today.getDate()

  const setDate = `${year}-${month}-${date}`
 
  const records = ['Total Income', 'Total Expense', 'Total Savings']

  const addButton = () => {
    const updatedAmount = parseFloat(amount)

    if (title === '') {
      alert('title cannot be left blank')
      return
    }

    if (amount === 0 || isNaN(updatedAmount)) {
      alert('enter valid amount greater than 0')
      return
    }

    const newTransaction = {
      title, note, amount: updatedAmount, date: setDate, category, type, id: nextId++
    }
    setTransactions([...transactions, newTransaction])

    if (type === 'income') {
      setIncome(income => {
        const updatedIncome = income + updatedAmount
        setSavings(updatedIncome - expense)
        return updatedIncome
      })
    } else {
      setExpense(expense => {
        const updatedExpense = expense + updatedAmount
        setSavings(income - updatedExpense)
        return updatedExpense
      })
    }

    setTitle('')
    setNote('')
    setAmount(0)
    setType('income')
    setCategory('dining')
  }

  console.log(transactions)
  return (
    <>
      <div>
        <CurrentRecord records={records} income={income} expense={expense} savings={savings}/>
      </div>
      <div>
        <AddTransaction title={title} setTitle={setTitle} note={note} setNote={setNote} amount={amount} setAmount={setAmount} onClick={addButton} category={category} setCategory={setCategory} type={type} setType={setType}/>
      </div>
      <div>
        <TransactionList transactions={transactions} />
      </div>
    </>
  )
}

export default App
