import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/db";
import { contents } from "@/db/schema";
import { Locale } from "@/i18n.config";
import { revalidatePath } from "next/cache";

type formProps = {
  title?: string;
  description_1?: string;
};

async function EditPage({ params: { lang } }: { params: { lang: Locale } }) {
  const data = await db.select().from(contents);

  const fetchData = await fetch("https://welcomebook-admin.lin62.host25.com/wp-json/wp/v2/pages/66");
  const { acf } = await fetchData.json();

  async function postData(formInputs: FormData) {
    "use server";

    const formDataObj: formProps = Object.fromEntries(formInputs);

    await db.insert(contents).values({
      title: formDataObj.title!,
      description_1: formDataObj.description_1,
      lang: lang,
    });
    revalidatePath("/");
  }

  return (
    <div>
      <form action={postData} key={Math.random()}>
        <Input className="m-4" name="title" type="text" required placeholder="Title"></Input>
        <Input className="m-4" name="description_1" type="text" placeholder="Description"></Input>
        <Button className="m-4" variant="secondary">
          Submit
        </Button>
      </form>
      {data.map((item) => (
        <div key={item.title}>
          <p>title - {item.title}</p>
          <p>desc - {item.description_1}</p>
          <p>lang - {item.lang}</p>
          <hr />
        </div>
      ))}
      <pre>{JSON.stringify(data[1], null, 2)}</pre>
    </div>
  );
}

export default EditPage;
