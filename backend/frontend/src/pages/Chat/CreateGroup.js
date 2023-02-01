import React,{useContext,useEffect,useState} from 'react'
import {chat4} from '../../assets/whatsapp'
import axios from 'axios'
import {AuthContext} from '../../AuthContext';
import jwt_decode from 'jwt-decode'

function CreateGroup() {
    let{authTokens}=useContext(AuthContext)
    const user =JSON.parse(jwt_decode(authTokens.access).user_id)
    const [members, setMembers] = useState([]);
    const [groupName, setGroupName] = useState();
    const [groupDescription, setGroupDescription] = useState();
    const [selectedOptions, setSelectedOptions] = useState([user]);
    const[photo,setPhoto]=useState()

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/view_chat/${(jwt_decode(authTokens.access).user_id)}`).then((response) => {
          setMembers(response.data)
        })
      },[])
      const handleChange = (event) => {
        // Get the value of the checkbox that was just changed
        const selectedValue =JSON.parse(event.target.value);
        // let obj = book.find(o => o.time === {row}.row);
        // If the checkbox was checked, add the value to the selected options array
        if (event.target.checked) {
          setSelectedOptions([...selectedOptions, selectedValue]);
        } else {
          // If the checkbox was unchecked, remove the value from the selected options array
          setSelectedOptions(selectedOptions.filter(option => option !== (selectedValue)));
          
        }
      }
      const handleSubmit =()=>{
        const formData =new FormData()
        formData.append("photo",photo)
        axios.post('http://127.0.0.1:8000/create_group/',{
            name:groupName,
            members:selectedOptions,
            creator:(jwt_decode(authTokens.access).user_id),
            about:groupDescription,
            // photo:formData
        }).then((response) => {
          console.log(response.data)
        }).catch(err=>{
            console.log(err)
        })
        console.log(selectedOptions);
      }
      const handleAdd=()=>{
        console.log("hiii");
        setSelectedOptions([...selectedOptions,user ]);
        handleSubmit();
      }
      
  return (
    <div><label>group name</label>
        <input type="text" input value={groupName} onChange={(event) => setGroupName(event.target.value)} placeholder="group_name"></input>
        <label>groupDescription</label>
        <input type="text" input value={groupDescription} onChange={(event) => setGroupDescription(event.target.value)} placeholder="group_description"></input>
        <br/>
        {/* <input type="file" onChange={(e)=>{setPhoto(e.target.files[0])}}/> */}
    {members.map(option => (
      <label key={option.id}>
        <input
          type="checkbox"
          value={(option).id}
          onChange={handleChange}
        />
        {option.username}
        {console.log(selectedOptions)}
      </label>
    ))}
    <button  className='btn btn-dark' onClick={handleSubmit}>submit</button>
  </div>
  )
}

export default CreateGroup