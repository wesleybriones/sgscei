import { useState } from "react";

import SideBar from "../../components/SideMenu/SideBar";
import Content from "../../components/Header/Content";

import '../../Utils/CustomStyles';

export const Home = () => {
    const [sidebarIsOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

    return (
            <>
            <div className="App wrapper">
                <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
                <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
            </div>
            
            </>
           
      
    );
};
