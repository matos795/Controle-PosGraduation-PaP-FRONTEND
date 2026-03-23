import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import './styles.css'

export default function AppLayout() {
  return (
    <>
      <div className="cp-layout">

        <SideBar />

        <div className="cp-right">

          <Header />

          <main className="cp-content">
            <Outlet />
          </main>

        </div>

      </div>
    </>
  );
}