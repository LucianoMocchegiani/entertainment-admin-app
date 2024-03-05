import SearchSeries from '@/components/series/add/SearchSeries'
import Premieres from '@/components/series/add/Premieres'

export default function SeriesPage() {

  return (
    <> 
    <main className="flex min-h-screen flex-col items-center justify-between bg-white relative overflow-y-scroll">
      <div className="h-16 w-full"></div>
      <div className="h-12 w-full"></div>
      <div className="absolute top-12">
        <SearchSeries/>
      </div>
      <Premieres/>
    </main>
    </>
  )
}
