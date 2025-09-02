using email_validation_3_dot_net_examples;

//Your license key from Service Objects.
//Trial license keys will only work on the
//trail environments and production license
//keys will only work on production environments.
string LicenseKey = "LICENSE KEY";

bool IsProductionKey = true;

// Email Validation 3 - ValidateEmailAddress - Rest SDK 
ValidateEmailAddressRestSdkExample.Go(LicenseKey, IsProductionKey);

// Email Validation 3 - ValidateEmailAddress - Soap SDK
ValidateEmailAddressSoapSdkExample.Go(LicenseKey, IsProductionKey);

// Email Validation 3 - ValidateEmailFast - Rest SDK
ValidateEmailFastRestSdkExample.Go(LicenseKey, IsProductionKey);

// Email Validation 3 - ValidateEmailFullNoCorrections - Soap SDK
ValidateEmailFastSoapSdkExample.Go(LicenseKey, IsProductionKey);

// Email Validation 3 - ValidateEmailFastNoCorrections - Rest SDK
ValidateEmailFastNoCorrectionsRestExample.Go(LicenseKey, IsProductionKey);

// Email Validation 3 - ValidateEmailFastNoCorrections - Soap SDK
ValidateEmailFastNoCorrectionsSoapExample.Go(LicenseKey, IsProductionKey);

// Email Validation 3 - ValidateEmailFull - Rest SDK
ValidateEmailFullRestSdkExample.Go(LicenseKey, IsProductionKey);

// Email Validation 3 - ValidateEmailFull - Soap SDK
ValidateEmailFullSoapSdkExample.Go(LicenseKey, IsProductionKey);

// Email Validation 3 - ValidateEmailFullNoCorrections - Rest SDK
ValidateEmailFullNoCorrectionsRestSdkExample.Go(LicenseKey, IsProductionKey);

// Email Validation 3 - ValidateEmailFullNoCorrections - Soap SDK
ValidateEmailFullNoCorrectionsSoapSdkExample.Go(LicenseKey, IsProductionKey);








