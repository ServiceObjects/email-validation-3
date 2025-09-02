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
// 1. Build the input
//
//  Required fields:
//               EmailAddress
//               AllowCorrections 
//               Timeout
//               LicenseKey
//               IsLive
// 
// Optional:
//        TimeoutSeconds (default: 15)

using email_validation_3_dot_net.REST;

ValidateEmailAddressClient.ValidationEmailAddressInput validationEmailAddressInput = new(
    EmailAddress: "Johan@gmail.com",
    LicenseKey: licenseKey,
    AllowCorrections: "true",
    IsLive: isLive,
    Timeout:"10000",
    TimeoutSeconds: 15
);

// 2. Call the sync InvokeAsync() method.
 EV3Response response = await ValidateEmailAddressClient.InvokeAsync(validationEmailAddressInput);

// 3. Inspect results.
if (response.Error is null && response.ValidateEmailInfo != null)
{
    Console.WriteLine("\r\n* Email Validation Details *\r\n");

    Console.WriteLine($"Score                       : {response.ValidateEmailInfo.Score}");
    Console.WriteLine($"Is Deliverable              : {response.ValidateEmailInfo.IsDeliverable}");
    Console.WriteLine($"Email Address In            : {response.ValidateEmailInfo.EmailAddressIn}");
    Console.WriteLine($"Email Address Out           : {response.ValidateEmailInfo.EmailAddressOut}");
    Console.WriteLine($"Email Corrected             : {response.ValidateEmailInfo.EmailCorrected}");
    Console.WriteLine($"Box                         : {response.ValidateEmailInfo.Box}");
    Console.WriteLine($"Domain                      : {response.ValidateEmailInfo.Domain}");
    Console.WriteLine($"Top Level Domain            : {response.ValidateEmailInfo.TopLevelDomain}");
    Console.WriteLine($"Top Level Domain Description: {response.ValidateEmailInfo.TopLevelDomainDescription}");
    Console.WriteLine($"Is SMTP Server Good         : {response.ValidateEmailInfo.IsSMTPServerGood}");
    Console.WriteLine($"Is Catch All Domain         : {response.ValidateEmailInfo.IsCatchAllDomain}");
    Console.WriteLine($"Is SMTP Mailbox Good        : {response.ValidateEmailInfo.IsSMTPMailBoxGood}");
    Console.WriteLine($"Warning Codes               : {response.ValidateEmailInfo.WarningCodes}");
    Console.WriteLine($"Warning Descriptions        : {response.ValidateEmailInfo.WarningDescriptions}");
    Console.WriteLine($"Notes Codes                 : {response.ValidateEmailInfo.NotesCodes}");
    Console.WriteLine($"Notes Descriptions          : {response.ValidateEmailInfo.NotesDescriptions}");
}
else
{
    Console.WriteLine("\r\n* Error *\r\n");
    Console.WriteLine($"Error Type       : {response.Error?.Type}");
    Console.WriteLine($"Error Type Code  : {response.Error?.TypeCode}");
    Console.WriteLine($"Error Description: {response.Error?.Desc}");
    Console.WriteLine($"Error Desc Code  : {response.Error?.DescCode}");
    Console.WriteLine($"Error Number     : {response.Error?.Number}");
}
```

# EV3 - ValidateEmailFull

Corrects, validates and verifies an email address via a full suite of tests and real-time SMTP checks. Since this operation performs real-time verification via SMTP communication the response time is dependent on the network speed of an email’s host and may take several seconds. 

The average response time for this operation is approximately 2 seconds, but the operation can take as long as 10 seconds.

### [ValidateEmailFull Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-email-validation-3/ev3-operations/ev3-validateemailfull/)

## Library Usage

```
// 1. Build the input
//
//  Required fields:
//               EmailAddress
//               LicenseKey
//               IsLive
// 
// Optional:
//        TimeoutSeconds (default: 15)

using email_validation_3_dot_net.REST;

ValidateEmailFullClient.ValidateEmailFullInput validateEmailFullInput = new(
    EmailAddress: "Johan@gmail.com",
    LicenseKey: licenseKey,
    IsLive: isLive,
    TimeoutSeconds: 15
);

// 2. Call the sync InvokeAsync() method.
  EV3Response response = await ValidateEmailFullClient.InvokeAsync(validateEmailFullInput);

// 3. Inspect results.
if (response.Error is null && response.ValidateEmailInfo != null)
{
    Console.WriteLine("\r\n* Email Validation Details *\r\n");

    Console.WriteLine($"Score                       : {response.ValidateEmailInfo.Score}");
    Console.WriteLine($"Is Deliverable              : {response.ValidateEmailInfo.IsDeliverable}");
    Console.WriteLine($"Email Address In            : {response.ValidateEmailInfo.EmailAddressIn}");
    Console.WriteLine($"Email Address Out           : {response.ValidateEmailInfo.EmailAddressOut}");
    Console.WriteLine($"Email Corrected             : {response.ValidateEmailInfo.EmailCorrected}");
    Console.WriteLine($"Box                         : {response.ValidateEmailInfo.Box}");
    Console.WriteLine($"Domain                      : {response.ValidateEmailInfo.Domain}");
    Console.WriteLine($"Top Level Domain            : {response.ValidateEmailInfo.TopLevelDomain}");
    Console.WriteLine($"Top Level Domain Description: {response.ValidateEmailInfo.TopLevelDomainDescription}");
    Console.WriteLine($"Is SMTP Server Good         : {response.ValidateEmailInfo.IsSMTPServerGood}");
    Console.WriteLine($"Is Catch All Domain         : {response.ValidateEmailInfo.IsCatchAllDomain}");
    Console.WriteLine($"Is SMTP Mailbox Good        : {response.ValidateEmailInfo.IsSMTPMailBoxGood}");
    Console.WriteLine($"Warning Codes               : {response.ValidateEmailInfo.WarningCodes}");
    Console.WriteLine($"Warning Descriptions        : {response.ValidateEmailInfo.WarningDescriptions}");
    Console.WriteLine($"Notes Codes                 : {response.ValidateEmailInfo.NotesCodes}");
    Console.WriteLine($"Notes Descriptions          : {response.ValidateEmailInfo.NotesDescriptions}");
}
else
{
    Console.WriteLine("\r\n* Error *\r\n");
    Console.WriteLine($"Error Type       : {response.Error?.Type}");
    Console.WriteLine($"Error Type Code  : {response.Error?.TypeCode}");
    Console.WriteLine($"Error Description: {response.Error?.Desc}");
    Console.WriteLine($"Error Desc Code  : {response.Error?.DescCode}");
    Console.WriteLine($"Error Number     : {response.Error?.Number}");
}
```

# EV3 - ValidateEmailFullNoCorrection

The same as ValidateEmailFull but the service will not attempt to correct the email address.

### [ValidateEmailFullNoCorrection Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-email-validation-3/ev3-operations/ev3-validateemailfullnocorrections/)

## Library Usage

```
// 1. Build the input
//
//  Required fields:
//               EmailAddress
//               LicenseKey
//               IsLive
// 
// Optional:
//        TimeoutSeconds (default: 15)

using email_validation_3_dot_net.REST;

ValidateEmailFullNoCorrectionsClient.ValidateEmailFullNoCorrectionsInput validateEmailFullNoCorrectionsInput = new(
    EmailAddress: "Johan@gmail.com",
    LicenseKey: licenseKey,
    IsLive: isLive,
    TimeoutSeconds: 15
);

// 2. Call the sync InvokeAsync() method.
   EV3Response response = await ValidateEmailFullNoCorrectionsClient.InvokeAsync(validateEmailFullNoCorrectionsInput);

// 3. Inspect results.
if (response.Error is null && response.ValidateEmailInfo != null)
{
    Console.WriteLine("\r\n* Email Validation Details *\r\n");

    Console.WriteLine($"Score                       : {response.ValidateEmailInfo.Score}");
    Console.WriteLine($"Is Deliverable              : {response.ValidateEmailInfo.IsDeliverable}");
    Console.WriteLine($"Email Address In            : {response.ValidateEmailInfo.EmailAddressIn}");
    Console.WriteLine($"Email Address Out           : {response.ValidateEmailInfo.EmailAddressOut}");
    Console.WriteLine($"Email Corrected             : {response.ValidateEmailInfo.EmailCorrected}");
    Console.WriteLine($"Box                         : {response.ValidateEmailInfo.Box}");
    Console.WriteLine($"Domain                      : {response.ValidateEmailInfo.Domain}");
    Console.WriteLine($"Top Level Domain            : {response.ValidateEmailInfo.TopLevelDomain}");
    Console.WriteLine($"Top Level Domain Description: {response.ValidateEmailInfo.TopLevelDomainDescription}");
    Console.WriteLine($"Is SMTP Server Good         : {response.ValidateEmailInfo.IsSMTPServerGood}");
    Console.WriteLine($"Is Catch All Domain         : {response.ValidateEmailInfo.IsCatchAllDomain}");
    Console.WriteLine($"Is SMTP Mailbox Good        : {response.ValidateEmailInfo.IsSMTPMailBoxGood}");
    Console.WriteLine($"Warning Codes               : {response.ValidateEmailInfo.WarningCodes}");
    Console.WriteLine($"Warning Descriptions        : {response.ValidateEmailInfo.WarningDescriptions}");
    Console.WriteLine($"Notes Codes                 : {response.ValidateEmailInfo.NotesCodes}");
    Console.WriteLine($"Notes Descriptions          : {response.ValidateEmailInfo.NotesDescriptions}");
}
else
{
    Console.WriteLine("\r\n* Error *\r\n");
    Console.WriteLine($"Error Type       : {response.Error?.Type}");
    Console.WriteLine($"Error Type Code  : {response.Error?.TypeCode}");
    Console.WriteLine($"Error Description: {response.Error?.Desc}");
    Console.WriteLine($"Error Desc Code  : {response.Error?.DescCode}");
    Console.WriteLine($"Error Number     : {response.Error?.Number}");
}
```

# EV3 - ValidateEmailFast

This operation has the same inputs and outputs as ValidateEmailFull. This check will not perform any real-time SMTP level checks, however it may still provide SMTP level information via one of our other mechanisms.

### [ValidateEmailFast Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-email-validation-3/ev3-operations/ev3-validateemailfast/)

## Library Usage

```
// 1. Build the input
//
//  Required fields:
//               EmailAddress
//               LicenseKey
//               IsLive
// 
// Optional:
//        TimeoutSeconds (default: 15)

using email_validation_3_dot_net.REST;

ValidateEmailFastClient.ValidateEmailFastInput validateEmailFastInput = new(
    EmailAddress: "Johan@gmail.com",
    LicenseKey: licenseKey,
    IsLive: isLive,
    TimeoutSeconds: 15
);

// 2. Call the sync InvokeAsync() method.
  EV3Response response = await ValidateEmailFastClient.InvokeAsync(validateEmailFastInput);

// 3. Inspect results.
if (response.Error is null && response.ValidateEmailInfo != null)
{
    Console.WriteLine("\r\n* Email Validation Details *\r\n");

    Console.WriteLine($"Score                       : {response.ValidateEmailInfo.Score}");
    Console.WriteLine($"Is Deliverable              : {response.ValidateEmailInfo.IsDeliverable}");
    Console.WriteLine($"Email Address In            : {response.ValidateEmailInfo.EmailAddressIn}");
    Console.WriteLine($"Email Address Out           : {response.ValidateEmailInfo.EmailAddressOut}");
    Console.WriteLine($"Email Corrected             : {response.ValidateEmailInfo.EmailCorrected}");
    Console.WriteLine($"Box                         : {response.ValidateEmailInfo.Box}");
    Console.WriteLine($"Domain                      : {response.ValidateEmailInfo.Domain}");
    Console.WriteLine($"Top Level Domain            : {response.ValidateEmailInfo.TopLevelDomain}");
    Console.WriteLine($"Top Level Domain Description: {response.ValidateEmailInfo.TopLevelDomainDescription}");
    Console.WriteLine($"Is SMTP Server Good         : {response.ValidateEmailInfo.IsSMTPServerGood}");
    Console.WriteLine($"Is Catch All Domain         : {response.ValidateEmailInfo.IsCatchAllDomain}");
    Console.WriteLine($"Is SMTP Mailbox Good        : {response.ValidateEmailInfo.IsSMTPMailBoxGood}");
    Console.WriteLine($"Warning Codes               : {response.ValidateEmailInfo.WarningCodes}");
    Console.WriteLine($"Warning Descriptions        : {response.ValidateEmailInfo.WarningDescriptions}");
    Console.WriteLine($"Notes Codes                 : {response.ValidateEmailInfo.NotesCodes}");
    Console.WriteLine($"Notes Descriptions          : {response.ValidateEmailInfo.NotesDescriptions}");
}
else
{
    Console.WriteLine("\r\n* Error *\r\n");
    Console.WriteLine($"Error Type       : {response.Error?.Type}");
    Console.WriteLine($"Error Type Code  : {response.Error?.TypeCode}");
    Console.WriteLine($"Error Description: {response.Error?.Desc}");
    Console.WriteLine($"Error Desc Code  : {response.Error?.DescCode}");
    Console.WriteLine($"Error Number     : {response.Error?.Number}");
}
```