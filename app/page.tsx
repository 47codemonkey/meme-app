import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/mems/table');

  return null;
}
