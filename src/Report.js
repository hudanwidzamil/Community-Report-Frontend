import {useState} from "react";
import Axios from "axios";
import {Button, Typography, TextField} from '@material-ui/core';

const Report = () =>{
    const [report, setReport] = useState(undefined);
    const [id, setId] = useState("");
    const [status, setStatus] = useState("");

    const handleChange = e => {
        setId(e.target.value)
    }
    const handleClick = e =>{
        e.preventDefault();
        Axios.get(`http://localhost:9000/report/${id}`,
        {withCredentials:true},
        {headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        }})
        .then(res=>res.data)
        .then(report=>{console.log(report); setReport(report);});
    }

    const handleStatusChange = e => {
        setStatus(e.target.value)
    }
    const handleEditClick = e =>{
        e.preventDefault();
        Axios.patch(`http://localhost:9000/report/${id}`,{status: status})
        .then(res=>res.data)
        .then(message=>console.log(message));
        alert("Berhasil diubah");
    }

    const handleDelClick = e =>{
        e.preventDefault();
        Axios.delete(`http://localhost:9000/report/${id}`)
        .then(res=>res.data)
        .then(message=>console.log(message));
        alert("Berhasil dihapus");
    }
    

    return(
        <div>
            <Typography component="p" variant="subtitle1">Cari berdasarkan id</Typography>
            <form>
                <TextField 
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="id"
                    label="id"
                    name="id"
                    autoFocus
                    value={id}
                    onChange = {handleChange}
                    color = "secondary"
                />
                <Button variant="contained" color="secondary" onClick={handleClick}>Search</Button>
            </form>
            <br/>
            {
                (report)?
                (
                    <div>
                    <form>
                        <Typography component="p" variant="subtitle1">Hasil Pencarian</Typography>
                        <p>id: {report._id}<br/>
                        Laporan: {report.laporan}<br/>
                        Lokasi: {report.lokasi}<br/>
                        Status: {report.status}<br/>
                        Nama pelapor: {report.nama}<br/>
                        Email pelapor: {report.email}<br/>
                        Tanggal lapor: {report.tanggal}</p>
                    </form>
                    <form>
                        <Typography component="p" variant="subtitle1">Edit Laporan</Typography>
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="status"
                            label="Status Baru"
                            name="status"
                            autoFocus
                            value={status}
                            onChange = {handleStatusChange}
                            color = "secondary"
                        />
                        <Button variant="contained" color="secondary" onClick={handleEditClick}>Ganti Status</Button>
                        <Button variant="contained" color="secondary" onClick={handleDelClick}>Hapus Laporan</Button>
                    </form>
                    </div>
                ):
                (<Typography component="p" variant="subtitle1">Tidak ditemukan</Typography>)
            }
            
            
        </div>
    )
}

export default Report;