# RapidRebalance

RapidRebalance is an app to help you quickly rebalance your investment portfolio. I originally built
this for a hackathon at Fullstack Academy as a way for me to explore some of the features that you would find
in a robo-advisor like WealthFront or Betterment. It uses the Alpaca Markets API, which provides a paper-trading account and
trade execution, and Recharts, a data visualization library for React.

![alt text](https://github.com/rfmcmillan/rapid-rebalance/blob/readme/src/assets/screenshot.png?raw=true)

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

1. Click the "Edit" button next to the portfolio holding you'd like to change. An editable input should now appear in the "Target" column.

2. Enter the new % and click "Submit".

3. Change any other target allocations you would like.

4. Click the green "Rebalance" button. This should produce a dialog proposing all of the trades needed to bring your portfolio into balance.

5. Click "Submit" to place the trades.
