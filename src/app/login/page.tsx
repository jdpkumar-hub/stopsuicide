import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Section } from "@/components/ui/primitives";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Admin login",
  description: "Secure login for stopsuicide.in editors.",
  path: "/login",
});

export default function LoginPage() {
  return (
    <Section className="pt-16">
      <Suspense>
        <LoginForm />
      </Suspense>
    </Section>
  );
}
