import { notFound } from "next/navigation";
import { provincePages } from "@/config/service-areas";
import { ProvinceLanding } from "@/components/ProvinceLanding";

// Top-level province URLs (/ontario/, /alberta/, …). Only the known
// slugs are built; anything else is a 404.
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ province: string }>;
}

export function generateStaticParams() {
  return provincePages.map((p) => ({ province: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { province } = await params;
  const page = provincePages.find((p) => p.slug === province);
  if (!page) return {};
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: `/${page.slug}/` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/${page.slug}/`,
    },
  };
}

export default async function ProvincePage({ params }: PageProps) {
  const { province } = await params;
  const page = provincePages.find((p) => p.slug === province);
  if (!page) notFound();
  return <ProvinceLanding page={page} />;
}
