import { RefreshIcon, SettingsIcon } from "../../assets/icons";

type Props = {
  handleRefresh: () => void;
};

export const Navbar = ({ handleRefresh }: Props) => {
  return (
    <nav className="nav">
      <h1>Real Time</h1>
      <button className="icon-button" onClick={handleRefresh}>
        <RefreshIcon />
      </button>
      <button className="icon-button">
        <SettingsIcon />
      </button>
    </nav>
  );
};
