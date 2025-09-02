import axios from 'axios';
import querystring from 'querystring';
import { EV3Response } from './ev3_response.js';

/**
 * @constant
 * @type {string}
 * @description The base URL for the live ServiceObjects Email Validation 3 API service.
 */
const LiveBaseUrl = 'https://sws.serviceobjects.com/ev3/web.svc/';

/**
 * @constant
 * @type {string}
 * @description The base URL for the backup ServiceObjects Email Validation 3 API service.
 */
const BackupBaseUrl = 'https://swsbackup.serviceobjects.com/ev3/web.svc/';

/**
 * @constant
 * @type {string}
 * @description The base URL for the trial ServiceObjects Email Validation 3 API service.
 */
const TrialBaseUrl = 'https://trial.serviceobjects.com/ev3/web.svc/';

/**
 * <summary>
 * Checks if a response from the API is valid by verifying that it either has no Error object
 * or the Error.Number is not equal to '3'.
 * </summary>
 * <param name="response" type="Object">The API response object to validate.</param>
 * <returns type="boolean">True if the response is valid, false otherwise.</returns>
 */
const isValid = (response) => !response?.Error || response.Error.TypeCode !== '3';

/**
 * <summary>
 * Constructs a full URL for the ValidateEmailAddress API endpoint by combining the base URL
 * with query parameters derived from the input parameters.
 * </summary>
 * <param name="params" type="Object">An object containing all the input parameters.</param>
 * <param name="baseUrl" type="string">The base URL for the API service (live, backup, or trial).</param>
 * <returns type="string">The constructed URL with query parameters.</returns>
 */
const buildUrl = (params, baseUrl) =>
    `${baseUrl}JSON/ValidateEmailAddress?${querystring.stringify(params)}`;

/**
 * <summary>
 * Performs an HTTP GET request to the specified URL with a given timeout.
 * </summary>
 * <param name="url" type="string">The URL to send the GET request to.</param>
 * <param name="timeoutSeconds" type="number">The timeout duration in seconds for the request.</param>
 * <returns type="Promise<EV3Response>">A promise that resolves to an EV3Response object containing the API response data.</returns>
 * <exception cref="Error">Thrown if the HTTP request fails, with a message detailing the error.</exception>
 */
const httpGet = async (url, timeoutSeconds) => {
    try {
        const response = await axios.get(url, { timeout: timeoutSeconds * 1000 });
        return new EV3Response(response.data);
    } catch (error) {
        throw new Error(`HTTP request failed: ${error.message}`);
    }
};

/**
 * <summary>
 * Provides functionality to call the ServiceObjects Email Validation 3 API's ValidateEmailAddress endpoint,
 * performing email validation with optional correction support and fallback to a backup endpoint in live mode.
 * </summary>
 */
const ValidateEmailAddressClient = {
    /**
     * <summary>
     * Asynchronously invokes the ValidateEmailAddress API endpoint, attempting the primary endpoint
     * first and falling back to the backup if the response is invalid (Error.TypeCode == '3') in live mode.
     * </summary>
     * <param name="emailAddress" type="string">The email address to validate.</param>
     * <param name="allowCorrections" type="string">Whether the service should return a corrected email address if one is found (true/false).</param>
     * <param name="licenseKey" type="string">Your license key to use the service.</param>
     * <param name="isLive" type="boolean">Determines whether to use the live or trial service.</param>
     * <param name="timeoutSeconds" type="number">Timeout, in seconds, for the call to the service.</param>
     * <returns type="Promise<EV3Response>">A promise that resolves to an EV3Response object.</returns>
     */
    async invokeAsync(emailAddress, allowCorrections, licenseKey, isLive, timeout, timeoutSeconds = 15) {
        const params = {
            EmailAddress: emailAddress,
            AllowCorrections: allowCorrections,
            TIMEOUT: timeout,
            LicenseKey: licenseKey
        };

        const url = buildUrl(params, isLive ? LiveBaseUrl : TrialBaseUrl);
        let response = await httpGet(url, timeoutSeconds);

        if (isLive && !isValid(response)) {
            const fallbackUrl = buildUrl(params, BackupBaseUrl);
            const fallbackResponse = await httpGet(fallbackUrl, timeoutSeconds);
            return fallbackResponse;
        }

        return response;
    },

    /**
     * <summary>
     * Synchronously invokes the ValidateEmailAddress API endpoint by wrapping the async call
     * and awaiting its result immediately.
     * </summary>
     * <param name="emailAddress" type="string">The email address to validate.</param>
     * <param name="allowCorrections" type="string">Whether the service should return a corrected email address if one is found (true/false).</param>
     * <param name="licenseKey" type="string">Your license key to use the service.</param>
     * <param name="isLive" type="boolean">Determines whether to use the live or trial service.</param>
     * <param name="timeoutSeconds" type="number">Timeout, in seconds, for the call to the service.</param>
     * <returns type="EV3Response">An EV3Response object with validation details or an error.</returns>
     */
    invoke(emailAddress, allowCorrections, licenseKey, isLive, timeout, timeoutSeconds = 15) {
        return (async () => await this.invokeAsync(emailAddress, allowCorrections, licenseKey, isLive, timeout, timeoutSeconds))();
    }
};

export { ValidateEmailAddressClient, EV3Response };