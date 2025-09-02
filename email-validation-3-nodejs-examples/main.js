import { validateEmailAddressGo } from "./validate_email_address_rest_sdk_example.js";
import { validateEmailFastNoCorrectionsGo } from "./validate_email_fast_no_corrections_rest_sdk_example.js";
import { validateEmailFastGo } from "./validate_email_fast_rest_sdk_example.js";
import { validateEmailFullNoCorrectionsGo } from "./validate_email_full_no_corrections_rest_sdk_example.js";
import { validateEmailFullGo } from "./validate_email_full_rest_sdk_example.js";
import { validateEmailAddressSoapGo } from "./validate_email_address_soap_sdk_example.js";
import { validateEmailFastSoapGo } from "./validate_email_fast_soap_sdk_example.js";
import { validateEmailFastNoCorrectionsSoapGo } from "./validate_email_fast_no_corrections_soap_sdk_example.js";
import { validateEmailFullSoapGo } from "./validate_email_full_soap_sdk_example.js";
import { validateEmailFullNoCorrectionsSoapGo } from "./validate_email_full_no_corrections_soap_sdk_example.js";

async function main() {
    //Your license key from Service Objects.
    //Trial license keys will only work on the
    //trail environments and production license
    //keys will only owork on production environments.
    const licenseKey = "LICENSE KEY";
    const isLive = false;

    // Email Validation 3 - ValidateEmailAddress - Rest SDK
    await validateEmailAddressGo(licenseKey, isLive);

    // Email Validation 3 - ValidateEmailAddress - SOAP SDK
    await validateEmailAddressSoapGo(licenseKey, isLive);

    // Email Validation 3 - ValidateEmailFast - Rest SDK
    await validateEmailFastGo(licenseKey, isLive);

    // Email Validation 3 - ValidateEmailFastNoCorrections - Rest SDK
    await validateEmailFastNoCorrectionsGo(licenseKey, isLive);

    //Email Validation 3 - ValidateEmailFull - Rest SDK
    await validateEmailFullGo(licenseKey, isLive);

    // Email Validation 3 - ValidateEmailFullNoCorrections - Rest SDK
    await validateEmailFullNoCorrectionsGo(licenseKey, isLive);



    // Email Validation 3 - ValidateEmailFast - SOAP SDK
    await validateEmailFastSoapGo(licenseKey, isLive);

    // Email Validation 3 - ValidateEmailFastNoCorrections - SOAP SDK
    await validateEmailFastNoCorrectionsSoapGo(licenseKey, isLive);

    // Email Validation 3 - ValidateEmailFull - SOAP SDK
    await validateEmailFullSoapGo(licenseKey, isLive);

    // Email Validation 3 - ValidateEmailFullNoCorrections - SOAP SDK
    await validateEmailFullNoCorrectionsSoapGo(licenseKey, isLive);
}
main().catch((err) => console.error("Error:", err));
