import { useState } from 'react'

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
    <div>
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
        <Textbox placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <Textbox placeholder='Notes' value={note} onChange={(e) => setNote(e.target.value)}/>
        <TransactionBox value={amount} onChange={(e) => setAmount(e.target.value)} type={type} setType={setType}/>
        <Categories text='Select Category:' value={category} 
        onChange={(e) => setCategory(e.target.value)}
        options={[
          {value: 'dining', text: 'Dining'},
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
  )
}

const CurrentRecord = ({ records, income, expense, savings }) => {
  const list = [income, expense, savings]


  return (
    <div>
      {records.map((record, index)=> 
      <div key={index}>
        <div>{list[index]}</div>
        <div>{record}</div>
      </div>
      )}
    </div>
  )
}

const TransactionList = ({ transactions }) => {
  return (
    <div>
      {transactions.length > 0 && <Title text='Transactions'/>}
      <ul>
        {/* fix container on each properties */}
        {/* add conditional. show/hide title */}
        {transactions.map(transaction => 
        <li key={transaction.id}>
          <div>
            <div>{transaction.title}</div><div>{transaction.category}</div>
          </div>
          <div>
            <div>{transaction.note}</div>
          </div>
          <div>
            <div>{transaction.amount}</div>
          </div>
        </li>
          )}
      </ul>
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
 
  const records = ['Total Income', 'Total Expense', 'Total Savings']

  const addButton = () => {
    const updatedAmount = parseFloat(amount)

    const newTransaction = {
      title, note, amount: updatedAmount, category, type, id: nextId++
    }
    setTransactions([...transactions, newTransaction])

    if (type === 'income') {
      setIncome(income => {
        const updatedIncome = income + updatedAmount
        return updatedIncome
      })
    } else {
      setExpense(expense => {
        const updatedExpense = expense + updatedAmount
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
