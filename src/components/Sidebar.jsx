import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";

function Sidebar() {
  return (
    <>
      <div className="d-none d-md-block">
        <DesktopSidebar />
      </div>
      <div className="d-block d-md-none">
        <MobileSidebar />
      </div>
    </>
  );
}

export default Sidebar;
