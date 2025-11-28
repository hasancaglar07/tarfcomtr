import { AdminThemeProvider } from '@/components/admin/admin-theme-provider'
import { AdminThemeSwitch } from '@/components/admin/admin-theme-switch'
import { AdminPageWrapper } from '@/components/admin/admin-page-wrapper'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <AdminThemeSwitch />
      <AdminPageWrapper>{children}</AdminPageWrapper>
    </AdminThemeProvider>
  )
}
