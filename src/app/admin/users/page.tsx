import { Card } from "@/components/ui/primitives";
import { adminUsers } from "@/lib/data/seed";
import { formatDate } from "@/lib/utils";

export default function UsersPage() {
  return (
    <div>
      <h1 className="font-serif text-4xl">User management</h1>
      <p className="mt-2 text-sm text-muted">
        Roles are stored in the `profiles` table. Connect Supabase to manage live users.
      </p>
      <div className="mt-6 space-y-3">
        {adminUsers.map((user) => (
          <Card key={user.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold">{user.fullName}</p>
              <p className="text-sm text-muted">{user.email}</p>
            </div>
            <div className="text-right text-sm">
              <p className="capitalize">{user.role}</p>
              <p className="text-muted">{formatDate(user.createdAt)}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
