"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Locale } from "@/i18n.config";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  role: string | null;
}

interface Recipe {
  id: number;
  userId: string;
  description: string;
  createdAt: Date;
  active: boolean | null;
  lang: Locale;
}

interface ResultItem {
  user: User;
  recipe: Recipe;
}

type ResultArray = ResultItem[];

function AdminPanel({ result }: { result: ResultArray }) {
  // const [data, setData] = useState();
  const router = useRouter();

  async function handleSwitch(id: number, active: boolean) {
    const res = await fetch(`/api/posts?query=${id}`, {
      method: "PATCH",
      body: JSON.stringify({ active: !active }),
    });
    const data = await res.json();
    // setData(data);
    router.refresh();
  }

  async function handleDelete(id: number) {
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
      {result.map((item: ResultItem) => (
        <div className="flex p-2 justify-around" key={item.recipe.createdAt.toString()}>
          <p>{item.recipe.description}</p>
          <p>{item.user.name}</p>
          <p>{item.recipe.lang}</p>
          {item.recipe.active === true ? <p>Active</p> : <p>Inactive</p>}
          <Switch checked={item.recipe.active!} onCheckedChange={() => handleSwitch(item.recipe.id, item.recipe.active!)} />
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
