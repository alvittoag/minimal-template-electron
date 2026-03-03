import React, { useState, useCallback } from 'react';
import { usePokemonList } from '../../hooks/api/usePokemonList';
import { usePokemon } from '../../hooks/api/usePokemon';
import PokemonCard from '../../components/pokemon/PokemonCard';
import PokemonCardSkeleton from '../../components/common/PokemonCardSkeleton';
import PokemonDetail from '../../components/pokemon/PokemonDetail';

const PAGE_SIZE = 24;

function getIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, '').split('/');
  const id = parts[parts.length - 1];
  return Number.parseInt(id, 10) || 0;
}

export default function HomePage() {
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const offset = page * PAGE_SIZE;
  const { data, isLoading, isError, error } = usePokemonList({ offset, limit: PAGE_SIZE });
  const {
    data: pokemon,
    isLoading: isLoadingDetail,
    isError: isDetailError,
    error: detailError,
    refetch: refetchDetail,
  } = usePokemon(selectedId ?? undefined);

  const handleCardClick = useCallback((item: { url: string }) => {
    setSelectedId(getIdFromUrl(item.url));
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedId(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <header className="border-b border-amber-200/60 bg-white/80 py-6 shadow-sm backdrop-blur dark:border-amber-800/60 dark:bg-slate-900/80">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-center text-3xl font-bold tracking-tight text-amber-800 dark:text-amber-200 sm:text-4xl">
            Pokédex
          </h1>
          <p className="mt-1 text-center text-sm text-amber-600 dark:text-amber-400">
            Klik kartu untuk melihat detail Pokémon
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {isError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-900/30 dark:text-red-200">
            <p className="font-medium">Gagal memuat data.</p>
            <p className="mt-1 text-sm">{error?.message ?? 'Unknown error'}</p>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <PokemonCardSkeleton key={i} />
            ))}
          </div>
        ) : data?.results ? (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {data.results.map((item) => (
                <PokemonCard
                  key={item.name}
                  item={item}
                  onClick={() => handleCardClick(item)}
                />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="rounded-xl border-2 border-amber-300 bg-amber-50 px-4 py-2 font-semibold text-amber-800 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-amber-600 dark:bg-slate-800 dark:text-amber-200 dark:hover:bg-slate-700"
              >
                Sebelumnya
              </button>
              <span className="rounded-xl bg-amber-100 px-4 py-2 font-medium text-amber-800 dark:bg-slate-700 dark:text-amber-200">
                Halaman {page + 1}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                disabled={!data.next}
                className="rounded-xl border-2 border-amber-300 bg-amber-50 px-4 py-2 font-semibold text-amber-800 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-amber-600 dark:bg-slate-800 dark:text-amber-200 dark:hover:bg-slate-700"
              >
                Selanjutnya
              </button>
            </div>
          </>
        ) : null}
      </main>

      {selectedId != null && (
        <>
          {isLoadingDetail ? (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              role="status"
              aria-label="Memuat detail"
            >
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600 dark:border-amber-800 dark:border-t-amber-400" />
            </div>
          ) : isDetailError ? (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
              role="alert"
            >
              <div className="max-w-sm rounded-2xl border border-red-200 bg-white p-6 shadow-xl dark:border-red-800 dark:bg-slate-800">
                <p className="font-medium text-red-800 dark:text-red-200">
                  Gagal memuat detail Pokémon
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {detailError?.message ?? 'Terjadi kesalahan jaringan.'}
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => refetchDetail()}
                    className="rounded-xl bg-amber-500 px-4 py-2 font-medium text-white hover:bg-amber-600"
                  >
                    Coba lagi
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseDetail}
                    className="rounded-xl border border-slate-300 px-4 py-2 font-medium dark:border-slate-600 dark:text-slate-200"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          ) : pokemon ? (
            <PokemonDetail pokemon={pokemon} onClose={handleCloseDetail} />
          ) : null}
        </>
      )}
    </div>
  );
}
