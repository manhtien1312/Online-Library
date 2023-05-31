import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './config/routes';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
       <Routes>
          {
            publicRoutes.map((route, index) => {
              const PublicPage = route.component
              return <Route key={index} path={route.path} element={<PublicPage />} />
            })
          }

          {
            privateRoutes.map((route, index) => {
              const PrivatePage = route.component
              return <Route key={index} path={route.path} element={<PrivateRoute><PrivatePage /></PrivateRoute>} />
            })
          }
       </Routes>
      </div>
    </Router>
  );
}

export default App;