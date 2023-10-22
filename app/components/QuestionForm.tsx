"use client";
import { FormEvent, useState } from "react";
function QuestionForm({ banana }: { banana: string }) {
  const [data, setData] = useState();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData);

    const data = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(formDataObject),
    }).then((res) => res.json());

    setData(data);
    form.reset();
  }

  return (
    <div>
      <h1>QuestionForm {banana}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" className="text-red-800" name="name" required />
        <button>Submit</button>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default QuestionForm;
