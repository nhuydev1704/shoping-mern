import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/footers/Footer';
import Header from './components/headers/Header';
import Pages from './components/mainpages/Pages';
import { DataProvider } from './GlobalState';
function App() {
  return (
    <DataProvider>
      <Router>
        <Header />
        <div className="App">
          <Pages />
        </div>
        <Footer />
      </Router>
    </DataProvider>
  );
}

export default App;
