import { redirect } from 'next/navigation';

export default async function ProfileBasePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Redirect to the "personal-info" section by default.
  redirect(`/profile/${id}/personal-info`);
}
