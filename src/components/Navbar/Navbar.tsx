import { useEffect, useState } from "react";
import { RefreshIcon } from "../../assets/icons";
import "./Navbar.css";

type Props = {
  refresh: () => Promise<void>;
};

export const Navbar = ({ refresh }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async () => {
    setIsLoading(true);
    try {
      await refresh();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("שגיאה");
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <nav className="nav">
      <h1>Real Time</h1>
      <button
        className="icon-button"
        disabled={isLoading}
        onClick={handleFetch}
      >
        <RefreshIcon />
      </button>
    </nav>
  );
};
