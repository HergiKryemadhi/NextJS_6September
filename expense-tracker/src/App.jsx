import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Navbar, Container, Nav, Form } from 'react-bootstrap';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import Reports from './components/Reports';
import Dashboard from './components/Dashboard';
import { ExpenseProvider } from './context/ExpenseContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function AppContent() {
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  return (
    <div className={`app-wrapper ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar bg={darkMode ? "dark" : "light"} variant={darkMode ? "dark" : "light"} expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">Albanian Expense Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/expenses">Expenses</Nav.Link>
              <Nav.Link as={Link} to="/add">Add Expense</Nav.Link>
              <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
            </Nav>
            <Form>
              <Form.Check 
                type="switch"
                id="dark-mode-switch"
                label="Dark Mode"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-3 mb-5 flex-grow-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
            <Route path="/expenses" element={<PageWrapper><ExpenseList /></PageWrapper>} />
            <Route path="/add" element={<PageWrapper><AddExpense /></PageWrapper>} />
            <Route path="/reports" element={<PageWrapper><Reports /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </Container>

      <footer className={`py-3 mt-auto ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
        <Container>
          <p className="text-center mb-0">&copy; 2024 Albanian Expense Tracker. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ExpenseProvider>
        <Router>
          <AppContent />
        </Router>
      </ExpenseProvider>
    </ThemeProvider>
  );
}

export default App;
