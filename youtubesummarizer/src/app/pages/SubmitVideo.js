"use client";
import React from "react";
import { useState, useEffect } from "react";

function SubmitVideo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bio || !name || !email) {
      setMessage("Name, file and tags are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("bio", bio);

    try {
      // This route creates new image and tag records in Xata
      const response = await fetch("/api/postdata", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.status === 200) {
        // toast({
        //   title: "Link uploaded.",
        //   description: "Your image was uploaded successfully.",
        //   status: "success",
        //   duration: 5000,
        //   isClosable: true,
        // });
        // router.push(`/images/${image.id}`);
        console.log(response.status, "res.statatt");
        console.log(data);
      } else {
        throw new Error("Couldn't upload image");
      }
    } catch (error) {
      setMessage("An error occurred while uploading the image.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-black text-white p-4 rounded">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="bg-white text-black rounded p-2 mb-2"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="bg-white text-black rounded p-2 mb-2"
        />
        <input
          type="text"
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Bio"
          className="bg-white text-black rounded p-2 mb-2"
        />
        <button
          type="submit"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Submit
        </button>
      </form>
      {message && (
        <div className="bg-black text-white p-2 rounded">{message}</div>
      )}
    </div>
  );
}

export default SubmitVideo;
