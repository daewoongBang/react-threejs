import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/basic'>Basic</Link>
          </li>

          <li>
            <Link to='/controls/orbitControls'>OrbitControls</Link>
          </li>

          <li>
            <Link to='/controls/transformControls'>TransformControls</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
