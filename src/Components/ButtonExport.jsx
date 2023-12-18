import react ,{useState} from 'react';
import {Button,Spinner} from 'react-bootstrap';
import * as XLSX from "xlsx";


export const ButtonExport = (props) =>{

    const datapolicies = props.filteredData;

    console.log(props.filteredData);
    const [loading, setLoading] = useState(false);
  
      const handleDownload = () =>{
        setLoading(true);
        const Libro = XLSX.utils.book_new();
        const Hoja  = XLSX.utils.json_to_sheet(datapolicies);
    
  
        XLSX.utils.book_append_sheet(Libro,Hoja,"Pólizas");
  
        setTimeout(()=>{
          XLSX.writeFile(Libro,"PolicyList.xlsx");
          setLoading(false);
        }, 1000);
      };

   
    return(
        <>

        {!loading ? (
            <Button color='success' onClick={handleDownload}> Export</Button>
        ):(
            <Button color='success' disabled>
                <Spinner></Spinner>
                <span>Generando...</span>
            </Button>
        )}
        </>
    );
  };
  