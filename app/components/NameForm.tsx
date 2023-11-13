"use client";
import { useRouter } from "next/navigation";
import { FormEvent, use, useState } from "react";

function NameForm() {
  const [data, setData] = useState<{ description: string } | undefined>();
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData);

    const data: { description: string } = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(formDataObject),
    })
      .then((res: Response) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .catch((e: Error) => {
        console.log(e.message);
      });

    setData(data);
    form.reset();
    router.refresh();
  }

  return (
    <div>
      <h1>NameForm</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" className="text-red-800" name="name" required />
        <button>Submit</button>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default NameForm;
