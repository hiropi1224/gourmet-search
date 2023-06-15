import { Footer } from '@/app/_components/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
      <Footer />
    </main>
  );
}
