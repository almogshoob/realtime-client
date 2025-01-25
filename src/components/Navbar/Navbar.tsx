import { RefreshIcon } from "../../assets/icons";

type Props = {
  handleRefresh: () => void;
  isLoading: boolean;
};

export const Navbar = ({ handleRefresh, isLoading }: Props) => {
  return (
    <nav className="nav">
      <h1>Real Time</h1>
      <button
        className="icon-button"
        disabled={isLoading}
        onClick={handleRefresh}
      >
        <RefreshIcon />
      </button>
    </nav>
  );
};
