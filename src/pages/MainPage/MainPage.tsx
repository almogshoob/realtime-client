import { Navbar, SearchBar, StopList } from "../../components";

export const MainPage = () => {
  return (
    <>
      <Navbar />
      <main className="content">
        <SearchBar />
        <StopList />
      </main>
    </>
  );
};
