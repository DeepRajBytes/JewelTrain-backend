import config from "./config/ENV/config";
import connectDB from "./Database/ConnectionSettings/db";
import App from "./index";

const port = config.port || 5000;

connectDB().then(() => {
    const appInstance = new App();

    appInstance.app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to database:", error);
  });