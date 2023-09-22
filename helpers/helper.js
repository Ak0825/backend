// import bcrypt from "bcryptjs"; 
const nodemailer = require('nodemailer');
const config = require('../config/db');

// export const encryptPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   return await bcrypt.hash(password, salt);
// };

// export const matchPassword = async (password, savedPassword) => {
//   await bcrypt.compare(password, savedPassword);
// }
 

  function sentThankYouMail(body) {
    var textBody = `FROM: Hi  ${body.name} `;
  //   var htmlBody = `<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
  //   <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
  //       style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
  //       <tr>
  //           <td>
  //               <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
  //                   align="center" cellpadding="0" cellspacing="0">
  //                   <tr>
  //                       <td style="height:80px;">&nbsp;</td>
  //                   </tr>
  //                   <tr>
  //                       <td style="text-align:center;">
  //                       <h3 style="font-size:43px; font: normal 36px Open Sans,cursive;">  <a style="text-decoration:none" href="https://nakfeek.com" title="logo" target="_blank">
  //                           <img width="60" src="https://i.postimg.cc/gc6VKVBB/6488313f-24ea-4c9f-9630-c1777b6f4d7f.png" title="logo" alt="logo">
  //                           <span style="color:#20b2aa">NKFEEK نكفيك</span>
  //                         </a>
  //                         </h3>
  //                       </td>
  //                   </tr>
  //                   <tr>
  //                       <td style="height:20px;">&nbsp;</td>
  //                   </tr>
  //                   <tr>
  //                       <td>
  //                           <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
  //                               style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
  //                               <tr>
  //                                   <td style="height:40px;">&nbsp;</td>
  //                               </tr>
  //                               <tr>
  //                                   <td style="padding:0 35px;">
  //                                       <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Thank You ${body.name}</h1>
  //                                       <span
  //                                           style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
  //                                       <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">We will get back to you very soon.
  //                                       </p>
                                      
  //                                   </td>
  //                               </tr>
  //                               <tr>
  //                                   <td style="height:40px;">&nbsp;</td>
  //                               </tr>
  //                           </table>
  //                       </td>
  //                   <tr>
  //                       <td style="height:20px;">&nbsp;</td>
  //                   </tr>
  //                   <tr>
  //                       <td style="text-align:center;">
  //                           <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>https://nakfeek.com</strong></p>
  //                       </td>
  //                   </tr>
  //                   <tr>
  //                       <td style="height:80px;">&nbsp;</td>
  //                   </tr>
  //               </table>
  //           </td>
  //       </tr>
  //   </table>
  // </body>`;
    var mailOptions = {
      from: config.smptp_creds.email,
      to: body.email,
      subject: "Thank You",
      // html: htmlBody,
      text:textBody
    };
    return mailOptions
  }


function sendMail(type,body) {
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.smptp_creds.email,
        pass: config.smptp_creds.password
      }
    });
    
    if(type==1){
      for (let index = 0; index < 2; index++) {
        transporter.sendMail( index==0 ? sentThankYouMail(body): sentThankYouMail(body), function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            res.send( {message : "Success"})
          }
        });
      }
    }else{
      transporter.sendMail(setOtpMail(body), function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }

}
function setOtpMail(body) {

  var mailOptions = {
    from: config.smptp_creds.email,
    to: body.email,
    subject: "OTP",
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Ride With Taxi</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing Ride With Taxi. Use the following OTP to complete your Forget password procedures. OTP is valid for 10 minutes</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${body.otp}</h2>
      <p style="font-size:0.9em;">Regards,<br />Ride With Taxi</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Ride With Taxi</p>
      </div>
    </div>
  </div>`
  };
  return mailOptions
}

function setQuoteMail(body) {
  var textBody = `FROM: Hii my name is ${body.name}  EMAIL: ${body.email} MESSAGE: ${body.message}`;
	var htmlBody = `<h2>Mail From Contact Form</h2><p>from: ${body.name} <a href="mailto:${body.email}">${body.email}</a></p><p>${body.message}</p>`;
  var mailOptions = {
    from: config.smptp_creds.email,
    to: config.smptp_creds.email,
    subject: "Mail From Contact Form",
    // html: htmlBody,
    text:textBody
  };
  return mailOptions
}

module.exports = { 
  sendMail, 
  setOtpMail,
  setQuoteMail,
  sentThankYouMail
}