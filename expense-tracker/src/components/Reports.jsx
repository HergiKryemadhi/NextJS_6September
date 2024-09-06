import React from 'react';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';
import { useExpenses } from '../context/ExpenseContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

function Reports() {
  const { expenses } = useExpenses();

  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryTotals = expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    return totals;
  }, {});

  const pieChartData = Object.entries(categoryTotals).map(([category, total]) => ({
    name: category,
    value: total
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div>
      <h2 className="mb-4">Expense Reports</h2>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Expenses</Card.Title>
              <Card.Text className="h2">{totalExpense.toLocaleString('sq-AL', { style: 'currency', currency: 'ALL' })}</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Expenses by Category</Card.Title>
              <ListGroup>
                {Object.entries(categoryTotals).map(([category, total]) => (
                  <ListGroup.Item key={category} className="d-flex justify-content-between align-items-center">
                    {category}
                    <span>{total.toLocaleString('sq-AL', { style: 'currency', currency: 'ALL' })}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Expense Distribution</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => value.toLocaleString('sq-AL', { style: 'currency', currency: 'ALL' })} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Reports;