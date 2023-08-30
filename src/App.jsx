import { useFetch } from './useFetch';


function App(){
  const {data} = useFetch("http://localhost:8080/api/clients")
  //No se puede enviar un objeto en estos componentes
  return (
    <>
    <div className='App'>
      <h1>API Clients</h1>
      <div className='card'>
        
          {data?.map ((item) => (
            <tr key={item.id}>
              <td>{item.documentNumber}</td>
              <td>{item.firstName} </td>
              <td>{item.lastName} </td>
              <td>{item.birthDate} </td>
            </tr>
            // <li key={client.id}> {client.firstName}</li>,
            // <li key={client.id}> {client.lastName}</li>,
            // <li key={client.id}> {client.birthDate}</li>
          ))} 
        
      </div>
    </div>
  </> 
  );
}

export default App
