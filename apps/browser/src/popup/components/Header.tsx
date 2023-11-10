import { APP_HOST } from "~/lib/config";

const Header = () => {
  return (
    <div className="whl-flex whl-w-full whl-flex-row whl-bg-primary-950 whl-px-4 whl-py-2 whl-text-primary-foreground">
      <a
        href={`${APP_HOST}/dashboard`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h1 className="whl-font-mono whl-text-4xl whl-font-bold">
          Highlighter
        </h1>
      </a>
    </div>
  );
};

export default Header;
