
import AccountForm from "@/src/components/account/account-form"
import { MainLayout } from "@/src/components/layout/main-layout"

export default function AccountPage() {
  return (
    <MainLayout>
      <div className="  ">
        <AccountForm />
      </div>
    </MainLayout>
  )
}
