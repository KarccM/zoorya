import { useMatches } from "react-router-dom";

interface PageMetadata {
  crumbs: string[],
  title: string | undefined,
}

export default (): PageMetadata => {
  const matches = useMatches();

  // @ts-ignore
  const crumbs = matches.filter((match) => Boolean(match.handle?.crumb)).map((match) => match.handle.crumb(match.data));

  const title = crumbs[crumbs.length - 1]?.props?.children;

  return { crumbs, title };
}