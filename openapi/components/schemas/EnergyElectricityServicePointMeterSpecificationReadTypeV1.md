Code to denote the method and frequency of Meter Reading.

The value is formatted as follows:
- First Character (Read Type):
  - **R**: Remote
  - **M**: Manual
- Second Character (Mode):
  - **T**: Telephone
  - **W**: Wireless
  - **P**: Powerline
  - **I**: Infra-red
  - **G**: Galvanic
  - **V**: Visual
- Third Character (Frequency of Scheduled Meter Readings):
  - **1**: Twelve times per year 
  - **2**: Six times per year 
  - **3**: Four times per year 
  - **D**: Daily or Weekly
- Fourth Character [Optional] (Identify Meter Interval Length Capability):
  - **A**: 5 minute
  - **B**: 15 minute
  - **C**: 30 minute
  - **D**: Cannot convert to 5 minute (i.e. due to metering installation de-energised)
  - **M**: Manually Read Accumulation Meter

Examples:
- **MV3**: Manual, Visual, Quarterly
- **MV3M**: Manual, Visual, Quarterly, Manually Read Accumulation Meter 
- **RWDC**: Remote, Wireless, Daily, 30 minutes interval