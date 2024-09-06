import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useExpenses } from '../context/ExpenseContext';
import { useNavigate } from 'react-router-dom';

function AddExpense() {
  const [expense, setExpense] = useState({ description: '', amount: '', category: '', date: new Date().toISOString().substr(0, 10) });
  const { dispatch } = useExpenses();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      ...expense,
      amount: parseFloat(expense.amount),
      id: Date.now().toString()
    };
    dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
    setExpense({ description: '', amount: '', category: '', date: new Date().toISOString().substr(0, 10) });
    navigate('/expenses');
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Add New Expense</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type="text" 
              value={expense.description} 
              onChange={(e) => setExpense({...expense, description: e.target.value})}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount (in ALL)</Form.Label>
            <Form.Control 
              type="number" 
              value={expense.amount} 
              onChange={(e) => setExpense({...expense, amount: e.target.value})}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control 
              as="select"
              value={expense.category}
              onChange={(e) => setExpense({...expense, category: e.target.value})}
              required
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control 
              type="date" 
              value={expense.date} 
              onChange={(e) => setExpense({...expense, date: e.target.value})}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Expense
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddExpense;