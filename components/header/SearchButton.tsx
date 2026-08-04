import { FiSearch } from "react-icons/fi";

type SearchButtonProps = {
  onClick: () => void;
};

export function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Atidaryti paiešką"
      title="Paieška"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#154280";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#CBD5E1";
      }}
      style={{
        width: "40px",
        height: "40px",
        minWidth: "40px",
        minHeight: "40px",
        padding: 0,
        borderRadius: "10px",
        border: "1px solid #CBD5E1",
        background: "#FFFFFF",
        color: "#154280",
        boxShadow: "0 1px 2px rgba(15,23,42,0.05)",
        boxSizing: "border-box",
        appearance: "none",
        cursor: "pointer",
        transition:
          "border-color .2s ease, background-color .2s ease, box-shadow .2s ease, color .2s ease",
      }}
      className="
        inline-flex shrink-0 items-center justify-center
        hover:bg-blue-50
        hover:shadow-[0_4px_12px_rgba(21,66,128,0.10)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#154280]
        focus-visible:ring-offset-2
      "
    >
      <FiSearch
        aria-hidden="true"
        style={{
          width: "20px",
          height: "20px",
          flexShrink: 0,
        }}
      />
    </button>
  );
}