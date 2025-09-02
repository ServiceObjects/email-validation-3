using EV3Service;
using email_validation_3_dot_net.SOAP;

namespace email_validation_3_dot_net_examples
{
    public class ValidateEmailFastSoapSdkExample
    {
        public static void Go(string licenseKey, bool isLive)
        {
            Console.WriteLine("\r\n------------------------------------------------------");
            Console.WriteLine("Email Validation 3 - ValidateEmailFastInput - SOAP SDK");
            Console.WriteLine("------------------------------------------------------");
            ValidateEmailFastValidation validateEmailFastValidation = new ValidateEmailFastValidation(isLive);
            string EmailAddress = "Johan@gmail.com";
            string LicenseKey = licenseKey;

            ValidateEmailResponse response = validateEmailFastValidation.ValidateEmailFast(EmailAddress, LicenseKey).Result;

            Console.WriteLine("\r\n* Input *\r\n");
            Console.WriteLine($"Email Address: {EmailAddress}");
            Console.WriteLine($"License Key  : {licenseKey}");
            Console.WriteLine($"Is Live      : {isLive}");


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
