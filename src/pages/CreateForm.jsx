import React from 'react'

function CreateForm() {
  return (
    <div className='createPostPage'>
      <form className="cpContainer">
        <h1 className="text-[white] text-[5vh]">Create New Post</h1>
        <div className="inputGp">
          <label htmlFor="" className="text-[white]">Title:</label>
          <input
            required
            type="text"
            placeholder='Title...'
          />
        </div>
        <div className="inputGp">
          <label htmlFor="" className="text-[white]">Post:</label>
          <textarea
            name=""
            required
            placeholder='Post...'
            onChange={(e) => setPostText(e.target.value)}
            id=""
            cols="30"
            rows="10"
          />
        </div>
            <button type="submit">
        
        </button>
      
      </form>
 
    </div>
  );
};

export default CreateForm;