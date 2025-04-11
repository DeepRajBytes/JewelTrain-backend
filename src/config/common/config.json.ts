const config = {
  statusCode: {
    successful: 200,
    created: 201,
    empty: 204,
    badRequest: 400,
    Unauthorized: 401,
    internalServer: 500,
    conflict: 409,
    preconditionFailed: 412,
    multiStatus: 207,
  },
  common: {
    invalid: "Invalid username or password.",
    noData: "No data found.",
    status: "Status has been updated successfully.",
    recordAlreadyExist: "Record already exists.",
    invalidusernamepassword: "Invalid username or password.",
    noimage: "/assets/images/noimage.jpeg",
    securitykey: "happy_deliver",
    invalidrequest: "Invalid request.",
    invalidemail: "Invalid email address.",
    sendsuccessfully:
      "Email has been sent successfully. Please check your mail.",
    tokeninvalid: "Token expired.",
    resetsuccess: "Password has been reset successfully.",
    resetpasswordpath: "http://localhost:4200/reset-password",
  },
};


export { config};