import { ReactElement } from "react";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface FormData {
  image: FileList;
  title: string;
  description: string;
}

function CreatePost(): ReactElement {
    const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    toast.success('Post Created Successfully', {containerId: "toast-container-message"});
    navigate("/home-page")
    // Handle form submission logic (e.g., save data, API call, etc.)
  };

  const cancelCreation = ()=>{
    toast.info('Post Creation Cancelled', {containerId: "toast-container-message"});
    navigate("/home-page");
  }

  return (
    <div>
        <div className="m-3 fs-3">
            Create News Post
        </div>
      <form className="m-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-3">
          <label htmlFor="image">News Post Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            {...register("image", { required: true })}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="title">News Feed Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            {...register("title", { required: true })}
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="description">News Feed Description</label>
          <textarea
            className="form-control"
            id="description"
            rows={6}
            {...register("description", { required: true })}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-outline-success m-2">
            Create
          </button>
          <button type="button" className="btn btn-outline-danger" onClick={()=>cancelCreation()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
