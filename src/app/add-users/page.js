import FormUser from "@/components/users/add/FormUser"

export default function AddUserPage() {

  return (
    <> 
    <main className="flex min-h-screen flex-col items-center justify-start bg-white relative overflow-y-scroll">
      <h2>Agregar usuario</h2>
      <FormUser/>
    </main>
    </>
  )
}