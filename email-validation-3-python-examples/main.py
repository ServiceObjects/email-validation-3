from validate_email_address_rest_sdk_example import validate_email_address_rest_sdk_go
from validate_email_address_soap_sdk_example import validate_email_address_soap_sdk_go
from validate_email_fast_no_corrections_rest_sdk_example import validate_email_fast_no_corrections_rest_sdk_go
from validate_email_fast_no_corrections_soap_sdk_example import validate_email_fast_no_corrections_soap_sdk_go
from validate_email_fast_rest_sdk_example import validate_email_fast_rest_sdk_go
from validate_email_fast_soap_sdk_example import validate_email_fast_soap_sdk_go
from validate_email_full_no_corrections_rest_sdk_example import validate_email_full_no_corrections_rest_sdk_go
from validate_email_full_no_corrections_soap_sdk_example import validate_email_full_no_corrections_soap_sdk_go
from validate_email_full_rest_sdk_example import validate_email_full_rest_sdk_go
from validate_email_full_soap_sdk_example import validate_email_full_soap_sdk_go

if __name__ =="__main__":

    # Your license key from Service Objects.  
    # Trial license keys will only work on the trial environments and production  
    # license keys will only work on production environments.
    #   
    license_key = "LICENSE KEY"  
    is_live = False 

    # Email Validation 3 - ValidateEmailAddress - Rest SDK
    validate_email_address_rest_sdk_go(is_live, license_key)

    # Email Validation 3 - ValidateEmailAddress - Soap SDK
    validate_email_address_soap_sdk_go(is_live, license_key)

    # Email Validation 3 - ValidateEmailFastNoCorrections - Rest SDK
    validate_email_fast_no_corrections_rest_sdk_go(is_live, license_key)

    # Email Validation 3 - ValidateEmailFastNoCorrections - SOAP SDK
    validate_email_fast_no_corrections_soap_sdk_go(is_live, license_key)

    # Email Validation 3 - ValidateEmailFast - Rest SDK
    validate_email_fast_rest_sdk_go(is_live, license_key)

    # Email Validation 3 - ValidateEmailFast - SOAP SDK
    validate_email_fast_soap_sdk_go(is_live, license_key)

    # Email Validation 3 - ValidateEmailFullNoCorrections - Rest SDK
    validate_email_full_no_corrections_rest_sdk_go(is_live, license_key)

    # Email Validation 3 - ValidateEmailFullNoCorrections - SOAP SDK
    validate_email_full_no_corrections_soap_sdk_go(is_live, license_key)
  
    # Email Validation 3 - ValidateEmailFull - Rest SDK
    validate_email_full_rest_sdk_go(is_live, license_key)

    # Email Validation 3 - ValidateEmailFull - SOAP SDK
    validate_email_full_soap_sdk_go(is_live, license_key)
