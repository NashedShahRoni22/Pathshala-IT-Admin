import { Button, Input, Option, Select } from '@material-tailwind/react'
import React, { useState } from 'react'

export default function AddTools() {
  const [type, setType] = useState("");
  const [icon, setIcon] = useState(null);
  const [name, setName] = useState("");

  const handleAddTools =()=>{
    console.log(icon, type, name);
  }
  return (
    <section className='px-5 py-10 min-h-screen lg:flex'>
      <form action="" className='h-fit lg:w-1/3 shadow p-5 flex flex-col justify-center gap-4'>
        <h5>Add Tools</h5>
        <Select label='Select Type' color='blue' onChange={value => setType(value)}>
          <Option value='for_course'>Profession</Option>
          <Option value='tools'>Software</Option>
        </Select>
        <input type='file' onChange={e => setIcon(e.target.files[0])}></input>
        <Input color='blue' type='text' label='Tools Name' onChange={e => setName(e.target.value)}></Input>
        <Button onClick={handleAddTools} color='blue'>Add</Button>
      </form>
      <div className='min-h-screen  lg:w-2/3 mt-5 md:mt-0 bg-light-blue-50 rounded-xl p-5'>
        <p>Tools List</p>
      </div>
    </section>
  )
}
