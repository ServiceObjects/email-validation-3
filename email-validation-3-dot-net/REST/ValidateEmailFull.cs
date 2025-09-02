using System.Web;

namespace email_validation_3_dot_net.REST
{
    /// <summary>
    /// Provides functionality to call the ServiceObjects Email Validation 3 REST API's ValidateEmailFull endpoint,
    /// which corrects, validates, and verifies an email address via a full suite of tests and real-time SMTP checks.
    /// </summary>
    public class ValidateEmailFullClient
    {
        private const string LiveBaseUrl = "https://sws.serviceobjects.com/ev3/api.svc/";
        private const string BackupBaseUrl = "https://swsbackup.serviceobjects.com/ev3/api.svc/";
        private const string TrialBaseUrl = "https://trial.serviceobjects.com/ev3/api.svc/";

        /// <summary>
        /// Synchronously calls the ValidateEmailFull REST endpoint to validate an email address,
        /// attempting the primary endpoint first and falling back to the backup if the response is invalid
        /// (Error.TypeCode == "3") in live mode.
        /// </summary>
        /// <param name="input">The input parameters including email address, license key, and service options.</param>
        /// <returns>Deserialized <see cref="EV3Response"/> containing the validation results.</returns>
        public static EV3Response Invoke(ValidateEmailFullInput input)
        {
            //Use query string parameters so missing/options fields don't break
            //the URL as path parameters would.
            string url = BuildUrl(input, input.IsLive ? LiveBaseUrl : TrialBaseUrl);
            EV3Response response = Helper.HttpGet<EV3Response>(url, input.TimeoutSeconds);

            // Fallback on error in live mode
            if (input.IsLive && !IsValid(response))
            {
                string fallbackUrl = BuildUrl(input, BackupBaseUrl);
                EV3Response fallbackResponse = Helper.HttpGet<EV3Response>(fallbackUrl, input.TimeoutSeconds);
                return fallbackResponse;
            }

            return response;
        }

        /// <summary>
        /// Asynchronously calls the ValidateEmailFull REST endpoint to validate an email address,
        /// attempting the primary endpoint first and falling back to the backup if the response is invalid
        /// (Error.TypeCode == "3") in live mode.
        /// </summary>
        /// <param name="input">The input parameters including email address, license key, and service options.</param>
        /// <returns>Deserialized <see cref="EV3Response"/> containing the validation results.</returns>
        public static async Task<EV3Response> InvokeAsync(ValidateEmailFullInput input)
        {
            //Use query string parameters so missing/options fields don't break
            //the URL as path parameters would.
            string url = BuildUrl(input, input.IsLive ? LiveBaseUrl : TrialBaseUrl);
            EV3Response response = await Helper.HttpGetAsync<EV3Response>(url, input.TimeoutSeconds).ConfigureAwait(false);

            if (input.IsLive && !IsValid(response))
            {
                string fallbackUrl = BuildUrl(input, BackupBaseUrl);
                EV3Response fallbackResponse = await Helper.HttpGetAsync<EV3Response>(fallbackUrl, input.TimeoutSeconds).ConfigureAwait(false);
                return fallbackResponse;
            }

            return response;
        }

        // Build the full request URL, including URL-encoded parameters
        public static string BuildUrl(ValidateEmailFullInput input, string baseUrl)
        {
            var qs = $"JSON/ValidateEmailInfo/Full/{HttpUtility.UrlEncode(input.EmailAddress)}/" +
                     $"{HttpUtility.UrlEncode(input.LicenseKey)}?format=json";
            return baseUrl + qs;
        }

        private static bool IsValid(EV3Response response) =>
            response?.Error == null || response.Error.TypeCode != "3";

        /// <summary>
        /// Represents the input parameters for the ValidateEmailFull REST API call.
        /// </summary>
        /// <param name="EmailAddress">The email address to validate.</param>
        /// <param name="LicenseKey">Your license key to use the service.</param>
        /// <param name="IsLive">Determines whether to use the live or trial service.</param>
        /// <param name="TimeoutSeconds">Timeout, in seconds, for the call to the service.</param>
        public record ValidateEmailFullInput(
            string EmailAddress = "",
            string LicenseKey = "",
            bool IsLive = true,
            int TimeoutSeconds = 15
        );
    }
}
