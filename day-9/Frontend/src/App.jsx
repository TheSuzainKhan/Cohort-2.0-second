import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [notes, setNotes] = useState([])

  // console.log("hello integration") // ye baar baar re-render hoga.

  function fetchNotes() {
    axios.get('http://localhost:3000/api/notes')
      .then((res) => {
        setNotes(res.data.note) //setNotes agar useEffect ke andar na ho useState ka varible change hone app component baar baar re render hoga.
      })
  }
  useEffect(() => {  //use effect se baar baar app component re-render nhi hoga ek hi baar hoga.
    fetchNotes()
  }, [])

  function submitHandler(e) {
    e.preventDefault()

    const { title, description } = e.target.elements

    // console.log(title.value, description.value)

    axios.post("http://localhost:3000/api/notes", {
      title: title.value,
      description: description.value
    })
      .then((res) => {
        console.log(res.data)

        fetchNotes() //isse foran rerender hoga.
      })
  }

  function handleDeleteNote(noteId) {
    axios.delete("http://localhost:3000/api/notes/" + noteId)
      .then(res => {
        console.log(res.data)

        fetchNotes()
      })
  }

  function handleUpdateNote(noteId, newDescription) {

    axios.patch("http://localhost:3000/api/notes/" + noteId, {
      description: newDescription
    })
      .then(res => {
        console.log(res.data)

        fetchNotes()  // after update, re-fetch notes to re-render
      })
  }




  return (
    <div>

      <form className='note-create-form' onSubmit={submitHandler}>
        <input name='title' type="text" placeholder='Enter Title' />
        <input name='description' type="text" placeholder='Enter Description' />
        <button>Create note</button>
      </form>

      <div className="notes">
        {
          notes.map((note) => {
            return <div className="note" key={note._id}>
              <h1>{note.title}</h1>
              <p>{note.description}</p>

              <input
                type="text"
                placeholder="New description"
                id={"update-" + note._id}
              />

              <button onClick={() => {
                const input = document.getElementById("update-" + note._id)
                handleUpdateNote(note._id, input.value)
              }}>
                Update
              </button>

              <button onClick={() => { handleDeleteNote(note._id) }}>
                Delete
              </button>
            </div>
          })
        }

      </div>
    </div>
  )
}

export default App
