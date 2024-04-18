import { HouseProvider } from './components/HouseProvider';
import { CreateHouse } from './components/CreateHouse';
import { HouseList } from './components/HouseList';
import styles from './styles/App.module.css';

const cincy = require('./cincinnati-skyline.jpg')

function App() {
  return (
    <div className="App">
      <div className={styles.logo}>
        <h1>
          <span>Fake 513</span> REALTY
        </h1>
      </div>
      <div className={styles.cincy}>
        <img src={cincy} />
        <h2>Visualize and Plan Your Dream Home in Cincinnati, Ohio!</h2>
      </div>
      <HouseProvider>
        <CreateHouse />
        <HouseList />
      </HouseProvider>
    </div>
  );
}

export default App;