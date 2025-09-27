import { soap } from "strong-soap";

/**
 * <summary>
 * A class that provides functionality to call the ServiceObjects Email Validation 3 SOAP service's ValidateEmailFastNoCorrections endpoint,
 * performing a rapid syntax, domain, and DNS-level verification of an email address without attempting corrections,
 * with fallback to a backup endpoint in live mode.
 * </summary>
 */
class ValidateEmailFastNoCorrectionsSoap {
    /**
     * <summary>
     * Initializes a new instance of the ValidateEmailFastNoCorrectionsSoap class with the provided input parameters,
     * setting up primary and backup WSDL URLs based on the live/trial mode.
     * </summary>
     * <param name="emailAddress" type="string">The email address to validate.</param>
     * <param name="licenseKey" type="string">Your license key to use the service.</param>
     * <param name="isLive" type="boolean">Determines whether to use the live or trial service.</param>
     * <param name="timeoutSeconds" type="number">Timeout, in seconds, for the call to the service.</param>
     * <returns type="Promise<EV3Response>">A promise that resolves to an EV3Response object.</returns>
     * <exception cref="Error">Thrown if the license key is empty or null.</exception>
     */
    constructor(emailAddress, licenseKey, isLive, timeoutSeconds) {

        this.args = {
            EmailAddress: emailAddress,
            LicenseKey: licenseKey
        };

        this.isLive = isLive;
        this.timeoutSeconds = timeoutSeconds;

        this.LiveBaseUrl = "https://sws.serviceobjects.com/ev3/api.svc?wsdl";
        this.BackupBaseUrl = "https://swsbackup.serviceobjects.com/ev3/api.svc?wsdl";
        this.TrialBaseUrl = "https://trial.serviceobjects.com/ev3/api.svc?wsdl";

        this._primaryWsdl = this.isLive ? this.LiveBaseUrl : this.TrialBaseUrl;
        this._backupWsdl = this.isLive ? this.BackupBaseUrl : this.TrialBaseUrl;
    }

    /**
     * <summary>
     * Asynchronously calls the ValidateEmailFastNoCorrections SOAP endpoint, attempting the primary endpoint
     * first and falling back to the backup if the response is invalid (Error.TypeCode == '3') in live mode
     * or if the primary call fails.
     * </summary>
     * <returns type="Promise<EV3Response>">A promise that resolves to an EV3Response object containing email validation details or an error.</returns>
     * <exception cref="Error">Thrown if both primary and backup calls fail, with detailed error messages.</exception>
     */
    async validateEmailFastNoCorrections() {
        try {
            const primaryResult = await this._callSoap(this._primaryWsdl, this.args);

            if (this.isLive && !this._isValid(primaryResult)) {
                console.warn("Primary returned Error.TypeCode == '3', falling back to backup...");
                const backupResult = await this._callSoap(this._backupWsdl, this.args);
                return backupResult;
            }
            return primaryResult;
        } catch (primaryErr) {
            try {
                const backupResult = await this._callSoap(this._backupWsdl, this.args);
                return backupResult;
            } catch (backupErr) {
                throw new Error(`Both primary and backup calls failed:\nPrimary: ${primaryErr.message}\nBackup: ${backupErr.message}`);
            }
        }
    }

    /**
     * <summary>
     * Performs a SOAP service call to the specified WSDL URL with the given arguments,
     * creating a client and processing the response into an EV3Response object.
     * </summary>
     * <param name="wsdlUrl" type="string">The WSDL URL of the SOAP service endpoint (primary or backup).</param>
     * <param name="args" type="Object">The arguments to pass to the ValidateEmailFastNoCorrections method.</param>
     * <returns type="Promise<EV3Response>">A promise that resolves to an EV3Response object containing the SOAP response data.</returns>
     * <exception cref="Error">Thrown if the SOAP client creation fails, the service call fails, or the response cannot be parsed.</exception>
     */
    _callSoap(wsdlUrl, args) {
        return new Promise((resolve, reject) => {
            soap.createClient(wsdlUrl, { timeout: this.timeoutSeconds * 1000 }, (err, client) => {
                if (err) return reject(err);

                client.ValidateEmailFastNoCorrections(args, (err, result) => {
                    if (err) return reject(err);
                    const rawData = result.ValidateEmailFastNoCorrectionsResult;
                    try {
                        if (!rawData) {
                            return reject(new Error("SOAP response is empty or undefined."));
                        }
                        resolve(rawData);
                    } catch (parseErr) {
                        reject(new Error(`Failed to parse SOAP response: ${parseErr.message}`));
                    }
                });
            });
        });
    }

    /**
     * <summary>
     * Checks if a SOAP response is valid by verifying that it exists and either has no Error object
     * or the Error.Number is not equal to '3'.
     * </summary>
     * <param name="response" type="EV3Response">The EV3Response object to validate.</param>
     * <returns type="boolean">True if the response is valid, false otherwise.</returns>
     */
    _isValid(response) {
        return response && (!response.Error || response.Error.TypeCode !== '3');
    }
}

export { ValidateEmailFastNoCorrectionsSoap };