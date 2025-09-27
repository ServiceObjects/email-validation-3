import sys
import os

sys.path.insert(0, os.path.abspath("../email-validation-3-python/REST"))

from validate_email_address_rest import validate_email_address

def validate_email_address_rest_sdk_go(is_live: bool, license_key: str) -> None:
    print("\r\n-----------------------------------------------------------");
    print("Email Validation 3 - ValidationEmailAddressInput - REST SDK");
    print("-----------------------------------------------------------");

    email_address = "jan@serviceobjects.com";
    allow_corrections = "true";
    timeout = "10000";
    timeout_seconds = 15;
 
    print(f"\r\n* Input *\r\n");
    print(f"Email Address    : {email_address}");
    print(f"License Key      : {license_key}");
    print(f"Allow Corrections: {allow_corrections}");
    print(f"Is Live          : {is_live}");
    print(f"Timeout          : {timeout}");
    print(f"Timeout Seconds  : {timeout_seconds}");

    try:
        response=validate_email_address(email_address, allow_corrections, license_key, timeout, is_live, timeout_seconds)

        if response.Error is None:
            print("\r\n* Email Validation Details *\r\n");
            print(f"Score                       : {response.ValidateEmailInfo.Score}");
            print(f"Is Deliverable              : {response.ValidateEmailInfo.IsDeliverable}");
            print(f"Email Address In            : {response.ValidateEmailInfo.EmailAddressIn}");
            print(f"Email Address Out           : {response.ValidateEmailInfo.EmailAddressOut}");
            print(f"Email Corrected             : {response.ValidateEmailInfo.EmailCorrected}");
            print(f"Box                         : {response.ValidateEmailInfo.Box}");
            print(f"Domain                      : {response.ValidateEmailInfo.Domain}");
            print(f"Top Level Domain            : {response.ValidateEmailInfo.TopLevelDomain}");
            print(f"Top Level Domain Description: {response.ValidateEmailInfo.TopLevelDomainDescription}");
            print(f"Is SMTP Server Good         : {response.ValidateEmailInfo.IsSMTPServerGood}");
            print(f"Is Catch All Domain         : {response.ValidateEmailInfo.IsCatchAllDomain}");
            print(f"Is SMTP Mailbox Good        : {response.ValidateEmailInfo.IsSMTPMailBoxGood}");
            print(f"Warning Codes               : {response.ValidateEmailInfo.WarningCodes}");
            print(f"Warning Descriptions        : {response.ValidateEmailInfo.WarningDescriptions}");
            print(f"Notes Codes                 : {response.ValidateEmailInfo.NotesCodes}");
            print(f"Notes Descriptions          : {response.ValidateEmailInfo.NotesDescriptions}");
        else:
            if hasattr(response, 'Error') and response.Error:
                print("\n* Error *\n")
                print(f"Error Type       : {response.Error.Type}")
                print(f"Error Type Code  : {response.Error.TypeCode}")
                print(f"Error Description: {response.Error.Desc}")
                print(f"Error Desc Code  : {response.Error.DescCode}")

    except Exception as e:
        print(f"\nException occurred: {str(e)}")
