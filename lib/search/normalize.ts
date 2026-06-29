export function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/š/g, "s")
    .replace(/č/g, "c")
    .replace(/ž/g, "z")
    .replace(/ė/g, "e")
    .replace(/ę/g, "e")
    .replace(/į/g, "i")
    .replace(/ų/g, "u")
    .replace(/ū/g, "u")
    .replace(/ą/g, "a")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}