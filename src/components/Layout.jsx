import Footer from "./Footer";
import Sidebar from "./Sidebar";

import * as React from "react";

function Layout({ children }) {
  return (
    <div>
      <Sidebar />
      <div>
        <main className="pt-0 lg:pl-72 h-full flex items-center justify-center">
          <div className="p-0">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
