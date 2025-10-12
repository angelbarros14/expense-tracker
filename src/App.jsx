import { useState } from 'react'

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

const TransactionType = ({ options }) => {
  return (
    <div>
      {options.map((option) => (
          <button key={option.value} value={option.value}>{option.text}</button>
      ))}
    </div>
  )
}

const TransactionBox = ({ value, onChange}) => {
  return (
    <div>
      <TransactionType 
      options= {[
        {value: 'income', text: 'Income'},
        {value: 'expense', text: 'Expense'}
      ]}/>
      <input type='number' value={value} onChange={onChange}/>
    </div>
  )
}

const Categories = ({ options, text }) => {
  return (
    <label>
      {text}
      <select name='selectedCategory'>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.text}</option>
        ))}
      </select>
    </label>
  )
}

const AddTransaction = ({ title, setTitle, note, setNote, amount, setAmount}) => {
  return (
    <div>
       <Title text='Add Transaction' />
        <Textbox placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <Textbox placeholder='Notes' value={note} onChange={(e) => setNote(e.target.value)}/>
        <TransactionBox value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Categories text='Select Category:' options={[
          {value: 'dining', text: 'Dining'},
          {value: 'groceries', text: 'Groceries'},
          {value: 'shoppimg', text: 'Shopping'},
          {value: 'transit', text: 'Transit'},
          {value: 'entertainment', text: 'Entertainment'},
          {value: 'bills', text: 'Bills'},
          {value: 'gifts', text: 'Gifts'},
          {value: 'beauty', text: 'Beauty'},
          {value: 'work', text: 'Work'},
          {value: 'travel', text: 'Travel'},
          {value: 'income', text: 'Income'}
        ]} />
    </div>
  )
}

const App = () => {
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [amount, setAmount] = useState(0)

  return (
    <div>
      <AddTransaction title={title} setTitle={setTitle} note={note} setNote={setNote} amount={amount} setAmount={setAmount}/>
    </div>

  )
}

export default App
