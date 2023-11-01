"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function QuestionForm({ user }: { user: string }) {
  const [data, setData] = useState();
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData);

    const data = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(formDataObject),
    })
      .then((res: any) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res);
      })
      .catch((error) => {
        console.log(error);
      });

    setData(data);
    form.reset();
    router.refresh();
  }

  return (
    <div>
      <h1>QuestionForm - {user}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" className="text-red-800" name="description" required />
        <button>Submit</button>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default QuestionForm;
