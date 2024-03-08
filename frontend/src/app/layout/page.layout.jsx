import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

const PageLayout = ({ children }) => {
  return (
    <div className="main-content">
      <Layout>
        <Content
          style={{
            overflow: "initial",
            width: "100%",
            padding: "0 25px",
            maxWidth: 1200,
          }}
        >
          {children}
        </Content>
      </Layout>
    </div>
  );
};

export default PageLayout;
