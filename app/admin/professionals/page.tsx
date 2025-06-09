import AdminSidebar from "@/components/admin/sidebar"
import ProfessionalsManager from "@/components/admin/professionals-manager"

export default function AdminProfessionalsPage() {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800">Gerenciar Profissionais</h1>
        <p className="text-gray-600 mb-8">Edite as informações e fotos da sua equipe.</p>
        <ProfessionalsManager />
      </main>
    </div>
  )
}
