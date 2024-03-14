import Movies from '@/components/movies/Movies'
import SearchMovies from '@/components/movies/SearchMovies'
import Link from 'next/link' 

export default function MoviesPage() {

  return (
    <> 
    <main className="flex min-h-screen flex-col items-center justify-start bg-white relative">
      <Link href='/add-movies' type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar nuevas peliculas</Link>
      <div className="h-16 w-full"></div>
      <div className="absolute top-12">
        <SearchMovies/>
      </div>
      <Movies/>
    </main>
    </>
  )
}
