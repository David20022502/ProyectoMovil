import { useContext } from 'react';
import HomeContext from '../context/HomeContext';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({name}) => {
  const {userApp}:any=useContext(HomeContext);
//  console.log("datas de",datas)
  return (
    <div className="container">
      <strong>Bienvendo{userApp.names}</strong>
      <p>tu rol es {userApp.role} </p>
      <p>dato pasado {name}</p>
      <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default ExploreContainer;
