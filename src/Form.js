import {useState} from "react";
import Axios from "axios";
import {Typography,Button, TextField}from '@material-ui/core';

const Form = () =>{
    const [report, setReport] = useState("");
    const [location, setLoc] = useState("");

    const handleReportChange = e => {
        setReport(e.target.value)
    }
    const handleLocChange = e => {
        setLoc(e.target.value)
    }
    const handleClick = e =>{
        e.preventDefault();
        Axios.post("http://localhost:9000/report",
        {
            laporan: report,
            lokasi: location,
        },
        {withCredentials:true},
        {headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        }})
        .then(res=>res.data)
        .then(newReport=>{console.log(newReport);alert("Laporan terkirim dengan id: "+newReport._id);});
        
    }

    return(
        <div>
            <Typography component="p" variant="subtitle1">
            Buat Laporan Baru
            </Typography>
            <form noValidate>
                <TextField 
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="laporan"
                    label="Laporan"
                    name="laporan"
                    autoFocus
                    value={report}
                    onChange = {handleReportChange}
                    color = "secondary"
                    multiline
                />
                <TextField 
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="lokasi"
                    label="Lokasi"
                    name="lokasi"
                    autoFocus
                    value={location}
                    onChange = {handleLocChange}
                    color = "secondary"
                />
                <Button variant="contained" color="secondary" onClick={handleClick}>Submit</Button>
            </form>
        </div>
    );
}

export default Form;