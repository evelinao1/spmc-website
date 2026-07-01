type SearchButtonProps = {
  onClick: () => void;
};

export function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Atidaryti paiešką"
      className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100 hover:text-blue-700"
    >
      🔍
    </button>
  );
}