import requests  # HTTP client for RESTful API calls
from ev3_response import EV3Response, Error, ValidateEmailInfo

# Endpoint URLs for EV3 ValidateEmailFastNoCorrections REST API
primary_url = "https://sws.serviceobjects.com/ev3/api.svc/JSON/ValidateEmailInfo/Fast/NoCorrections/"
backup_url = "https://swsbackup.serviceobjects.com/ev3/api.svc/JSON/ValidateEmailInfo/Fast/NoCorrections/"
trial_url = "https://trial.serviceobjects.com/ev3/api.svc/JSON/ValidateEmailInfo/Fast/NoCorrections/"


def validate_email_fast_no_corrections(
    email_address: str,
    license_key: str,
    is_live: bool = True,
    timeout_seconds: int = 15
) -> EV3Response:
    """
    Call EV3 ValidateEmailFastNoCorrections API to validate an email quickly without corrections.

    Parameters:
        email_address: Email address to validate.
        license_key: Your ServiceObjects license key.
        is_live: Value to determine whether to use the live or trial servers.
        timeout_seconds: Timeout, in seconds, for the call to the service.

    Returns:
        EV3Response: Parsed JSON response with validation results or error details.
    """

    # Build endpoint URL (path parameters required)
    base_url = primary_url if is_live else trial_url
    url = f"{base_url}{requests.utils.quote(email_address)}/{requests.utils.quote(license_key)}?format=json"

    # Attempt primary (or trial) endpoint first
    try:
        response = requests.get(url, timeout=timeout_seconds)
        data = response.json()

        # If API returned an error in JSON payload, trigger fallback
        error = getattr(response, 'Error', None)
        if not (error is None or getattr(error, 'TypeCode', None) != "3"):
            if is_live:
                # Try backup URL
                fallback_url = f"{backup_url}{requests.utils.quote(email_address)}/{requests.utils.quote(license_key)}?format=json"
                response = requests.get(fallback_url, timeout=timeout_seconds)
                response.raise_for_status()
                data = response.json()
                
                if "Error" in data:
                    raise RuntimeError(f"EV3 backup error: {data['Error']}")
            else:
                # Trial mode error is terminal
                raise RuntimeError(f"EV3 trial error: {data['Error']}")

        # Convert JSON response to EV3Response for structured access
        error = Error(**data.get("Error", {})) if data.get("Error") else None
        validate_info = ValidateEmailInfo(**data.get("ValidateEmailInfo", {})) if data.get("ValidateEmailInfo") else None

        return EV3Response(
            LicenseKey=data.get("LicenseKey"),
            EmailAddress=data.get("EmailAddress"),
            ValidateEmailInfo=validate_info,
            Error=error,
        )

    except requests.RequestException as req_exc:
        # Network or HTTP-level error occurred
        if is_live:
            try:
                # Fallback to backup URL on network failure
                fallback_url = f"{backup_url}{requests.utils.quote(email_address)}/{requests.utils.quote(license_key)}?format=json"
                response = requests.get(fallback_url, timeout=timeout_seconds)
                response.raise_for_status()
                data = response.json()
               
                if "Error" in data:
                    raise RuntimeError(f"EV3 backup error: {data['Error']}") from req_exc

                error = Error(**data.get("Error", {})) if data.get("Error") else None
                validate_info = ValidateEmailInfo(**data.get("ValidateEmailInfo", {})) if data.get("ValidateEmailInfo") else None

                return EV3Response(
                    LicenseKey=data.get("LicenseKey"),
                    EmailAddress=data.get("EmailAddress"),
                    AllowCorrections=data.get("AllowCorrections"),
                    Timeout=data.get("Timeout"),
                    ValidateEmailInfo=validate_info,
                    Error=error,
                )
            except Exception as backup_exc:
                raise RuntimeError("EV3 service unreachable on both endpoints") from backup_exc
        else:
            raise RuntimeError(f"EV3 trial error: {str(req_exc)}") from req_exc
