The pricing model for the contract.  Contracts for gas must
use SINGLE_RATE.

Note that the detail for the enumeration values are:

- **SINGLE_RATE**: all energy usage is charged at a single unit rate no matter when it is consumed. Multiple unit rates may exist that correspond to varying volumes of usage i.e. a 'block' or 'step' tariff (first 50kWh @ X cents, next 50kWh at Y cents etc
- **SINGLE_RATE_CONT_LOAD**: As per *SINGLE_RATE* but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.
- **TIME_OF_USE**: energy usage is charged at unit rates that vary dependent on time of day and day of week that the energy is consumed
- **TIME_OF_USE_CONT_LOAD**: Same as *TIME_OF_USE*, but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.
- **FLEXIBLE**: energy usage is charged at unit rates that vary based on external factors
- **FLEXIBLE_CONT_LOAD**: Same as *FLEXIBLE* but with an additional, separate unit rate charged for all energy usage from a controlled load i.e. separately metered appliance like hot water service, pool pump etc.
- **QUOTA**: All energy usage is charged at a single fixed rate, up to a specified usage quota/allowance. All excess usage beyond the allowance is then charged at a single unit rate (may not be the best way to explain it but it is essentially a 'subscription'
or telco style product i.e. $50/month for up to 150kWh included usage)
