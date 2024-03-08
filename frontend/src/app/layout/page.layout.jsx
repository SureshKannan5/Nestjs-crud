import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { node } from "prop-types";

const PageLayout = ({ children }) => {
  return (
    <div className="main-content">
      <Layout>
        <Content
          style={{
            overflow: "initial",
            width: "100%",
            padding: 15,
            maxWidth: "100%",
          }}
        >
          {children}
        </Content>
      </Layout>
    </div>
  );
};

PageLayout.propTypes = {
  children: node.isRequired,
};

export default PageLayout;
