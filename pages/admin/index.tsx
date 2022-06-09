import AdminSidebar from "../../components/AdminSidebar"
import Page from "../../components/Page"

export async function getServerSideProps(context: any) {
  return {
    redirect: {
      destination: "/admin/users",
      permanent: false,
    },
  }
}

export default function AdminPage({ children, settings }: any) {
  return (
    <Page title="Admin" settings={settings} adminPage>
      <div className="admin-panel">
        <AdminSidebar businessName={settings?.businessName} />

        <div className="container">
          <div className="admin-content">{children}</div>
        </div>
      </div>
    </Page>
  )
}
