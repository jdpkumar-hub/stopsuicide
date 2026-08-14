import { ManagerForm } from "@/components/admin/ManagerForm";
import { Card } from "@/components/ui/primitives";
import { getCategories } from "@/lib/data/queries";

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <div>
      <h1 className="font-serif text-4xl">Categories</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          {categories.map((category) => (
            <Card key={category.id} className="p-4">
              <p className="font-semibold">{category.name}</p>
              <p className="text-sm text-muted">
                {category.type} · {category.description}
              </p>
            </Card>
          ))}
        </div>
        <ManagerForm
          endpoint="/api/categories"
          submitLabel="Add category"
          fields={[
            { name: "name", label: "Name" },
            { name: "nameHi", label: "Name (Hindi)" },
            { name: "type", label: "Type (video, story, blog, resource)" },
            { name: "description", label: "Description", textarea: true },
          ]}
        />
      </div>
    </div>
  );
}
