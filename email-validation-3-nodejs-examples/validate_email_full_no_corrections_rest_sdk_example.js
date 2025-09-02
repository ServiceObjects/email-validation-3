import { ValidateEmailFullNoCorrectionsClient } from "../email-validation-3-nodejs/REST/validate_email_full_no_corrections_rest.js";

export async function validateEmailFullNoCorrectionsGo(licenseKey, isLive) {
    console.log("\r\n-------------------------------------------------------------------");
    console.log("Email Validation 3 - ValidateEmailFullNoCorrectionsInput - REST SDK");
    console.log("-------------------------------------------------------------------");

    // Input Parameters
    const emailAddress = "Johan@gmail.com";
    const timeoutSeconds = 15;

    // Display Input
    console.log("\r\n* Input *\r\n");
    console.log(`Email Address  : ${emailAddress}`);
    console.log(`License Key    : ${licenseKey}`);
    console.log(`Is Live        : ${isLive}`);
    console.log(`Timeout Seconds: ${timeoutSeconds}`);

    try {
        const response = await ValidateEmailFullNoCorrectionsClient.invokeAsync(
            emailAddress, licenseKey, isLive, timeoutSeconds
        );

        if (!response.Error && response.ValidateEmailInfo) {
            console.log("\r\n* Email Validation Details *\r\n");
            console.log(`Score                       : ${response.ValidateEmailInfo.Score}`);
            console.log(`Is Deliverable              : ${response.ValidateEmailInfo.IsDeliverable}`);
            console.log(`Email Address In            : ${response.ValidateEmailInfo.EmailAddressIn}`);
            console.log(`Email Address Out           : ${response.ValidateEmailInfo.EmailAddressOut}`);
            console.log(`Email Corrected             : ${response.ValidateEmailInfo.EmailCorrected}`);
            console.log(`Box                         : ${response.ValidateEmailInfo.Box}`);
            console.log(`Domain                      : ${response.ValidateEmailInfo.Domain}`);
            console.log(`Top Level Domain            : ${response.ValidateEmailInfo.TopLevelDomain}`);
            console.log(`Top Level Domain Description: ${response.ValidateEmailInfo.TopLevelDomainDescription}`);
            console.log(`Is SMTP Server Good         : ${response.ValidateEmailInfo.IsSMTPServerGood}`);
            console.log(`Is Catch All Domain         : ${response.ValidateEmailInfo.IsCatchAllDomain}`);
            console.log(`Is SMTP Mailbox Good        : ${response.ValidateEmailInfo.IsSMTPMailBoxGood}`);
            console.log(`Warning Codes               : ${response.ValidateEmailInfo.WarningCodes}`);
            console.log(`Warning Descriptions        : ${response.ValidateEmailInfo.WarningDescriptions}`);
            console.log(`Notes Codes                 : ${response.ValidateEmailInfo.NotesCodes}`);
            console.log(`Notes Descriptions          : ${response.ValidateEmailInfo.NotesDescriptions}`);
        } else {
            console.log("\r\n* Error *\r\n");
            console.log(`Error Type       : ${response.Error?.Type}`);
            console.log(`Error Type Code  : ${response.Error?.TypeCode}`);
            console.log(`Error Description: ${response.Error?.Desc}`);
            console.log(`Error Desc Code  : ${response.Error?.DescCode}`);
        }
    } catch (e) {
        console.log("\r\n* Error *\r\n");
        console.log(`Error name     : ${e.name}`);
        console.log(`Error message  : ${e.message}`);
        console.log(`Error code     : ${e.code || 'N/A'}`);
    }
}
