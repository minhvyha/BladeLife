import { Snowflake } from './snowflake'

export function PageHeader({ title }: { title: string }) {
  return (
    <div className="relative mb-6">
      <Snowflake className="absolute -top-2 right-8 w-10 h-10" />
      <Snowflake className="absolute top-8 left-4 w-8 h-8" />
      <h1 className="text-3xl font-bold text-center text-balance">{title}</h1>
    </div>
  )
}
