import {useState} from "react";
import Axios from "axios";
import {Button, Typography} from '@material-ui/core';

const ReportList = () =>{
    const [report, setReport] = useState("");
    const [view, setView] = useState(false);

    const handleClick = e =>{
        e.preventDefault();
        Axios.get(`http://localhost:9000/report/`,
        {withCredentials:true},
        {headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        }})
        .then(res=>res.data)
        .then(report=>{setReport(report);setView(!view);});
    }
    return(
        <div>
            <Typography component="p" variant="subtitle1">Semua Laporan</Typography>
            <Button variant="contained" color="secondary" onClick={handleClick}>Lihat</Button>
            {view?(report.map((rpt,index)=>{return(
                <div>
                <form>
                    <p>{index+1}<br/>
                    id: {rpt._id}<br/>
                    Laporan: {rpt.laporan}<br/>
                    Lokasi: {rpt.lokasi}<br/>
                    Status: {rpt.status}<br/>
                    Nama pelapor: {rpt.nama}<br/>
                    Email pelapor: {rpt.email}<br/>
                    Tanggal lapor: {rpt.tanggal}</p>
                </form>
                </div>
            )})):(<p></p>)}
        </div>
    )
}

export default ReportList;