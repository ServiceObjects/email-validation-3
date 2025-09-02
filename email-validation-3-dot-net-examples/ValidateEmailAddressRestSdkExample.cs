using System;
using System.Threading.Tasks;
using email_validation_3_dot_net.REST;

namespace email_validation_3_dot_net_examples
{
    public static class ValidateEmailAddressRestSdkExample
    {
        public static void Go(string licenseKey, bool isLive)
        {
            Console.WriteLine("\r\n-----------------------------------------------------------");
            Console.WriteLine("Email Validation 3 - ValidationEmailAddressInput - REST SDK");
            Console.WriteLine("-----------------------------------------------------------");

            ValidateEmailAddressClient.ValidationEmailAddressInput validationEmailAddressInput = new
            (
                EmailAddress: "Johan@gmail.com",
                LicenseKey: licenseKey,
                AllowCorrections: "true",
                IsLive: isLive,
                Timeout: "10000",
                TimeoutSeconds: 15
            );

            Console.WriteLine("\r\n* Input *\r\n");
            Console.WriteLine($"Email Address    : {validationEmailAddressInput.EmailAddress}");
            Console.WriteLine($"License Key      : {validationEmailAddressInput.LicenseKey}");
            Console.WriteLine($"Allow Corrections: {validationEmailAddressInput.AllowCorrections}");
            Console.WriteLine($"Is Live          : {validationEmailAddressInput.IsLive}");
            Console.WriteLine($"Timeout          : {validationEmailAddressInput.Timeout}");
            Console.WriteLine($"Timeout Seconds  : {validationEmailAddressInput.TimeoutSeconds}");

            EV3Response response = ValidateEmailAddressClient.Invoke(validationEmailAddressInput);
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
            }
        }
    }
}