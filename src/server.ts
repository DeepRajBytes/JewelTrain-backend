import config from "./config/ENV/config";
import connectDB from "./Database/ConnectionSettings/db";
import App from "./index";

const appInstance = new App();

const init = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to database");

    if (config.mode === "development") {
      const port = config.port || 5000;
      appInstance.app.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
      });
    } else {
      console.log("✅ Serverless deployment mode");
    }
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
  }
};

init();


export default appInstance.app;




// import config from "./config/ENV/config";
// import connectDB from "./Database/ConnectionSettings/db";
// import App from "./index";

// const port = config.port || 5000;

// connectDB().then(() => {
//     const appInstance = new App();

//     appInstance.app.listen(port, () => {
//       console.log(`🚀 Server is running on port ${port}`);
//     });
//   })
//   .catch((error) => {
//     console.error("❌ Failed to connect to database:", error);
//   });

