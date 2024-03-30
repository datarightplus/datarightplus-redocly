Constrain the transaction history request to transactions with effective time
at or after this date/time. Format is aligned to DateTimeString common type.

If absent defaults to the following dependent on call:
- **Banking**: `newest-time` minus 90 days
- **Energy**: `newest-time` minus 12 months
