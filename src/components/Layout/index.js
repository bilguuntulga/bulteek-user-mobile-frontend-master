import React from "react";
import Header from "components/header";
import { BackTop } from "antd";
import withHeaderScroll from "common/withHeaderScroll";

const ScrolledHeader = withHeaderScroll(Header);
function Layout({ children, headerClass, pb }) {
  return (
    <>
      <ScrolledHeader headerClass={headerClass} />
      <div className="view-min-height">{children}</div>
      {/* {pb && <div className="p-60"></div>} */}
      <div className="pb-48"></div>
      <BackTop />
    </>
  );
}

export default React.memo(Layout);
