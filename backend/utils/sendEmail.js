import nodemailer from "nodemailer";

//TODO I dont think we should be exposing a password here
export const sendEmail = async (email, subject, email_body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "ross.hilpert55@ethereal.email",
        pass: "pWTMdmWKr5Yc8b5ryr",
      },
    });
    await transporter.sendMail({
      from: "ross.hilpert55@ethereal.email",
      to: email,
      subject: subject,
      html: `
   <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap"
      rel="stylesheet"
    />
    <style>
      * {
        font-family: "Poppins" !important;

	  }
      body {
        background-color: #faf9f9;
        height: 100vh;
        color: #000000;
        position: relative;
        text-align: center;
      }
      .container {
        max-width: 700px;
        width: 100%;
        height: 100%;
        margin: 0 auto;
      }
      .wrapper {
        padding: 0 15px;
      }
      .card {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
      }
      span {
        color: #000000;

      }
      button {
        padding: 1em 6em;
        border-radius: 5px;
        border: 0;
        background-color: #f6343f;
        transition: all 0.3s ease-in;
        cursor: pointer;
        color: #FFFFFF;
      }
      button:hover {
        transition: all 0.3s ease-in;
      }
      .spacing {
        margin-top: 1rem;
      }

    </style>
  </head>
  <body>
      <div class="wrapper">
        <div class="card">
          <button><h1><span>Updates on the Disaster Map</h1></button>
          <div class="spacing">${email_body}</div>
        </div>
      </div>
    </div>
  </body>
</html>
  `,
    });
  } catch (err) {
    throw new Error(`Email Not Sent: ${err.message}`);
  }
};
