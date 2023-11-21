import { useState } from "react";
import "./Sip.css";
import Navbar from './Navbar';

const InvestmentCalculator = () => 
{
  const [investmentPeriod, setInvestmentPeriod] = useState(0);
  const [annualReturnRate, setAnnualReturnRate] = useState(0);
  const [lumpsumInvestment, setLumpsumInvestment] = useState(0);
  const [monthlyInvestment, setMonthlyInvestment] = useState(0);

  const calculateInvestment = () => 
  {
    const futureValue =
      lumpsumInvestment * (1 + annualReturnRate / 100) ** investmentPeriod +
      monthlyInvestment *
        ((1 + annualReturnRate / 100 / 12) *
          ((1 + annualReturnRate / 100 / 12) ** (investmentPeriod * 12) - 1) /
          (annualReturnRate / 100 / 12));
    return futureValue;
  };

  const totalInvested = parseFloat(lumpsumInvestment) + parseFloat(monthlyInvestment) * 12 * parseFloat(investmentPeriod);
  const estimatedReturns = calculateInvestment() - totalInvested;

  return (
    <div className="main-container">
      <Navbar />
      <h1>Investment Calculator</h1>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="investmentPeriod">Investment Period (years)</label>
          <input
            type="number"
            id="investmentPeriod"
            value={investmentPeriod}
            onChange={(e) => setInvestmentPeriod(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="annualReturnRate">Annual Expected Return Rate (%)</label>
          <input
            type="number"
            id="annualReturnRate"
            value={annualReturnRate}
            onChange={(e) => setAnnualReturnRate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lumpsumInvestment">One-time Investment (₹)</label>
          <input
            type="number"
            id="lumpsumInvestment"
            value={lumpsumInvestment}
            onChange={(e) => setLumpsumInvestment(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="monthlyInvestment">Monthly Investment (₹)</label>
          <input
            type="number"
            id="monthlyInvestment"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(e.target.value)}
            disabled={lumpsumInvestment !== "" && lumpsumInvestment !== "0"}
          />
        </div>

        <button type="button" onClick={calculateInvestment}>
          Calculate
        </button>
      </div>
      <br />
      <h2>Future Value: ₹{calculateInvestment().toFixed(2)}</h2>
      <div className="result-details">
        <p>Total Invested Amount: ₹{totalInvested.toFixed(2)}</p>
        <p>Estimated Returns: ₹{estimatedReturns.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
