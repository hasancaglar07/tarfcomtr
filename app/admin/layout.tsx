import { AdminThemeProvider } from '@/components/admin/admin-theme-provider'
import { AdminThemeSwitch } from '@/components/admin/admin-theme-switch'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminThemeProvider>
      <AdminThemeSwitch />
      {children}
    </AdminThemeProvider>
  )
}
