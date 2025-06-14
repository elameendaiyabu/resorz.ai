import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <AdminPanelLayout>{children}</AdminPanelLayout>
    </main>
  );
}
