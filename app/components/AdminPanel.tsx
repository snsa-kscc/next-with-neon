"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { useState } from "react";

function AdminPanel({ result }: any) {
  // const [data, setData] = useState();
  const router = useRouter();

  async function handleSwitch(id: any, active: boolean) {
    const res = await fetch(`/api/posts?query=${id}`, {
      method: "PATCH",
      body: JSON.stringify({ active: !active }),
    });
    const data = await res.json();
    // setData(data);
    router.refresh();
  }

  async function handleDelete(id: any) {
    const res = await fetch(`/api/posts?query=${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    // setData(data);
    router.refresh();
  }

  return (
    <div>
      <h1>AdminPanel</h1>
      {result.map((item: any) => (
        <div className="flex p-2 justify-around" key={item.recipe.createdAt.toString()}>
          <p>{item.recipe.description}</p>
          <p>{item.user.name}</p>
          {item.recipe.active === true ? <p>Active</p> : <p>Inactive</p>}
          <Switch checked={item.recipe.active} onCheckedChange={() => handleSwitch(item.recipe.id, item.recipe.active)} />
          <Button onClick={() => handleDelete(item.recipe.id)} variant="destructive">
            Delete
          </Button>
        </div>
      ))}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}

export default AdminPanel;
