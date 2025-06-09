import AdminSidebar from "@/components/admin/sidebar"
import ContactsManager from "@/components/admin/contacts-manager"

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800">Mensagens de Contato</h1>
        <p className="text-gray-600 mb-8">Visualize e gerencie as mensagens recebidas pelo formulário de contato.</p>
        <ContactsManager />
      </main>
    </div>
  )
}
