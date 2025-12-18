import { AdminThemeProvider } from '@/components/admin/admin-theme-provider'
import { AdminThemeSwitch } from '@/components/admin/admin-theme-switch'
import { AdminPageWrapper } from '@/components/admin/admin-page-wrapper'
import { AdminToastProvider } from '@/components/admin/admin-toast-provider'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <AdminToastProvider>
        <AdminThemeSwitch />
        <AdminPageWrapper>{children}</AdminPageWrapper>
      </AdminToastProvider>
    </AdminThemeProvider>
  )
}
