// text-fragments-polyfill に型情報がないので、一時的に eslint を無効化
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { generateFragment } from "text-fragments-polyfill/dist/fragment-generation-utils";

interface useTextFragments {
  build: (selection: Selection) => string;
}
export const useTextFragments = () => {
  const build = (selection: Selection) => {
    const result = generateFragment(selection);
    if (result.status !== 0) {
      return null;
    }

    let url = `${location.origin}${location.pathname}${location.search}`;

    const fragment = result.fragment;
    const prefix = fragment.prefix
      ? `${encodeURIComponent(fragment.prefix)}-,`
      : "";
    const suffix = fragment.suffix
      ? `,-${encodeURIComponent(fragment.suffix)}`
      : "";
    const start = encodeURIComponent(fragment.textStart);
    const end = fragment.textEnd
      ? `,${encodeURIComponent(fragment.textEnd)}`
      : "";

    url += `#:~:text=${prefix}${start}${end}${suffix}`;

    return url;
  };

  return { build };
};
