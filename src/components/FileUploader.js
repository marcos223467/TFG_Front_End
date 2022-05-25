import axios from 'axios';
import {useState} from 'react';
import Global from '../Global';

export const FileUploader = ({}) => 
{
    const url = Global.url;
    const [file, setFile] = useState(null);
    const onInputChange =(e) => 
    {
        setFile(e.target.files[0]);
    };

    const onSubmit =(e) =>
    {
        e.preventDefault();

        const data = new FormData();
        data.append('file', file);

        axios.post(url + '/upload', data).then((e) => {
            console.log("Success");
        }).catch((e) => {
            console.error('Error', e);
        });
    };

    return(
        <div>
            <form method="post" action="#" id="#">                
                <input className="form-control form-control-sm" type="file" onChange={onInputChange}/>
                <button className="btn">Justificar</button>
            </form>
        </div>
    )
}