import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ImgAdd(){
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const loginid = sessionStorage.getItem('loginid');
    const [dto, setDto] = useState({writer:loginid, title:'', content:'', f:''});
    const {writer, title, content, f} = dto;
    
    const onChange = (e) => {
        const {name, value} = e.target;
        setDto({
            ...dto,
            [name]:value
        })
    }
    const save = () => {
        let fdata = new FormData();
        let file =  document.getElementById('f');
        fdata.append('writer', writer);
        fdata.append('title', title);
        fdata.append('content', content);
        fdata.append('f', file.files[0]);
        axios.post('http://localhost:8081/auth/diary', fdata, 
                    {headers:{Authorization:token, "Content-Type":"multipart/form-data"}})
            .then(function(res){
                if(res.status===200){
                    alert(res.data.dto.num+"번 글이 추가됨")
                    navigate('/imgboardhome')
                }else{
                    alert(res.status)
                }
            })
    }
    return(
        <div>
            <h3>글작성</h3>
            writer:<input type="text" name="writer" value={writer} readOnly/><br/>
            title:<input type="text" name="title" value={title} onChange={onChange} /><br/>
            content:<input type="text" name="content" value={content} onChange={onChange} /><br/>
            file:<input type="file" name="f" id="f" value={f} onChange={onChange} /><br/>
            <button onClick={save}>작성</button>
        </div>
    )
}