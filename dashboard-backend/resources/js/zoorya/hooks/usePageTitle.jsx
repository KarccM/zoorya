import { useMatches } from "react-router-dom";

export default function usePageTitle() {
  let matches = useMatches();
  let crumbs = matches
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match.data));
  let title = crumbs[crumbs.length - 1]?.props?.children
  return { title };
}