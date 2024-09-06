import React, { useState } from 'react';
import { Table, Card, Form, Button } from 'react-bootstrap';
import { useExpenses } from '../context/ExpenseContext';

function ExpenseList() {
  const { expenses, dispatch } = useExpenses();
  const [filter, setFilter] = useState({ category: '', startDate: '', endDate: '' });

  const filteredExpenses = expenses.filter(expense => {
    return (
      (filter.category === '' || expense.category === filter.category) &&
      (filter.startDate === '' || expense.date >= filter.startDate) &&
      (filter.endDate === '' || expense.date <= filter.endDate)
    );
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      dispatch({ type: 'DELETE_EXPENSE', payload: id });
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Expense List</Card.Title>
        <Form className="mb-3">
          <Form.Group>
            <Form.Label>Filter by Category</Form.Label>
            <Form.Control 
              as="select"
              value={filter.category}
              onChange={(e) => setFilter({...filter, category: e.target.value})}
            >
              <option value="">All Categories</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control 
              type="date"
              value={filter.startDate}
              onChange={(e) => setFilter({...filter, startDate: e.target.value})}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control 
              type="date"
              value={filter.endDate}
              onChange={(e) => setFilter({...filter, endDate: e.target.value})}
            />
          </Form.Group>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.amount.toLocaleString('sq-AL', { style: 'currency', currency: 'ALL' })}</td>
                <td>{expense.category}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(expense.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default ExpenseList;