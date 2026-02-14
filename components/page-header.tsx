import { Snowflake } from './snowflake'

export function PageHeader({ title }: { title: string }) {
  return (
    <div className="relative mb-6">
      <img src="/snowflake.svg" alt="" className="absolute -top-2 left-8 w-10 h-10" />
      <img src="/snowflake.svg" alt="" className="absolute bottom-2 right-8 w-10 h-10" />
      <img src="/snowflake.svg" alt="" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10" />

      <h1 className="text-3xl font-bold text-center text-balance">{title}</h1>
    </div>
  )
}
