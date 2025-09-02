![Service Objects Logo](https://www.serviceobjects.com/wp-content/uploads/2021/05/SO-Logo-with-TM.gif "Service Objects Logo")

# EV3 - Email Validation 3

DOTS Email Validation 3 (EV3) is a web service that provides validity and metadata information about an email address. The service provides common data elements such as syntax validity along with more refined data such as SMTP failures and deliverability flags.

These are the essential checks that are performed by each operation. The service operation steps through each section to determine if an email is valid. If one step fails, subsequent checks are not made because they have been logically eliminated. Example: if the syntax on an email fails, neither the DNS nor the SMTP check is done.

Step 1: Email Correction – The email is first cleaned and corrected before being validated and verified. Extraneous text and characters are removed and common email deformities are fixed. Typos, misspellings as well as incomplete domains are also corrected.

Step 2: Syntax Check – The email is tested to verify that the format is valid, such as an “@” symbol, a domain, and no odd characters that aren’t allowed in email addresses. The rules specific to the domain are also checked. For example, if you input aa@aol.com it will pass the syntax check but fail the domain specific syntax check, and therefore we do not need to continue with the DNS or SMTP level checks.

Step 3: DNS Check – The DNS or domain name check verifies that the domain exists and has a valid MX record in order to relay mail.

Step 4: SMTP Check – Once we obtain the location of the mail server from a successful DNS check, we start communicating with the target mail server. No email is actually sent to the email address being verified. This step gives us three pieces of information. It tells us if the server is working, if it will accept any address, and if will it accept this specific address. One difficulty of email validation is dealing with the defensive behaviors of email servers. Because of the growth of spam and email-mining tools, SMTP servers often respond to requests for information in cryptic and defensive ways. 

Mail servers may respond very slowly to information requests, provide unhelpful data, or sometimes no data at all. We have carefully crafted our system with this in mind, and therefore the data we return is still very accurate. However, sometimes we are still forced to return an unknown result for some of the SMTP level checks.

Step 5: Integrity Checks – A deliverable email address is not always a good email address. Just because an email does not bounce back does not mean that it was received, and so our service performs a variety tests and checks to evaluate the integrity of an email address. For example an email address may be a disposable address that is only temporarily deliverable or worst yet a spam trap.

## [Service Objects Website](https://serviceobjects.com)

# EV3 - ValidateEmailAddress

Validates and verifies an email address via a full suite of tests and real-time SMTP checks. This operation performs real-time server-to-server verification via SMTP communication. This operation allows the user to specify a timeout value, in milliseconds, for how long it can take to perform SMTP level checks. A minimum of 200 milliseconds is required to perform these checks. However, results are dependent on the network speed of an email’s host, which may require several seconds to verify. 

Average mail server response times are approximately between 2-3 seconds, but some slower mail servers may take 15 seconds or more to verify. 

### [ValidateEmailAddress Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-email-validation-3/ev3-operations/ev3-validateemailaddress-recommended/)

## Library Usage

```
# 1. Build the input
#
#  Required fields:
#               EmailAddress
#               AllowCorrections 
#               Timeout
#               LicenseKey
#               IsLive
# 
# Optional:
#        TimeoutSeconds (default: 15)

email_address = "Johan@gmail.com";
allow_corrections = "true";
timeout = "10000";
timeoutSeconds = 15;

from validate_email_address_soap import ValidateEmailAddressSoap

# 2. Call the method
service = ValidateEmailAddressSoap(email_address,allow_corrections,timeout,license_key, is_live,timeoutSeconds)
response=service.validate_email_address()

# 3. Inspect results.
if not hasattr(response, 'Error'):
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
```

# EV3 - ValidateEmailFull

Corrects, validates and verifies an email address via a full suite of tests and real-time SMTP checks. Since this operation performs real-time verification via SMTP communication the response time is dependent on the network speed of an email’s host and may take several seconds. 

The average response time for this operation is approximately 2 seconds, but the operation can take as long as 10 seconds.

### [ValidateEmailFull Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-email-validation-3/ev3-operations/ev3-validateemailfull/)

## Library Usage

```
# 1. Build the input
#
#  Required fields:
#               EmailAddress
#               LicenseKey
#               IsLive
# 
# Optional:
#        TimeoutSeconds (default: 15)

email_address = "Soman@gmail.com";
timeoutSeconds = 15;

from validate_email_full_soap import ValidateEmailFullSoap  

# 2. Call the method
service =ValidateEmailFullSoap(email_address,license_key,is_live,timeoutSeconds)
response=service.validate_email_full()

# 3. Inspect results.
if not hasattr(response, 'Error'):
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
```

# EV3 - ValidateEmailFullNoCorrection

The same as ValidateEmailFull but the service will not attempt to correct the email address.

### [ValidateEmailFullNoCorrection Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-email-validation-3/ev3-operations/ev3-validateemailfullnocorrections/)

## Library Usage

```
# 1. Build the input
#
#  Required fields:
#               EmailAddress
#               LicenseKey
#               IsLive
# 
# Optional:
#        TimeoutSeconds (default: 15)

email_address = "Soman@gmail.com";
timeoutSeconds = 15;

from validate_email_full_no_corrections_soap import ValidateEmailFullNoCorrectionsSoap

# 2. Call the method
service=ValidateEmailFastNoCorrectionsSoap(email_address,license_key,is_live,timeoutSeconds)
response=service.validate_email_fast_no_corrections()

# 3. Inspect results.
if not hasattr(response, 'Error'):
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
```

# EV3 - ValidateEmailFast

This operation has the same inputs and outputs as ValidateEmailFull. This check will not perform any real-time SMTP level checks, however it may still provide SMTP level information via one of our other mechanisms.

### [ValidateEmailFast Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-email-validation-3/ev3-operations/ev3-validateemailfast/)

## Library Usage

```
# 1. Build the input
#
#  Required fields:
#               EmailAddress
#               LicenseKey
#               IsLive
# 
# Optional:
#        TimeoutSeconds (default: 15)

email_address = "JohanVick@gmail.com";
timeoutSeconds = 15;

from validate_email_fast_soap import ValidateEmailFastSoap

# 2. Call the method
 service= ValidateEmailFastSoap(email_address,license_key,is_live,timeoutSeconds)
 response=service.validate_email_fast()

# 3. Inspect results.
if not hasattr(response, 'Error'):
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
```

# EV3 - ValidateEmailFastNoCorrections

The same as ValidateEmailFast but the service will not attempt to correct the email address.

### [ValidateEmailFastNoCorrections Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-email-validation-3/ev3-operations/ev3-validateemailfastnocorrections-2/)

## Library Usage

```
# 1. Build the input
#
#  Required fields:
#               EmailAddress
#               LicenseKey
#               IsLive
# 
# Optional:
#        TimeoutSeconds (default: 15)

email_address = "Soman@gmail.com";
timeoutSeconds = 15;

from validate_email_full_no_corrections_soap import ValidateEmailFullNoCorrectionsSoap

# 2. Call the method
service =ValidateEmailFullNoCorrectionsSoap(email_address,license_key,is_live,timeoutSeconds)
response=service.validate_email_full_no_corrections()

# 3. Inspect results.
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
```