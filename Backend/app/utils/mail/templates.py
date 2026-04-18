

def success_template(username: str, bank_name: str, file_name: str) -> str:
    return f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Your Tally XML file is ready</title>
        </head>
        <body style="margin:0; padding:0; background-color:#f4f7fb; font-family:Arial, Helvetica, sans-serif; color:#1f2937;">
        <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f7fb; padding:30px 0;">
            <tr>
            <td align="center">

                <table width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.08);">

                <!-- Header -->
                <tr>
                    <td style="background:linear-gradient(135deg, #0f4c81, #1d6fdc); padding:28px 32px; text-align:center;">
                    <img src="https://res.cloudinary.com/ddiaarexp/image/upload/v1776494288/only-logo-p_x3cerc.png"
                        alt="Bank2XML Logo"
                        width="64"
                        style="display:block; margin:0 auto 12px;" />
                    <h1 style="margin:0; color:#ffffff; font-size:26px; font-weight:700;">
                        Bank2XML
                    </h1>
                    <p style="margin:8px 0 0; color:#dbeafe; font-size:14px;">
                        Bank Statement to XML for Tally
                    </p>
                    </td>
                </tr>

                <!-- Body -->
                <tr>
                    <td style="padding:40px 32px;">

                    <h2 style="margin:0 0 16px; font-size:26px; color:#111827; font-weight:700;">
                        {username} Your XML file is ready 🎉
                    </h2>

                    <p style="margin:0 0 18px; font-size:16px; color:#4b5563; line-height:1.7;">
                        Great news! Your bank statement has been successfully converted into a 
                        <strong>Tally-compatible XML file</strong>.
                    </p>

                    <p style="margin:0 0 28px; font-size:16px; color:#4b5563; line-height:1.7;">
                        You can now download the file and import it directly into Tally without any manual work.
                    </p>

                    <!-- Success Box -->
                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:28px;">
                        <tr>
                        <td style="background:#ecfdf5; border:1px solid #10b981; border-radius:12px; padding:20px;">
                            <p style="margin:0 0 6px; font-size:14px; color:#047857; font-weight:600;">
                            ✔ Conversion Completed
                            </p>
                            <p style="margin:0; font-size:14px; color:#065f46;">
                            Your file is ready to download and use in Tally.
                            </p>
                        </td>
                        </tr>
                    </table>

                    <!-- Button -->
                    <!-- <table align="center" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:30px;">
                        <tr>
                        <td align="center" style="background:#1d6fdc; border-radius:10px;">
                            <a href="https://example.com/download"
                            style="display:inline-block; padding:14px 28px; font-size:15px; font-weight:700; color:#ffffff; text-decoration:none; border-radius:10px;">
                            Download XML File
                            </a>
                        </td>
                        </tr>
                    </table> -->

                    <!-- Extra Details -->
                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:12px; margin-bottom:24px;">
                        <tr>
                        <td style="padding:18px 20px;">
                            <p style="margin:0 0 8px; font-size:15px; font-weight:700; color:#111827;">
                            File Details
                            </p>
                            <p style="margin:0; font-size:14px; color:#6b7280; line-height:1.7;">
                            File Name: <strong>{file_name}</strong><br/>
                            Bank: <strong>{bank_name}</strong><br/>
                            Format: XML (Tally Compatible)
                            </p>
                        </td>
                        </tr>
                    </table>

                    <p style="margin:0; font-size:14px; color:#6b7280; line-height:1.7;">
                        If you face any issue while importing into Tally, feel free to contact our support team — we’re here to help.
                    </p>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="padding:24px 32px; text-align:center; border-top:1px solid #e5e7eb;">
                    <p style="margin:0 0 8px; font-size:13px; color:#6b7280;">
                        Thank you for using Bank2XML.
                    </p>
                    <p style="margin:0; font-size:13px; color:#9ca3af;">
                        © 2026 Bank2XML. All rights reserved.
                    </p>
                    </td>
                </tr>

                </table>

            </td>
            </tr>
        </table>
        </body>
        </html>
    """

def fail_template(file_name: str, bank_name: str) -> str:
    return f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Something went wrong — please retry your conversion</title>
        </head>
        <body style="margin:0; padding:0; background-color:#f4f7fb; font-family:Arial, Helvetica, sans-serif; color:#1f2937;">
        <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f7fb; padding:30px 0;">
            <tr>
            <td align="center">

                <table width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.08);">

                <!-- Header -->
                <tr>
                    <td style="background:linear-gradient(135deg, #0f4c81, #1d6fdc); padding:28px 32px; text-align:center;">
                    <img src="https://res.cloudinary.com/ddiaarexp/image/upload/v1776494288/only-logo-p_x3cerc.png"
                        alt="Bank2XML Logo"
                        width="64"
                        style="display:block; margin:0 auto 12px;" />
                    <h1 style="margin:0; color:#ffffff; font-size:26px; font-weight:700;">
                        Bank2XML
                    </h1>
                    <p style="margin:8px 0 0; color:#dbeafe; font-size:14px;">
                        Bank Statement to XML for Tally
                    </p>
                    </td>
                </tr>

                <!-- Body -->
                <tr>
                    <td style="padding:40px 32px;">

                    <h2 style="margin:0 0 16px; font-size:26px; color:#111827; font-weight:700;">
                        We couldn’t process your statement
                    </h2>

                    <p style="margin:0 0 18px; font-size:16px; color:#4b5563; line-height:1.7;">
                        We tried to convert your uploaded bank statement into a
                        <strong>Tally-compatible XML file</strong>, but the process could not be completed this time.
                    </p>

                    <p style="margin:0 0 28px; font-size:16px; color:#4b5563; line-height:1.7;">
                        Please review the file details and try again. In most cases, the issue can be fixed quickly by correcting the upload information.
                    </p>

                    <!-- Failure Box -->
                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:28px;">
                        <tr>
                        <td style="background:#fef2f2; border:1px solid #ef4444; border-radius:12px; padding:20px;">
                            <p style="margin:0 0 6px; font-size:14px; color:#b91c1c; font-weight:700;">
                            Conversion Failed
                            </p>
                            <p style="margin:0; font-size:14px; color:#7f1d1d; line-height:1.7;">
                            Your statement could not be converted successfully.
                            </p>
                        </td>
                        </tr>
                    </table>

                    <!-- Possible Reasons -->
                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#fffaf0; border:1px solid #f59e0b; border-radius:12px; margin-bottom:28px;">
                        <tr>
                        <td style="padding:18px 20px;">
                            <p style="margin:0 0 10px; font-size:15px; font-weight:700; color:#92400e;">
                            Possible reasons
                            </p>
                            <p style="margin:0; font-size:14px; color:#78350f; line-height:1.8;">
                            • Password was required but not provided<br/>
                            • File format was inaccurate or unsupported<br/>
                            • Incorrect bank was selected during upload
                            </p>
                        </td>
                        </tr>
                    </table>

                    <!-- Button -->
                    <table align="center" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:30px;">
                        <tr>
                        <td align="center" style="background:#1d6fdc; border-radius:10px;">
                            <a href="https://example.com/retry"
                            style="display:inline-block; padding:14px 28px; font-size:15px; font-weight:700; color:#ffffff; text-decoration:none; border-radius:10px;">
                            Retry Conversion
                            </a>
                        </td>
                        </tr>
                    </table>

                    <!-- Extra Details -->
                    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:12px; margin-bottom:24px;">
                        <tr>
                        <td style="padding:18px 20px;">
                            <p style="margin:0 0 8px; font-size:15px; font-weight:700; color:#111827;">
                            Upload details
                            </p>
                            <p style="margin:0; font-size:14px; color:#6b7280; line-height:1.7;">
                            File Name: <strong>{file_name}</strong><br/>
                            Bank Selected: <strong>{bank_name}</strong><br/>
                            </p>
                        </td>
                        </tr>
                    </table>

                    <p style="margin:0; font-size:14px; color:#6b7280; line-height:1.7;">
                        If the problem continues even after retrying, please contact our support team with your file details so we can help you faster.
                    </p>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="padding:24px 32px; text-align:center; border-top:1px solid #e5e7eb;">
                    <p style="margin:0 0 8px; font-size:13px; color:#6b7280;">
                        Need help? Contact Bank2XML support for assistance with your statement conversion.
                    </p>
                    <p style="margin:0; font-size:13px; color:#9ca3af;">
                        © 2026 Bank2XML. All rights reserved.
                    </p>
                    </td>
                </tr>

                </table>

            </td>
            </tr>
        </table>
        </body>
        </html>
    """


def otp_template(otp: str) -> str:
    return f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Your Verification OTP is</title>
        </head>
        <body style="margin:0; padding:0; background-color:#f4f7fb; font-family:Arial, Helvetica, sans-serif; color:#1f2937;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f7fb; margin:0; padding:30px 0;">
            <tr>
            <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.08);">
                
                <!-- Header -->
                <tr>
                    <td style="background:linear-gradient(135deg, #0f4c81, #1d6fdc); padding:28px 32px; text-align:center;">
                    <img src="https://res.cloudinary.com/ddiaarexp/image/upload/v1776494288/only-logo-p_x3cerc.png" alt="Bank2XML Logo" width="64" height="64" style="display:block; margin:0 auto 12px auto;" />
                    <h1 style="margin:0; font-size:28px; line-height:1.3; color:#ffffff; font-weight:700;">
                        Bank2XML
                    </h1>
                    <p style="margin:8px 0 0 0; color:#dbeafe; font-size:14px; line-height:1.6;">
                        Bank Statement to XML for Tally
                    </p>
                    </td>
                </tr>

                <!-- Body -->
                <tr>
                    <td style="padding:40px 32px 20px 32px;">
                    <h2 style="margin:0 0 14px 0; font-size:26px; color:#111827; line-height:1.3; font-weight:700;">
                        Verify your email address
                    </h2>

                    <p style="margin:0 0 16px 0; font-size:16px; line-height:1.7; color:#4b5563;">
                        Welcome to <strong>Bank2XML</strong>. To keep your account secure and complete your verification,
                        please use the One-Time Password below.
                    </p>

                    <p style="margin:0 0 24px 0; font-size:16px; line-height:1.7; color:#4b5563;">
                        Enter this OTP in the verification screen to continue using our platform and convert your bank statements into Tally-ready XML files.
                    </p>

                    <!-- OTP Box -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 28px 0;">
                        <tr>
                        <td align="center" style="background:#eff6ff; border:1px dashed #1d6fdc; border-radius:14px; padding:24px;">
                            <p style="margin:0 0 10px 0; font-size:14px; color:#1d4ed8; font-weight:600; letter-spacing:0.5px;">
                            YOUR VERIFICATION OTP
                            </p>
                            <div style="font-size:36px; font-weight:700; letter-spacing:8px; color:#0f4c81;">
                            {otp}
                            </div>
                            <p style="margin:12px 0 0 0; font-size:13px; color:#6b7280;">
                            Valid for 10 minutes
                            </p>
                        </td>
                        </tr>
                    </table>

                    <!-- Extra Details -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:12px; margin-bottom:24px;">
                        <tr>
                        <td style="padding:18px 20px;">
                            <p style="margin:0 0 8px 0; font-size:15px; font-weight:700; color:#111827;">
                            Security Note
                            </p>
                            <p style="margin:0; font-size:14px; line-height:1.7; color:#6b7280;">
                            Never share this OTP with anyone. Bank2XML will never ask for your OTP by email, call, or message.
                            </p>
                        </td>
                        </tr>
                    </table>

                    <p style="margin:0; font-size:14px; line-height:1.7; color:#6b7280;">
                        If you did not request this verification, you can safely ignore this email.
                    </p>
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="padding:24px 32px 32px 32px; border-top:1px solid #e5e7eb; text-align:center; background:#ffffff;">
                    <p style="margin:0 0 8px 0; font-size:13px; color:#6b7280; line-height:1.6;">
                        This OTP is valid for a limited time. Please do not forward this email.
                    </p>
                    <p style="margin:0; font-size:13px; color:#9ca3af; line-height:1.6;">
                        © 2026 Bank2XML. All rights reserved.
                    </p>
                    </td>
                </tr>

                </table>
            </td>
            </tr>
        </table>
        </body>
        </html>
        """