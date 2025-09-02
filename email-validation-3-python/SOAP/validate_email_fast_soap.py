from suds.client import Client
from suds import WebFault
from suds.sudsobject import Object


class ValidateEmailFastSoap:

    def __init__(self, email_address: str, license_key: str, is_live: bool, timeout_ms: int = 10000):
        """
        license_key: Service Objects EV3 license key.
        is_live: Whether to use live or trial endpoints
        timeout_ms: SOAP call timeout in milliseconds
        """
        if not license_key:
            raise ValueError("LicenseKey cannot be empty or null.")

        self._timeout_s = timeout_ms / 1000.0  
        self._is_live = is_live
        self.license_key = license_key
        self.email_address = email_address

        # WSDL URLs

        self._primary_wsdl = (
            "https://sws.serviceobjects.com/ev3/api.svc?wsdl"
            if is_live else
            "https://trial.serviceobjects.com/ev3/api.svc?wsdl"
        )
        self._backup_wsdl = (
            "https://swsbackup.serviceobjects.com/ev3/api.svc?wsdl"
            if is_live else
            "https://trial.serviceobjects.com/ev3/api.svc?wsdl"
        )

    def validate_email_fast(self) -> Object:
        """
        Call EV3 ValidateEmailFast SOAP API to retrieve the information.
        
        Parameters:
            email_address: The email address to validate.
            license_key: Your Service Objects license key.
            is_live: Determines whether to use the live or trial servers.
            timeout_ms: Timeout, in milliseconds, for the call to the service.

        Returns:
            suds.sudsobject.Object: SOAP response containing validation details or error.
        """
        # Common kwargs for both calls
        call_kwargs = dict(
            EmailAddress=self.email_address,
            LicenseKey=self.license_key,
        )

        # Attempt primary
        try:
            client = Client(self._primary_wsdl)

            # Override endpoint URL if needed:
            response = client.service.ValidateEmailFast(**call_kwargs)

             # If response invalid or Error.TypeCode == "3", trigger fallback
            if response is None or (hasattr(response, "Error") and response.Error and response.Error.TypeCode == "3"):
                raise ValueError("Primary returned no result or Error.TypeCode=3")

            return response

        except (WebFault, ValueError, Exception) as primary_ex:
            try:
                client = Client(self._backup_wsdl)
                response = client.service.ValidateEmailFast(**call_kwargs)

                if response is None:
                    raise ValueError("Backup returned no result")
                return response
            except (WebFault, Exception) as backup_ex:
                msg = (
                    "Both primary and backup endpoints failed.\n"
                    f"Primary error: {str(primary_ex)}\n"
                    f"Backup error: {str(backup_ex)}"
                )
                raise RuntimeError(msg)