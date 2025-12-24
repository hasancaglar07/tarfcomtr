import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-20">
        <div className="container text-center space-y-4">
          <Skeleton className="h-10 w-2/3 mx-auto" />
          <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
          <Skeleton className="h-6 w-5/6 max-w-2xl mx-auto" />
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-6 space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-full rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
