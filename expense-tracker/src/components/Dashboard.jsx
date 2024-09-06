import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useExpenses } from '../context/ExpenseContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const { expenses } = useExpenses();

  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpense / expenses.length : 0;

  const last7DaysExpenses = expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return expenseDate >= sevenDaysAgo;
    })
    .reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + expense.amount;
      return acc;
    }, {});

  const chartData = Object.entries(last7DaysExpenses).map(([date, amount]) => ({ date, amount }));

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Expenses</Card.Title>
              <Card.Text className="h3">{totalExpense.toLocaleString('sq-AL', { style: 'currency', currency: 'ALL' })}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Average Expense</Card.Title>
              <Card.Text className="h3">{averageExpense.toLocaleString('sq-AL', { style: 'currency', currency: 'ALL' })}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Entries</Card.Title>
              <Card.Text className="h3">{expenses.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card>
        <Card.Body>
          <Card.Title>Last 7 Days Expenses</Card.Title>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => value.toLocaleString('sq-AL', { style: 'currency', currency: 'ALL' })} />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Dashboard;