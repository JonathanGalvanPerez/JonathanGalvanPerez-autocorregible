import React from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes'

const style = {
  backgroundImage: "url(/images/comic-background.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  minHeight: "100vh"
}

function App() {
  return (
    <div className="App py-md-2" style={style}>
      <AppRoutes />
    </div>
  );
}

export default App;
