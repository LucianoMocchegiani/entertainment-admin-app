import SearchMovie from '@/components/movies/add/SearchMovie'
import Premieres from '@/components/movies/add/Premieres'

export default function MoviesPage() {

  return (
    <> 
    <main className="flex min-h-screen flex-col items-center justify-between bg-white relative overflow-y-scroll">
      <div className="h-16 w-full"></div>
      <div className="h-12 w-full"></div>
      <div className="absolute top-12">
        <SearchMovie/>
      </div>
      <Premieres/>
    </main>
    </>
  )
}
