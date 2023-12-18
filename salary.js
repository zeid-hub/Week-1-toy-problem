function calculateNetSalary(basicSalary, benefits) {
    // Constants for tax rates and deductions
    const taxRates = {
      "Up to 24,000": 10,
      "24,001 - 40,000": 15,
      "40,001 - 60,000": 20,
      "60,001 - 80,000": 25,
      "Above 80,000": 30
    };
    const nhifRates = {
      "Up to 5,999": 150,
      "6,000 - 7,999": 300,
      "8,000 - 11,999": 400,
      "12,000 - 14,999": 500,
      "15,000 - 19,999": 600,
      "20,000 - 24,999": 750,
      "25,000 - 29,999": 850,
      "30,000 - 34,999": 900,
      "35,000 - 39,999": 950,
      "40,000 - 44,999": 1000,
      "45,000 - 49,999": 1100,
      "50,000 - 59,999": 1200,
      "60,000 - 69,999": 1300,
      "70,000 - 79,999": 1400,
      "80,000 - 89,999": 1500,
      "90,000 - 99,999": 1600,
      "100,000 - 109,999": 1700,
      "110,000 - 119,999": 1800,
      "Above 120,000": 2000
    };
    const nssfDeduction = 200;
  
    // Calculate gross salary
    const grossSalary = basicSalary + benefits;
  
    // Calculate payee (tax)
    let payee = 0;
    for (const rate in taxRates) {
      const [lower, upper] = rate.split(" - ");
      if (upper) {
        const lowerLimit = parseInt(lower.replace(/,/g, ""));
        const upperLimit = parseInt(upper.replace(/,/g, ""));
        if (grossSalary > lowerLimit && grossSalary <= upperLimit) {
          payee = (grossSalary - lowerLimit) * (taxRates[rate] / 100);
          break;
        }
      } else {
        const limit = parseInt(lower.replace(/,/g, ""));
        if (grossSalary > limit) {
          payee = (grossSalary - limit) * (taxRates[rate] / 100);
          break;
        }
      }
    }
  
    // Calculate NHIF Deductions
    let nhifDeductions = 0;
    for (const rate in nhifRates) {
      const [lower, upper] = rate.split(" - ");
      if (upper) {
        const lowerLimit = parseInt(lower.replace(/,/g, ""));
        const upperLimit = parseInt(upper.replace(/,/g, ""));
        if (grossSalary > lowerLimit && grossSalary <= upperLimit) {
          nhifDeductions = nhifRates[rate];
          break;
        }
      } else {
        const limit = parseInt(lower.replace(/,/g, ""));
        if (grossSalary > limit) {
          nhifDeductions = nhifRates[rate];
          break;
        }
      }
    }
  
    // Calculate net salary
    const netSalary = grossSalary - payee - nhifDeductions - nssfDeduction;
  
    // Return the calculated values
    return {
      payee,
      nhifDeductions,
      nssfDeduction,
      grossSalary,
      netSalary
    };
  }
  
  // Test Case
  const basicSalary = 25000;
  const benefits = 1000;
  
  const salaryDetails = calculateNetSalary(basicSalary, benefits);
  console.log(salaryDetails);