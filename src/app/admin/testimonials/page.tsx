import { ManagerForm } from "@/components/admin/ManagerForm";
import { Card } from "@/components/ui/primitives";
import { getTestimonials } from "@/lib/data/queries";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return (
    <div>
      <h1 className="font-serif text-4xl">Testimonials</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          {testimonials.map((item) => (
            <Card key={item.id} className="p-4">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-muted">{item.role}</p>
              <p className="mt-2 text-sm">“{item.quote}”</p>
            </Card>
          ))}
        </div>
        <ManagerForm
          endpoint="/api/testimonials"
          submitLabel="Add testimonial"
          fields={[
            { name: "name", label: "Name" },
            { name: "role", label: "Role" },
            { name: "quote", label: "Quote", textarea: true },
          ]}
        />
      </div>
    </div>
  );
}
