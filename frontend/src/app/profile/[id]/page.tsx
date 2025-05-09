import { redirect } from 'next/navigation';

export default function ProfileBasePage({ params }: { params: { id: string } }) {
  // Redirect to the "personal-info" section by default.
  redirect(`/profile/${params.id}/personal-info`);
}
