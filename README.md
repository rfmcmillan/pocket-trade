# RapidRebalance

RapidRebalance is an app to help you quickly rebalance your investment portfolio. I originally built
this for a hackathon at Fullstack Academy as a way for me to explore some of the features that you would find
in a robo-advisor like WealthFront or Betterment. It uses the Alpaca Markets API which provides a paper-trading account and
trade execution.

## Installation

Clone this repo

```bash
git clone https://github.com/rfmcmillan/rapid-rebalance.git
```

Use npm to install RapidRebalance along with all its' dependencies.

```bash
npm install
```

## Usage

To edit the target % for your portfolio allocation:

1. Click "Edit" button next to the portfolio holding you'd like to change. An editable input should now appear in the "Target" column.

2. Enter the new % and click "Submit".

3. Change any other target allocations you would like.

4. Click green "Rebalance" button. It will produce a dialog with some proposed trades.

5. Click "Submit" to submit trades.
